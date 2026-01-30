import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  FileText, 
  BookOpen, 
  Briefcase,
  Sparkles,
  CheckCircle2,
  Clock,
  Target
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/[0.08] via-transparent to-transparent blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-16">
          <div className="max-w-3xl">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">Training Portal</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
              Beet 2.0
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Your complete guide to project onboarding, training, and certification.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mb-12">
              {[
                { icon: Target, label: "2 Learning Tracks", sublabel: "Comprehensive training" },
                { icon: Clock, label: "Self-Paced", sublabel: "Learn on your schedule" },
                { icon: CheckCircle2, label: "Certification", sublabel: "Assessment included" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted/80 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link 
              to="/onboarding/welcome"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Section 1: Project Information */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-border/80 transition-colors h-full">
              {/* Section header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border border-border/50">
                    <Briefcase className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">Project Information</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Beet 2.0 essentials & resources</p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-1">
                {[
                  { label: "Welcome & Overview", to: "/onboarding/welcome", desc: "Introduction to the project" },
                  { label: "Access & Setup", to: "/onboarding/access", desc: "Get your accounts ready" },
                  { label: "Workflow Guide", to: "/onboarding/workflow", desc: "How to complete tasks" },
                  { label: "Tools & Resources", to: "/onboarding/tools", desc: "Software and links" },
                  { label: "FAQs", to: "/faqs", desc: "Common questions" },
                ].map((item, i) => (
                  <Link 
                    key={item.to}
                    to={item.to}
                    className="group/item flex items-center justify-between p-4 -mx-2 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-muted/80 flex items-center justify-center text-sm font-medium text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                        {i + 1}
                      </div>
                      <div>
                        <span className="font-medium text-foreground block">{item.label}</span>
                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Educational Modules */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-border/80 transition-colors h-full">
              {/* Section header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">Educational Modules</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Training & assessment</p>
                  </div>
                </div>
              </div>

              {/* Module cards */}
              <div className="space-y-4">
                <Link 
                  to="/education/prompt-writing"
                  className="group/card block p-6 rounded-2xl border border-border bg-background/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Prompt Writing</h3>
                        <p className="text-sm text-muted-foreground">3 Modules</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Master the art of crafting effective prompts for AI systems.
                  </p>
                </Link>

                <Link 
                  to="/education/rubrics"
                  className="group/card block p-6 rounded-2xl border border-border bg-background/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Rubrics Creation</h3>
                        <p className="text-sm text-muted-foreground">4 Modules</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Build comprehensive evaluation frameworks and scoring criteria.
                  </p>
                </Link>
              </div>

              {/* Bottom note */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Complete all modules to qualify for the paid assessment
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Index;
