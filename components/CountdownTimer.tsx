import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialMinutes?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialMinutes = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-600 to-sky-500 text-white p-3 z-[150] animate-slide-in-up text-center shadow-2xl">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p className="font-semibold text-sm sm:text-base">
          <span className="text-xl animate-pulse mr-2">⏳</span> Oferta especial disponível por tempo limitado!
        </p>
        <div className="bg-white/20 rounded-full px-4 py-1">
          <span className="font-bold text-lg tracking-wider">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
