import { cn } from "@/lib/utils";

type ProgressStatus = "not-started" | "in-progress" | "complete";

interface ProgressBadgeProps {
  status: ProgressStatus;
  className?: string;
}

const statusLabels: Record<ProgressStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete",
};

const ProgressBadge = ({ status, className }: ProgressBadgeProps) => {
  return (
    <span
      className={cn(
        "progress-badge",
        status === "not-started" && "progress-not-started",
        status === "in-progress" && "progress-in-progress",
        status === "complete" && "progress-complete",
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
};

export default ProgressBadge;
