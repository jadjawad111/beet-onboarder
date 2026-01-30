import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lightbulb } from "lucide-react";

interface RevealInsightProps {
  teaser: string;
  insight: string;
  className?: string;
  onRevealed?: () => void;
}

const RevealInsight = ({ teaser, insight, className, onRevealed }: RevealInsightProps) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
    }
  };

  useEffect(() => {
    if (revealed && onRevealed) {
      onRevealed();
    }
  }, [revealed, onRevealed]);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={handleReveal}
        className={cn(
          "w-full text-left p-5 rounded-xl border-2 transition-all duration-300",
          revealed 
            ? "bg-primary/5 border-primary/30" 
            : "bg-muted/30 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
            revealed ? "bg-primary/20" : "bg-muted"
          )}>
            {revealed ? (
              <Lightbulb className="w-5 h-5 text-primary" />
            ) : (
              <Eye className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {revealed ? "Key Insight" : "Click to reveal"}
            </p>
            <p className={cn(
              "text-foreground transition-all duration-300",
              !revealed && "blur-sm select-none"
            )}>
              {revealed ? insight : teaser}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default RevealInsight;
