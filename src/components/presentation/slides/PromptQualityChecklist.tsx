import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const qualities = [
  "Realistic to the actual job",
  "Clear and direct in what deliverable is being asked for",
  "Sufficiently complex and difficult so the model actually learns",
  "Unambiguous, such that multiple professionals would agree on what a good output looks like",
  "Timeless, with a clearly established current date of reference",
  "Includes clear implicit or explicit constraints",
];

interface PromptQualityChecklistProps {
  onAllChecked?: () => void;
  onGateUnlock?: () => void;
}

const PromptQualityChecklist = ({ onAllChecked, onGateUnlock }: PromptQualityChecklistProps) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const handleCheck = (index: number) => {
    setChecked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const allChecked = qualities.every((_, index) => checked[index]);

  useEffect(() => {
    if (allChecked) {
      onAllChecked?.();
      onGateUnlock?.();
    }
  }, [allChecked, onAllChecked, onGateUnlock]);

  return (
    <div className="space-y-3">
      {qualities.map((quality, index) => (
        <label
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors min-h-[52px]"
        >
          <Checkbox
            checked={checked[index] || false}
            onCheckedChange={() => handleCheck(index)}
            className="flex-shrink-0"
          />
          <span className="text-foreground">{quality}</span>
        </label>
      ))}
      {allChecked && (
        <div className="text-center text-sm text-primary font-medium mt-4">
          ✓ All items checked — you may continue
        </div>
      )}
    </div>
  );
};

export default PromptQualityChecklist;
