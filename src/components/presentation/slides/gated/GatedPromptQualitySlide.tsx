import React from "react";
import { ContentSlide } from "@/components/presentation";
import PromptQualityChecklist from "@/components/presentation/slides/PromptQualityChecklist";

interface GatedPromptQualitySlideProps {
  onGateUnlock?: () => void;
}

const GatedPromptQualitySlide = ({ onGateUnlock }: GatedPromptQualitySlideProps) => {
  return (
    <ContentSlide title='What is a "good" prompt really?' layout="left">
      <div className="space-y-4">
        <p className="mb-6">A good prompt is one that is:</p>
        <PromptQualityChecklist onAllChecked={onGateUnlock} />
      </div>
    </ContentSlide>
  );
};

export default GatedPromptQualitySlide;
