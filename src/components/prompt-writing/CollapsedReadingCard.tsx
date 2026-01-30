import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsedReadingCardProps {
  title: string;
  preview: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsedReadingCard = ({ 
  title, 
  preview, 
  children, 
  defaultOpen = false 
}: CollapsedReadingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            {!isExpanded && (
              <p className="text-muted-foreground line-clamp-2">{preview}</p>
            )}
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform mt-1",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expanded Content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[5000px]" : "max-h-0"
        )}
      >
        <div className="px-6 pb-6 pt-0 border-t">
          <div className="pt-6 prose prose-sm max-w-none text-foreground prose-headings:text-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsedReadingCard;
