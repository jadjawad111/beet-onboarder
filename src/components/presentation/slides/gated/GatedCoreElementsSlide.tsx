import React from "react";
import { ContentSlide } from "@/components/presentation";
import CoreElementsHover from "@/components/presentation/slides/CoreElementsHover";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface GatedCoreElementsSlideProps {
  onGateUnlock?: () => void;
}

const GatedCoreElementsSlide = ({ onGateUnlock }: GatedCoreElementsSlideProps) => {
  return (
    <ContentSlide title='The 6 core elements of a "good" prompt' layout="left">
      <div className="space-y-6">
        <p>
          A "good" prompt in Beet 2.0 has all six of the following attributes:
        </p>
        <CoreElementsHover onAllRevealed={onGateUnlock} />
        <p className="text-muted-foreground">
          Each attribute captures a different aspect of how real professional tasks are communicated and evaluated.
        </p>
        
        {/* Caveat Card */}
        <Card className="border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-600/50">
          <CardContent className="p-5">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Before we continue</p>
                <p className="text-foreground">
                  We will do a <strong>deep dive into each element</strong>. For educational purposes, we'll show excerpts from prompts to showcase these elements individually.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  In practice, prompts exist as a whole — full examples will be shown towards the end of this section.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentSlide>
  );
};

export default GatedCoreElementsSlide;
