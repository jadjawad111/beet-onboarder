import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const TopBar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
      <div className="h-full px-6 lg:px-12 xl:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-foreground">Beet 2.0</span>
        </Link>

        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
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

        {isHome && (
          <div className="flex items-center gap-6 text-sm">
            <Link to="/onboarding/welcome" className="text-muted-foreground hover:text-foreground transition-colors">
              Project Info
            </Link>
            <Link to="/education/prompt-writing" className="text-muted-foreground hover:text-foreground transition-colors">
              Education
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
