import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check auth status on initial render
        const user = JSON.parse(localStorage.getItem('user-info') || '{}');
        setIsLoggedIn(!!user.token);

        // Set up listener for storage changes
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem('user-info') || '{}');
            setIsLoggedIn(!!updatedUser.token);
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        setIsLoggedIn(false);
        navigate('/auth');
    };

    return (
        <header className="bg-gray-900 border-b border-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold text-blue-400">FixMyArea</span>
                        </div>
                        <nav className="hidden md:ml-10 md:block">
                            <div className="flex space-x-8">
                                <a href="#" className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">Home</a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">How It Works</a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">Success Stories</a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">About</a>
                            </div>
                        </nav>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            {!isLoggedIn ? (
                                <button
                                    onClick={() => navigate('/role')}
                                    className="text-gray-400 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    Log In
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            )}
                            <button
                                onClick={() => navigate('/report')}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Report an Issue
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none transition-colors duration-200"
                            aria-label="Open menu"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div
                        className="fixed inset-0 z-10 bg-black bg-opacity-70"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    ></div>
                    <div className="fixed inset-y-0 right-0 z-20 w-full max-w-xs bg-gray-900 shadow-xl">
                        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
                            <span className="text-xl font-bold text-blue-400">FixMyArea</span>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none transition-colors duration-200"
                                aria-label="Close menu"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition-colors duration-200">Home</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200">How It Works</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200">Success Stories</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200">About</a>
                            <div className="pt-4 border-t border-gray-800">
                                {!isLoggedIn ? (
                                    <button
                                        onClick={() => navigate('/auth')}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                                    >
                                        Log In
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="mt-2 w-full bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate('/report')}
                                    className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                >
                                    Report an Issue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;