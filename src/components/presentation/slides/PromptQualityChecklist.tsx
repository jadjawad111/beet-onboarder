import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const qualities = [
  {
    title: "Realistic",
    description: "Professional role & context with clear constraints that reflect real-world limitations and organizational workflows",
  },
  {
    title: "Unambiguous",
    description: "Clear deliverable with explicit output format, structure, audience, and quality bar",
  },
  {
    title: "Challenging",
    description: "Sufficiently difficult to induce meaningful model learning—includes all 5 components: Role + Audience + Stakes, Scenario + Domain Specifics, Constraints + Challenges, Deliverables (Exact), and Input Files",
  },
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
    <div className="space-y-4">
      {qualities.map((quality, index) => (
        <label
          key={index}
          className="flex items-start gap-3 p-4 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
        >
          <Checkbox
            checked={checked[index] || false}
            onCheckedChange={() => handleCheck(index)}
            className="flex-shrink-0 mt-1"
          />
          <div className="flex-1">
            <span className="font-semibold text-foreground block">{quality.title}</span>
            <span className="text-sm text-muted-foreground mt-1 block">{quality.description}</span>
          </div>
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
