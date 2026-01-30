import { useState } from "react";
import { cn } from "@/lib/utils";

const elements = [
  { id: 1, name: "Unambiguous" },
  { id: 2, name: "Professional role & context" },
  { id: 3, name: "Realistic and not contrived" },
  { id: 4, name: "Timelessness (relative dating)" },
  { id: 5, name: "Clear asks" },
  { id: 6, name: "Clear constraints" },
];

interface CoreElementsHoverProps {
  onAllRevealed?: () => void;
}

const CoreElementsHover = ({ onAllRevealed }: CoreElementsHoverProps) => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleHover = (id: number) => {
    if (!revealed.has(id)) {
      const newRevealed = new Set(revealed).add(id);
      setRevealed(newRevealed);
      if (newRevealed.size === elements.length && onAllRevealed) {
        onAllRevealed();
      }
    }
  };

  const allRevealed = revealed.size === elements.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => (
          <div
            key={element.id}
            onMouseEnter={() => handleHover(element.id)}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300 cursor-default",
              revealed.has(element.id)
                ? "bg-card border-primary/30 text-foreground"
                : "bg-muted/50 border-muted text-muted-foreground/50 blur-[2px] hover:blur-none hover:bg-card hover:text-foreground hover:border-primary/30"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                {element.id}
              </span>
              <span className="font-medium">{element.name}</span>
            </div>
          </div>
        ))}
      </div>
      
      <p className={cn(
        "text-sm text-center transition-opacity duration-300",
        allRevealed ? "text-primary" : "text-muted-foreground"
      )}>
        {allRevealed 
          ? "✓ All elements revealed — you may continue" 
          : `Hover over each element to reveal (${revealed.size}/${elements.length})`
        }
      </p>
    </div>
  );
};

export default CoreElementsHover;
