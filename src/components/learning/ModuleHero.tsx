import { useState, useEffect } from "react";
import { Play, ChevronDown, CheckCircle2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ModuleHeroProps {
  moduleNumber: number;
  title: string;
  subtitle: string;
  objectives: string[];
  sections: Array<{ id: string; title: string; anchor: string }>;
  moduleId: string;
}

const ModuleHero = ({
  moduleNumber,
  title,
  subtitle,
  objectives,
  sections,
  moduleId,
}: ModuleHeroProps) => {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [lastSection, setLastSection] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`coach-${moduleId}-completed`);
    if (saved) {
      setCompletedSections(new Set(JSON.parse(saved)));
    }
    const lastSaved = localStorage.getItem(`${moduleId}-last-section`);
    if (lastSaved) {
      setLastSection(lastSaved);
    }
  }, [moduleId]);

  const progressPercent = Math.round((completedSections.size / sections.length) * 100);
  const hasStarted = completedSections.size > 0 || lastSection;

  const handleStart = () => {
    const firstSection = sections[0];
    if (firstSection) {
      const element = document.getElementById(firstSection.anchor);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResume = () => {
    if (lastSection) {
      const element = document.getElementById(lastSection);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      handleStart();
    }
  };

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 md:p-8 mb-8">
      {/* Title Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Module {moduleNumber}
            </span>
            {progressPercent === 100 && (
              <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Complete
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button onClick={hasStarted ? handleResume : handleStart} className="gap-2">
            <Play className="h-4 w-4" />
            {hasStarted ? "Resume" : "Start"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Jump to
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-popover z-50">
              {sections.map((section) => (
                <DropdownMenuItem
                  key={section.id}
                  onClick={() => scrollToSection(section.anchor)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {completedSections.has(section.id) ? (
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/40 flex-shrink-0" />
                  )}
                  <span className="truncate">{section.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {completedSections.size} of {sections.length} sections complete
          </span>
          <span className="font-medium">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Learning Objectives */}
      <div className="rounded-xl border bg-card/50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold mb-3">
          <Target className="h-4 w-4 text-primary" />
          Learning Objectives
        </div>
        <ul className="grid md:grid-cols-2 gap-2">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {objective}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModuleHero;
