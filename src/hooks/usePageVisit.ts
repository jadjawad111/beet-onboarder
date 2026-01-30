import { useEffect } from "react";

/**
 * Hook to track page visits in localStorage
 * @param key - The storage key to use (e.g., "onboarding-welcome-visited")
 */
export const usePageVisit = (key: string) => {
  useEffect(() => {
    localStorage.setItem(key, "true");
  }, [key]);
};

export default usePageVisit;
