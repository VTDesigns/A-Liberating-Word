
import React, { useState } from 'react';
import { FeatherIcon } from './icons';

interface UserInputFormProps {
  onSubmit: (situation: string) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Share what's on your mind... e.g., 'I feel anxious about the future' or 'I need strength today'"
          className="w-full p-4 pr-12 text-base bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 resize-none"
          rows={3}
          disabled={isLoading}
        />
        <FeatherIcon className="absolute top-4 right-4 h-6 w-6 text-gray-300" />
      </div>
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? 'Seeking wisdom...' : 'receive a verse'}
      </button>
    </form>
  );
};

export default UserInputForm;
