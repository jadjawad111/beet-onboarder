import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModuleSectionProps {
  id: string;
  anchor: string;
  sectionNumber: number;
  title: string;
  children: React.ReactNode;
  canComplete?: boolean;
  className?: string;
}

const ModuleSection = ({
  id,
  anchor,
  sectionNumber,
  title,
  children,
  canComplete = true,
  className,
}: ModuleSectionProps) => {
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`section-understood-${id}`);
    if (saved === "true") {
      setUnderstood(true);
    }
  }, [id]);

  const handleMarkUnderstood = () => {
    if (!canComplete) return;
    
    const newValue = !understood;
    setUnderstood(newValue);
    localStorage.setItem(`section-understood-${id}`, String(newValue));

    if (newValue) {
      window.dispatchEvent(
        new CustomEvent("section-completed", { detail: { sectionId: id } })
      );
    }
  };

  return (
    <section
      id={anchor}
      className={cn("scroll-mt-24 py-10 border-b border-border/50 last:border-0", className)}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
          {sectionNumber}
        </span>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {understood && (
          <span className="ml-auto flex items-center gap-1.5 text-success text-xs font-medium bg-success/10 px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            Complete
          </span>
        )}
      </div>

      {/* Section Content */}
      <div className="space-y-6 ml-11">{children}</div>

      {/* Completion Action - Single, Consistent Placement */}
      <div className="mt-8 ml-11">
        <Button
          variant={understood ? "secondary" : "outline"}
          size="sm"
          onClick={handleMarkUnderstood}
          disabled={!canComplete}
          className={cn(
            "gap-2 transition-all",
            understood && "bg-success/10 text-success border-success/30 hover:bg-success/20",
            !canComplete && "opacity-50 cursor-not-allowed"
          )}
        >
          <CheckCircle2 className={cn("h-4 w-4", understood && "fill-success/20")} />
          {understood ? "Marked as understood" : "Mark as understood"}
        </Button>
        {!canComplete && (
          <p className="text-xs text-muted-foreground mt-2">
            Complete prerequisites to mark this section as understood.
          </p>
        )}
      </div>
    </section>
  );
};

export default ModuleSection;
