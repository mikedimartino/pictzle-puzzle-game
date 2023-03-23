import { useEffect, useState } from 'react';

const useTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setElapsedSeconds((value) => value + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [elapsedSeconds, isActive]);

  return {
    startTimer,
    stopTimer,
    elapsedSeconds,
  };
};

export default useTimer;
