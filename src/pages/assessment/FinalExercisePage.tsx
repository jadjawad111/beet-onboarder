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

// Title slide component
const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
      Project Beet 2.0 Final Exercise
    </h1>
    <p className="text-xl text-muted-foreground max-w-2xl">
      Complete the following exercises to demonstrate your understanding of rubric quality evaluation.
    </p>
  </div>
);

// Instructions slide
const InstructionsSlide = () => (
  <div className="text-left max-w-3xl mx-auto space-y-6">
    <h2 className="text-3xl font-bold text-foreground mb-8">Instructions</h2>
    
    <div className="space-y-4">
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Exercise Format</h3>
        <p className="text-muted-foreground">
          Each exercise presents a prompt, deliverable, and rubric criteria. Your task is to identify which criteria contain errors.
        </p>
      </div>
      
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">How to Complete</h3>
        <ul className="text-muted-foreground space-y-2 list-disc list-inside">
          <li>Review the prompt and deliverable carefully</li>
          <li>For each criterion, determine if it has an error</li>
          <li>If there's an error, select the error type</li>
          <li>Submit your answers when ready</li>
        </ul>
      </div>
      
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Note</h3>
        <p className="text-muted-foreground">
          Take your time. This is an assessment of your rubric evaluation skills.
        </p>
      </div>
    </div>
  </div>
);

// Define all slides
const assessmentSlides: Slide[] = [
  {
    id: "title",
    section: "Introduction",
    title: "Welcome",
    content: <TitleSlide />,
    gated: false,
  },
  {
    id: "instructions",
    section: "Introduction",
    title: "Instructions",
    content: <InstructionsSlide />,
    gated: false,
  },
  {
    id: "exercise-1",
    section: "Exercise 1",
    title: "Exercise 1",
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
    section: "Exercise 2",
    title: "Exercise 2",
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
      title="Final Exercise"
      presenter="Project Beet Assessment"
      exitPath="/assessment/final-exercise" // Points to itself - fully isolated
    />
  );
};

export default FinalExercisePage;
