import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { 
  UserCircleIcon,
  IdentificationIcon,
  MapIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const url = 'http://localhost:3000/api/';

const AdminAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    zone: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { email, password, name, department, zone } = formData;
      const type = isLogin ? 'signin' : 'signup';
      
      const response = await axios.post(`${url}auth`, {
        email,
        password,
        ...(!isLogin && { name, department, zones: zone })
      }, {
        params: { type },
      });

      if (response.data.token) {
        localStorage.setItem('admin-token', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Authentication failed'
        : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-64">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`relative w-full h-12 flex items-center rounded-full p-1 transition-colors duration-300 ${isLogin ? 'bg-blue-900/30' : 'bg-gray-700'}`}
              >
                <div className={`absolute left-0 right-0 flex justify-between px-4 pointer-events-none`}>
                  <span className={`font-medium ${isLogin ? 'text-blue-400' : 'text-gray-400'}`}>Sign Up</span>
                  <span className={`font-medium ${isLogin ? 'text-gray-300' : 'text-blue-400'}`}>Login</span>
                </div>
                <div
                  className={`h-10 w-32 rounded-full shadow-sm transform transition-transform duration-300 flex items-center justify-center ${
                    isLogin 
                      ? 'translate-x-32 bg-blue-600 text-white' 
                      : 'translate-x-0 bg-gray-600 text-white'
                  }`}
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </div>
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-6">
            {isLogin ? 'Admin Login' : 'Admin Registration'}
          </h1>

          {error && (
            <div className="mb-6 p-3 text-sm text-red-400 bg-red-900/30 rounded-lg flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCircleIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-500"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdentificationIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="department"
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-500"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Public Works"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="zone" className="block text-sm font-medium text-gray-300 mb-1">
                    Zone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="zone"
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-500"
                      value={formData.zone}
                      onChange={handleInputChange}
                      placeholder="North District"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center ${
                loading 
                  ? 'bg-blue-700 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : isLogin ? (
                'Login to Dashboard'
              ) : (
                'Create Admin Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default AdminAuth;