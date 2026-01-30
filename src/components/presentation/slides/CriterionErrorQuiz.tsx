import { useState } from "react";
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
}: CriterionErrorQuizProps) => {
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const isRevealed = selected !== null;

  const handleSelect = (option: "A" | "B") => {
    if (selected) return;
    setSelected(option);
  };

  const getOptionState = (option: "A" | "B") => {
    if (!isRevealed) return "default";
    if (option === correctOption) return "correct";
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
          {!isRevealed && <span className="text-muted-foreground font-normal ml-2">— select one</span>}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Option A */}
          <button
            onClick={() => handleSelect("A")}
            disabled={isRevealed}
            className={cn(
              "rounded-lg border p-5 text-left transition-all",
              !isRevealed && "hover:border-primary hover:bg-muted/50 cursor-pointer",
              isRevealed && "cursor-default",
              getOptionState("A") === "default" && "border-border bg-card",
              getOptionState("A") === "correct" && "border-green-500 bg-green-500/5",
              getOptionState("A") === "incorrect" && "border-destructive bg-destructive/5"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                getOptionState("A") === "default" && "bg-muted text-muted-foreground",
                getOptionState("A") === "correct" && "bg-green-500 text-white",
                getOptionState("A") === "incorrect" && "bg-destructive text-white"
              )}>
                {getOptionState("A") === "correct" && <CheckCircle2 className="w-4 h-4" />}
                {getOptionState("A") === "incorrect" && <XCircle className="w-4 h-4" />}
                {getOptionState("A") === "default" && "A"}
              </div>
              <span className={cn(
                "text-sm font-medium",
                getOptionState("A") === "default" && "text-foreground",
                getOptionState("A") === "correct" && "text-green-600",
                getOptionState("A") === "incorrect" && "text-destructive"
              )}>
                Option A{isRevealed && (correctOption === "A" ? " — Correct" : " — Incorrect")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">"{optionA}"</p>
          </button>

          {/* Option B */}
          <button
            onClick={() => handleSelect("B")}
            disabled={isRevealed}
            className={cn(
              "rounded-lg border p-5 text-left transition-all",
              !isRevealed && "hover:border-primary hover:bg-muted/50 cursor-pointer",
              isRevealed && "cursor-default",
              getOptionState("B") === "default" && "border-border bg-card",
              getOptionState("B") === "correct" && "border-green-500 bg-green-500/5",
              getOptionState("B") === "incorrect" && "border-destructive bg-destructive/5"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                getOptionState("B") === "default" && "bg-muted text-muted-foreground",
                getOptionState("B") === "correct" && "bg-green-500 text-white",
                getOptionState("B") === "incorrect" && "bg-destructive text-white"
              )}>
                {getOptionState("B") === "correct" && <CheckCircle2 className="w-4 h-4" />}
                {getOptionState("B") === "incorrect" && <XCircle className="w-4 h-4" />}
                {getOptionState("B") === "default" && "B"}
              </div>
              <span className={cn(
                "text-sm font-medium",
                getOptionState("B") === "default" && "text-foreground",
                getOptionState("B") === "correct" && "text-green-600",
                getOptionState("B") === "incorrect" && "text-destructive"
              )}>
                Option B{isRevealed && (correctOption === "B" ? " — Correct" : " — Incorrect")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">"{optionB}"</p>
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
