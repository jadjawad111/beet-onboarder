import { useState, useEffect, useCallback } from "react";

export type RubricSection = 
  | "criterion"
  | "weight"
  | "category"
  | "rationale"
  | "implicit-explicit";

const SECTION_ORDER: RubricSection[] = [
  "criterion",
  "weight",
  "category",
  "rationale",
  "implicit-explicit",
];

const STORAGE_KEY = "rubrics-module-2-completion";

interface CompletionState {
  completedSections: RubricSection[];
}

export const useRubricsModule2Completion = () => {
  const [completedSections, setCompletedSections] = useState<RubricSection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CompletionState = JSON.parse(stored);
        setCompletedSections(parsed.completedSections || []);
      }
    } catch (e) {
      console.error("Failed to load rubrics module 2 completion state:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      try {
        const state: CompletionState = { completedSections };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save rubrics module 2 completion state:", e);
      }
    }
  }, [completedSections, isLoaded]);

  const isSectionCompleted = useCallback(
    (section: RubricSection) => completedSections.includes(section),
    [completedSections]
  );

  const isSectionUnlocked = useCallback(
    (section: RubricSection) => {
      const sectionIndex = SECTION_ORDER.indexOf(section);
      if (sectionIndex === 0) return true; // First section always unlocked
      
      // Check if all previous sections are completed
      for (let i = 0; i < sectionIndex; i++) {
        if (!completedSections.includes(SECTION_ORDER[i])) {
          return false;
        }
      }
      return true;
    },
    [completedSections]
  );

  const completeSection = useCallback((section: RubricSection) => {
    setCompletedSections((prev) => {
      if (prev.includes(section)) return prev;
      return [...prev, section];
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedSections([]);
  }, []);

  const isModuleComplete = completedSections.length === SECTION_ORDER.length;

  const completionPercentage = Math.round(
    (completedSections.length / SECTION_ORDER.length) * 100
  );

  const getNextUnlockedSection = useCallback((): RubricSection | null => {
    for (const section of SECTION_ORDER) {
      if (!completedSections.includes(section)) {
        return section;
      }
    }
    return null;
  }, [completedSections]);

  return {
    completedSections,
    isSectionCompleted,
    isSectionUnlocked,
    completeSection,
    resetProgress,
    isModuleComplete,
    completionPercentage,
    getNextUnlockedSection,
    isLoaded,
    sectionOrder: SECTION_ORDER,
  };
};
