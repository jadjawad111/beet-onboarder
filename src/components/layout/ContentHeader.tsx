import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ChevronRight, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
}

const ContentHeader = ({ title, subtitle }: ContentHeaderProps) => {
  const location = useLocation();
  const [searchScope, setSearchScope] = useState<"section" | "all">("section");
  const [searchOpen, setSearchOpen] = useState(false);

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: { label: string; to: string }[] = [];
    
    const labelMap: Record<string, string> = {
      "project-info": "Project Information",
      "education": "Educational Modules",
      "welcome": "Welcome & Overview",
      "access": "Access & Setup",
      "workflow": "Workflow Guide",
      "tools": "Tools & Resources",
      "faqs": "FAQs",
      "prompt-writing": "Prompt Writing",
      "rubrics": "Rubrics Creation",
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
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      {/* Breadcrumbs */}
      <div className="h-10 px-6 flex items-center gap-2 text-sm border-b border-border/50 bg-muted/30">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <Home className="w-3.5 h-3.5" />
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.to} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            {i === breadcrumbs.length - 1 ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.to} className="text-muted-foreground hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Title + Search */}
      <div className="h-14 px-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 transition-all",
            searchOpen ? "w-80" : "w-auto"
          )}>
            {searchOpen ? (
              <div className="flex items-center gap-2 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    autoFocus
                  />
                </div>
                <select 
                  value={searchScope}
                  onChange={(e) => setSearchScope(e.target.value as "section" | "all")}
                  className="text-xs bg-muted border border-border rounded-lg px-2 py-2 focus:outline-none"
                >
                  <option value="section">This section</option>
                  <option value="all">All content</option>
                </select>
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-muted border border-border rounded-lg hover:border-primary/30 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded">
                  ⌘K
                </kbd>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;
