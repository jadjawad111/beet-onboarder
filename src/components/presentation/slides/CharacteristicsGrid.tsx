import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

interface Characteristic {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface CharacteristicsGridProps {
  characteristics: Characteristic[];
  instruction?: string;
}

const CharacteristicsGrid = ({ characteristics, instruction }: CharacteristicsGridProps) => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const allRevealed = revealed.size === characteristics.length;

  return (
    <div className="space-y-4">
      {instruction && (
        <p className="text-sm text-muted-foreground text-center mb-6">
          {instruction}
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {characteristics.map((char, idx) => {
          const isRevealed = revealed.has(idx);
          return (
            <button
              key={idx}
              onClick={() => toggleReveal(idx)}
              className={cn(
                "text-left p-4 rounded-lg border-2 transition-all duration-300",
                isRevealed
                  ? "bg-primary/5 border-primary/30"
                  : "bg-card border-border hover:border-primary/40 hover:bg-muted/30"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                  isRevealed ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {isRevealed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-semibold mb-1 transition-colors",
                    isRevealed ? "text-primary" : "text-foreground"
                  )}>
                    {char.title}
                  </p>
                  <p className={cn(
                    "text-sm transition-all duration-300",
                    isRevealed 
                      ? "text-muted-foreground opacity-100" 
                      : "text-muted-foreground/50 blur-[2px]"
                  )}>
                    {char.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {allRevealed && (
        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✓ All characteristics revealed
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacteristicsGrid;
