import { useState } from "react";
import { 
  CheckSquare, Square, AlertTriangle, ChevronDown, ChevronUp, 
  Search, Wrench, FileText, Lightbulb, XCircle, CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorCardProps {
  number: number;
  title: string;
  description: string;
  examplePrompt?: string;
  goodExamples: Array<{ content: string; explanation?: string; weight?: number; label?: string }>;
  badExamples: Array<{ content: string; explanation?: string; weight?: number; label?: string }>;
  missingExample?: string;
  howToDetect?: string[];
  howToFix?: string;
  isRead: boolean;
  onToggleRead: () => void;
  variant?: "general" | "specific";
}

const ErrorCard = ({
  number,
  title,
  description,
  examplePrompt,
  goodExamples,
  badExamples,
  missingExample,
  howToDetect,
  howToFix,
  isRead,
  onToggleRead,
  variant = "general",
}: ErrorCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Color schemes based on variant
  const isSpecific = variant === "specific";
  
  // Generate a short summary - first sentence only, max 100 chars
  const firstSentence = description.split(/(?<=[.!?])\s/)[0];
  const shortDescription = firstSentence.length > 100 
    ? firstSentence.substring(0, 97) + '...' 
    : firstSentence;

  return (
    <div className={cn(
      "rounded-2xl border-2 overflow-hidden transition-all duration-300",
      isRead 
        ? "border-success/40 bg-gradient-to-br from-success/5 to-card shadow-sm" 
        : isSpecific
          ? "border-amber-500/40 bg-gradient-to-br from-amber-500/5 to-card shadow-lg hover:shadow-xl"
          : "border-warning/40 bg-gradient-to-br from-warning/5 to-card shadow-lg hover:shadow-xl"
    )}>
      {/* Accent bar with gradient */}
      <div className={cn(
        "h-1.5 transition-colors duration-300",
        isRead 
          ? "bg-gradient-to-r from-success via-success/80 to-emerald-400" 
          : isSpecific
            ? "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500"
            : "bg-gradient-to-r from-warning via-orange-400 to-amber-500"
      )} />

      {/* Header */}
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          {/* Expandable section */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-start gap-4 flex-1 min-w-0 text-left group"
          >
            {/* Number badge with glow */}
            <div className="relative flex-shrink-0">
              <div className={cn(
                "relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105",
                isRead 
                  ? "bg-gradient-to-br from-success/20 to-emerald-500/10" 
                  : isSpecific
                    ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/10"
                    : "bg-gradient-to-br from-warning/20 to-orange-500/10"
              )}>
                <AlertTriangle className={cn(
                  "w-7 h-7 transition-transform duration-300 group-hover:scale-110",
                  isRead ? "text-success" : isSpecific ? "text-amber-600" : "text-warning"
                )} />
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl blur-lg opacity-30 -z-10",
                  isRead ? "bg-success" : isSpecific ? "bg-amber-500" : "bg-warning"
                )} />
              </div>
              {/* Number pill */}
              <span className={cn(
                "absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center shadow-md",
                isRead 
                  ? "bg-gradient-to-br from-success to-emerald-600 text-white" 
                  : isSpecific
                    ? "bg-gradient-to-br from-amber-600 to-yellow-600 text-white"
                    : "bg-gradient-to-br from-warning to-orange-500 text-white"
              )}>
                {number}
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className={cn(
                "text-xl font-bold transition-colors duration-200",
                isRead 
                  ? "text-success" 
                  : isSpecific 
                    ? "text-foreground group-hover:text-amber-600"
                    : "text-foreground group-hover:text-warning"
              )}>
                {title}
              </h3>
              
              {/* Expand hint */}
              <div className={cn(
                "flex items-center gap-1.5 mt-3 text-xs font-medium transition-colors",
                isExpanded ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Click to collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Click to learn more</span>
                  </>
                )}
              </div>
            </div>
          </button>

          {/* Mark as Read - RHS */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleRead();
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all flex-shrink-0 font-medium text-sm",
              isRead 
                ? "bg-gradient-to-r from-success/20 to-emerald-500/10 border-2 border-success/40 text-success shadow-sm" 
                : isSpecific
                  ? "bg-muted/50 border-2 border-border text-muted-foreground hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-600"
                  : "bg-muted/50 border-2 border-border text-muted-foreground hover:bg-warning/10 hover:border-warning/40 hover:text-warning"
            )}
          >
            {isRead ? (
              <>
                <CheckSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Understood</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4" />
                <span className="hidden sm:inline">Mark as Read</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable content */}
      <div className={cn(
        "transition-all duration-500 ease-out overflow-hidden",
        isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-5 md:px-6 pb-6 space-y-6">
          {/* Divider with gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Full Description Card */}
          <div className="rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">What is this error?</h4>
                <p className="text-base text-foreground/80 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>

          {/* Example Prompt */}
          {examplePrompt && (
            <div className="rounded-xl border-2 border-primary/25 bg-gradient-to-br from-primary/8 via-card to-secondary/5 p-5 shadow-md">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary">Example Prompt</span>
              </div>
              <div className="rounded-lg bg-muted/60 border border-border/60 p-4">
                <p className="text-sm text-foreground leading-relaxed">{examplePrompt}</p>
              </div>
            </div>
          )}

          {/* Missing Example - Special format for Missing Criteria error */}
          {missingExample && (
            <div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/8 to-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm font-bold text-amber-600">Example: What's Missing?</span>
              </div>
              
              <p className="text-sm text-foreground leading-relaxed">{missingExample}</p>
            </div>
          )}

          {/* Bad vs Good Comparison - Side by Side (only show if there are examples) */}
          {(badExamples.length > 0 || goodExamples.length > 0) && (
            <div className="grid gap-5 lg:grid-cols-2">
              {/* Bad Criterion */}
              <div className="rounded-xl border-2 border-destructive/30 bg-gradient-to-br from-destructive/8 to-card p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-destructive/15 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-destructive">Bad Criterion</span>
                    <span className="text-xs text-muted-foreground ml-2">({title.toLowerCase()})</span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  {badExamples.map((bad, idx) => (
                    <div key={`bad-${idx}`}>
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-foreground leading-relaxed flex-1">"{bad.content}"</p>
                          {bad.weight !== undefined && (
                            <span className={cn(
                              "text-xs font-bold px-2.5 py-1 rounded-full shrink-0",
                              bad.weight < 0 
                                ? "bg-destructive/20 text-destructive" 
                                : "bg-muted text-muted-foreground"
                            )}>
                              Weight: {bad.weight}
                            </span>
                          )}
                          {bad.label && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 bg-destructive/20 text-destructive">
                              {bad.label}
                            </span>
                          )}
                        </div>
                      </div>
                      {bad.explanation && (
                        <div className="mt-3 px-1">
                          <span className="text-xs font-bold text-destructive uppercase block mb-1">Why:</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{bad.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Good Criterion */}
              <div className="rounded-xl border-2 border-success/30 bg-gradient-to-br from-success/8 to-card p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-success/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-success">Good Criterion</span>
                    <span className="text-xs text-muted-foreground ml-2">(fixed)</span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  {goodExamples.map((good, idx) => (
                    <div key={`good-${idx}`}>
                      <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-foreground leading-relaxed flex-1">"{good.content}"</p>
                          {good.weight !== undefined && (
                            <span className={cn(
                              "text-xs font-bold px-2.5 py-1 rounded-full shrink-0",
                              good.weight < 0 
                                ? "bg-destructive/20 text-destructive" 
                                : "bg-success/20 text-success"
                            )}>
                              Weight: {good.weight}
                            </span>
                          )}
                          {good.label && (
                            <span className={cn(
                              "text-xs font-bold px-2.5 py-1 rounded-full shrink-0",
                              good.label === "Explicit" 
                                ? "bg-blue-500/20 text-blue-600" 
                                : "bg-purple-500/20 text-purple-600"
                            )}>
                              {good.label}
                            </span>
                          )}
                        </div>
                      </div>
                      {good.explanation && (
                        <div className="mt-3 px-1">
                          <span className="text-xs font-bold text-success uppercase block mb-1">Why:</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{good.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* How to Detect */}
          {howToDetect && howToDetect.length > 0 && (
            <div className="rounded-xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-card to-blue-500/5 p-5 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/15 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-400/10 rounded-full blur-xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">How to Detect</h4>
                    <p className="text-xs text-muted-foreground">Look for these warning signs</p>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  {howToDetect.map((item, idx) => {
                    const isQuickTest = item.toLowerCase().startsWith('quick test');
                    const isCommonTrap = item.toLowerCase().startsWith('common trap');
                    const isHighlight = isQuickTest || isCommonTrap;
                    
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "flex items-start gap-3 p-3.5 rounded-xl transition-all",
                          isHighlight 
                            ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border-2 border-cyan-500/30 shadow-sm" 
                            : "bg-white/50 dark:bg-white/5 border border-border/50 hover:border-cyan-500/30 hover:bg-cyan-500/5"
                        )}
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
                          isHighlight 
                            ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-md" 
                            : "bg-cyan-500/15 text-cyan-600"
                        )}>
                          {isHighlight ? "★" : idx + 1}
                        </div>
                        <div className="flex-1 pt-0.5">
                          {isHighlight && (
                            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wide block mb-1">
                              {isQuickTest ? "Quick Test" : "Common Trap"}
                            </span>
                          )}
                          <p className={cn(
                            "text-sm leading-relaxed",
                            isHighlight ? "text-foreground font-medium" : "text-foreground/80"
                          )}>
                            {isHighlight ? item.replace(/^(quick test|common trap):?\s*/i, '') : item}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* How to Fix */}
          {howToFix && (
            <div className="rounded-xl border-2 border-success/30 bg-gradient-to-r from-success/10 via-emerald-500/5 to-success/10 p-5 relative overflow-hidden">
              {/* Decorative sparkles */}
              <div className="absolute top-2 right-4 text-success/30 text-2xl">✨</div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-success text-lg mb-2">How to Fix</h4>
                  <p className="text-base text-foreground leading-relaxed">{howToFix}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
