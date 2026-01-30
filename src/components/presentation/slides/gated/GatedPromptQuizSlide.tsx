import React from "react";
import { ContentSlide } from "@/components/presentation";
import PromptExerciseQuiz from "@/components/presentation/slides/PromptExerciseQuiz";

type ElementKey = "unambiguous" | "professional" | "realistic" | "timelessness" | "clearAsks" | "clearConstraints";

interface ElementFeedback {
  isIssue: boolean;
  explanation: string;
}

interface GatedPromptQuizSlideProps {
  exerciseNumber: number;
  promptExcerpt: string;
  correctAnswers: ElementKey[];
  feedback: Record<ElementKey, ElementFeedback>;
  onGateUnlock?: () => void;
}

const GatedPromptQuizSlide = ({
  exerciseNumber,
  promptExcerpt,
  correctAnswers,
  feedback,
  onGateUnlock,
}: GatedPromptQuizSlideProps) => {
  return (
    <PromptExerciseQuiz
      key={`prompt-quiz-${exerciseNumber}`}
      exerciseNumber={exerciseNumber}
      promptExcerpt={promptExcerpt}
      correctAnswers={correctAnswers}
      feedback={feedback}
      onSubmit={onGateUnlock}
    />
  );
};

export default GatedPromptQuizSlide;
