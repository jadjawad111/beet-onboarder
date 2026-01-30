import { useState, useEffect } from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProgressWidgetProps {
  moduleId: string;
  totalItems?: number;
  className?: string;
}

const ProgressWidget = ({ moduleId, totalItems = 12, className }: ProgressWidgetProps) => {
  const [completedItems, setCompletedItems] = useState(0);
  const [lastSection, setLastSection] = useState<string | null>(null);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem(`progress-${moduleId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedItems(data.completedItems || 0);
      setLastSection(data.lastSection || null);
    }
  }, [moduleId]);

  const percentage = Math.round((completedItems / totalItems) * 100);

  const handleResume = () => {
    if (lastSection) {
      const element = document.getElementById(lastSection);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className={cn(
      "sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border p-4 -mx-4 lg:-mx-8 px-4 lg:px-8",
      className
    )}>
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-muted stroke-current"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary stroke-current transition-all duration-500"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${percentage}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {percentage}%
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{completedItems}/{totalItems} complete</span>
            </div>
            <Progress value={percentage} className="h-2 mt-1" />
          </div>
        </div>

        {lastSection && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResume}
            className="gap-2"
          >
            <Play className="h-3 w-3" />
            Resume where you left off
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressWidget;
