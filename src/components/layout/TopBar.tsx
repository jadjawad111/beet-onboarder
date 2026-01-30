import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const TopBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Generate breadcrumb from path
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
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-secondary border-2 border-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground leading-none tracking-tight">Beet 2.0</span>
              <span className="text-[11px] text-muted-foreground font-medium">Training Portal</span>
            </div>
          </Link>

          {/* Breadcrumbs */}
          {breadcrumbs && (
            <nav className="hidden md:flex items-center gap-1.5 text-sm">
              <Link 
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <div key={crumb.to} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-border" />
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link 
                      to={crumb.to}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Mobile home link */}
          {!isHome && (
            <Link 
              to="/"
              className="md:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
