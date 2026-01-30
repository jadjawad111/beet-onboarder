import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home, CheckCircle2, Circle } from "lucide-react";

const TopBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Simple progress tracking (in real app, this would be from state/context)
  const progressItems = [
    { label: "Onboarding", done: false },
    { label: "Prompt Writing", done: false },
    { label: "Rubrics", done: false },
    { label: "Assessment", done: false },
  ];
  const completedCount = progressItems.filter(p => p.done).length;

  const getBreadcrumbs = () => {
    if (isHome) return null;
    
    const segments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: { label: string; to: string }[] = [];
    
    const labelMap: Record<string, string> = {
      "onboarding": "Project Info",
      "education": "Education",
      "prompt-writing": "Prompt Writing",
      "rubrics": "Rubrics",
      "faqs": "FAQs",
      "welcome": "Welcome",
      "access": "Access",
      "workflow": "Workflow",
      "tools": "Tools",
      "module-1": "Module 1",
      "module-2": "Module 2",
      "module-3": "Module 3",
      "module-4": "Module 4",
    };
    
    let path = "";
    segments.forEach((segment) => {
      path += `/${segment}`;
      breadcrumbs.push({
        label: labelMap[segment] || segment,
        to: path,
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="h-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-foreground block leading-none">Beet 2.0</span>
            <span className="text-[10px] text-muted-foreground">Training Portal</span>
          </div>
        </Link>

        {/* Progress Tracker - Only on home */}
        {isHome && (
          <div className="hidden md:flex items-center gap-1">
            {progressItems.map((item, i) => (
              <div key={item.label} className="flex items-center">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
                  {item.done ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-muted-foreground/50" />
                  )}
                  <span className={item.done ? "text-foreground" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </div>
                {i < progressItems.length - 1 && (
                  <div className="w-6 h-px bg-border mx-1" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Breadcrumbs - On subpages */}
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <div key={crumb.to} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-border" />
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to} className="text-muted-foreground hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Progress count badge */}
        {isHome && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{completedCount}/{progressItems.length}</span>
            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(completedCount / progressItems.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
