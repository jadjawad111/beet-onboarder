import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "rubrics-module-1-complete";

export const useRubricsModule1Completion = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setIsComplete(true);
      }
    } catch (e) {
      console.error("Failed to load rubrics module 1 completion state:", e);
    }
    setIsLoaded(true);
  }, []);

  const markComplete = useCallback(() => {
    setIsComplete(true);
    localStorage.setItem(STORAGE_KEY, "true");
  }, []);

  const reset = useCallback(() => {
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    isComplete,
    isLoaded,
    markComplete,
    reset,
  };
};

export default useRubricsModule1Completion;