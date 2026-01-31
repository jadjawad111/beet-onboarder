import { Check, FileText, ClipboardList, ArrowDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StageConfig {
  completed?: boolean;
  highlighted?: boolean;
}

interface TaskProcessOverviewProps {
  title?: string;
  subtitle?: string;
  prompt?: StageConfig;
  inputFiles?: StageConfig;
  deliverable?: StageConfig;
  rubric?: StageConfig;
  showCompletedAnimation?: boolean;
}

const TaskProcessOverview = ({
  title = "The Task Process",
  subtitle = "Components that matter in doing this well",
  prompt = {},
  inputFiles = {},
  deliverable = {},
  rubric = {},
  showCompletedAnimation = false,
}: TaskProcessOverviewProps) => {
  const allCompleted = prompt.completed && inputFiles.completed && deliverable.completed && rubric.completed;

  const getStageStyles = (config: StageConfig, baseColor: string) => {
    if (config.completed) {
      return {
        border: "border-green-500",
        bg: "bg-green-500/10",
        text: "text-green-600",
        iconBg: "bg-green-500",
      };
    }
    if (config.highlighted) {
      return {
        border: `border-${baseColor}`,
        bg: `bg-${baseColor}/10`,
        text: `text-${baseColor}`,
        iconBg: `bg-${baseColor}`,
      };
    }
    return {
      border: "border-border",
      bg: "bg-muted/30",
      text: "text-muted-foreground",
      iconBg: "bg-muted",
    };
  };

  // Custom styles since Tailwind can't interpolate dynamic class names
  const getStageClasses = (config: StageConfig, highlightColor: string) => {
    if (config.completed) {
      return {
        card: "border-2 border-green-500 bg-green-500/10",
        title: "text-green-600",
        iconBg: "bg-green-500 text-white",
        arrow: "text-green-500",
      };
    }
    if (config.highlighted) {
      return {
        card: `border-2 ${highlightColor} bg-primary/10 ring-2 ring-primary/20 shadow-lg`,
        title: "text-primary font-bold",
        iconBg: "bg-primary text-primary-foreground",
        arrow: "text-primary",
      };
    }
    return {
      card: "border border-border bg-muted/30",
      title: "text-muted-foreground",
      iconBg: "bg-muted text-muted-foreground",
      arrow: "text-muted-foreground/50",
    };
  };

  const promptStyles = getStageClasses(prompt, "border-primary");
  const inputFilesStyles = getStageClasses(inputFiles, "border-primary");
  const deliverableStyles = getStageClasses(deliverable, "border-amber-500");
  const rubricStyles = getStageClasses(rubric, "border-primary");

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Big Picture</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>

      {/* Process Flow */}
      <div className="space-y-4">
        {/* Stage 1: Prompt + Inputs */}
        <div className="space-y-3">
          {/* Prompt */}
          <div className={cn("rounded-xl p-5 transition-all duration-500", promptStyles.card)}>
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500", promptStyles.iconBg)}>
                {prompt.completed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span className="text-xl font-bold">1</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className={cn("text-lg font-semibold transition-all duration-500", promptStyles.title)}>
                  Prompt
                </h3>
                <p className="text-sm text-muted-foreground">
                  The instruction that defines what the model should do
                </p>
              </div>
              {prompt.highlighted && (
                <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold animate-pulse">
                  CURRENT
                </div>
              )}
            </div>
          </div>

          {/* Input Files (nested under Prompt) */}
          <div className="ml-8">
            <div className={cn("rounded-xl p-4 transition-all duration-500", inputFilesStyles.card)}>
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500", inputFilesStyles.iconBg)}>
                  {inputFiles.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={cn("font-medium transition-all duration-500", inputFilesStyles.title)}>
                    + Input Files
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Supporting documents and data
                  </p>
                </div>
                {inputFiles.highlighted && (
                  <div className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold animate-pulse">
                    CURRENT
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className={cn("w-6 h-6 transition-all duration-500", 
            deliverable.completed || deliverable.highlighted ? "text-amber-500" : "text-muted-foreground/50"
          )} />
        </div>

        {/* Stage 2: Deliverable (Bronze/Gold) */}
        <div className={cn(
          "rounded-xl p-5 transition-all duration-500",
          deliverable.completed ? "border-2 border-green-500 bg-green-500/10" :
          deliverable.highlighted ? "border-2 border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20 shadow-lg" :
          "border border-border bg-muted/30"
        )}>
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
              deliverable.completed ? "bg-green-500 text-white" :
              deliverable.highlighted ? "bg-amber-500 text-white" :
              "bg-muted text-muted-foreground"
            )}>
              {deliverable.completed ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-xl font-bold">2</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className={cn(
                "text-lg font-semibold transition-all duration-500",
                deliverable.completed ? "text-green-600" :
                deliverable.highlighted ? "text-amber-600 font-bold" :
                "text-muted-foreground"
              )}>
                Deliverable
              </h3>
              <p className="text-sm text-muted-foreground">
                Your attempt at the actual output (Bronze response)
              </p>
              <p className="text-xs text-muted-foreground/70 italic mt-1">
                Use the deliverable to help inform the rubric
              </p>
            </div>
            {deliverable.highlighted && (
              <div className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold animate-pulse">
                CURRENT
              </div>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className={cn("w-6 h-6 transition-all duration-500", 
            rubric.completed || rubric.highlighted ? "text-primary" : "text-muted-foreground/50"
          )} />
        </div>

        {/* Stage 3: Rubric */}
        <div className={cn("rounded-xl p-5 transition-all duration-500", rubricStyles.card)}>
          <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500", rubricStyles.iconBg)}>
              {rubric.completed ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-xl font-bold">3</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className={cn("text-lg font-semibold transition-all duration-500", rubricStyles.title)}>
                Rubric
              </h3>
              <p className="text-sm text-muted-foreground">
                Criteria that define what makes a good response
              </p>
            </div>
            {rubric.highlighted && (
              <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold animate-pulse">
                CURRENT
              </div>
            )}
          </div>
        </div>

        {/* Completed Animation */}
        {showCompletedAnimation && allCompleted && (
          <div className="mt-8 p-6 rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-500/20 via-amber-500/20 to-primary/20 animate-in fade-in zoom-in duration-700">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-green-500" />
              <span className="text-xl font-bold text-foreground">All Components Complete!</span>
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-center text-muted-foreground mt-2">
              You now understand all the key parts of creating high-quality training data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskProcessOverview;
