import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "otpCountdownEnd";

export function useCountdown(initialSeconds = 30) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedEnd = localStorage.getItem(STORAGE_KEY);
    if (storedEnd) {
      const endTime = parseInt(storedEnd, 10);
      const now = Date.now();
      const remaining = Math.floor((endTime - now) / 1000);
      if (remaining > 0) {
        setSecondsLeft(remaining);
        setIsRunning(true);
      }
    }
  }, []);

  const start = useCallback(() => {
    if (typeof window === "undefined") return;

    const endTime = Date.now() + initialSeconds * 1000;
    localStorage.setItem(STORAGE_KEY, endTime.toString());
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      const remaining = Math.floor((endTime - now) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(STORAGE_KEY);
        setSecondsLeft(0);
        setIsRunning(false);
      } else {
        setSecondsLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    secondsLeft,
    isRunning,
    start,
  };
}
