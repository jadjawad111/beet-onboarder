import React from "react";
import { ContentSlide } from "@/components/presentation";
import RubricInteractiveQuiz from "@/components/presentation/slides/RubricInteractiveQuiz";
import type { CriterionData } from "@/components/presentation/slides/RubricInteractiveQuiz";

interface GatedRubricQuizSlideProps {
  exerciseNumber: number;
  prompt: string;
  deliverableUrl: string;
  deliverableTitle: string;
  criteria: CriterionData[];
  onGateUnlock?: () => void;
}

const GatedRubricQuizSlide = ({
  exerciseNumber,
  prompt,
  deliverableUrl,
  deliverableTitle,
  criteria,
  onGateUnlock,
}: GatedRubricQuizSlideProps) => {
  return (
    <ContentSlide title="" layout="left">
      <RubricInteractiveQuiz
        exerciseNumber={exerciseNumber}
        prompt={prompt}
        deliverableUrl={deliverableUrl}
        deliverableTitle={deliverableTitle}
        criteria={criteria}
        onComplete={onGateUnlock}
      />
    </ContentSlide>
  );
};

export default GatedRubricQuizSlide;
