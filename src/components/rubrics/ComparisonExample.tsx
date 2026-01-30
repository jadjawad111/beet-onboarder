import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonExampleProps {
  good: {
    label?: string;
    content: string;
    explanation?: string;
  };
  bad: {
    label?: string;
    content: string;
    explanation?: string;
  };
  className?: string;
}

const ComparisonExample = ({ good, bad, className }: ComparisonExampleProps) => {
  return (
    <div className={cn("grid md:grid-cols-2 gap-4", className)}>
      {/* Bad Example */}
      <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 overflow-hidden">
        <div className="px-4 py-2 bg-destructive/10 border-b border-destructive/20 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">
            {bad.label || "Bad Example"}
          </span>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-sm text-foreground font-medium">"{bad.content}"</p>
          {bad.explanation && (
            <p className="text-xs text-muted-foreground italic border-t border-destructive/10 pt-3">
              <span className="font-semibold text-destructive/80">Why this is bad:</span>{" "}
              {bad.explanation}
            </p>
          )}
        </div>
      </div>

      {/* Good Example */}
      <div className="rounded-xl border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 overflow-hidden">
        <div className="px-4 py-2 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
            {good.label || "Good Example"}
          </span>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-sm text-foreground font-medium">"{good.content}"</p>
          {good.explanation && (
            <p className="text-xs text-muted-foreground italic border-t border-green-500/10 pt-3">
              {good.explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonExample;
