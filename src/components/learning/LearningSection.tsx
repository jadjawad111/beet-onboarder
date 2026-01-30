import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LearningSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const LearningSection = ({ id, title, children, className }: LearningSectionProps) => {
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`section-understood-${id}`);
    if (saved === 'true') {
      setUnderstood(true);
    }
  }, [id]);

  const handleMarkUnderstood = () => {
    const newValue = !understood;
    setUnderstood(newValue);
    localStorage.setItem(`section-understood-${id}`, String(newValue));
    
    if (newValue) {
      // Dispatch custom event for Coach Panel to track
      window.dispatchEvent(new CustomEvent('section-completed', { 
        detail: { sectionId: id } 
      }));
    }
  };

  return (
    <section 
      id={id} 
      className={cn(
        "scroll-mt-24 py-8 border-b border-border/50 last:border-0",
        className
      )}
    >
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {understood && (
          <div className="flex items-center gap-1.5 text-success text-xs font-medium bg-success/10 px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            Understood
          </div>
        )}
      </div>

      {/* Section Content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Mark as Understood Footer */}
      <div className="mt-8 pt-4 border-t border-dashed border-border/50">
        <Button
          variant={understood ? "secondary" : "outline"}
          size="sm"
          onClick={handleMarkUnderstood}
          className={cn(
            "gap-2 transition-all",
            understood && "bg-success/10 text-success border-success/30 hover:bg-success/20"
          )}
        >
          <CheckCircle2 className={cn("h-4 w-4", understood && "fill-success/20")} />
          {understood ? "Marked as understood" : "Mark as understood"}
        </Button>
      </div>
    </section>
  );
};

export default LearningSection;
