import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxReminderProps {
  id: string;
  label: string;
  className?: string;
}

const CheckboxReminder = ({ id, label, className }: CheckboxReminderProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`checkbox-${id}`);
    if (saved === "true") {
      setChecked(true);
    }
  }, [id]);

  const handleChange = (value: boolean) => {
    setChecked(value);
    localStorage.setItem(`checkbox-${id}`, String(value));
  };

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg border-2 transition-all duration-200 my-4",
      checked 
        ? "border-primary/40 bg-primary/5" 
        : "border-warning/40 bg-warning/5",
      className
    )}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={handleChange}
        className="mt-0.5"
      />
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium cursor-pointer leading-relaxed",
          checked && "text-muted-foreground line-through"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxReminder;
