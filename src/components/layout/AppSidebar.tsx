import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Briefcase, 
  GraduationCap, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bot,
  Lock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import beetIcon from "@/assets/beet-icon.png";
import handshakeLogo from "@/assets/handshake-logo.png";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const primaryNav = [
  { 
    id: "home",
    label: "Home", 
    icon: Home, 
    to: "/home",
    locked: false,
  },
  { 
    id: "project-info",
    label: "Project Information", 
    icon: Briefcase, 
    to: "/project-info",
    locked: true, // LOCKED for dogfooding
  },
  { 
    id: "education",
    label: "Educational Modules", 
    icon: GraduationCap, 
    to: "/education",
    locked: false,
  },
  { 
    id: "tasking-assistance",
    label: "Beet Tasking Assistance", 
    icon: Bot, 
    to: "/tasking-assistance",
    locked: false,
  },
];

const secondaryNav = [
  { label: "FAQs", icon: HelpCircle, to: "/faqs" },
];

const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

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

      {/* Primary Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        <div className={cn("mb-4", collapsed ? "px-0" : "px-2")}>
          {!collapsed && (
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Main
            </span>
          )}
        </div>
        
        {primaryNav.map((item) => {
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
                
                {/* Tooltip for collapsed state */}
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
              
              {/* Tooltip for collapsed state */}
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