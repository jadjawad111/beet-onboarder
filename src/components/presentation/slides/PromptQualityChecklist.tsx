import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const qualities = [
  "Realistic to the actual job",
  "Clear and direct in what deliverable is being asked for",
  "Sufficiently complex and difficult so the model actually learns",
  "Succinct and unambiguous, such that multiple professionals would agree on what a good output looks like",
  "Timeless, with a clearly established current date of reference",
  "Includes clear implicit or explicit constraints",
];

const PromptQualityChecklist = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const handleCheck = (index: number) => {
    setChecked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-3">
      {qualities.map((quality, index) => (
        <label
          key={index}
          className="flex items-start gap-3 p-3 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
        >
          <Checkbox
            checked={checked[index] || false}
            onCheckedChange={() => handleCheck(index)}
            className="mt-0.5"
          />
          <span className="text-foreground leading-relaxed">{quality}</span>
        </label>
      ))}
    </div>
  );
};

export default PromptQualityChecklist;
