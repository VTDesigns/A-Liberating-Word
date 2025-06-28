
import React from 'react';
import { AlertTriangleIcon } from './icons';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="w-full text-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangleIcon className="mx-auto h-10 w-10 text-red-500" />
        <p className="mt-4 text-red-700 font-medium">
            {message}
        </p>
    </div>
  );
};

export default ErrorDisplay;
