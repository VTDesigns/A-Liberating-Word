
import React, { useState, useCallback } from 'react';
import { Scripture } from './types';
import { getScriptureForSituation } from './services/geminiService';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import ScriptureDisplay from './components/ScriptureDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import InitialState from './components/InitialState';
import ErrorDisplay from './components/ErrorDisplay';

// A glorious sound to play on submission
const playGloriousSound = () => {
    if (typeof window === 'undefined' || !(window.AudioContext || (window as any).webkitAudioContext)) {
        return;
    }
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now + startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, now + startTime + 0.01); // Quick fade in
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + startTime + duration); // Fade out

        oscillator.start(now + startTime);
        oscillator.stop(now + startTime + duration);
    };

    // A short, uplifting arpeggio (C major 7th)
    playNote(523.25, 0.0, 0.12);    // C5
    playNote(659.25, 0.1, 0.12);    // E5
    playNote(783.99, 0.2, 0.12);    // G5
    playNote(987.77, 0.3, 0.15);    // B5
};


const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (situation: string) => {
    if (!situation.trim()) {
      setError('Please share what is on your mind.');
      return;
    }
    
    playGloriousSound();

    setIsLoading(true);
    setError(null);
    setScripture(null);

    try {
      const result = await getScriptureForSituation(situation);
      setScripture(result);
    } catch (err) {
      console.error(err);
      setError('I am sorry, but I was unable to find a verse for you at this moment. Please try rephrasing your thoughts or try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen">
        <Header />
        
        <div className="w-full max-w-2xl mt-8">
          <UserInputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <div className="w-full max-w-2xl mt-8 min-h-[250px] flex items-center justify-center">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {!isLoading && !error && scripture && <ScriptureDisplay scripture={scripture} />}
          {!isLoading && !error && !scripture && <InitialState />}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>A Liberating Word &copy; {new Date().getFullYear()}. May you find peace and comfort.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
