import axios from 'axios';
import { useEffect, useState } from 'react';
import Issue from './issue';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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
      console.log('Fetched issues:', response.data);
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
    <>
    <Header></Header>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Issue Dashboard</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border border-gray-300 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No issues found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'There are currently no issues.' : `No ${filter.replace('-', ' ')} issues.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div key={issue._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <Issue issue={issue} onStatusChange={updateIssueStatus} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default AdminDashboard;