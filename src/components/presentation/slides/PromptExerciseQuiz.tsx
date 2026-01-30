import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

type ElementKey = "unambiguous" | "professional" | "realistic" | "timelessness" | "clearAsks" | "clearConstraints";

interface ElementFeedback {
  isIssue: boolean;
  explanation: string;
}

interface PromptExerciseQuizProps {
  exerciseNumber: number;
  promptExcerpt: string;
  correctAnswers: ElementKey[];
  feedback: Record<ElementKey, ElementFeedback>;
}

const elementLabels: Record<ElementKey, string> = {
  unambiguous: "Unambiguous",
  professional: "Professional Role & Context",
  realistic: "Realistic & Not Contrived",
  timelessness: "Timelessness (Relative Dating)",
  clearAsks: "Clear Asks",
  clearConstraints: "Clear Constraints",
};

const allElements: ElementKey[] = [
  "unambiguous",
  "professional",
  "realistic",
  "timelessness",
  "clearAsks",
  "clearConstraints",
];

const PromptExerciseQuiz = ({
  exerciseNumber,
  promptExcerpt,
  correctAnswers,
  feedback,
}: PromptExerciseQuizProps) => {
  const [selected, setSelected] = useState<Set<ElementKey>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggleElement = (element: ElementKey) => {
    if (submitted) return;
    const newSelected = new Set(selected);
    if (newSelected.has(element)) {
      newSelected.delete(element);
    } else {
      newSelected.add(element);
    }
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const isCorrect = (element: ElementKey) => correctAnswers.includes(element);
  const wasSelected = (element: ElementKey) => selected.has(element);

  // Check if user got all correct (selected all correct ones and no incorrect ones)
  const allCorrectSelected = correctAnswers.every((el) => selected.has(el));
  const noIncorrectSelected = allElements
    .filter((el) => !correctAnswers.includes(el))
    .every((el) => !selected.has(el));
  const perfectScore = allCorrectSelected && noIncorrectSelected;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Prompt Exercise #{exerciseNumber}</h2>
        <p className="text-muted-foreground">
          Read the prompt excerpt and identify which elements make it problematic.
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Prompt Excerpt */}
        <div className="mb-6 p-5 rounded-xl bg-muted/50 border-2 border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Prompt (Excerpt)
          </p>
          <p className="text-foreground italic leading-relaxed whitespace-pre-wrap">
            "{promptExcerpt}"
          </p>
        </div>

        {/* Question */}
        <div className="mb-4">
          <p className="font-semibold text-lg">
            Select all of the elements of this prompt that make it bad.
          </p>
        </div>

        {/* Checkboxes */}
        <div className="grid gap-2 mb-6">
          {allElements.map((element) => {
            const showCorrect = submitted && isCorrect(element);
            const showIncorrect = submitted && wasSelected(element) && !isCorrect(element);
            const showMissed = submitted && isCorrect(element) && !wasSelected(element);

            return (
              <label
                key={element}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                  !submitted && "hover:bg-accent/50 hover:border-primary/50",
                  !submitted && wasSelected(element) && "bg-primary/10 border-primary",
                  submitted && showCorrect && wasSelected(element) && "bg-green-500/10 border-green-500",
                  submitted && showMissed && "bg-amber-500/10 border-amber-500",
                  submitted && showIncorrect && "bg-destructive/10 border-destructive",
                  submitted && !showCorrect && !showIncorrect && !showMissed && "opacity-60",
                  submitted && "cursor-default"
                )}
              >
                <Checkbox
                  checked={wasSelected(element)}
                  disabled={submitted}
                  onCheckedChange={() => toggleElement(element)}
                  className={cn(
                    submitted && showCorrect && wasSelected(element) && "border-green-500 data-[state=checked]:bg-green-500",
                    submitted && showIncorrect && "border-destructive data-[state=checked]:bg-destructive"
                  )}
                />
                <span className="flex-1 font-medium">{elementLabels[element]}</span>
                {submitted && showCorrect && wasSelected(element) && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {submitted && showMissed && (
                  <span className="text-xs text-amber-600 font-medium">Missed</span>
                )}
                {submitted && showIncorrect && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </label>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <Button 
            onClick={handleSubmit} 
            size="lg" 
            className="w-full mb-6"
            disabled={selected.size === 0}
          >
            Submit Answer
          </Button>
        )}

        {/* Post-Submit Feedback */}
        {submitted && (
          <div className="space-y-4">
            {/* Result Banner */}
            <div
              className={cn(
                "p-4 rounded-lg border-2 flex items-center gap-3",
                perfectScore
                  ? "bg-green-500/10 border-green-500"
                  : "bg-amber-500/10 border-amber-500"
              )}
            >
              {perfectScore ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              )}
              <div>
                <p className={cn("font-semibold", perfectScore ? "text-green-600" : "text-amber-600")}>
                  {perfectScore ? "Perfect!" : "Not quite right"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {perfectScore
                    ? "You correctly identified all the problematic elements."
                    : "Review the feedback below to understand each element."}
                </p>
              </div>
            </div>

            {/* Element-by-Element Feedback */}
            <div className="space-y-3">
              <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Detailed Feedback
              </p>
              {allElements.map((element) => {
                const elementFeedback = feedback[element];
                const isIssue = elementFeedback.isIssue;

                return (
                  <div
                    key={element}
                    className={cn(
                      "p-4 rounded-lg border",
                      isIssue ? "bg-green-500/5 border-green-500/30" : "bg-muted/30 border-border"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className={cn("font-semibold", isIssue && "text-green-600")}>
                          {isIssue ? "✅ " : ""}
                          {elementLabels[element]} — {isIssue ? "INCLUDED (Correct)" : "NOT an issue"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {elementFeedback.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptExerciseQuiz;
