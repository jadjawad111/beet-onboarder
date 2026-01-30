import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ComparisonRow {
  context: string;
  bad: string;
  badTooltip?: string;
  good: string;
}

interface AttributeMiniCardProps {
  number: number;
  title: string;
  definition: string;
  whyItMatters: string;
  comparisons: ComparisonRow[];
}

const AttributeMiniCard = ({
  number,
  title,
  definition,
  whyItMatters,
  comparisons,
}: AttributeMiniCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border bg-card overflow-hidden transition-all">
      {/* Mini Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-primary">{number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{title}</h4>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Expanded Content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[2000px]" : "max-h-0"
        )}
      >
        <div className="p-4 pt-0 space-y-4 border-t">
          {/* Definition */}
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Definition
            </h5>
            <p className="text-sm">{definition}</p>
          </div>

          {/* Why It Matters */}
          <div>
            <h5 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Why it matters
            </h5>
            <p className="text-sm text-muted-foreground">{whyItMatters}</p>
          </div>

          {/* Comparison Table */}
          {comparisons.length > 0 && (
            <div className="mt-4">
              <h5 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Examples
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                        Context
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-destructive">
                        ❌ Bad
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-success">
                        ✅ Good
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-3 font-medium">{row.context}</td>
                        <td className="py-3 px-3 text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <span>{row.bad}</span>
                            {row.badTooltip && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 cursor-help mt-0.5" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-sm">{row.badTooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3">{row.good}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttributeMiniCard;
