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
  GraduationCap,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import beetIcon from "@/assets/beet-icon.png";

interface Module {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
}

interface Track {
  id: string;
  label: string;
  description: string;
  modules: Module[];
  to: string;
  coursePath: string;
}

const tracks: Track[] = [
  {
    id: "prompt-writing",
    label: "Prompt Writing",
    description: "Learn to craft prompts that challenge AI and expose knowledge gaps.",
    to: "/education/prompt-writing",
    coursePath: "/education/prompt-writing/course",
    modules: [
      { id: "module-1", label: "Module 1: Fundamentals", to: "/education/prompt-writing/module-1", icon: Lightbulb },
      { id: "module-2", label: "Module 2: Advanced", to: "/education/prompt-writing/module-2", icon: Puzzle },
      { id: "module-3", label: "Module 3: Best Practices", to: "/education/prompt-writing/module-3", icon: Sparkles },
    ]
  },
  {
    id: "rubrics",
    label: "Rubrics Creation",
    description: "Master the art of building evaluation criteria for AI responses.",
    to: "/education/rubrics",
    coursePath: "/education/rubrics/course",
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
  const isTrackOverview = (track: Track) => location.pathname === track.to;
  const currentTrack = tracks.find(t => location.pathname.startsWith(t.to));
  const isInsideTrack = !!currentTrack && !isOverview;
  
  const getTrackProgress = (track: Track) => {
    const completed = track.modules.filter(m => 
      completedModules.includes(`${track.id}/${m.id}`)
    ).length;
    return Math.round((completed / track.modules.length) * 100);
  };

  // Simple overview page - no sidebar
  if (isOverview) {
    return (
      <div className="min-h-screen">
        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/70 px-8 py-16 lg:py-20">
          {/* Bouncing beet */}
          <div className="absolute top-8 right-16 opacity-25">
            <img src={beetIcon} alt="" className="w-20 h-20 animate-bounce-slow" />
          </div>
          <div className="absolute bottom-8 right-1/3 opacity-15 hidden lg:block">
            <img src={beetIcon} alt="" className="w-14 h-14 animate-bounce-slow" style={{ animationDelay: '0.7s' }} />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Training Required
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Educational Modules
            </h1>
            <p className="text-lg text-white/90 max-w-xl">
              Complete both tracks to qualify for the assessment. Each course covers essential skills for Project Beet 2.0.
            </p>
          </div>
        </div>

        {/* Track Cards */}
        <div className="px-8 py-12">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {tracks.map((track) => {
              const progress = getTrackProgress(track);
              
              return (
                <div
                  key={track.id}
                  className="p-6 rounded-2xl border border-border bg-card"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {track.modules.length} Modules
                    </span>
                    {progress > 0 && (
                      <span className="text-sm font-medium text-primary">{progress}% complete</span>
                    )}
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {track.label}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {track.description}
                  </p>
                  
                  {/* Progress Bar */}
                  {progress > 0 && (
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Start Course Button */}
                  <Link
                    to={track.coursePath}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" />
                    {progress > 0 ? "Continue Course" : "Start Course"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Inside a track - show sidebar
  return (
    <div className="min-h-screen flex">
      {/* Sub Navigation */}
      <aside className="w-72 border-r border-border bg-card flex-shrink-0">
        <div className="sticky top-0">
          {/* Back to Overview */}
          <div className="p-4 border-b border-border">
            <Link 
              to="/education"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Courses
            </Link>
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
        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          {currentTrack && isTrackOverview(currentTrack) ? (
            /* Track Overview - Show modules in this track */
            <div className="max-w-4xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">{currentTrack.label}</h1>
                <p className="text-muted-foreground">
                  Complete all {currentTrack.modules.length} modules to finish this track.
                </p>
              </div>
              
              {/* Start Course Button */}
              <Link
                to={currentTrack.coursePath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors mb-8"
              >
                <PlayCircle className="w-5 h-5" />
                Start Full Course
              </Link>
              
              <div className="space-y-4">
                {currentTrack.modules.map((module, index) => {
                  const completed = completedModules.includes(`${currentTrack.id}/${module.id}`);
                  const Icon = module.icon;
                  
                  return (
                    <Link
                      key={module.id}
                      to={module.to}
                      className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        completed ? "bg-primary/10" : "bg-muted"
                      )}>
                        {completed ? (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        ) : (
                          <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {module.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {completed ? "Completed" : `Step ${index + 1} of ${currentTrack.modules.length}`}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Module Content */
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
