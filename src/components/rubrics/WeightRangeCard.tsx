import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FileText, Component } from "lucide-react";

interface WeightExample {
  criterion: string;
  weight: number;
  explanation: string;
  type?: "deliverable" | "asset";
}

interface WeightRangeCardProps {
  range: string;
  title: string;
  subtitle?: string;
  description: string;
  examples: WeightExample[];
  accentColor: string;
  icon?: ReactNode;
}

const WeightRangeCard = ({
  range,
  title,
  subtitle,
  description,
  examples,
  accentColor,
  icon,
}: WeightRangeCardProps) => {
  const getWeightColor = (weight: number) => {
    if (weight >= 80) return "bg-green-600 text-white";
    if (weight >= 50) return "bg-blue-500 text-white";
    if (weight >= 30) return "bg-amber-500 text-white";
    if (weight >= 10) return "bg-gray-500 text-white";
    return "bg-red-600 text-white";
  };

  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div 
        className={cn(
          "px-5 py-4",
          accentColor
        )}
      >
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/25 text-sm font-bold backdrop-blur-sm">
                {range}
              </span>
              <h4 className="font-bold text-lg">{title}</h4>
              {subtitle && (
                <span className="text-sm opacity-80">• {subtitle}</span>
              )}
            </div>
            <p className="text-sm opacity-90 mt-1.5 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* Examples Label */}
      <div className="px-5 py-3 bg-muted/30 border-b border-border">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          📝 Example Criteria
        </span>
      </div>

      {/* Examples */}
      <div className="divide-y divide-border">
        {examples.map((example, index) => (
          <div key={index} className="p-5 space-y-3 hover:bg-muted/20 transition-colors">
            <div className="flex items-start gap-4">
              <span 
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm",
                  getWeightColor(example.weight)
                )}
              >
                {example.weight > 0 ? "+" : ""}{example.weight}
              </span>
              <div className="flex-1 min-w-0">
                {example.type && (
                  <div className="flex items-center gap-1.5 mb-2">
                    {example.type === "deliverable" ? (
                      <FileText className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Component className="w-3.5 h-3.5 text-secondary" />
                    )}
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {example.type === "deliverable" ? "Deliverable-based" : "Asset-in-deliverable"}
                    </span>
                  </div>
                )}
                <p className="text-base text-foreground leading-relaxed">
                  "{example.criterion}"
                </p>
              </div>
            </div>
            <div className="ml-16 p-3 rounded-lg bg-muted/40 border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Why this weight:</span>{" "}
                {example.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightRangeCard;
