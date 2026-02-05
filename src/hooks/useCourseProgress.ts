 import { useState, useEffect, useCallback } from "react";
 
 // Define sections for each part
 export const PART1_SECTIONS = [
   "choose-task",
   "review-job", 
   "select-workflow",
   "draft-prompt",
   "example",
   "input-files",
   "quality-gate"
 ];
 
 export const PART3_SECTIONS = [
   "introduction",
   "understanding-rubrics",
   "rubric-items",
   "criteria-rules",
   "weighting",
   "categories",
   "specificity",
   "formatting",
   "videos",
   "common-issues",
   "all-components-complete",
   "complete"
 ];
 
 const STORAGE_KEY = "beet-course-progress";
 
 interface CourseProgress {
   part1Sections: string[];
   part2Complete: boolean;
   part3Sections: string[];
 }
 
 const getInitialProgress = (): CourseProgress => {
   try {
     const stored = localStorage.getItem(STORAGE_KEY);
     if (stored) {
       return JSON.parse(stored);
     }
   } catch (e) {
     console.error("Failed to parse course progress", e);
   }
   return {
     part1Sections: [],
     part2Complete: false,
     part3Sections: [],
   };
 };
 
 export const useCourseProgress = () => {
   const [progress, setProgress] = useState<CourseProgress>(getInitialProgress);
 
   // Persist to localStorage
   useEffect(() => {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
   }, [progress]);
 
   // Mark a Part 1 section as viewed
   const markPart1Section = useCallback((sectionId: string) => {
     setProgress(prev => {
       if (prev.part1Sections.includes(sectionId)) return prev;
       return {
         ...prev,
         part1Sections: [...prev.part1Sections, sectionId],
       };
     });
   }, []);
 
   // Mark Part 2 as complete
   const markPart2Complete = useCallback(() => {
     setProgress(prev => ({
       ...prev,
       part2Complete: true,
     }));
   }, []);
 
   // Mark a Part 3 section as viewed
   const markPart3Section = useCallback((sectionId: string) => {
     setProgress(prev => {
       if (prev.part3Sections.includes(sectionId)) return prev;
       return {
         ...prev,
         part3Sections: [...prev.part3Sections, sectionId],
       };
     });
   }, []);
 
   // Check if Part 1 is complete
   const isPart1Complete = PART1_SECTIONS.every(s => progress.part1Sections.includes(s));
 
   // Check if Part 2 is unlocked (Part 1 must be complete)
   const isPart2Unlocked = isPart1Complete;
 
   // Check if Part 2 is complete
   const isPart2Complete = progress.part2Complete;
 
   // Check if Part 3 is unlocked (Parts 1 and 2 must be complete)
   const isPart3Unlocked = isPart1Complete && isPart2Complete;
 
   // Check if Part 3 is complete
   const isPart3Complete = PART3_SECTIONS.every(s => progress.part3Sections.includes(s));
 
   // Check if Interactive Examples is unlocked (all parts must be complete)
   const isInteractiveExamplesUnlocked = isPart1Complete && isPart2Complete && isPart3Complete;
 
   // Progress percentages
   const part1Progress = Math.round((progress.part1Sections.length / PART1_SECTIONS.length) * 100);
   const part3Progress = Math.round((progress.part3Sections.length / PART3_SECTIONS.length) * 100);
 
   // Reset progress (for testing)
   const resetProgress = useCallback(() => {
     setProgress({
       part1Sections: [],
       part2Complete: false,
       part3Sections: [],
     });
   }, []);
 
   return {
     progress,
     markPart1Section,
     markPart2Complete,
     markPart3Section,
     isPart1Complete,
     isPart2Unlocked,
     isPart2Complete,
     isPart3Unlocked,
     isPart3Complete,
     isInteractiveExamplesUnlocked,
     part1Progress,
     part3Progress,
     resetProgress,
   };
 };