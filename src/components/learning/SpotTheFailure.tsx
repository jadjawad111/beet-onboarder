import { useState } from "react";
import { AlertCircle, CheckCircle2, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SpotTheFailureProps {
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  className?: string;
}

const SpotTheFailure = ({ question, options, explanation, className }: SpotTheFailureProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelectedId(id);
  };

  const handleCheck = () => {
    if (selectedId) {
      setShowResult(true);
    }
  };

  const selectedOption = options.find((o) => o.id === selectedId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className={cn("rounded-xl border-2 border-warning/30 bg-warning/5 p-6 my-6", className)}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
          <Eye className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h4 className="font-semibold">Spot the Failure</h4>
          <p className="text-sm text-muted-foreground">{question}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={showResult}
            className={cn(
              "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm",
              selectedId === option.id
                ? showResult
                  ? option.isCorrect
                    ? "border-success bg-success/10"
                    : "border-destructive bg-destructive/10"
                  : "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 bg-background",
              showResult && option.isCorrect && "border-success bg-success/10"
            )}
          >
            <div className="flex items-center gap-3">
              {showResult && option.isCorrect && (
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              )}
              {showResult && selectedId === option.id && !option.isCorrect && (
                <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              )}
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      {!showResult && (
        <Button onClick={handleCheck} disabled={!selectedId} className="w-full">
          Check Answer
        </Button>
      )}

      {showResult && (
        <div className={cn(
          "p-4 rounded-lg mt-4",
          isCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
        )}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn("font-medium", isCorrect ? "text-success" : "text-destructive")}>
                {isCorrect ? "Correct!" : "Not quite right"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotTheFailure;
