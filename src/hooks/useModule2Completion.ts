import { useState, useEffect } from "react";

const PROMPTS_READ_KEY = "beet-prompts-read";
const ATTRIBUTES_VIEWED_KEY = "beet-attributes-viewed";
const FAILURES_VIEWED_KEY = "beet-failures-viewed";

export interface Module2CompletionStatus {
  promptsRead: number;
  attributesViewed: number;
  failuresViewed: number;
  isComplete: boolean;
  promptsGoalMet: boolean;
  attributesGoalMet: boolean;
  failuresGoalMet: boolean;
}

export const checkModule2Completion = (): Module2CompletionStatus => {
  let promptsRead = 0;
  let attributesViewed = 0;
  let failuresViewed = 0;

  try {
    const prompts = localStorage.getItem(PROMPTS_READ_KEY);
    if (prompts) {
      promptsRead = JSON.parse(prompts).length;
    }
  } catch (e) {
    console.error("Failed to parse prompts read", e);
  }

  try {
    const attrs = localStorage.getItem(ATTRIBUTES_VIEWED_KEY);
    if (attrs) {
      attributesViewed = JSON.parse(attrs).length;
    }
  } catch (e) {
    console.error("Failed to parse attributes viewed", e);
  }

  try {
    const failures = localStorage.getItem(FAILURES_VIEWED_KEY);
    if (failures) {
      failuresViewed = JSON.parse(failures).length;
    }
  } catch (e) {
    console.error("Failed to parse failures viewed", e);
  }

  const promptsGoalMet = promptsRead >= 10;
  const attributesGoalMet = attributesViewed >= 6;
  const failuresGoalMet = failuresViewed >= 3;
  const isComplete = promptsGoalMet && attributesGoalMet && failuresGoalMet;

  return {
    promptsRead,
    attributesViewed,
    failuresViewed,
    isComplete,
    promptsGoalMet,
    attributesGoalMet,
    failuresGoalMet,
  };
};

export const useModule2Completion = (): Module2CompletionStatus => {
  const [status, setStatus] = useState<Module2CompletionStatus>(checkModule2Completion);

  useEffect(() => {
    const updateStatus = () => {
      setStatus(checkModule2Completion());
    };

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith("beet-")) {
        updateStatus();
      }
    };

    // Listen for custom events
    const handleCustomEvent = () => updateStatus();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("prompts-read-updated", handleCustomEvent);
    window.addEventListener("module2-progress-updated", handleCustomEvent);

    // Poll for changes
    const interval = setInterval(updateStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("prompts-read-updated", handleCustomEvent);
      window.removeEventListener("module2-progress-updated", handleCustomEvent);
      clearInterval(interval);
    };
  }, []);

  return status;
};
