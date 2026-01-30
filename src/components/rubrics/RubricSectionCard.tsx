import { useState, ReactNode } from "react";
import { Lock, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RubricSectionCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  isLocked: boolean;
  isRead: boolean;
  children: ReactNode;
  sectionNumber: number;
  onMarkAsRead?: () => void;
  onLockedClick?: () => void;
  canMarkAsRead?: boolean; // If false, don't auto-mark as read when expanding
}

const RubricSectionCard = ({
  title,
  subtitle,
  icon,
  isLocked,
  isRead,
  children,
  sectionNumber,
  onMarkAsRead,
  onLockedClick,
  canMarkAsRead = true, // Default to true for backwards compatibility
}: RubricSectionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isLocked) {
      onLockedClick?.();
      return;
    }
    
    const wasExpanded = isExpanded;
    setIsExpanded(!isExpanded);
    
    // Mark as read when opening for the first time (only if canMarkAsRead is true)
    if (!wasExpanded && !isRead && onMarkAsRead && canMarkAsRead) {
      onMarkAsRead();
    }
  };

  const cardClasses = cn(
    "relative rounded-2xl border-2 transition-all duration-300 overflow-hidden",
    isLocked && "opacity-60 border-border/50 bg-muted/30",
    !isLocked && !isRead && "border-border bg-card shadow-md hover:shadow-lg",
    !isLocked && isRead && "border-green-500/30 bg-card shadow-md hover:shadow-lg"
  );

  return (
    <div className={cardClasses}>
      {/* Accent bar */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
          isLocked && "bg-muted",
          !isLocked && !isRead && "bg-gradient-to-r from-primary to-secondary",
          !isLocked && isRead && "bg-gradient-to-r from-green-500 to-green-400"
        )}
      />

      {/* Header - Always visible */}
      <button
        onClick={handleToggle}
        className={cn(
          "w-full p-6 text-left transition-colors",
          !isLocked && "hover:bg-muted/20 cursor-pointer",
          isLocked && "cursor-pointer hover:bg-muted/10"
        )}
      >
        <div className="flex items-center gap-4">
          {/* Section number badge */}
          <div 
            className={cn(
              "relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
              isLocked && "bg-muted",
              !isLocked && !isRead && "bg-gradient-to-br from-primary/15 to-secondary/10",
              !isLocked && isRead && "bg-green-500/10"
            )}
          >
            {isLocked ? (
              <Lock className="w-6 h-6 text-muted-foreground" />
            ) : (
              <span className={cn(isRead ? "text-green-600" : "text-primary")}>{icon}</span>
            )}
            
            {/* Number badge */}
            <span 
              className={cn(
                "absolute -top-1 -left-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center",
                isLocked && "bg-muted-foreground/20 text-muted-foreground",
                !isLocked && !isRead && "bg-primary text-primary-foreground",
                !isLocked && isRead && "bg-green-500 text-white"
              )}
            >
              {isRead ? "✓" : sectionNumber}
            </span>
          </div>

          {/* Title & subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 
                className={cn(
                  "text-lg md:text-xl font-bold transition-colors",
                  isLocked && "text-muted-foreground",
                  !isLocked && "text-foreground"
                )}
              >
                {title}
              </h3>
              
              {/* Read/Unread Badge */}
              {!isLocked && (
                <span 
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                    isRead 
                      ? "bg-green-500/15 text-green-700 dark:text-green-400" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isRead ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Read
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5" />
                      Not Read
                    </>
                  )}
                </span>
              )}
            </div>
            <p 
              className={cn(
                "text-sm mt-1",
                isLocked ? "text-muted-foreground/60" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          </div>

          {/* Expand indicator */}
          {!isLocked && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          )}
        </div>

        {/* Locked message */}
        {isLocked && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground/70 italic">
            <Lock className="w-4 h-4" />
            Complete the previous section to unlock
          </div>
        )}
      </button>

      {/* Expandable content */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6 space-y-6">
          {/* Divider */}
          <div className="border-t border-border" />

          {/* Content */}
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubricSectionCard;