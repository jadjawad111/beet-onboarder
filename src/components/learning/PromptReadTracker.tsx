import { useState, useEffect } from "react";
import { Plus, Minus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromptReadTrackerProps {
  moduleId: string;
  target?: number;
}

const PromptReadTracker = ({ moduleId, target = 20 }: PromptReadTrackerProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`prompt-tracker-${moduleId}`);
    if (saved) {
      setCount(parseInt(saved, 10));
    }
  }, [moduleId]);

  const updateCount = (newCount: number) => {
    const clampedCount = Math.max(0, Math.min(target, newCount));
    setCount(clampedCount);
    localStorage.setItem(`prompt-tracker-${moduleId}`, String(clampedCount));
  };

  const percentage = Math.round((count / target) * 100);
  const isComplete = count >= target;

  return (
    <div className={cn(
      "rounded-xl border-2 p-5 my-6 transition-all",
      isComplete ? "border-success/40 bg-success/5" : "border-primary/30 bg-primary/5"
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isComplete ? "bg-success/20" : "bg-primary/20"
        )}>
          <BookOpen className={cn("h-5 w-5", isComplete ? "text-success" : "text-primary")} />
        </div>
        <div>
          <h4 className="font-semibold">Prompt Reading Tracker</h4>
          <p className="text-sm text-muted-foreground">Track how many example prompts you've read</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateCount(count - 1)}
          disabled={count === 0}
          className="h-10 w-10"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className={cn(
              "text-2xl font-bold",
              isComplete ? "text-success" : "text-primary"
            )}>
              {count}/{target}
            </span>
            <span className="text-sm text-muted-foreground">{percentage}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                isComplete ? "bg-success" : "bg-primary"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => updateCount(count + 1)}
          disabled={count >= target}
          className="h-10 w-10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {isComplete && (
        <p className="text-sm text-success font-medium mt-3 text-center">
          ✅ Great job! You've read {target} prompts!
        </p>
      )}
    </div>
  );
};

export default PromptReadTracker;
