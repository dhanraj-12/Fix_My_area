import Footer from './Footer'
import Header from './Header'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPinIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface FeatureCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const features: FeatureCard[] = [
    {
      icon: <MapPinIcon className="h-10 w-10 text-blue-400" />,
      title: "Pinpoint Issues",
      description: "Mark the exact location of problems in your community"
    },
    {
      icon: <WrenchScrewdriverIcon className="h-10 w-10 text-blue-400" />,
      title: "AI-Powered Reports",
      description: "Our system automatically categorizes and describes issues"
    },
    {
      icon: <CheckBadgeIcon className="h-10 w-10 text-blue-400" />,
      title: "Track Progress",
      description: "See when authorities acknowledge and resolve your reports"
    },
    {
      icon: <UsersIcon className="h-10 w-10 text-blue-400" />,
      title: "Community Impact",
      description: "Join others in making your neighborhood better"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header/>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-24 md:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Improve Your</span>
                <span className="block text-blue-400">Community Together</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Report local issues, track their resolution, and make your neighborhood a better place to live.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('/report')}
                  className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none transition-colors duration-200"
                >
                  Report an Issue
                </button>
                <button
                  onClick={() => navigate('/explore')}
                  className="rounded-md bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-700 transition-colors duration-200"
                >
                  Browse Issues
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-white">Find issues in your area</h2>
            <form onSubmit={handleSearch} className="mt-6 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your location or postal code"
                className="flex-1 rounded-l-md border-0 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-r-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How FixMyArea Works
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Our platform makes it easy to report and track community issues
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-800 px-6 pb-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-700 mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white text-center">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-400 text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trusted by communities everywhere
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Join thousands of users making a difference
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-5xl font-bold text-blue-400">10K+</p>
                <p className="mt-2 text-lg text-gray-300">Issues Reported</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-blue-400">5K+</p>
                <p className="mt-2 text-lg text-gray-300">Issues Resolved</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-blue-400">100+</p>
                <p className="mt-2 text-lg text-gray-300">Communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to make a difference?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join thousands of community members improving their neighborhoods
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-md bg-white px-8 py-3 text-lg font-medium text-blue-600 hover:bg-gray-100 shadow-lg transition-colors duration-200"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/explore')}
                  className="rounded-md bg-transparent px-8 py-3 text-lg font-medium text-white ring-1 ring-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default LandingPage  