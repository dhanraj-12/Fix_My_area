import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function RoleSelectionPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Store role in localStorage or context as needed
    localStorage.setItem('user-role', role);
  };

  const handleContinue = () => {
    if (selectedRole === 'user') {
      navigate('/auth');
    } else if (selectedRole === 'admin') {
      navigate('/adminAuth');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Select Your Role
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Choose how you want to use FixMyArea
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {/* User Role Card */}
            <div
              onClick={() => handleRoleSelect('user')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedRole === 'user'
                  ? 'border-blue-500 bg-gray-700'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-full">
                  <UserIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Community User</h3>
                  <p className="text-sm text-gray-400">
                    Report issues and track their resolution in your area
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Role Card */}
            <div
              onClick={() => handleRoleSelect('admin')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedRole === 'admin'
                  ? 'border-blue-500 bg-gray-700'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-full">
                  <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Administrator</h3>
                  <p className="text-sm text-gray-400">
                    Manage reported issues and coordinate resolutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                selectedRole
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionPage;