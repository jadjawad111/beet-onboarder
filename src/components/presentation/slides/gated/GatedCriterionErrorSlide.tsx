import React from "react";
import { ContentSlide } from "@/components/presentation";
import CriterionErrorQuiz from "@/components/presentation/slides/CriterionErrorQuiz";

interface GatedCriterionErrorSlideProps {
  elementNumber: number;
  elementName: string;
  definition: string;
  examplePrompt: string;
  optionA: string;
  optionB: string;
  correctOption: "A" | "B";
  whyBadExplanation: string;
  whyGoodExplanation: string;
  detectHeuristics: string[];
  quickTest: string;
  howToFix: string;
  onGateUnlock?: () => void;
}

const GatedCriterionErrorSlide = ({
  elementNumber,
  elementName,
  definition,
  examplePrompt,
  optionA,
  optionB,
  correctOption,
  whyBadExplanation,
  whyGoodExplanation,
  detectHeuristics,
  quickTest,
  howToFix,
  onGateUnlock,
}: GatedCriterionErrorSlideProps) => {
  return (
    <ContentSlide title={`Element #${elementNumber} — ${elementName}`} layout="left">
      <CriterionErrorQuiz
        elementNumber={elementNumber}
        elementName={elementName}
        definition={definition}
        examplePrompt={examplePrompt}
        optionA={optionA}
        optionB={optionB}
        correctOption={correctOption}
        whyBadExplanation={whyBadExplanation}
        whyGoodExplanation={whyGoodExplanation}
        detectHeuristics={detectHeuristics}
        quickTest={quickTest}
        howToFix={howToFix}
        onOptionSelected={onGateUnlock}
      />
    </ContentSlide>
  );
};

export default GatedCriterionErrorSlide;
