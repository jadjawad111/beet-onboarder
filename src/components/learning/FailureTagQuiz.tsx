import { useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FailureTag = "extraction" | "reasoning" | "formatting";

interface FailureTagQuizProps {
  scenario: string;
  modelOutput: string;
  correctTag: FailureTag;
  explanation: string;
}

const tagLabels: Record<FailureTag, { label: string; color: string }> = {
  extraction: { label: "Extraction Failure", color: "border-destructive/50 bg-destructive/10 text-destructive" },
  reasoning: { label: "Reasoning Failure", color: "border-warning/50 bg-warning/10 text-warning" },
  formatting: { label: "Formatting Failure", color: "border-info/50 bg-info/10 text-info" },
};

const FailureTagQuiz = ({ scenario, modelOutput, correctTag, explanation }: FailureTagQuizProps) => {
  const [selectedTag, setSelectedTag] = useState<FailureTag | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedTag) {
      setShowResult(true);
    }
  };

  const isCorrect = selectedTag === correctTag;

  return (
    <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 my-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Tag className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold">Spot the Failure</h4>
          <p className="text-sm text-muted-foreground">Tag this model output with the correct failure type</p>
        </div>
      </div>

      {/* Scenario */}
      <div className="rounded-lg bg-muted/50 border p-4 mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Scenario</p>
        <p className="text-sm">{scenario}</p>
      </div>

      {/* Model Output */}
      <div className="rounded-lg bg-background border-2 border-destructive/20 p-4 mb-4">
        <p className="text-xs uppercase tracking-wider text-destructive mb-2">Model Output (with error)</p>
        <p className="text-sm font-mono whitespace-pre-wrap">{modelOutput}</p>
      </div>

      {/* Tag Selection */}
      <p className="text-sm font-medium mb-3">What type of failure is this?</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(tagLabels) as FailureTag[]).map((tag) => (
          <button
            key={tag}
            onClick={() => !showResult && setSelectedTag(tag)}
            disabled={showResult}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all",
              selectedTag === tag
                ? showResult
                  ? tag === correctTag
                    ? "border-success bg-success/20 text-success"
                    : "border-destructive bg-destructive/20 text-destructive"
                  : tagLabels[tag].color
                : "border-border bg-background hover:border-primary/50",
              showResult && tag === correctTag && "border-success bg-success/20 text-success"
            )}
          >
            {tagLabels[tag].label}
            {showResult && tag === correctTag && " ✓"}
          </button>
        ))}
      </div>

      {!showResult && (
        <Button onClick={handleSubmit} disabled={!selectedTag} className="w-full">
          Check Answer
        </Button>
      )}

      {showResult && (
        <div
          className={cn(
            "p-4 rounded-lg mt-4 border",
            isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
          )}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn("font-medium", isCorrect ? "text-success" : "text-destructive")}>
                {isCorrect ? "Correct!" : `Not quite — this is a ${tagLabels[correctTag].label}`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FailureTagQuiz;
