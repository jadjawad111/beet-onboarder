import { useState } from "react";
import { cn } from "@/lib/utils";

interface TermCardProps {
  term: string;
  definition: string;
  className?: string;
}

const TermCard = ({ term, definition, className }: TermCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn(
        "relative h-40 cursor-pointer perspective-1000",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "absolute inset-0 transition-transform duration-500 transform-style-3d",
        isFlipped && "rotate-y-180"
      )}>
        {/* Front - Term */}
        <div className={cn(
          "absolute inset-0 backface-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex flex-col items-center justify-center text-center",
          isFlipped && "invisible"
        )}>
          <span className="text-xs text-primary font-medium uppercase tracking-wider mb-2">Term</span>
          <span className="font-semibold text-lg">{term}</span>
          <span className="text-xs text-muted-foreground mt-3">Click to reveal</span>
        </div>

        {/* Back - Definition */}
        <div className={cn(
          "absolute inset-0 backface-hidden rounded-xl border-2 border-success/20 bg-gradient-to-br from-success/10 to-success/5 p-4 flex flex-col items-center justify-center text-center rotate-y-180",
          !isFlipped && "invisible"
        )}>
          <span className="text-xs text-success font-medium uppercase tracking-wider mb-2">Definition</span>
          <p className="text-sm leading-relaxed">{definition}</p>
        </div>
      </div>
    </div>
  );
};

export default TermCard;
