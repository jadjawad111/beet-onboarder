import { X, CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  isComplete: boolean;
}

interface ProgressBlockedOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  items: ChecklistItem[];
}

const ProgressBlockedOverlay = ({
  isOpen,
  onClose,
  title,
  description,
  items,
}: ProgressBlockedOverlayProps) => {
  if (!isOpen) return null;

  const completedCount = items.filter(i => i.isComplete).length;
  const totalCount = items.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border-2 border-warning/30 bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 pb-4">
          <div className="w-12 h-12 rounded-xl bg-warning/15 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className={cn(
              "font-medium",
              completedCount === totalCount ? "text-green-600" : "text-foreground"
            )}>
              {completedCount}/{totalCount} complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 rounded-full"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="px-6 pb-4">
          <div className="rounded-xl border border-border bg-muted/30 divide-y divide-border overflow-hidden">
            {items.map((item) => (
              <div 
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors",
                  item.isComplete && "bg-green-500/5"
                )}
              >
                {item.isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={cn(
                  "text-sm transition-all",
                  item.isComplete 
                    ? "text-muted-foreground line-through" 
                    : "text-foreground font-medium"
                )}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="p-6 pt-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBlockedOverlay;