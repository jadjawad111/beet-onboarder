import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  term: string;
  definition: string;
  className?: string;
}

const Flashcard = ({ term, definition, className }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        "relative h-48 w-full cursor-pointer perspective-1000",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Term */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Term</span>
          <p className="text-lg font-semibold text-center">{term}</p>
          <span className="absolute bottom-3 text-xs text-muted-foreground flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> Click to flip
          </span>
        </div>

        {/* Back - Definition */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl border-2 border-accent bg-gradient-to-br from-accent/30 to-accent/10 p-6 flex flex-col items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Definition</span>
          <p className="text-sm text-center leading-relaxed">{definition}</p>
          <span className="absolute bottom-3 text-xs text-muted-foreground flex items-center gap-1">
            <RotateCcw className="h-3 w-3" /> Click to flip back
          </span>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
