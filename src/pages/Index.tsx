import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Hero - Full width, minimal */}
      <section className="flex-1 flex items-center">
        <div className="w-full px-6 lg:px-16 py-20">
          <div className="max-w-5xl">
            <p className="text-sm text-muted-foreground mb-4">Training Portal</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight mb-6">
              Beet 2.0
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mb-12">
              Complete guide to project onboarding, training modules, and assessment preparation.
            </p>

            {/* Two main sections as full-width rows */}
            <div className="space-y-4">
              
              {/* Section 1: Project Information */}
              <div className="border-t border-border pt-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-foreground mb-1">Project Information</h2>
                    <p className="text-sm text-muted-foreground">Essentials and resources for Beet 2.0</p>
                  </div>
                  <span className="text-xs text-muted-foreground">5 items</span>
                </div>
                
                <div className="grid md:grid-cols-5 gap-3">
                  {[
                    { label: "Welcome", to: "/onboarding/welcome" },
                    { label: "Access", to: "/onboarding/access" },
                    { label: "Workflow", to: "/onboarding/workflow" },
                    { label: "Tools", to: "/onboarding/tools" },
                    { label: "FAQs", to: "/faqs" },
                  ].map((item) => (
                    <Link 
                      key={item.to}
                      to={item.to}
                      className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-foreground/20 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Section 2: Educational Modules */}
              <div className="border-t border-border pt-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-foreground mb-1">Educational Modules</h2>
                    <p className="text-sm text-muted-foreground">Training tracks and assessment</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 tracks</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Link 
                    to="/education/prompt-writing"
                    className="group flex items-start justify-between p-6 bg-card border border-border rounded-lg hover:border-foreground/20 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Prompt Writing</h3>
                      <p className="text-sm text-muted-foreground mb-3">Learn to write effective prompts for AI systems</p>
                      <span className="text-xs text-muted-foreground">3 modules</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </Link>

                  <Link 
                    to="/education/rubrics"
                    className="group flex items-start justify-between p-6 bg-card border border-border rounded-lg hover:border-foreground/20 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Rubrics Creation</h3>
                      <p className="text-sm text-muted-foreground mb-3">Build evaluation frameworks and scoring criteria</p>
                      <span className="text-xs text-muted-foreground">4 modules</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Complete all modules to qualify for the paid assessment.
        </p>
      </footer>
    </div>
  );
};

export default Index;
