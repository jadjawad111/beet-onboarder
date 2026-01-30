import { useState } from "react";
import { ChevronDown, AlertCircle, Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type FailureType = "extraction" | "reasoning" | "formatting";

interface FailureItem {
  name: string;
  description: string;
}

interface FailureCardProps {
  type: FailureType;
  title: string;
  subtitle: string;
  items: FailureItem[];
}

const typeConfig: Record<FailureType, { icon: typeof AlertCircle; color: string; bgColor: string }> = {
  extraction: {
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10 border-destructive/30",
  },
  reasoning: {
    icon: Brain,
    color: "text-warning",
    bgColor: "bg-warning/10 border-warning/30",
  },
  formatting: {
    icon: FileText,
    color: "text-info",
    bgColor: "bg-info/10 border-info/30",
  },
};

const FailureCard = ({ type, title, subtitle, items }: FailureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn("rounded-xl border overflow-hidden", config.bgColor)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", config.bgColor)}>
          <Icon className={cn("h-6 w-6", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        <div className="px-5 pb-5 pt-0 border-t border-inherit">
          <ul className="space-y-3 pt-4">
            {items.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className={cn("font-bold", config.color)}>•</span>
                <div>
                  <span className="font-semibold">{item.name}:</span>{" "}
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FailureCard;
