import { useState, useEffect } from "react";
import { AlertTriangle, Lock, Unlock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface PrerequisitesGateProps {
  id: string;
  title: string;
  description: string;
  checkboxLabel: string;
  onUnlock?: (unlocked: boolean) => void;
}

const PrerequisitesGate = ({
  id,
  title,
  description,
  checkboxLabel,
  onUnlock,
}: PrerequisitesGateProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`prereq-${id}`);
    if (saved === "true") {
      setChecked(true);
      onUnlock?.(true);
    }
  }, [id, onUnlock]);

  const handleChange = (value: boolean) => {
    setChecked(value);
    localStorage.setItem(`prereq-${id}`, String(value));
    onUnlock?.(value);
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-6 mb-8 transition-all duration-300",
        checked
          ? "border-success/30 bg-success/5"
          : "border-destructive/30 bg-destructive/5"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            checked ? "bg-success/20" : "bg-destructive/20"
          )}
        >
          {checked ? (
            <Unlock className="h-5 w-5 text-success" />
          ) : (
            <Lock className="h-5 w-5 text-destructive" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {!checked && <AlertTriangle className="h-4 w-4 text-destructive" />}
            <h3 className={cn("font-semibold", checked ? "text-success" : "text-destructive")}>
              {checked ? "Prerequisites Acknowledged" : title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border transition-all",
              checked
                ? "bg-success/10 border-success/30"
                : "bg-background border-border hover:border-primary/50"
            )}
          >
            <Checkbox
              id={`prereq-check-${id}`}
              checked={checked}
              onCheckedChange={handleChange}
              className="mt-0.5"
            />
            <label
              htmlFor={`prereq-check-${id}`}
              className={cn(
                "text-sm cursor-pointer leading-relaxed",
                checked && "text-success"
              )}
            >
              {checkboxLabel}
            </label>
          </div>

          {!checked && (
            <p className="text-xs text-muted-foreground mt-3 italic">
              You can read the content below, but you cannot mark sections as complete until you acknowledge the prerequisites.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrerequisitesGate;
