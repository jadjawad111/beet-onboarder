import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyableBlockProps {
  content: string;
  label?: string;
  className?: string;
}

const CopyableBlock = ({ content, label = "Example Prompt", className }: CopyableBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl border bg-muted/50 overflow-hidden my-4", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1.5 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="p-4">
        <pre className="text-sm whitespace-pre-wrap font-mono">{content}</pre>
      </div>
    </div>
  );
};

export default CopyableBlock;
