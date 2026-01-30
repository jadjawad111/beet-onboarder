import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import QualityBarOverlay from "./QualityBarOverlay";
import BeetIcon from "./BeetIcon";

const modules = [
  { id: 1, label: "Introduction", path: "/education/prompt-writing/module-1" },
  { id: 2, label: "Unpacking the Prompt", path: "/education/prompt-writing/module-2" },
  { id: 3, label: "Validation Checklist", path: "/education/prompt-writing/module-3" },
];

const PromptWritingLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine current module for progress
  const currentModuleIndex = modules.findIndex(m => location.pathname.includes(m.path));
  const progress = currentModuleIndex >= 0 ? ((currentModuleIndex + 1) / modules.length) * 100 : 0;

  // Show quality overlay when navigating to a new module
  useEffect(() => {
    const isModulePage = modules.some(m => location.pathname === m.path);
    if (isModulePage) {
      const lastShownModule = sessionStorage.getItem("quality-overlay-last-module");
      if (lastShownModule !== location.pathname) {
        setShowOverlay(true);
        sessionStorage.setItem("quality-overlay-last-module", location.pathname);
      }
    }
  }, [location.pathname]);

  const handleOverlayComplete = () => {
    setShowOverlay(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Quality Bar Overlay */}
      <QualityBarOverlay 
        isVisible={showOverlay} 
        onComplete={handleOverlayComplete} 
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Left: Project Beet wordmark */}
          <button 
            onClick={() => navigate("/education/prompt-writing")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <BeetIcon size="sm" />
            <span className="font-bold text-lg hidden sm:inline">Project Beet</span>
          </button>

          {/* Center: Module Navigation (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {modules.map((module) => (
              <NavLink
                key={module.id}
                to={module.path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {module.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: CTA + Mobile menu */}
          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 hidden sm:flex"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                MAIN PROMPT Page
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Progress Bar - Brand gradient */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-card p-4 space-y-2">
            {modules.map((module) => (
              <NavLink
                key={module.id}
                to={module.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {module.label}
              </NavLink>
            ))}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary"
            >
              MAIN PROMPT Page
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PromptWritingLayout;
