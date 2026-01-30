import { useState } from "react";
import { ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttributeCardProps {
  number: number;
  name: string;
  definition: string;
  whyItMatters: string;
  badExample: { context: string; text: string; issue?: string };
  goodExample: { context: string; text: string };
}

const AttributeCard = ({
  number,
  name,
  definition,
  whyItMatters,
  badExample,
  goodExample,
}: AttributeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">{number}</span>
          </div>
          <h4 className="font-bold text-lg">{name}</h4>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-primary">Definition:</span>{" "}
            <span className="text-muted-foreground">{definition}</span>
          </div>
          <div>
            <span className="font-semibold text-primary">Why it matters:</span>{" "}
            <span className="text-muted-foreground">{whyItMatters}</span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide Bad vs Good Example
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show Bad vs Good Example
            </>
          )}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t p-5 bg-muted/30">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Context: {badExample.context}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Bad Example */}
            <div className="rounded-lg border-2 border-destructive/30 bg-destructive/5 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 border-b border-destructive/20">
                <X className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold text-destructive">❌ Bad</span>
              </div>
              <div className="p-3">
                <p className="text-sm whitespace-pre-wrap">{badExample.text}</p>
                {badExample.issue && (
                  <p className="text-xs text-destructive/80 mt-2 italic">({badExample.issue})</p>
                )}
              </div>
            </div>

            {/* Good Example */}
            <div className="rounded-lg border-2 border-success/30 bg-success/5 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-success/10 border-b border-success/20">
                <Check className="h-4 w-4 text-success" />
                <span className="text-xs font-semibold text-success">✅ Good (Beet 2.0)</span>
              </div>
              <div className="p-3">
                <p className="text-sm whitespace-pre-wrap">{goodExample.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributeCard;
