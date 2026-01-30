import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero with gradient banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary/80 px-6 lg:px-12 xl:px-20 py-16">
        {/* Bouncing beet */}
        <div className="absolute top-8 right-12 lg:right-24 opacity-30">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-20 h-20 lg:w-28 lg:h-28 animate-bounce-slow"
          />
        </div>
        <div className="absolute bottom-4 right-1/3 opacity-20 hidden lg:block">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-12 h-12 animate-bounce-slow"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Training Portal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Beet 2.0
          </h1>
          <p className="text-lg text-white/90 max-w-xl">
            Your complete guide to project onboarding, training modules, and assessment preparation.
          </p>
        </div>
      </div>

      {/* Main Grid - Two Sections */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-24rem)]">
        
        {/* LEFT: Project Information */}
        <section className="border-r border-border bg-card">
          {/* Section Header */}
          <div className="sticky top-14 bg-card z-10 px-6 lg:px-12 py-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Section 01</span>
                <h2 className="text-2xl font-semibold text-foreground mt-1">Project Information</h2>
              </div>
              <span className="text-sm text-muted-foreground">5 resources</span>
            </div>
          </div>

          {/* Links */}
          <div className="divide-y divide-border">
            {[
              { num: "01", label: "Welcome & Overview", desc: "Introduction to Beet 2.0 and what to expect", to: "/onboarding/welcome" },
              { num: "02", label: "Access & Setup", desc: "Get your accounts and tools configured", to: "/onboarding/access" },
              { num: "03", label: "Workflow Guide", desc: "Step-by-step process for completing tasks", to: "/onboarding/workflow" },
              { num: "04", label: "Tools & Resources", desc: "Software, links, and reference materials", to: "/onboarding/tools" },
              { num: "05", label: "FAQs", desc: "Answers to common questions", to: "/faqs" },
            ].map((item) => (
              <Link 
                key={item.to}
                to={item.to}
                className="group flex items-center gap-6 px-6 lg:px-12 py-6 hover:bg-accent/50 transition-colors"
              >
                <span className="text-xs font-medium text-primary/60 tabular-nums">{item.num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* RIGHT: Educational Modules */}
        <section className="bg-background">
          {/* Section Header */}
          <div className="sticky top-14 bg-background z-10 px-6 lg:px-12 py-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Section 02</span>
                <h2 className="text-2xl font-semibold text-foreground mt-1">Educational Modules</h2>
              </div>
              <span className="text-sm text-muted-foreground">2 tracks</span>
            </div>
          </div>

          {/* Module Cards */}
          <div className="p-6 lg:p-12 space-y-6">
            {/* Prompt Writing */}
            <Link 
              to="/education/prompt-writing"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Track A · 3 Modules</span>
                    <h3 className="text-2xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">Prompt Writing</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Master the craft of writing clear, effective prompts that produce high-quality AI outputs.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex gap-2 flex-wrap">
                    {["Fundamentals", "Advanced", "Best Practices"].map((mod) => (
                      <span key={mod} className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Rubrics Creation */}
            <Link 
              to="/education/rubrics"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Track B · 4 Modules</span>
                    <h3 className="text-2xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">Rubrics Creation</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Build comprehensive evaluation frameworks and scoring criteria for quality assessment.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex gap-2 flex-wrap">
                    {["Introduction", "Categories", "Weights", "Validation"].map((mod) => (
                      <span key={mod} className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Assessment CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Ready for assessment?</h4>
                  <p className="text-sm text-muted-foreground mt-1">Complete both tracks to qualify for the paid certification.</p>
                </div>
                <div className="text-xs text-primary font-medium px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Index;
