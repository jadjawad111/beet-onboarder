import { Link } from "react-router-dom";
import { ArrowRight, Box, Target, Sparkles, Lock, CheckCircle2, RotateCcw, ClipboardCheck, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";
import { useRubricsModule1Completion } from "@/hooks/useRubricsModule1Completion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const modules = [
  { 
    number: 1,
    title: "Rubric Introduction", 
    subtitle: "Foundation & Judge Model",
    description: "Understanding evaluation criteria and the judge model that powers rubric-based assessment.", 
    icon: Box,
    gradient: "from-primary/20 to-secondary/20",
    requiresPrevious: false,
  },
  { 
    number: 2,
    title: "Anatomy of a Rubric", 
    subtitle: "Components & Structure",
    description: "Breaking down each component of a rubric: criteria, weights, categories, and rationale.", 
    icon: Target,
    gradient: "from-secondary/20 to-primary/20",
    requiresPrevious: true,
  },
  { 
    number: 3,
    title: "General Rubric Errors", 
    subtitle: "Common Pitfalls",
    description: "Learn to identify and avoid the most common mistakes when writing rubric criteria.", 
    icon: AlertTriangle,
    gradient: "from-primary/20 to-secondary/20",
    requiresPrevious: true,
  },
  { 
    number: 4,
    title: "Rubric Checklist", 
    subtitle: "Validation & Quality",
    description: "Comprehensive validation checklist to ensure every rubric meets quality standards.", 
    icon: ClipboardCheck,
    gradient: "from-secondary/20 to-primary/20",
    requiresPrevious: true,
  },
];

