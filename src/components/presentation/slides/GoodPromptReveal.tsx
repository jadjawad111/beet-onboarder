import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle2, Sparkles } from "lucide-react";

// The 6 core elements
type ElementKey = 
  | "professionalRole" 
  | "unambiguous" 
  | "realistic" 
  | "timelessness" 
  | "clearAsks" 
  | "clearConstraints";

// Standard bubble content for each element
const elementBubbles: Record<ElementKey, { title: string; why: string; enables: string }> = {
  professionalRole: {
    title: "Professional Role & Context",
    why: "This clearly defines who is performing the task and in what professional setting. It sets the standard the output must meet and mirrors how real work is assigned.",
    enables: "The model knows how good \"good\" needs to be.",
  },
  unambiguous: {
    title: "Unambiguous",
    why: "This wording removes guesswork by clearly stating what is expected. Different professionals would interpret this the same way.",
    enables: "Outputs can be evaluated consistently.",
  },
  realistic: {
    title: "Realistic & Not Contrived",
    why: "This mirrors how tasks are actually communicated in the real world, rather than artificial or instructional \"AI-style\" phrasing.",
    enables: "Training transfers to real professional use cases.",
  },
  timelessness: {
    title: "Timelessness (Relative Dating)",
    why: "This establishes a clear timeline inside the prompt so it remains correct and usable even when evaluated later.",
    enables: "The prompt does not age out.",
  },
  clearAsks: {
    title: "Clear Asks",
    why: "This explicitly defines what the final output should look like and how it will be consumed, leaving no ambiguity.",
    enables: "The output is usable, not just correct.",
  },
  clearConstraints: {
    title: "Clear Constraints",
    why: "These constraints introduce real-world tradeoffs and guardrails that make the task meaningfully difficult.",
    enables: "The model must prioritize, not just generate.",
  },
};

// A single highlighted phrase with its element
interface HighlightedPhrase {
  text: string;
  element: ElementKey;
}

interface GoodPromptRevealProps {
  exerciseNumber: number;
  // The prompt text with markers: use [[text||element]] format
  // e.g., "You are a [[retail general manager||professionalRole]] at a [[bridal store||professionalRole]]"
  promptParts: (string | HighlightedPhrase)[];
}

const HighlightSpan = ({ phrase }: { phrase: HighlightedPhrase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bubble = elementBubbles[phrase.element];

  return (
    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "bg-green-500/20 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded cursor-pointer",
            "hover:bg-green-500/30 transition-colors inline font-medium",
            "border-b-2 border-green-500/40 border-dashed"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {phrase.text}
        </span>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        align="center"
        className="max-w-sm p-4 bg-card border-2 border-green-500/30 shadow-lg"
        sideOffset={8}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="font-semibold text-green-600 dark:text-green-400 text-sm">
              {bubble.title}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Why this is good</p>
            <p className="text-sm text-foreground leading-relaxed">{bubble.why}</p>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">What this enables</p>
            <p className="text-sm text-primary font-medium">{bubble.enables}</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const GoodPromptReveal = ({ exerciseNumber, promptParts }: GoodPromptRevealProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-green-500" />
          <h2 className="text-2xl font-bold">Good Prompt #{exerciseNumber}</h2>
        </div>
        <p className="text-muted-foreground">
          Hover over the <span className="text-green-600 font-medium">green highlighted</span> sections to understand why they demonstrate good prompt construction.
        </p>
      </div>

      {/* Prompt Content */}
      <div className="flex-1">
        <div className="p-6 rounded-xl bg-gradient-to-b from-green-500/5 to-transparent border-2 border-green-500/20">
          <p className="text-xs uppercase tracking-wider text-green-600 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Original Good Prompt
          </p>
          <div className="text-foreground leading-relaxed text-base whitespace-pre-wrap">
            {promptParts.map((part, index) => {
              if (typeof part === "string") {
                return <span key={index}>{part}</span>;
              }
              return <HighlightSpan key={index} phrase={part} />;
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">How to use this view</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-0.5 rounded border-b-2 border-green-500/40 border-dashed text-xs">
                highlighted text
              </span>
              <span className="text-muted-foreground">= Evidence of good construction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Hover or tap → See explanation bubble</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodPromptReveal;

// Helper to construct prompt parts easily
export const h = (text: string, element: ElementKey): HighlightedPhrase => ({ text, element });
