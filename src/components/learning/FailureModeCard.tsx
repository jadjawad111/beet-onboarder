import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type FailureType = "extraction" | "reasoning" | "formatting";

interface FailureModeCardProps {
  type: FailureType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const typeConfig: Record<FailureType, { icon: typeof AlertCircle; color: string; bgColor: string }> = {
  extraction: {
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10 border-destructive/30 hover:border-destructive/50",
  },
  reasoning: {
    icon: Brain,
    color: "text-warning",
    bgColor: "bg-warning/10 border-warning/30 hover:border-warning/50",
  },
  formatting: {
    icon: FileText,
    color: "text-info",
    bgColor: "bg-info/10 border-info/30 hover:border-info/50",
  },
};

const FailureModeCard = ({ type, title, subtitle, children }: FailureModeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn("rounded-xl border-2 overflow-hidden transition-all", config.bgColor)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", config.bgColor)}>
          <Icon className={cn("h-6 w-6", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-5 pt-0 border-t border-inherit">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FailureModeCard;
