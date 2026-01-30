import React, { useState, useEffect } from "react";
import { ContentSlide } from "@/components/presentation";
import ElementExampleRow from "@/components/presentation/slides/ElementExampleRow";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

interface GatedElementSlideProps {
  elementNumber: number;
  elementName: string;
  definition: string;
  whyItMatters: React.ReactNode;
  examples: Array<{
    context: string;
    bad: string;
    issue: string;
    good: React.ReactNode;
  }>;
  onGateUnlock?: () => void;
}

const GatedElementSlide = ({
  elementNumber,
  elementName,
  definition,
  whyItMatters,
  examples,
  onGateUnlock,
}: GatedElementSlideProps) => {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleExampleRevealed = () => {
    setRevealedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (revealedCount >= examples.length && onGateUnlock) {
      onGateUnlock();
    }
  }, [revealedCount, examples.length, onGateUnlock]);

  return (
    <ContentSlide title={`Element #${elementNumber} — ${elementName}`} layout="left">
      <div className="space-y-6">
        {/* Definition Card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                <p className="text-foreground">{definition}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why It Matters Card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                {whyItMatters}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples Section */}
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
            Examples {revealedCount < examples.length && (
              <span className="text-primary ml-2">
                (Hover all {examples.length} to continue — {revealedCount}/{examples.length})
              </span>
            )}
          </p>
          <div className="space-y-4">
            {examples.map((example, idx) => (
              <ElementExampleRow
                key={idx}
                context={example.context}
                bad={example.bad}
                issue={example.issue}
                good={example.good}
                onRevealed={handleExampleRevealed}
              />
            ))}
          </div>
        </div>
      </div>
    </ContentSlide>
  );
};

export default GatedElementSlide;
