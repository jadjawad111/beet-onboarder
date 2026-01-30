import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Lock, AlertTriangle } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";
import { useModule2Completion } from "@/hooks/useModule2Completion";

interface ModuleStep {
  number: number;
  title: string;
  path: string;
}

const modules: ModuleStep[] = [
  { number: 1, title: "The Knowledge Work Gap", path: "/education/prompt-writing/module-1" },
  { number: 2, title: "Unpacking Beet 2.0", path: "/education/prompt-writing/module-2" },
  { number: 3, title: "The Prompt Checklist", path: "/education/prompt-writing/module-3" },
];

const BeetProgressTracker = () => {
  const location = useLocation();
  const module2Status = useModule2Completion();
  const [showBlockedTooltip, setShowBlockedTooltip] = useState(false);
  
  const getCurrentModuleIndex = () => {
    const index = modules.findIndex(m => location.pathname.includes(m.path));
    return index >= 0 ? index : 0;
  };
  
  const currentIndex = getCurrentModuleIndex();
  const progress = ((currentIndex + 1) / modules.length) * 100;

  const isModule3Locked = !module2Status.isComplete;

  const handleModuleClick = (e: React.MouseEvent, moduleIndex: number) => {
    if (moduleIndex === 2 && isModule3Locked) {
      e.preventDefault();
      setShowBlockedTooltip(true);
      setTimeout(() => setShowBlockedTooltip(false), 3000);
    }
  };

  return (
    <div className="mb-10">
      {/* Blocked tooltip */}
      {showBlockedTooltip && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-warning bg-card shadow-lg">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">Validation Checklist is locked</p>
              <p className="text-muted-foreground">Complete Unpacking the Prompt requirements first</p>
            </div>
          </div>
        </div>
      )}

      {/* Main tracker container */}
      <div className="card-surface p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={beetIcon} alt="Beet" className="w-8 h-8" />
            <span className="font-semibold text-foreground">Prompt Writing Journey</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {modules.length}
          </span>
        </div>

        {/* Progress track with beet */}
        <div className="relative mb-6">
          {/* Background track */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            {/* Filled progress */}
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Beet indicator on track */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{ left: `clamp(0px, calc(${progress}% - 16px), calc(100% - 32px))` }}
          >
            <div className="relative">
              <img 
                src={beetIcon} 
                alt="" 
                className="w-8 h-8 drop-shadow-md animate-bounce"
                style={{ animationDuration: '2s' }}
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg -z-10" />
            </div>
          </div>
        </div>

        {/* Module steps */}
        <div className="grid grid-cols-3 gap-2">
          {modules.map((module, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isUpcoming = index > currentIndex;
            const isLocked = index === 2 && isModule3Locked;
            
            const content = (
              <div
                className={cn(
                  "relative p-3 rounded-lg transition-all text-center group",
                  isCurrent && "bg-primary/10 ring-2 ring-primary/30",
                  isCompleted && "bg-muted/50 hover:bg-muted",
                  isUpcoming && !isLocked && "hover:bg-muted/30",
                  isLocked && "opacity-60 cursor-not-allowed bg-muted/20",
                )}
              >
                {/* Module number badge */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold transition-all",
                  isCurrent && "bg-primary text-primary-foreground",
                  isCompleted && "bg-primary/20 text-primary",
                  isUpcoming && !isLocked && "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20",
                  isLocked && "bg-muted text-muted-foreground",
                )}>
                  {isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    module.number
                  )}
                </div>
                
                {/* Module title */}
                <p className={cn(
                  "text-sm font-medium leading-tight",
                  isCurrent && "text-foreground",
                  isCompleted && "text-foreground",
                  isUpcoming && !isLocked && "text-foreground/70",
                  isLocked && "text-muted-foreground",
                )}>
                  {module.title}
                </p>
                
                {/* Current indicator */}
                {isCurrent && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}

                {/* Locked badge */}
                {isLocked && (
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-warning/20 border border-warning/40">
                    <span className="text-[10px] font-medium text-warning">Locked</span>
                  </div>
                )}
              </div>
            );

            if (isLocked) {
              return (
                <div
                  key={module.number}
                  onClick={(e) => handleModuleClick(e, index)}
                  className="cursor-not-allowed"
                >
                  {content}
                </div>
              );
            }
            
            return (
              <Link
                key={module.number}
                to={module.path}
                onClick={(e) => handleModuleClick(e, index)}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeetProgressTracker;
