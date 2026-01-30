import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2,
  PlayCircle,
  Lightbulb,
  Puzzle,
  Sparkles,
  BookOpen,
  Layers,
  Scale,
  CheckSquare,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import ContentHeader from "@/components/layout/ContentHeader";

interface Module {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
}

interface Track {
  id: string;
  label: string;
  modules: Module[];
  to: string;
}

const tracks: Track[] = [
  {
    id: "prompt-writing",
    label: "Prompt Writing",
    to: "/education/prompt-writing",
    modules: [
      { id: "module-1", label: "Module 1: Fundamentals", to: "/education/prompt-writing/module-1", icon: Lightbulb },
      { id: "module-2", label: "Module 2: Advanced", to: "/education/prompt-writing/module-2", icon: Puzzle },
      { id: "module-3", label: "Module 3: Best Practices", to: "/education/prompt-writing/module-3", icon: Sparkles },
    ]
  },
  {
    id: "rubrics",
    label: "Rubrics Creation",
    to: "/education/rubrics",
    modules: [
      { id: "module-1", label: "Module 1: Introduction", to: "/education/rubrics/module-1", icon: BookOpen },
      { id: "module-2", label: "Module 2: Categories", to: "/education/rubrics/module-2", icon: Layers },
      { id: "module-3", label: "Module 3: Weights", to: "/education/rubrics/module-3", icon: Scale },
      { id: "module-4", label: "Module 4: Validation", to: "/education/rubrics/module-4", icon: CheckSquare },
    ]
  }
];

const EducationLayout = () => {
  const location = useLocation();
  const [expandedTracks, setExpandedTracks] = useState<string[]>(["prompt-writing", "rubrics"]);
  
  // Mock progress (would come from context/store)
  const [completedModules] = useState<string[]>([]);
  
  const toggleTrack = (trackId: string) => {
    setExpandedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isInTrack = (track: Track) => location.pathname.startsWith(track.to);
  const isOverview = location.pathname === "/education";
  
  const getTrackProgress = (track: Track) => {
    const completed = track.modules.filter(m => 
      completedModules.includes(`${track.id}/${m.id}`)
    ).length;
    return Math.round((completed / track.modules.length) * 100);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sub Navigation */}
      <aside className="w-72 border-r border-border bg-card flex-shrink-0">
        <div className="sticky top-0">
          {/* Resume Button */}
          <div className="p-4 border-b border-border">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
              <PlayCircle className="w-4 h-4" />
              Resume Learning
            </button>
          </div>

          {/* Track List */}
          <nav className="p-2">
            {tracks.map((track) => {
              const expanded = expandedTracks.includes(track.id);
              const inTrack = isInTrack(track);
              const progress = getTrackProgress(track);
              
              return (
                <div key={track.id} className="mb-2">
                  {/* Track Header */}
                  <button
                    onClick={() => toggleTrack(track.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left",
                      inTrack ? "bg-primary/5" : "hover:bg-muted"
                    )}
                  >
                    {expanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        "font-medium text-sm block",
                        inTrack ? "text-primary" : "text-foreground"
                      )}>
                        {track.label}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{progress}%</span>
                      </div>
                    </div>
                  </button>

                  {/* Modules */}
                  {expanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {track.modules.map((module) => {
                        const active = isActive(module.to);
                        const completed = completedModules.includes(`${track.id}/${module.id}`);
                        
                        return (
                          <Link
                            key={module.id}
                            to={module.to}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm",
                              active 
                                ? "bg-primary/10 text-primary" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {completed ? (
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            ) : (
                              <module.icon className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span className="truncate">{module.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        <ContentHeader 
          title={isOverview ? "Educational Modules" : ""}
          subtitle={isOverview ? "Complete both tracks to qualify for assessment" : undefined}
        />

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          {isOverview ? (
            <div className="max-w-4xl">
              <div className="grid md:grid-cols-2 gap-6">
                {tracks.map((track) => {
                  const progress = getTrackProgress(track);
                  
                  return (
                    <Link
                      key={track.id}
                      to={track.to}
                      className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {track.modules.length} Modules
                        </span>
                        <span className="text-sm font-medium text-primary">{progress}%</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {track.label}
                      </h3>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationLayout;
