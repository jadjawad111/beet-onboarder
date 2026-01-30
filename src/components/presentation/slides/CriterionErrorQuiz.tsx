import { useState } from "react";
import { CheckCircle2, XCircle, Target, Lightbulb, AlertTriangle, Search, Wrench } from "lucide-react";
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
      <div className="p-4 rounded-lg border bg-muted/30">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Example Prompt</p>
        <p className="text-sm text-foreground italic">"{examplePrompt}"</p>
      </div>

      {/* Quiz Section */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Which criterion is written correctly?
          {!isRevealed && <span className="text-muted-foreground font-normal ml-2">(Click one to reveal)</span>}
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {/* Option A */}
          <button
            onClick={() => handleSelect("A")}
            disabled={isRevealed}
            className={cn(
              "rounded-xl border-2 p-4 text-left transition-all duration-300",
              !isRevealed && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
              isRevealed && "cursor-default",
              getOptionState("A") === "default" && "border-border bg-card",
              getOptionState("A") === "correct" && "border-green-500/50 bg-green-50/50 dark:bg-green-950/30",
              getOptionState("A") === "incorrect" && "border-destructive/50 bg-destructive/10"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {getOptionState("A") === "correct" && <CheckCircle2 className="w-4 h-4 text-green-600" />}
              {getOptionState("A") === "incorrect" && <XCircle className="w-4 h-4 text-destructive" />}
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider",
                getOptionState("A") === "default" && "text-muted-foreground",
                getOptionState("A") === "correct" && "text-green-600",
                getOptionState("A") === "incorrect" && "text-destructive"
              )}>
                Option A {correctOption !== "A" && isRevealed ? "(Bad)" : correctOption === "A" && isRevealed ? "(Good)" : ""}
              </span>
            </div>
            <p className="text-sm text-foreground">"{optionA}"</p>
          </button>

          {/* Option B */}
          <button
            onClick={() => handleSelect("B")}
            disabled={isRevealed}
            className={cn(
              "rounded-xl border-2 p-4 text-left transition-all duration-300",
              !isRevealed && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
              isRevealed && "cursor-default",
              getOptionState("B") === "default" && "border-border bg-card",
              getOptionState("B") === "correct" && "border-green-500/50 bg-green-50/50 dark:bg-green-950/30",
              getOptionState("B") === "incorrect" && "border-destructive/50 bg-destructive/10"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {getOptionState("B") === "correct" && <CheckCircle2 className="w-4 h-4 text-green-600" />}
              {getOptionState("B") === "incorrect" && <XCircle className="w-4 h-4 text-destructive" />}
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider",
                getOptionState("B") === "default" && "text-muted-foreground",
                getOptionState("B") === "correct" && "text-green-600",
                getOptionState("B") === "incorrect" && "text-destructive"
              )}>
                Option B {correctOption !== "B" && isRevealed ? "(Bad)" : correctOption === "B" && isRevealed ? "(Good)" : ""}
              </span>
            </div>
            <p className="text-sm text-foreground">"{optionB}"</p>
          </button>
        </div>
      </div>

      {/* Reveal State */}
      {isRevealed && (
        <div className="space-y-4 animate-in fade-in duration-300 pt-4 border-t border-border">
          {/* Correct Answer Banner */}
          <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-950/30 border border-green-500/30">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              ✓ Correct Answer: Option {correctOption}
            </p>
          </div>

          {/* Why Bad / Why Good */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wide text-destructive font-semibold mb-2">
                  Why Option {correctOption === "A" ? "B" : "A"} is bad
                </p>
                <p className="text-sm text-foreground">{whyBadExplanation}</p>
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-green-50/30 dark:bg-green-950/20">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wide text-green-700 dark:text-green-400 font-semibold mb-2">
                  Why Option {correctOption} is good
                </p>
                <p className="text-sm text-foreground">{whyGoodExplanation}</p>
              </CardContent>
            </Card>
          </div>

          {/* How to Detect */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">How to Detect</p>
              </div>
              <ul className="space-y-2">
                {detectHeuristics.map((heuristic, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{heuristic}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Quick Test</p>
                <p className="text-sm text-foreground italic">{quickTest}</p>
              </div>
            </CardContent>
          </Card>

          {/* How to Fix */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">How to Fix</p>
              </div>
              <p className="text-sm text-foreground">{howToFix}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CriterionErrorQuiz;