const RubricsIndex = () => {
  const module1Status = useRubricsModule1Completion();
  const [showBlockedTooltip, setShowBlockedTooltip] = useState(false);
  const [blockedModuleName, setBlockedModuleName] = useState("");
  const [, forceUpdate] = useState(0);
  

  // Get completion status for each module
  const isModule2Complete = localStorage.getItem("rubrics-module-2-complete") === "true";
  const isModule3Complete = localStorage.getItem("rubrics-module-3-complete") === "true";
  const isModule4Complete = localStorage.getItem("rubrics-module-4-complete") === "true";

  const getCompletedCount = () => {
    let count = 0;
    if (module1Status.isComplete) count++;
    if (isModule2Complete) count++;
    if (isModule3Complete) count++;
    if (isModule4Complete) count++;
    return count;
  };

  // Check if a module is locked based on previous module completion
  const isModuleLocked = (index: number): boolean => {
    if (index === 0) return false; // Module 1 is never locked
    if (index === 1) return !module1Status.isComplete; // Module 2 requires Module 1
    if (index === 2) return !isModule2Complete; // Module 3 requires Module 2
    // Module 4 has no restriction
    return false;
  };

  // Check if a module is completed
  const isModuleCompleted = (index: number): boolean => {
    if (index === 0) return module1Status.isComplete;
    if (index === 1) return isModule2Complete;
    if (index === 2) return isModule3Complete;
    if (index === 3) return isModule4Complete;
    return false;
  };

  const handleModuleClick = (e: React.MouseEvent, index: number, title: string) => {
    if (isModuleLocked(index)) {
      e.preventDefault();
      setBlockedModuleName(title);
      setShowBlockedTooltip(true);
      setTimeout(() => setShowBlockedTooltip(false), 3000);
    }
  };

  // Reset all Rubrics progress
  const handleResetProgress = () => {
    // Module 1
    localStorage.removeItem("rubrics-module-1-complete");
    
    // Module 2
    localStorage.removeItem("rubrics-module-2-sections-read");
    localStorage.removeItem("rubrics-module-2-complete");
    localStorage.removeItem("rubrics-criterion-guidelines-read");
    
    // Module 3
    localStorage.removeItem("rubrics-module-3-errors-read");
    localStorage.removeItem("rubrics-module-3-complete");
    
    // Module 4
    localStorage.removeItem("rubrics-module-4-checklist");
    localStorage.removeItem("rubrics-module-4-complete");
    localStorage.removeItem("rubrics-module-4-first-visit");
    
    // Force re-render
    forceUpdate(n => n + 1);
    window.location.reload();
  };

  return (
    <div className="space-y-12">
      <Breadcrumbs />
      
      {/* Blocked tooltip */}
      {showBlockedTooltip && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-warning bg-card shadow-lg">
            <Lock className="h-5 w-5 text-warning" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{blockedModuleName} is locked</p>
              <p className="text-muted-foreground">Complete the previous module first</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 lg:p-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beets */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-20">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-24 md:h-24 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        <div className="absolute bottom-8 right-1/4 opacity-15 hidden md:block">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-12 h-12 animate-bounce"
            style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Project Beet 2.0</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master the Art of
            <span className="block text-secondary">Rubrics Creation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Learn to create comprehensive rubrics that evaluate AI model outputs with precision and consistency. 
            Your rubrics will ensure high-quality training data.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/education/rubrics/module-1"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-medium text-white">
                    {i}
                  </div>
                ))}
              </div>
              <span>4 Interactive Modules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Rubric Components", value: "5", sublabel: "to master" },
          { label: "Error Types", value: "10", sublabel: "to avoid" },
          { label: "Checklist Items", value: "20+", sublabel: "to validate" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border shadow-sm"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
          </div>
        ))}
      </section>

      {/* Module Cards */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Learning Path</h2>
          <div className="flex-1 h-px bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetProgress}
            className="text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Progress
          </Button>
        </div>
        
        <div className="space-y-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            const isLocked = isModuleLocked(index);
            const isCompleted = isModuleCompleted(index);
            
            const content = (
              <div
                className={cn(
                  "group relative flex items-start gap-6 p-6 md:p-8 rounded-2xl border transition-all duration-300",
                  isLocked 
                    ? "border-border/30 bg-muted/30 opacity-60 cursor-not-allowed" 
                    : "bg-card border-border hover:border-primary/50 shadow-md hover:shadow-xl",
                  isCompleted && "border-green-500/30"
                )}
              >
                {/* Module Number & Icon */}
                <div className="flex-shrink-0 relative">
                  <div className={cn(
                    "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-transform duration-300",
                    isLocked 
                      ? "bg-muted" 
                      : `bg-gradient-to-br ${module.gradient} group-hover:scale-110`,
                    isCompleted && "bg-green-500/20"
                  )}>
                    {isLocked ? (
                      <Lock className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                    ) : (
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    )}
                  </div>
                  <div className={cn(
                    "absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold",
                    isLocked 
                      ? "bg-muted-foreground/20 text-muted-foreground" 
                      : "bg-primary text-primary-foreground",
                    isCompleted && "bg-green-500 text-white"
                  )}>
                    {isCompleted ? "✓" : module.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className={cn(
                          "text-xl md:text-2xl font-bold transition-colors",
                          isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
                        )}>
                          {module.title}
                        </h3>
                        {isLocked && (
                          <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-xs font-medium">
                            Locked
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-medium">
                            Complete
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-sm font-medium mb-3",
                        isLocked ? "text-muted-foreground/60" : "text-primary/70"
                      )}>
                        {module.subtitle}
                      </p>
                      <p className={cn(
                        "leading-relaxed",
                        isLocked ? "text-muted-foreground/60" : "text-muted-foreground"
                      )}>
                        {module.description}
                      </p>
                    </div>
                    
                    {!isLocked && (
                      <div className="flex-shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Line Connector */}
                {index < modules.length - 1 && !isLocked && (
                  <div className="absolute left-[2.5rem] md:left-[3rem] top-full w-0.5 h-4 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
              </div>
            );
            
            if (isLocked) {
              return (
                <div
                  key={index}
                  onClick={(e) => handleModuleClick(e, index, module.title)}
                >
                  {content}
                </div>
              );
            }
            
            return (
              <Link
                key={index}
                to={`/education/rubrics/module-${index + 1}`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={beetIcon} alt="" className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {isModule4Complete 
                  ? "Training Complete!" 
                  : isModule3Complete
                    ? "One more to go!"
                    : isModule2Complete 
                      ? "Almost there!" 
                      : module1Status.isComplete 
                        ? "Continue your training" 
                        : "Ready to become a Rubrics expert?"}
              </h3>
              <p className="text-muted-foreground">
                {isModule4Complete 
                  ? "You've completed all Rubrics training modules" 
                  : isModule3Complete
                    ? "Finish with Rubric Checklist"
                    : isModule2Complete 
                      ? "Continue with General Rubric Errors" 
                      : module1Status.isComplete 
                        ? "Continue with Anatomy of a Rubric" 
                        : "Complete all 4 modules to master rubric creation."}
              </p>
            </div>
          </div>
          
          {!isModule4Complete && (
            <Link
              to={isModule3Complete 
                ? "/education/rubrics/module-4"
                : isModule2Complete 
                  ? "/education/rubrics/module-3" 
                  : module1Status.isComplete 
                    ? "/education/rubrics/module-2" 
                    : "/education/rubrics/module-1"}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
            >
              {module1Status.isComplete ? "Continue Learning" : "Begin Module 1"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
          
          {isModule4Complete && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-700 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">All Complete</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RubricsIndex;