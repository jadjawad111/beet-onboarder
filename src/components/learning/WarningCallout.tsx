import { AlertTriangle, AlertCircle, Info, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type WarningType = "warning" | "danger" | "info" | "critical";

interface WarningCalloutProps {
  type?: WarningType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const config: Record<WarningType, { icon: typeof AlertTriangle; colors: string; defaultTitle: string }> = {
  warning: {
    icon: AlertTriangle,
    colors: "border-warning/40 bg-warning/10 text-warning",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    colors: "border-destructive/40 bg-destructive/10 text-destructive",
    defaultTitle: "Important",
  },
  info: {
    icon: Info,
    colors: "border-info/40 bg-info/10 text-info",
    defaultTitle: "Note",
  },
  critical: {
    icon: Flame,
    colors: "border-destructive/60 bg-destructive/20 text-destructive",
    defaultTitle: "Critical",
  },
};

const WarningCallout = ({ type = "warning", title, children, className }: WarningCalloutProps) => {
  const { icon: Icon, colors, defaultTitle } = config[type];

  return (
    <div className={cn("rounded-xl border-2 p-4 my-6", colors, className)}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold">{title || defaultTitle}</p>
          <div className="text-sm text-foreground/80 mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default WarningCallout;
