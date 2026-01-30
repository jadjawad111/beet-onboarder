import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonGridProps {
  items: Array<{
    context: string;
    bad: {
      text: string;
      issue?: string;
    };
    good: {
      text: string;
    };
  }>;
  className?: string;
}

const ComparisonGrid = ({ items, className }: ComparisonGridProps) => {
  return (
    <div className={cn("space-y-4 my-6", className)}>
      {items.map((item, index) => (
        <div 
          key={index}
          className="grid md:grid-cols-2 gap-3 p-4 bg-muted/30 rounded-xl border"
        >
          {/* Context Label */}
          <div className="md:col-span-2 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground bg-background px-2 py-1 rounded">
              {item.context}
            </span>
          </div>

          {/* Bad Example */}
          <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="h-4 w-4 text-destructive" />
              <span className="text-xs font-semibold text-destructive uppercase">Bad</span>
            </div>
            <p className="text-sm leading-relaxed">{item.bad.text}</p>
            {item.bad.issue && (
              <p className="text-xs text-destructive/70 mt-2 italic">
                Issue: {item.bad.issue}
              </p>
            )}
          </div>

          {/* Good Example */}
          <div className="rounded-lg border-2 border-success/20 bg-success/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-xs font-semibold text-success uppercase">Good (Beet 2.0)</span>
            </div>
            <p className="text-sm leading-relaxed">{item.good.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonGrid;
