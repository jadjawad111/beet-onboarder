import { useState, useEffect } from "react";
import { CheckCircle2, Circle, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  storageKey: string;
}

interface ModuleChecklistProps {
  moduleId: string;
  items: ChecklistItem[];
  nextModuleHref?: string;
  nextModuleTitle?: string;
}

const ModuleChecklist = ({
  moduleId,
  items,
  nextModuleHref,
  nextModuleTitle = "Next Module",
}: ModuleChecklistProps) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkCompletion = () => {
      const completed = new Set<string>();
      items.forEach((item) => {
        const value = localStorage.getItem(item.storageKey);
        if (value === "true") {
          completed.add(item.id);
        }
      });
      setCompletedItems(completed);
    };

    checkCompletion();

    // Listen for storage changes
    const handleStorage = () => checkCompletion();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("section-completed", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("section-completed", handleStorage);
    };
  }, [items]);

  const allComplete = completedItems.size === items.length;
  const progressPercent = Math.round((completedItems.size / items.length) * 100);

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-6 mt-12 transition-all",
        allComplete
          ? "border-success/30 bg-success/5"
          : "border-primary/20 bg-primary/5"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {allComplete ? (
          <CheckCircle2 className="h-6 w-6 text-success" />
        ) : (
          <AlertTriangle className="h-6 w-6 text-primary" />
        )}
        <h3 className="text-lg font-semibold">
          {allComplete ? "Module Complete!" : "Before Moving On"}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {allComplete
          ? "Great work! You've completed all requirements for this module."
          : "Complete these items to unlock the next module:"}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-muted-foreground">
            {completedItems.size} of {items.length} complete
          </span>
          <span className="font-medium">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Checklist */}
      <ul className="space-y-2 mb-6">
        {items.map((item) => {
          const isComplete = completedItems.has(item.id);
          return (
            <li
              key={item.id}
              className={cn(
                "flex items-center gap-3 text-sm p-2 rounded-lg transition-colors",
                isComplete && "bg-success/10"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className={cn(isComplete && "text-success")}>{item.label}</span>
            </li>
          );
        })}
      </ul>

      {/* Next Module Button */}
      {nextModuleHref && (
        <Button
          asChild={allComplete}
          disabled={!allComplete}
          className={cn("w-full gap-2", !allComplete && "opacity-50 cursor-not-allowed")}
        >
          {allComplete ? (
            <a href={nextModuleHref}>
              Continue to {nextModuleTitle}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <span>
              Complete checklist to continue
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default ModuleChecklist;
