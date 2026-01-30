import { useState } from "react";
import { CheckSquare, Square, ChevronDown, ChevronUp, RotateCcw, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistSectionProps {
  id: string;
  letter: string;
  title: string;
  items: ChecklistItem[];
  checkedItems: string[];
  onToggleItem: (itemId: string) => void;
  onCheckAll?: (itemIds: string[]) => void;
  onResetSection?: (itemIds: string[]) => void;
  isComplete: boolean;
}

const ChecklistSection = ({
  id,
  letter,
  title,
  items,
  checkedItems,
  onToggleItem,
  onCheckAll,
  onResetSection,
  isComplete,
}: ChecklistSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const completedCount = items.filter(item => checkedItems.includes(item.id)).length;
  const itemIds = items.map(item => item.id);

  const handleCheckAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCheckAll) {
      onCheckAll(itemIds);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onResetSection) {
      onResetSection(itemIds);
    }
  };

  return (
    <div className={cn(
      "rounded-xl border-2 overflow-hidden transition-all duration-300",
      isComplete ? "border-green-500/30 bg-card" : "border-border bg-card"
    )}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 text-left hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Letter badge */}
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg",
            isComplete 
              ? "bg-green-500/10 text-green-600" 
              : "bg-primary/10 text-primary"
          )}>
            {letter}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount}/{items.length} items checked
            </p>
          </div>

          {/* Status badge */}
          <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            isComplete 
              ? "bg-green-500/15 text-green-700 dark:text-green-400" 
              : "bg-muted text-muted-foreground"
          )}>
            {isComplete ? "Complete" : `${completedCount}/${items.length}`}
          </span>

          {/* Expand indicator */}
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-5 pb-5">
          <div className="border-t border-border pt-4" />
          
          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-4">
            {onCheckAll && (
              <button
                onClick={handleCheckAll}
                disabled={isComplete}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  isComplete
                    ? "bg-muted/50 text-muted-foreground border-border cursor-not-allowed"
                    : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                )}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Check All
              </button>
            )}
            <button
              onClick={handleReset}
              disabled={completedCount === 0}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                completedCount === 0
                  ? "bg-muted/50 text-muted-foreground border-border cursor-not-allowed"
                  : "bg-muted text-foreground border-border hover:bg-muted/80"
              )}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Section
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const isChecked = checkedItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onToggleItem(item.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                    isChecked 
                      ? "bg-green-500/10 hover:bg-green-500/15" 
                      : "bg-muted/50 hover:bg-muted/70"
                  )}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <span className={cn(
                    "text-sm transition-all",
                    isChecked 
                      ? "text-muted-foreground line-through" 
                      : "text-foreground"
                  )}>
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistSection;
