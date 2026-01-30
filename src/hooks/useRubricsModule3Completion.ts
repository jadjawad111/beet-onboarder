import { useState, useEffect, useCallback } from "react";

const ERRORS_READ_KEY = "rubrics-module-3-errors-read";
const MODULE_COMPLETE_KEY = "rubrics-module-3-complete";

// 5 general errors + 5 specific errors
const GENERAL_ERROR_IDS = ["ambiguous", "not-self-contained", "stacked", "convoluted", "process-words"];
const SPECIFIC_ERROR_IDS = ["missing-criteria", "criteria-inaccurate", "restrictive", "inaccurate-weighting", "incorrect-implicit-explicit"];
const ERROR_IDS = [...GENERAL_ERROR_IDS, ...SPECIFIC_ERROR_IDS];

export const useRubricsModule3Completion = () => {
  const [errorsRead, setErrorsRead] = useState<string[]>([]);
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const errors = localStorage.getItem(ERRORS_READ_KEY);
      if (errors) setErrorsRead(JSON.parse(errors));

      const complete = localStorage.getItem(MODULE_COMPLETE_KEY) === "true";
      setIsModuleComplete(complete);
    } catch (e) {
      console.error("Failed to load module 3 state:", e);
    }
    setIsLoaded(true);
  }, []);

  // Toggle error read status
  const toggleErrorRead = useCallback((errorId: string) => {
    setErrorsRead(prev => {
      const isRead = prev.includes(errorId);
      const updated = isRead 
        ? prev.filter(e => e !== errorId) 
        : [...prev, errorId];
      localStorage.setItem(ERRORS_READ_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if an error is read
  const isErrorRead = useCallback((errorId: string) => {
    return errorsRead.includes(errorId);
  }, [errorsRead]);

  // Calculate progress
  const allGeneralErrorsRead = GENERAL_ERROR_IDS.every(id => errorsRead.includes(id));
  const allSpecificErrorsRead = SPECIFIC_ERROR_IDS.every(id => errorsRead.includes(id));
  const allErrorsRead = ERROR_IDS.every(id => errorsRead.includes(id));
  const generalErrorsReadCount = errorsRead.filter(id => GENERAL_ERROR_IDS.includes(id)).length;
  const specificErrorsReadCount = errorsRead.filter(id => SPECIFIC_ERROR_IDS.includes(id)).length;
  const errorsProgress = (errorsRead.length / ERROR_IDS.length) * 100;

  // Mark module as complete
  const completeModule = useCallback(() => {
    setIsModuleComplete(true);
    localStorage.setItem(MODULE_COMPLETE_KEY, "true");
  }, []);

  // Reset progress
  const resetProgress = useCallback(() => {
    setErrorsRead([]);
    setIsModuleComplete(false);
    localStorage.removeItem(ERRORS_READ_KEY);
    localStorage.removeItem(MODULE_COMPLETE_KEY);
  }, []);

  return {
    errorsRead,
    isModuleComplete,
    isLoaded,
    toggleErrorRead,
    isErrorRead,
    allErrorsRead,
    allGeneralErrorsRead,
    allSpecificErrorsRead,
    generalErrorsReadCount,
    specificErrorsReadCount,
    errorsProgress,
    completeModule,
    resetProgress,
    errorIds: ERROR_IDS,
    generalErrorIds: GENERAL_ERROR_IDS,
    specificErrorIds: SPECIFIC_ERROR_IDS,
  };
};
