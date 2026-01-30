import { Clock, Target, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionOverviewProps {
  title: string;
  learnings: string[];
  whyItMatters: string;
  timeEstimate?: string;
  className?: string;
}

const SectionOverview = ({ 
  title, 
  learnings, 
  whyItMatters, 
  timeEstimate = "3-5 min",
  className 
}: SectionOverviewProps) => {
  return (
    <div className={cn(
      "rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5 mb-6",
      className
    )}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <h4 className="font-semibold text-lg">{title}</h4>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
          <Clock className="h-3 w-3" />
          {timeEstimate}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* What You'll Learn */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Target className="h-4 w-4 text-primary" />
            What you'll learn
          </div>
          <ul className="space-y-1.5 pl-6">
            {learnings.map((learning, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed list-disc">
                {learning}
              </li>
            ))}
          </ul>
        </div>

        {/* Why It Matters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Lightbulb className="h-4 w-4 text-warning" />
            Why it matters
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-6">
            {whyItMatters}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionOverview;
