import axios from 'axios';
import { useEffect, useState } from 'react';
import Issue from './issue';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {
  ExclamationTriangleIcon,
  FunnelIcon,
  FaceFrownIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const url = 'http://localhost:3000/api/';

function AdminDashboard() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get(`${url}a/issue`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setIssues(response.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem('admin-token');
          navigate('/admin/login');
        }
        setError(err.response?.data?.message || 'Failed to fetch issues');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateIssueStatus = async (issueId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin-token');
      await axios.patch(`${url}admin/issues/${issueId}`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchIssues(); // Refresh the list
    } catch (err) {
      setError('Failed to update issue status');
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true;
    return issue.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
            
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-800 text-gray-200 rounded-md border border-gray-700 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Issues</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="bg-gray-800 rounded-lg shadow p-8 text-center">
              <FaceFrownIcon className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-2 text-lg font-medium text-white">No issues found</h3>
              <p className="mt-1 text-sm text-gray-400">
                {filter === 'all' ? 'There are currently no issues.' : `No ${filter.replace('-', ' ')} issues.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.map((issue) => (
                <div 
                  key={issue._id} 
                  className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-700"
                > 
                  <Issue issue={issue} 
                  //@ts-ignore
                    onStatusChange={updateIssueStatus} />

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;