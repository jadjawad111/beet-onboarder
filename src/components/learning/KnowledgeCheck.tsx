import { useState } from "react";
import { Brain, CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type QuestionType = "multiple-choice" | "select-all" | "short-response";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface KnowledgeCheckProps {
  type: QuestionType;
  question: string;
  options?: Option[];
  rationale?: string;
  modelAnswer?: string;
  className?: string;
}

const KnowledgeCheck = ({
  type,
  question,
  options = [],
  rationale,
  modelAnswer,
  className,
}: KnowledgeCheckProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [textResponse, setTextResponse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const handleOptionClick = (id: string) => {
    if (showResult) return;

    if (type === "multiple-choice") {
      setSelectedIds([id]);
    } else if (type === "select-all") {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };

  const handleCheck = () => {
    setShowResult(true);
  };

  const correctIds = options.filter((o) => o.isCorrect).map((o) => o.id);
  const isCorrect =
    type === "short-response"
      ? true // Short responses don't have right/wrong
      : selectedIds.length === correctIds.length &&
        selectedIds.every((id) => correctIds.includes(id));

  return (
    <div className={cn("rounded-xl border-2 border-info/30 bg-info/5 p-6 my-8", className)}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center flex-shrink-0">
          <Brain className="h-5 w-5 text-info" />
        </div>
        <div>
          <h4 className="font-semibold">Knowledge Check</h4>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {type === "multiple-choice" && "Choose one answer"}
            {type === "select-all" && "Select all that apply"}
            {type === "short-response" && "Short response"}
          </span>
        </div>
      </div>

      <p className="text-sm font-medium mb-4">{question}</p>

      {(type === "multiple-choice" || type === "select-all") && (
        <div className="space-y-2 mb-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={showResult}
              className={cn(
                "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm flex items-center gap-3",
                selectedIds.includes(option.id)
                  ? showResult
                    ? option.isCorrect
                      ? "border-success bg-success/10"
                      : "border-destructive bg-destructive/10"
                    : "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-background",
                showResult && option.isCorrect && "border-success bg-success/10"
              )}
            >
              {type === "select-all" && (
                <Checkbox
                  checked={selectedIds.includes(option.id)}
                  disabled={showResult}
                  className="pointer-events-none"
                />
              )}
              <span className="flex-1">{option.text}</span>
              {showResult && option.isCorrect && (
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              )}
              {showResult && selectedIds.includes(option.id) && !option.isCorrect && (
                <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {type === "short-response" && (
        <div className="mb-4">
          <Textarea
            placeholder="Type your response here..."
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            disabled={showResult}
            className="min-h-[100px]"
          />
        </div>
      )}

      {!showResult && (
        <Button
          onClick={handleCheck}
          disabled={
            (type !== "short-response" && selectedIds.length === 0) ||
            (type === "short-response" && !textResponse.trim())
          }
          className="w-full"
        >
          {type === "short-response" ? "Submit & Reveal Model Answer" : "Check Answer"}
        </Button>
      )}

      {showResult && type !== "short-response" && rationale && (
        <div
          className={cn(
            "p-4 rounded-lg mt-4",
            isCorrect
              ? "bg-success/10 border border-success/30"
              : "bg-destructive/10 border border-destructive/30"
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
                {isCorrect ? "Correct!" : "Not quite right"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{rationale}</p>
            </div>
          </div>
        </div>
      )}

      {showResult && type === "short-response" && modelAnswer && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="gap-2 mb-3"
          >
            {showModelAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showModelAnswer ? "Hide" : "Show"} Model Answer
          </Button>
          {showModelAnswer && (
            <div className="p-4 rounded-lg bg-muted border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Model Answer
              </p>
              <p className="text-sm whitespace-pre-wrap">{modelAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeCheck;
