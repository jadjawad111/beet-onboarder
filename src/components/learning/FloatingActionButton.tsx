import { useState } from "react";
import { Plus, X, ListChecks, BookOpen, AlertTriangle, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onJumpToChecklist?: () => void;
  onOpenExamples?: () => void;
  onCommonMistakes?: () => void;
  onSelfTest?: () => void;
}

const FloatingActionButton = ({
  onJumpToChecklist,
  onOpenExamples,
  onCommonMistakes,
  onSelfTest,
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: "Jump to Checklist", icon: ListChecks, onClick: onJumpToChecklist, id: "checklist" },
    { label: "Open Examples", icon: BookOpen, onClick: onOpenExamples, id: "examples" },
    { label: "Common Mistakes", icon: AlertTriangle, onClick: onCommonMistakes, id: "mistakes" },
    { label: "Self-Test", icon: ClipboardCheck, onClick: onSelfTest, id: "selftest" },
  ];

  const handleAction = (action: typeof actions[0]) => {
    if (action.onClick) {
      action.onClick();
    } else {
      const element = document.getElementById(`section-${action.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col-reverse items-end gap-3">
      {/* Action buttons */}
      <div className={cn(
        "flex flex-col-reverse gap-2 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="secondary"
            size="sm"
            className="gap-2 shadow-lg animate-scale-in"
            onClick={() => handleAction(action)}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-transform duration-300",
          isOpen && "rotate-45"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default FloatingActionButton;
