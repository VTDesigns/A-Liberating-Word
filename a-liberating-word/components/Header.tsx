import React from 'react';
import { BookOpenIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <BookOpenIcon className="h-10 w-10 text-blue-500" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          A Liberating Word
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Find a comforting word for this moment in your journey.
      </p>
    </header>
  );
};

export default Header;