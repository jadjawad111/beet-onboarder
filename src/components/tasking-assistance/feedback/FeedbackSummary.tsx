import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeedbackSummaryProps {
  errorsCount: number;
  totalCount: number;
}

const FeedbackSummary = ({ errorsCount, totalCount }: FeedbackSummaryProps) => {
  const passedCount = totalCount - errorsCount;
  const allPassed = errorsCount === 0;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
      <div className="flex items-center gap-3">
        {allPassed ? (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        ) : (
          <AlertTriangle className="h-8 w-8 text-warning" />
        )}
        <div>
          <h3 className="font-semibold text-lg">Feedback Analysis</h3>
          <p className="text-sm text-muted-foreground">
            {allPassed 
              ? "All quality checks passed!" 
              : `${errorsCount} area${errorsCount > 1 ? 's' : ''} need${errorsCount === 1 ? 's' : ''} revision`
            }
          </p>
        </div>
      </div>
      <Badge 
        variant="outline" 
        className={allPassed
          ? "bg-green-500/20 text-green-400 border-green-500/30" 
          : "bg-warning/20 text-warning border-warning/30"
        }
      >
        {passedCount}/{totalCount} Passed
      </Badge>
    </div>
  );
};

export default FeedbackSummary;
