import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  PlayCircle,
  Home,
  KeyRound,
  Route,
  Wrench,
  HelpCircle,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import ContentHeader from "@/components/layout/ContentHeader";

interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
}

const subNavItems: NavItem[] = [
  { id: "welcome", label: "Welcome & Overview", to: "/project-info/welcome", icon: Home },
  { id: "access", label: "Access & Setup", to: "/project-info/access", icon: KeyRound },
  { id: "workflow", label: "Workflow Guide", to: "/project-info/workflow", icon: Route },
  { id: "tools", label: "Tools & Resources", to: "/project-info/tools", icon: Wrench },
  { id: "faqs", label: "FAQs", to: "/project-info/faqs", icon: HelpCircle },
];

const ProjectInfoLayout = () => {
  const location = useLocation();
  
  // Mock completion state (would come from context/store)
  const [completedItems] = useState<string[]>([]);
  
  const isActive = (path: string) => location.pathname === path;
  const isCompleted = (id: string) => completedItems.includes(id);
  
  const currentIndex = subNavItems.findIndex(item => isActive(item.to));
  const prevItem = currentIndex > 0 ? subNavItems[currentIndex - 1] : null;
  const nextItem = currentIndex < subNavItems.length - 1 ? subNavItems[currentIndex + 1] : null;
  
  const completedCount = completedItems.length;
  const progress = Math.round((completedCount / subNavItems.length) * 100);
  const isOverview = location.pathname === "/project-info";

  return (
    <div className="min-h-screen flex">
      {/* Sub Navigation - matches Education sidebar */}
      <aside className="w-72 border-r border-border bg-card flex-shrink-0">
        <div className="sticky top-0">
          {/* Progress Header with bar */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-[10px] text-muted-foreground">{progress}%</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-2">
            <div className="space-y-1">
              {subNavItems.map((item) => {
                const active = isActive(item.to);
                const completed = isCompleted(item.id);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.id}
                    to={item.to}
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
                      <Icon className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        <ContentHeader 
          title={isOverview ? "Project Information" : subNavItems.find(i => isActive(i.to))?.label || ""}
          subtitle={isOverview ? "Everything you need to get started" : undefined}
        />

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          {isOverview ? (
            <div className="max-w-3xl">
              <p className="text-muted-foreground mb-8">
                Complete these 5 sections to get fully set up with Project Beet 2.0. 
                Each section builds on the last to prepare you for success.
              </p>
              
              <div className="space-y-2">
                {subNavItems.map((item) => {
                  const completed = isCompleted(item.id);
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl">
              <Outlet />
              
              {/* Navigation Footer */}
              <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
                {prevItem ? (
                  <Link 
                    to={prevItem.to}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {prevItem.label}
                  </Link>
                ) : <div />}
                
                {nextItem && (
                  <Link 
                    to={nextItem.to}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Next: {nextItem.label}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoLayout;
