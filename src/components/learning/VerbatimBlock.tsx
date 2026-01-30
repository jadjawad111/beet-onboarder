import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Highlighter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerbatimBlockProps {
  content: React.ReactNode;
  title?: string;
  defaultExpanded?: boolean;
  className?: string;
  copyText?: string;
}

const VerbatimBlock = ({ 
  content, 
  title,
  defaultExpanded = true, 
  className,
  copyText 
}: VerbatimBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);

  const handleCopy = async () => {
    if (copyText) {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn(
      "rounded-xl border-2 border-primary/20 bg-gradient-to-b from-primary/[0.03] to-transparent overflow-hidden my-6",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {title || "Verbatim Content"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHighlightMode(!highlightMode)}
            className={cn(
              "h-7 w-7 p-0",
              highlightMode && "bg-warning/20 text-warning"
            )}
            title="Toggle highlight mode"
          >
            <Highlighter className="h-3.5 w-3.5" />
          </Button>
          {copyText && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 gap-1.5 text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-7 w-7 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className={cn(
          "p-5 prose prose-sm max-w-none text-foreground leading-relaxed",
          "[&_p]:my-3 [&_ul]:my-3 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:mt-5 [&_h4]:mb-2",
          highlightMode && "selection:bg-warning/40"
        )}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default VerbatimBlock;
