import { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ElementExampleRowProps {
  context: string;
  bad: string;
  issue: string;
  good: React.ReactNode; // Allow React nodes for highlighting
  onRevealed?: () => void;
  onGateUnlock?: () => void; // Alternative prop name for gate system
}

const ElementExampleRow = ({ context, bad, issue, good, onRevealed, onGateUnlock }: ElementExampleRowProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  useEffect(() => {
    if (isRevealed) {
      onRevealed?.();
      onGateUnlock?.();
    }
  }, [isRevealed, onRevealed, onGateUnlock]);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Context Header */}
      <div className="px-4 py-2 bg-muted/50 border-b">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {context}
        </span>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-3 divide-x divide-border">
        {/* Bad Example */}
        <div className="p-4 bg-destructive/5">
          <div className="flex items-center gap-2 mb-2">
            <X className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive uppercase">Bad Prompt</span>
          </div>
          <p className="text-sm leading-relaxed">{bad}</p>
        </div>

        {/* Issue/Reason Why */}
        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase">Why this fails</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{issue}</p>
        </div>

        {/* Good Example - Hover to reveal */}
        <div 
          className="p-4 bg-green-50/50 dark:bg-green-950/20 relative"
          onMouseEnter={handleReveal}
        >
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase">Good (Beet 2.0)</span>
          </div>
          
          {/* Hidden overlay */}
          <div className={cn(
            "transition-all duration-300",
            !isRevealed && "blur-sm select-none"
          )}>
            <p className="text-sm leading-relaxed">{good}</p>
          </div>

          {/* Hover prompt */}
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-50/80 dark:bg-green-950/60 cursor-default">
              <span className="text-xs text-green-700 dark:text-green-400 font-medium px-3 py-1.5 rounded-full border border-green-300 dark:border-green-700 bg-white dark:bg-green-950">
                Hover to reveal
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElementExampleRow;
