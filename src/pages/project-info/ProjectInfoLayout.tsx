import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import ContentHeader from "@/components/layout/ContentHeader";

const subNavItems = [
  { id: "welcome", label: "Welcome & Overview", to: "/project-info/welcome" },
  { id: "access", label: "Access & Setup", to: "/project-info/access" },
  { id: "workflow", label: "Workflow Guide", to: "/project-info/workflow" },
  { id: "tools", label: "Tools & Resources", to: "/project-info/tools" },
  { id: "faqs", label: "FAQs", to: "/project-info/faqs" },
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
  const isOverview = location.pathname === "/project-info";

  return (
    <div className="min-h-screen flex">
      {/* Sub Navigation */}
      <aside className="w-64 border-r border-border bg-card flex-shrink-0">
        <div className="sticky top-0">
          {/* Progress Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{completedCount}/{subNavItems.length}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(completedCount / subNavItems.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-2">
            {subNavItems.map((item, index) => {
              const active = isActive(item.to);
              const completed = isCompleted(item.id);
              
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors mb-1",
                    active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-medium flex-shrink-0",
                      active ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground"
                    )}>
                      {index + 1}
                    </div>
                  )}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
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
              
              <div className="space-y-3">
                {subNavItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                        isCompleted(item.id) ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted(item.id) ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                      </div>
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
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
