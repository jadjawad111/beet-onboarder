import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero */}
      <div className="px-6 lg:px-12 xl:px-20 pt-16 pb-12">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground">
          Beet 2.0
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-md">
          Training portal for project onboarding and certification.
        </p>
      </div>

      {/* Main Grid - Two Sections */}
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-20rem)]">
        
        {/* LEFT: Project Information */}
        <section className="relative border-t border-r border-border bg-card">
          {/* Section Header */}
          <div className="sticky top-14 bg-card z-10 px-6 lg:px-12 py-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Section 01</span>
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
                className="group flex items-center gap-6 px-6 lg:px-12 py-6 hover:bg-muted/50 transition-colors"
              >
                <span className="text-xs font-medium text-muted-foreground tabular-nums">{item.num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors">{item.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* RIGHT: Educational Modules */}
        <section className="relative border-t border-border bg-background">
          {/* Section Header */}
          <div className="sticky top-14 bg-background z-10 px-6 lg:px-12 py-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Section 02</span>
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
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-foreground/20 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Track A · 3 Modules</span>
                    <h3 className="text-2xl font-semibold text-foreground mt-2 mb-3">Prompt Writing</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Master the craft of writing clear, effective prompts that produce high-quality AI outputs.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors" />
                  </div>
                </div>
                
                {/* Module preview */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex gap-3">
                    {["Fundamentals", "Advanced Techniques", "Best Practices"].map((mod, i) => (
                      <span key={i} className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
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
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-foreground/20 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Track B · 4 Modules</span>
                    <h3 className="text-2xl font-semibold text-foreground mt-2 mb-3">Rubrics Creation</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Build comprehensive evaluation frameworks and scoring criteria for quality assessment.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors" />
                  </div>
                </div>
                
                {/* Module preview */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex gap-3 flex-wrap">
                    {["Introduction", "Categories", "Weights", "Validation"].map((mod, i) => (
                      <span key={i} className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Assessment CTA */}
            <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-dashed border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Ready for assessment?</h4>
                  <p className="text-sm text-muted-foreground mt-1">Complete both tracks to qualify for the paid certification.</p>
                </div>
                <div className="text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border">
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
