import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface TermCardFixedProps {
  term: string;
  definition: string;
  className?: string;
}

/**
 * Fixed TermCard component that renders text normally (not mirrored/reversed)
 * Uses conditional rendering instead of opacity to prevent overlap
 * Fixed height of 240px ensures all definitions fit without scrolling
 */
const TermCardFixed = ({ term, definition, className }: TermCardFixedProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        "relative h-[240px] cursor-pointer select-none",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      {/* Front - Term */}
      {!isFlipped && (
        <div className="absolute inset-0 rounded-xl border-2 border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider mb-3">
            Term
          </span>
          <span className="font-bold text-base leading-snug text-slate-900 dark:text-white">{term}</span>
          <span className="absolute bottom-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> Click to reveal
          </span>
        </div>
      )}

      {/* Back - Definition */}
      {isFlipped && (
        <div className="absolute inset-0 rounded-xl border-2 border-emerald-400 dark:border-emerald-500 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-between text-center shadow-sm">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
            Definition
          </span>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 flex-1 flex items-center">
            {definition}
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> Click to flip back
          </span>
        </div>
      )}
    </div>
  );
};

export default TermCardFixed;
