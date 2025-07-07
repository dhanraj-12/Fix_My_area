import React from "react";

interface IssueProps {
  issue: {
    imageUrl?: string;
    description?: string;
    category?: string;
    location?: string;
    status?: string;
    timestamp?: string;
  };
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  const [img, setImg] = React.useState<string | null>(issue.imageUrl || null);
  const [description] = React.useState<string>(issue.description || "");
  const [category] = React.useState<string>(issue.category || "");
  const [location] = React.useState<string>(issue.location || "Location not available");
  const [status] = React.useState<string>(issue.status || "Pending");
  const [timestamp] = React.useState<string>(issue.timestamp || "");

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Rejected: "bg-red-100 text-red-800"
  };

  const categoryIcons: Record<string, string> = {
    road: "🚧",
    water: "💧",
    electricity: "⚡",
    sanitation: "🧹",
    garbage: "🗑️",
    default: "📌"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative h-64 w-full bg-gray-100">
          {img ? (
            <img
              src={img}
              alt="Issue"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className="flex justify-between items-start">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || statusColors.Pending}`}>
              {status}
            </span>
            {timestamp && (
              <span className="text-xs text-gray-500">
                {new Date(timestamp).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">
              {categoryIcons[category?.toLowerCase() || "default"]}
            </span>
            <h3 className="text-lg font-semibold text-gray-800 capitalize">
              {category || "Uncategorized"}
            </h3>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="text-gray-700">
              {description || "No description provided"}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500">Location</h4>
            <div className="flex items-center text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issue;