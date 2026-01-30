import { Link } from "react-router-dom";
import { BookOpen, Briefcase, ChevronRight, FileText, ClipboardList, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section - Presentation Style */}
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Training Portal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          Beet 2.0
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Your complete guide to project onboarding, training modules, and assessment preparation.
        </p>
      </section>

      {/* Two Main Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Section 1: Project Information */}
        <section className="group">
          <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Project Information</h2>
                <p className="text-sm text-muted-foreground">Beet 2.0 essentials</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                { label: "Welcome & Overview", to: "/onboarding/welcome" },
                { label: "Access & Setup", to: "/onboarding/access" },
                { label: "Workflow Guide", to: "/onboarding/workflow" },
                { label: "Tools & Resources", to: "/onboarding/tools" },
                { label: "FAQs", to: "/faqs" },
              ].map((item) => (
                <Link 
                  key={item.to}
                  to={item.to}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Educational Modules */}
        <section className="group">
          <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Educational Modules</h2>
                <p className="text-sm text-muted-foreground">Training & Assessment</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link 
                to="/education/prompt-writing"
                className="block p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all group/item"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <div>
                      <span className="font-medium text-foreground block">Prompt Writing</span>
                      <span className="text-sm text-muted-foreground">Master effective prompt creation</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                </div>
              </Link>
              
              <Link 
                to="/education/rubrics"
                className="block p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all group/item"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <div>
                      <span className="font-medium text-foreground block">Rubrics Creation</span>
                      <span className="text-sm text-muted-foreground">Build evaluation frameworks</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer note */}
      <footer className="text-center pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Complete all modules to qualify for the paid assessment.
        </p>
      </footer>
    </div>
  );
};

export default Index;
