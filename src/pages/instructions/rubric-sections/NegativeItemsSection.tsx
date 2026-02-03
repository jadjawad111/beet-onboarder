import { MinusCircle, AlertTriangle, PenTool, Scale, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NegativeItemsSection = () => {
  const whenToUse = [
    "The mistake is severe (misleading, unusable, or professionally unacceptable).",
    "The mistake is common.",
    "You want to prevent \"polished but wrong\" outputs from scoring well.",
  ];

  const howToWrite = [
    "Make it specific and observable, so a reviewer can mark it true/false quickly.",
    "Focus on high-impact failures, not minor style preferences.",
    "Avoid overlap with your positive criteria so you don't punish the same issue twice.",
  ];

  const howToChooseWeights = [
    {
      weight: "Large negative weights",
      when: "when the mistake breaks core instructions or makes the deliverable misleading.",
    },
    {
      weight: "Smaller negative weights",
      when: "when the mistake is still wrong, but not catastrophic.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <MinusCircle className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Negatively Weighted Criteria
            </h3>
            <p className="text-base text-foreground leading-relaxed">
              Penalties for common wrong responses
            </p>
          </div>
        </div>
      </div>

      {/* Definition */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-foreground leading-relaxed">
          A negatively weighted criterion is a clear, yes/no check for a serious mistake. It is written as a positive statement (something that could be true). If it is true, you apply a negative weight and reduce the score.
        </p>
      </div>

      {/* When to Use */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">Use Negatively Weighted Criteria When</h4>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {whenToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How to Write */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
          <PenTool className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">How to Write Strong Negative Criteria</h4>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {howToWrite.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How to Choose Weights */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
          <Scale className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">How to Choose Negative Weights</h4>
        </div>
        <div className="p-5 space-y-4">
          {howToChooseWeights.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 rounded-lg border",
                idx === 0
                  ? "bg-destructive/5 border-destructive/30"
                  : "bg-orange-500/5 border-orange-500/30"
              )}
            >
              <p className="text-foreground">
                <span className={cn(
                  "font-semibold",
                  idx === 0 ? "text-destructive" : "text-orange-600 dark:text-orange-400"
                )}>
                  {item.weight}
                </span>{" "}
                {item.when}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Guideline Callout */}
      <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/10 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
              Guideline
            </p>
            <p className="text-foreground leading-relaxed">
              Include at least <span className="font-bold text-amber-700 dark:text-amber-300">five negatively weighted criteria</span> in your rubric to catch major failures and penalize outputs that look good but fail in important ways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegativeItemsSection;
