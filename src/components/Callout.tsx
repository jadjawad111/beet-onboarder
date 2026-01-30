import { Info, AlertTriangle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "note" | "important" | "reminder";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons = {
  note: Info,
  important: AlertTriangle,
  reminder: Bell,
};

const Callout = ({ type, title, children, className }: CalloutProps) => {
  const Icon = icons[type];
  const defaultTitles = {
    note: "Note",
    important: "Important",
    reminder: "Reminder",
  };

  return (
    <div
      className={cn(
        "callout",
        type === "note" && "callout-info",
        type === "important" && "callout-danger",
        type === "reminder" && "callout-warning",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn(
          "h-5 w-5 flex-shrink-0 mt-0.5",
          type === "note" && "text-primary",
          type === "important" && "text-destructive",
          type === "reminder" && "text-warning"
        )} />
        <div>
          <p className="font-medium text-foreground">{title || defaultTitles[type]}</p>
          <div className="text-sm text-muted-foreground mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
