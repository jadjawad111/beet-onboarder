import { useState, useEffect } from "react";
import { CheckCircle2, BookOpen, Target, AlertTriangle, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CoachPanelProps {
  moduleId: string;
  sections: Array<{
    id: string;
    title: string;
    anchor: string;
  }>;
  reminders?: string[];
  className?: string;
}

const CoachPanel = ({ moduleId, sections, reminders = [], className }: CoachPanelProps) => {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    // Load completion state from localStorage
    const saved = localStorage.getItem(`coach-${moduleId}-completed`);
    if (saved) {
      setCompletedSections(new Set(JSON.parse(saved)));
    }

    // Listen for section completion events
    const handleCompletion = (e: CustomEvent) => {
      setCompletedSections(prev => {
        const next = new Set(prev);
        next.add(e.detail.sectionId);
        localStorage.setItem(`coach-${moduleId}-completed`, JSON.stringify([...next]));
        return next;
      });
    };

    window.addEventListener('section-completed' as any, handleCompletion);
    return () => window.removeEventListener('section-completed' as any, handleCompletion);
  }, [moduleId]);

  // Track scroll position to highlight current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.anchor);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const completedCount = completedSections.size;
  const totalCount = sections.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className={cn(
      "bg-card border rounded-xl shadow-sm overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Learning Coach</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 lg:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Progress Ring */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted stroke-current"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary stroke-current transition-all duration-500"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${progressPercent}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
              {progressPercent}%
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{completedCount}/{totalCount} sections</p>
            <Progress value={progressPercent} className="h-1.5 mt-1" />
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isCollapsed ? "max-h-0" : "max-h-[2000px]"
      )}>
        {/* Section Navigation */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sections</span>
          </div>
          <nav className="space-y-1">
            {sections.map((section) => {
              const isCompleted = completedSections.has(section.id);
              const isCurrent = currentSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.anchor)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-sm transition-colors",
                    isCurrent && "bg-primary/10 text-primary font-medium",
                    !isCurrent && "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                  ) : (
                    <div className={cn(
                      "w-3.5 h-3.5 rounded-full border-2 flex-shrink-0",
                      isCurrent ? "border-primary" : "border-muted-foreground/40"
                    )} />
                  )}
                  <span className="truncate">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Key Reminders */}
        {reminders.length > 0 && (
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Remember</span>
            </div>
            <ul className="space-y-2">
              {reminders.map((reminder, index) => (
                <li key={index} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-warning">•</span>
                  {reminder}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Actions */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick Jump</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => scrollToSection('section-examples')}
            >
              Examples
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => scrollToSection('section-attributes')}
            >
              Attributes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => scrollToSection('section-mistakes')}
            >
              Mistakes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => {
                const element = document.querySelector('[data-knowledge-check]');
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              Self-Test
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CoachPanel;
