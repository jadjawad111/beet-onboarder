import { useState, useMemo, useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Search, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CriterionErrorQuizProps {
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
  onOptionSelected?: () => void;
  onGateUnlock?: () => void;
}

const CriterionErrorQuiz = ({
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
  onOptionSelected,
  onGateUnlock,
}: CriterionErrorQuizProps) => {
  // Randomize order based on element number (seeded for consistency per slide)
  const isSwapped = useMemo(() => {
    // Use element number to create pseudo-random but consistent swap
    return elementNumber % 2 === 0;
  }, [elementNumber]);

  // Map display positions to actual options
  const displayOptions = useMemo(() => {
    if (isSwapped) {
      return {
        first: { label: "A", text: optionB, actualOption: "B" as const },
        second: { label: "B", text: optionA, actualOption: "A" as const },
      };
    }
    return {
      first: { label: "A", text: optionA, actualOption: "A" as const },
      second: { label: "B", text: optionB, actualOption: "B" as const },
    };
  }, [isSwapped, optionA, optionB]);

  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const isRevealed = selected !== null;

  const handleSelect = (actualOption: "A" | "B") => {
    if (selected) return;
    setSelected(actualOption);
  };

  useEffect(() => {
    if (isRevealed) {
      onOptionSelected?.();
      onGateUnlock?.();
    }
  }, [isRevealed, onOptionSelected, onGateUnlock]);

  const getOptionState = (actualOption: "A" | "B") => {
    if (!isRevealed) return "default";
    if (actualOption === correctOption) return "correct";
    return "incorrect";
  };

  return (
    <div className="space-y-6">
      {/* Definition Card */}
      <Card>
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition of Error</p>
              <p className="text-foreground">{definition}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Prompt */}
      <Card>
        <CardContent className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Example Prompt</p>
          <p className="text-foreground leading-relaxed">"{examplePrompt}"</p>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <div className="space-y-4">
        <p className="font-medium text-foreground">
          Which criterion is written correctly?
          {!isRevealed && <span className="text-muted-foreground font-normal ml-2">(select one)</span>}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* First Option (randomized) */}
          <button
            onClick={() => handleSelect(displayOptions.first.actualOption)}
            disabled={isRevealed}
            className={cn(
              "rounded-lg border p-5 text-left transition-all",
              !isRevealed && "hover:border-primary hover:bg-muted/50 cursor-pointer",
              isRevealed && "cursor-default",
              getOptionState(displayOptions.first.actualOption) === "default" && "border-border bg-card",
              getOptionState(displayOptions.first.actualOption) === "correct" && "border-green-500 bg-green-500/5",
              getOptionState(displayOptions.first.actualOption) === "incorrect" && "border-destructive bg-destructive/5"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                getOptionState(displayOptions.first.actualOption) === "default" && "bg-muted text-muted-foreground",
                getOptionState(displayOptions.first.actualOption) === "correct" && "bg-green-500 text-white",
                getOptionState(displayOptions.first.actualOption) === "incorrect" && "bg-destructive text-white"
              )}>
                {getOptionState(displayOptions.first.actualOption) === "correct" && <CheckCircle2 className="w-4 h-4" />}
                {getOptionState(displayOptions.first.actualOption) === "incorrect" && <XCircle className="w-4 h-4" />}
                {getOptionState(displayOptions.first.actualOption) === "default" && displayOptions.first.label}
              </div>
              <span className={cn(
                "text-sm font-medium",
                getOptionState(displayOptions.first.actualOption) === "default" && "text-foreground",
                getOptionState(displayOptions.first.actualOption) === "correct" && "text-green-600",
                getOptionState(displayOptions.first.actualOption) === "incorrect" && "text-destructive"
              )}>
                Option {displayOptions.first.label}{isRevealed && (displayOptions.first.actualOption === correctOption ? " ✓ Correct" : " ✗ Incorrect")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">"{displayOptions.first.text}"</p>
          </button>

          {/* Second Option (randomized) */}
          <button
            onClick={() => handleSelect(displayOptions.second.actualOption)}
            disabled={isRevealed}
            className={cn(
              "rounded-lg border p-5 text-left transition-all",
              !isRevealed && "hover:border-primary hover:bg-muted/50 cursor-pointer",
              isRevealed && "cursor-default",
              getOptionState(displayOptions.second.actualOption) === "default" && "border-border bg-card",
              getOptionState(displayOptions.second.actualOption) === "correct" && "border-green-500 bg-green-500/5",
              getOptionState(displayOptions.second.actualOption) === "incorrect" && "border-destructive bg-destructive/5"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                getOptionState(displayOptions.second.actualOption) === "default" && "bg-muted text-muted-foreground",
                getOptionState(displayOptions.second.actualOption) === "correct" && "bg-green-500 text-white",
                getOptionState(displayOptions.second.actualOption) === "incorrect" && "bg-destructive text-white"
              )}>
                {getOptionState(displayOptions.second.actualOption) === "correct" && <CheckCircle2 className="w-4 h-4" />}
                {getOptionState(displayOptions.second.actualOption) === "incorrect" && <XCircle className="w-4 h-4" />}
                {getOptionState(displayOptions.second.actualOption) === "default" && displayOptions.second.label}
              </div>
              <span className={cn(
                "text-sm font-medium",
                getOptionState(displayOptions.second.actualOption) === "default" && "text-foreground",
                getOptionState(displayOptions.second.actualOption) === "correct" && "text-green-600",
                getOptionState(displayOptions.second.actualOption) === "incorrect" && "text-destructive"
              )}>
                Option {displayOptions.second.label}{isRevealed && (displayOptions.second.actualOption === correctOption ? " ✓ Correct" : " ✗ Incorrect")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">"{displayOptions.second.text}"</p>
          </button>
        </div>
      </div>

      {/* Reveal State */}
      {isRevealed && (
        <div className="space-y-4 animate-in fade-in duration-300 pt-6 border-t border-border">
          {/* Why Bad / Why Good */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-destructive/20">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wide text-destructive font-medium mb-2">
                  Why Option {correctOption === "A" ? "B" : "A"} fails
                </p>
                <p className="text-sm text-muted-foreground">{whyBadExplanation}</p>
              </CardContent>
            </Card>
            <Card className="border-green-500/20">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wide text-green-600 font-medium mb-2">
                  Why Option {correctOption} works
                </p>
                <p className="text-sm text-muted-foreground">{whyGoodExplanation}</p>
              </CardContent>
            </Card>
          </div>

          {/* How to Detect */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">How to Detect</p>
              </div>
              <ul className="space-y-2">
                {detectHeuristics.map((heuristic, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-muted-foreground/60 mt-0.5">•</span>
                    <span>{heuristic}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-1">Quick Test</p>
                <p className="text-sm text-muted-foreground italic">{quickTest}</p>
              </div>
            </CardContent>
          </Card>

          {/* How to Fix */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">How to Fix</p>
              </div>
              <p className="text-sm text-muted-foreground">{howToFix}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CriterionErrorQuiz;
