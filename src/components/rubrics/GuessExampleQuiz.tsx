import { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuessExampleQuizProps {
  goodExample: string;
  badExample: string;
  badExplanation: string;
  /** If true, good example is shown first (as Example 1) */
  goodFirst?: boolean;
  /** Called when user selects an answer */
  onAnswer?: () => void;
  /** If true, shows the quiz as already answered (revealed state) */
  isAlreadyAnswered?: boolean;
}

const GuessExampleQuiz = ({ 
  goodExample, 
  badExample, 
  badExplanation,
  goodFirst = false,
  onAnswer,
  isAlreadyAnswered = false
}: GuessExampleQuizProps) => {
  const [selected, setSelected] = useState<"example1" | "example2" | null>(null);

  // If already answered on mount, set to revealed state
  useEffect(() => {
    if (isAlreadyAnswered && !selected) {
      // Set to the correct answer to show revealed state
      const correctAnswer = goodFirst ? "example1" : "example2";
      setSelected(correctAnswer);
    }
  }, [isAlreadyAnswered, goodFirst, selected]);

  // Determine which example is which based on goodFirst prop
  const example1 = goodFirst ? { text: goodExample, isGood: true } : { text: badExample, isGood: false };
  const example2 = goodFirst ? { text: badExample, isGood: false } : { text: goodExample, isGood: true };

  const handleSelect = (example: "example1" | "example2") => {
    if (selected) return; // Prevent re-selection
    setSelected(example);
    onAnswer?.();
  };

  const getExampleState = (example: "example1" | "example2") => {
    if (!selected) return "default";
    const isThisGood = example === "example1" ? example1.isGood : example2.isGood;
    if (selected === example) {
      return isThisGood ? "correct" : "incorrect";
    }
    // If not selected, show the correct one as correct (reveal)
    return isThisGood ? "correct" : "incorrect";
  };

  const example1State = getExampleState("example1");
  const example2State = getExampleState("example2");

  // Check if this was auto-revealed (already answered before)
  const wasAutoRevealed = isAlreadyAnswered && selected;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground font-medium">
        {wasAutoRevealed 
          ? "You've already answered this question:"
          : "Click the example that follows this guideline:"
        }
      </p>
      
      <div className="grid md:grid-cols-2 gap-3">
        {/* Example 1 */}
        <button
          onClick={() => handleSelect("example1")}
          disabled={selected !== null}
          className={cn(
            "rounded-xl border-2 p-4 text-left transition-all duration-300",
            !selected && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
            selected && "cursor-default",
            example1State === "default" && "border-border bg-card",
            example1State === "correct" && "border-success/50 bg-success/10",
            example1State === "incorrect" && "border-destructive/50 bg-destructive/10"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {example1State === "correct" && <CheckCircle2 className="w-4 h-4 text-success" />}
            {example1State === "incorrect" && <XCircle className="w-4 h-4 text-destructive" />}
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              example1State === "default" && "text-muted-foreground",
              example1State === "correct" && "text-success",
              example1State === "incorrect" && "text-destructive"
            )}>
              Example 1
            </span>
          </div>
          <p className="text-sm text-foreground">"{example1.text}"</p>
          
          {/* Show explanation for bad example after selection */}
          {selected && !example1.isGood && (
            <div className="mt-3 pt-3 border-t border-destructive/20">
              <p className="text-xs text-destructive/80 italic">
                <span className="font-semibold">Why this is bad:</span> {badExplanation}
              </p>
            </div>
          )}
        </button>

        {/* Example 2 */}
        <button
          onClick={() => handleSelect("example2")}
          disabled={selected !== null}
          className={cn(
            "rounded-xl border-2 p-4 text-left transition-all duration-300",
            !selected && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
            selected && "cursor-default",
            example2State === "default" && "border-border bg-card",
            example2State === "correct" && "border-success/50 bg-success/10",
            example2State === "incorrect" && "border-destructive/50 bg-destructive/10"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {example2State === "correct" && <CheckCircle2 className="w-4 h-4 text-success" />}
            {example2State === "incorrect" && <XCircle className="w-4 h-4 text-destructive" />}
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              example2State === "default" && "text-muted-foreground",
              example2State === "correct" && "text-success",
              example2State === "incorrect" && "text-destructive"
            )}>
              Example 2
            </span>
          </div>
          <p className="text-sm text-foreground">"{example2.text}"</p>
          
          {/* Show explanation for bad example after selection */}
          {selected && !example2.isGood && (
            <div className="mt-3 pt-3 border-t border-destructive/20">
              <p className="text-xs text-destructive/80 italic">
                <span className="font-semibold">Why this is bad:</span> {badExplanation}
              </p>
            </div>
          )}
        </button>
      </div>

      {/* Feedback message - only show if not auto-revealed */}
      {selected && !wasAutoRevealed && (
        <div className={cn(
          "p-3 rounded-lg text-sm font-medium text-center animate-in fade-in duration-300",
          (selected === "example1" ? example1.isGood : example2.isGood)
            ? "bg-success/10 text-success border border-success/20"
            : "bg-destructive/10 text-destructive border border-destructive/20"
        )}>
          {(selected === "example1" ? example1.isGood : example2.isGood)
            ? "Correct! This example follows the guideline."
            : "Not quite. Review the explanation to understand why."
          }
        </div>
      )}
    </div>
  );
};

export default GuessExampleQuiz;
