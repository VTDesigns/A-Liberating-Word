
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-blue-600"></div>
      <p className="text-gray-600">Searching for the right words...</p>
    </div>
  );
};

export default LoadingSpinner;
