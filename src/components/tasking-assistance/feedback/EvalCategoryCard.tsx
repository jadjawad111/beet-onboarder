import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { EvalResult, CategoryConfig } from "./types";
import { getExtremityColor } from "./parseEvalJson";

interface EvalCategoryCardProps {
  categoryKey: string;
  config: CategoryConfig;
  result: EvalResult;
  defaultOpen?: boolean;
}

const EvalCategoryCard = ({ categoryKey, config, result, defaultOpen = false }: EvalCategoryCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasError = result.error;

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className={cn(
        "border rounded-lg overflow-hidden transition-all",
        hasError ? "border-l-4 border-l-destructive" : "border-l-4 border-l-green-500"
      )}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors text-left">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xl">{config.icon}</span>
          <span className="font-medium">{config.label}</span>
          
          {hasError ? (
            <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 text-xs gap-1">
              <XCircle className="w-3 h-3" />
              Needs Revision
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Pass
            </Badge>
          )}
          
          {hasError && (
            <Badge variant="outline" className={cn("text-xs capitalize", getExtremityColor(result.extremity))}>
              <AlertTriangle className="w-3 h-3 mr-1" />
              {result.extremity}
            </Badge>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="px-4 pb-4 border-t bg-muted/30">
          <p className="text-xs text-muted-foreground py-3">{config.description}</p>
          
          {result.editInstructions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Suggested Edits:</p>
              <ul className="space-y-2">
                {result.editInstructions.map((instruction, idx) => (
                  <li 
                    key={idx} 
                    className="flex gap-2 text-sm text-muted-foreground bg-background rounded-lg p-3 border"
                  >
                    <span className="text-primary font-semibold shrink-0">{idx + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {result.editInstructions.length === 0 && !hasError && (
            <p className="text-sm text-green-400 italic">No issues found in this category.</p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default EvalCategoryCard;
