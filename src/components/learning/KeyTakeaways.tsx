import { useState, useEffect } from "react";
import { Lightbulb, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface KeyTakeawaysProps {
  sectionId: string;
  takeaways: string[];
  className?: string;
}

const KeyTakeaways = ({ sectionId, takeaways, className }: KeyTakeawaysProps) => {
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`takeaway-${sectionId}`);
    if (saved === "true") {
      setUnderstood(true);
    }
  }, [sectionId]);

  const handleToggle = (checked: boolean) => {
    setUnderstood(checked);
    localStorage.setItem(`takeaway-${sectionId}`, String(checked));
  };

  return (
    <div className={cn(
      "rounded-xl border-2 border-primary/20 bg-primary/5 p-6 my-8",
      understood && "border-primary/40 bg-primary/10",
      className
    )}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">Key Takeaways</h4>
          <p className="text-sm text-muted-foreground">Remember these core concepts</p>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{takeaway}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-4 border-t border-primary/20">
        <span className="text-sm font-medium">Mark as understood</span>
        <Switch
          checked={understood}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
};

export default KeyTakeaways;
