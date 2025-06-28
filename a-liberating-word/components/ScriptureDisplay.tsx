
import React from 'react';
import { Scripture } from '../types';

interface ScriptureDisplayProps {
  scripture: Scripture;
}

const ScriptureDisplay: React.FC<ScriptureDisplayProps> = ({ scripture }) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 animate-fade-in">
      <blockquote className="text-center">
        <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed">
          “{scripture.verse}”
        </p>
      </blockquote>
      <cite className="block text-right mt-4 font-semibold text-blue-700 text-lg">
        — {scripture.reference}
      </cite>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-center text-gray-600">
            {scripture.explanation}
        </p>
      </div>
    </div>
  );
};

// Add keyframes to a style tag in the component since we can't use external CSS files.
const styles = `
@keyframes fade-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}
`;

const StyleInjector: React.FC = () => {
    return React.createElement('style', null, styles);
}


const ScriptureDisplayWrapper: React.FC<ScriptureDisplayProps> = (props) => {
    return (
        <>
            <StyleInjector />
            <ScriptureDisplay {...props} />
        </>
    )
}

export default ScriptureDisplayWrapper;
