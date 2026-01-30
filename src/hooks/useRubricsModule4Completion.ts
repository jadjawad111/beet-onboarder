import { useState, useEffect, useCallback } from "react";

const CHECKLIST_ITEMS_KEY = "rubrics-module-4-checklist";
const MODULE_COMPLETE_KEY = "rubrics-module-4-complete";

// 8 checklist sections (A-H)
const CHECKLIST_SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Items per section
const CHECKLIST_ITEMS: Record<string, string[]> = {
  A: ["a1", "a2", "a3", "a4", "a5", "a6"],
  B: ["b1", "b2", "b3"],
  C: ["c1", "c2", "c3"],
  D: ["d1", "d2"],
  E: ["e1", "e2", "e3"],
  F: ["f1", "f2"],
  G: ["g1", "g2", "g3", "g4"],
  H: ["h1", "h2"],
};

export const useRubricsModule4Completion = () => {
  const [checklistChecked, setChecklistChecked] = useState<string[]>([]);
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const checklist = localStorage.getItem(CHECKLIST_ITEMS_KEY);
      if (checklist) setChecklistChecked(JSON.parse(checklist));

      const complete = localStorage.getItem(MODULE_COMPLETE_KEY) === "true";
      setIsModuleComplete(complete);
    } catch (e) {
      console.error("Failed to load module 4 state:", e);
    }
    setIsLoaded(true);
  }, []);

  // Toggle checklist item
  const toggleChecklistItem = useCallback((itemId: string) => {
    setChecklistChecked(prev => {
      const isChecked = prev.includes(itemId);
      const updated = isChecked 
        ? prev.filter(i => i !== itemId) 
        : [...prev, itemId];
      localStorage.setItem(CHECKLIST_ITEMS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check all items in a section
  const checkAllInSection = useCallback((itemIds: string[]) => {
    setChecklistChecked(prev => {
      const updated = [...new Set([...prev, ...itemIds])];
      localStorage.setItem(CHECKLIST_ITEMS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Reset a section (uncheck all items in that section)
  const resetSection = useCallback((itemIds: string[]) => {
    setChecklistChecked(prev => {
      const updated = prev.filter(id => !itemIds.includes(id));
      localStorage.setItem(CHECKLIST_ITEMS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if a checklist section is complete
  const isSectionComplete = useCallback((section: string) => {
    const items = CHECKLIST_ITEMS[section] || [];
    return items.every(item => checklistChecked.includes(item));
  }, [checklistChecked]);

  // Calculate progress
  const allChecklistComplete = CHECKLIST_SECTIONS.every(s => isSectionComplete(s));
  const checklistProgress = (checklistChecked.length / Object.values(CHECKLIST_ITEMS).flat().length) * 100;

  // Mark module as complete
  const completeModule = useCallback(() => {
    setIsModuleComplete(true);
    localStorage.setItem(MODULE_COMPLETE_KEY, "true");
  }, []);

  // Reset progress
  const resetProgress = useCallback(() => {
    setChecklistChecked([]);
    setIsModuleComplete(false);
    localStorage.removeItem(CHECKLIST_ITEMS_KEY);
    localStorage.removeItem(MODULE_COMPLETE_KEY);
  }, []);

  return {
    checklistChecked,
    isModuleComplete,
    isLoaded,
    toggleChecklistItem,
    checkAllInSection,
    resetSection,
    isSectionComplete,
    allChecklistComplete,
    checklistProgress,
    completeModule,
    resetProgress,
    checklistSections: CHECKLIST_SECTIONS,
    checklistItems: CHECKLIST_ITEMS,
  };
};
