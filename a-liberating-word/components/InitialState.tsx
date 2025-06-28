
import React from 'react';
import { SparklesIcon } from './icons';

const InitialState: React.FC = () => {
  return (
    <div className="text-center p-8 bg-white/50 rounded-lg border border-dashed border-gray-300">
        <SparklesIcon className="mx-auto h-12 w-12 text-yellow-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-800">Ready for a word of hope?</h3>
        <p className="mt-1 text-sm text-gray-500">Share how you're feeling above, and let us find a verse for you.</p>
    </div>
  );
};

export default InitialState;
