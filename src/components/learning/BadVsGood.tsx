import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadVsGoodProps {
  badExample: string;
  goodExample: string;
  badLabel?: string;
  goodLabel?: string;
  className?: string;
}

const BadVsGood = ({ 
  badExample, 
  goodExample, 
  badLabel = "Bad", 
  goodLabel = "Good",
  className 
}: BadVsGoodProps) => {
  return (
    <div className={cn("grid md:grid-cols-2 gap-4 my-6", className)}>
      {/* Bad Example */}
      <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border-b border-destructive/20">
          <X className="h-4 w-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">{badLabel}</span>
        </div>
        <div className="p-4">
          <p className="text-sm whitespace-pre-wrap">{badExample}</p>
        </div>
      </div>

      {/* Good Example */}
      <div className="rounded-xl border-2 border-success/30 bg-success/5 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border-b border-success/20">
          <Check className="h-4 w-4 text-success" />
          <span className="text-sm font-semibold text-success">{goodLabel}</span>
        </div>
        <div className="p-4">
          <p className="text-sm whitespace-pre-wrap">{goodExample}</p>
        </div>
      </div>
    </div>
  );
};

export default BadVsGood;
