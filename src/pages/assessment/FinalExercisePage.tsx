import React from "react";
import { PresentationLayout, ContentSlide } from "@/components/presentation";
import type { Slide } from "@/components/presentation/PresentationLayout";
import RubricInteractiveQuiz from "@/components/presentation/slides/RubricInteractiveQuiz";
import type { CriterionData } from "@/components/presentation/slides/RubricInteractiveQuiz";

// Placeholder data for Exercise 1 - will be replaced with real content
const exercise1Prompt = `[Exercise 1 Prompt Placeholder]

This will be replaced with the actual assessment prompt.`;

const exercise1DeliverableUrl = "#";
const exercise1DeliverableTitle = "Exercise 1 Deliverable";

const exercise1Criteria: CriterionData[] = [
  {
    id: 1,
    text: "[Placeholder criterion 1]",
    weight: 100,
    category: "Instruction Following",
    hasError: false,
  },
  {
    id: 2,
    text: "[Placeholder criterion 2 - with error]",
    weight: 80,
    category: "Formatting",
    hasError: true,
    errorType: "ambiguous",
    explanation: "Placeholder explanation for the error.",
    howToFix: "Placeholder fix suggestion.",
  },
];

// Placeholder data for Exercise 2 - will be replaced with real content
const exercise2Prompt = `[Exercise 2 Prompt Placeholder]

This will be replaced with the actual assessment prompt.`;

const exercise2DeliverableUrl = "#";
const exercise2DeliverableTitle = "Exercise 2 Deliverable";

const exercise2Criteria: CriterionData[] = [
  {
    id: 1,
    text: "[Placeholder criterion 1]",
    weight: 100,
    category: "Instruction Following",
    hasError: false,
  },
  {
    id: 2,
    text: "[Placeholder criterion 2 - with error]",
    weight: 80,
    category: "Reasoning",
    hasError: true,
    errorType: "stacked",
    explanation: "Placeholder explanation for the stacked error.",
    howToFix: "Placeholder fix suggestion.",
  },
];

// Define all slides - just the two exercises
const assessmentSlides: Slide[] = [
  {
    id: "exercise-1",
    section: "Ex #1",
    title: "Ex #1",
    content: (
      <ContentSlide title="" layout="left">
        <RubricInteractiveQuiz
          exerciseNumber={1}
          prompt={exercise1Prompt}
          deliverableUrl={exercise1DeliverableUrl}
          deliverableTitle={exercise1DeliverableTitle}
          criteria={exercise1Criteria}
        />
      </ContentSlide>
    ),
    gated: false,
  },
  {
    id: "exercise-2",
    section: "Ex #2",
    title: "Ex #2",
    content: (
      <ContentSlide title="" layout="left">
        <RubricInteractiveQuiz
          exerciseNumber={2}
          prompt={exercise2Prompt}
          deliverableUrl={exercise2DeliverableUrl}
          deliverableTitle={exercise2DeliverableTitle}
          criteria={exercise2Criteria}
        />
      </ContentSlide>
    ),
    gated: false,
  },
];

const FinalExercisePage = () => {
  return (
    <PresentationLayout
      slides={assessmentSlides}
      title="Final Assessment Exercise"
      presenter="Project Beet Assessment"
      exitPath="/assessment/final-exercise" // Points to itself - fully isolated
    />
  );
};

export default FinalExercisePage;
