import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const pathLabels: Record<string, string> = {
  onboarding: "Project Onboarding",
  welcome: "Welcome & Quick Start",
  access: "Getting Access",
  workflow: "Workflow Overview",
  tools: "Tools Setup",
  communication: "Communication & Support",
  quality: "Quality Standards",
  checklist: "First Task Checklist",
  education: "Education",
  general: "General Project Instructions",
  "prompt-writing": "Prompt Writing",
  rubrics: "Rubrics Creation",
  "module-1": "Module 1",
  "module-2": "Module 2",
  "module-3": "Module 3",
  "module-4": "Module 4",
  faqs: "FAQs",
  "category-1": "FAQ Category 1",
  "category-2": "FAQ Category 2",
  "category-3": "FAQ Category 3",
  "category-4": "FAQ Category 4",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) return null;

  return (
    <nav className="mb-8">
      <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-card via-card to-muted/50 border border-border/50 shadow-sm backdrop-blur-sm">
        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200 hover:scale-110"
        >
          <Home className="h-3.5 w-3.5" />
        </Link>
        
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const label = pathLabels[segment] || segment;

          return (
            <span key={href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
              {isLast ? (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                  {label}
                </span>
              ) : (
                <Link
                  to={href}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-sm text-muted-foreground",
                    "hover:bg-muted hover:text-foreground transition-all duration-200"
                  )}
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
