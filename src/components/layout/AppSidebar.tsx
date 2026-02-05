import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Briefcase, 
  GraduationCap, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bot,
  Lock,
  ExternalLink,
  ClipboardList,
  PenTool,
  FileText,
  GitBranch,
  Shield,
  Layers,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import beetIcon from "@/assets/beet-icon.png";
import handshakeLogo from "@/assets/handshake-logo.png";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

// Prompt Writing sub-sections
const promptWritingSections = [
  { id: "choose-task", label: "1. Choose a Task", icon: Briefcase },
  { id: "review-job", label: "2. Review Job Description", icon: FileText },
  { id: "select-workflow", label: "3. Select Workflow", icon: GitBranch },
  { id: "draft-prompt", label: "4. Prompt Requirements", icon: PenTool },
  { id: "example", label: "Example Breakdown", icon: Layers },
  { id: "input-files", label: "Input Files", icon: FileText },
  { id: "quality-gate", label: "5. Quality Checklist", icon: Shield },
];

// Main section - Educational content
const mainNav = [
  { 
    id: "home",
    label: "Home", 
    icon: Home, 
    to: "/home",
    locked: false,
  },
  { 
    id: "prompt-instructions",
    label: "Part 1: Prompt", 
    icon: PenTool, 
    to: "/instructions/prompt-writing",
    locked: false,
    hasSubNav: true,
  },
  { 
    id: "golden-response-instructions",
    label: "Part 2: Deliverable", 
    icon: FileText, 
    to: "/instructions/golden-response",
    locked: false,
  },
  { 
    id: "rubric-instructions",
    label: "Part 3: Rubrics", 
    icon: FileText, 
    to: "/instructions/rubric-writing",
    locked: false,
  },
  { 
    id: "interactive-examples",
    label: "Interactive Examples", 
    icon: ClipboardCheck, 
    to: "/instructions/interactive-examples",
    locked: false,
  },
];

// Project Tools section
const projectToolsNav = [
  { 
    id: "project-info",
    label: "Project Information", 
    icon: Briefcase, 
    to: "/project-info",
    locked: true, // LOCKED for dogfooding
  },
  // Hidden for now - Beet Tasking Assistance
  // { 
  //   id: "tasking-assistance",
  //   label: "Beet Tasking Assistance", 
  //   icon: Bot, 
  //   to: "/tasking-assistance",
  //   locked: false,
  // },
  { 
    id: "claim-sheet",
    label: "Claim Sheet", 
    icon: ClipboardList, 
    to: "/claim-sheet",
    locked: false,
  },
];

const secondaryNav = [
  { 
    id: "education",
    label: "Educational Modules", 
    icon: GraduationCap, 
    to: "/education",
  },
  { label: "FAQs", icon: HelpCircle, to: "/faqs" },
];

const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();
  const [promptWritingOpen, setPromptWritingOpen] = useState(true);
  
  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };
  
  // Get current section from URL hash or default to first
  const currentSection = location.hash.replace("#", "") || "choose-task";
  const isPromptWritingPage = location.pathname === "/instructions/prompt-writing";

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-border">
        <img src={beetIcon} alt="Beet" className="w-8 h-8" />
        {!collapsed && (
          <div>
            <span className="font-semibold text-foreground block leading-none">Beet 2.0</span>
            <span className="text-[10px] text-muted-foreground">Training Portal</span>
          </div>
        )}
      </div>

      {/* Handshake AI Platform Link */}
      <div className="px-2 py-3 border-b border-border">
        <a
          href="https://ai.joinhandshake.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all group relative",
            collapsed && "justify-center"
          )}
        >
          <img src={handshakeLogo} alt="Handshake AI" className={cn("w-5 h-5 object-contain flex-shrink-0", collapsed && "mx-auto")} />
          {!collapsed && (
            <>
              <span className="font-medium text-sm text-foreground flex-1">Handshake AI</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
          
          {/* Tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1">
              Handshake AI
              <ExternalLink className="w-3 h-3" />
            </div>
          )}
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {/* Home Link */}
        {mainNav.filter(item => item.id === "home").map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          
          return (
            <Link
              key={item.id}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group",
                active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}

        {/* Full Course Section */}
        <div className={cn("mb-2", collapsed ? "px-0" : "px-2")}>
          {!collapsed && (
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
             Full Course
            </span>
          )}
        </div>
        
        {mainNav.filter(item => item.id !== "home").map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          const isLocked = item.locked;
          
          if (isLocked) {
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group cursor-not-allowed",
                  "text-muted-foreground/50 bg-muted/30"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
                {!collapsed && (
                  <>
                    <span className="font-medium text-sm flex-1">{item.label}</span>
                    <Lock className="w-4 h-4 text-muted-foreground/50" />
                  </>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {item.label} (Locked)
                  </div>
                )}
              </div>
            );
          }
          
          // Special handling for Prompt Writing Instructions with sub-nav
          if (item.hasSubNav) {
            return (
              <div key={item.id}>
                <button
                  onClick={() => setPromptWritingOpen(!promptWritingOpen)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group",
                    active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                  )}
                  <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
                  {!collapsed && (
                    <>
                      <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        promptWritingOpen && "rotate-180"
                      )} />
                    </>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </button>
                
                {/* Sub-navigation dropdown */}
                {!collapsed && promptWritingOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border pl-3">
                    {promptWritingSections.map((section) => {
                      const SectionIcon = section.icon;
                      const isActiveSection = isPromptWritingPage && currentSection === section.id;
                      
                      return (
                        <Link
                          key={section.id}
                          to={`/instructions/prompt-writing#${section.id}`}
                          className={cn(
                            "flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-colors",
                            isActiveSection
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <SectionIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{section.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.id}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group",
                active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}

        {/* Project Tools Section */}
        <div className={cn("mt-6 mb-2", collapsed ? "px-0" : "px-2")}>
          {!collapsed && (
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Project Tools
            </span>
          )}
        </div>
        
        {projectToolsNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          const isLocked = item.locked;
          
          if (isLocked) {
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group cursor-not-allowed",
                  "text-muted-foreground/50 bg-muted/30"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
                {!collapsed && (
                  <>
                    <span className="font-medium text-sm flex-1">{item.label}</span>
                    <Lock className="w-4 h-4 text-muted-foreground/50" />
                  </>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {item.label} (Locked)
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.id}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group",
                active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="py-4 px-2 border-t border-border">
        {!collapsed && (
          <div className="px-2 mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Resources
            </span>
          </div>
        )}
        
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm group relative",
                active 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", collapsed && "mx-auto")} />
              {!collapsed && <span>{item.label}</span>}
              
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="h-12 flex items-center justify-center border-t border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};

export default AppSidebar;