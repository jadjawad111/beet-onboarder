import { Link } from "react-router-dom";
import { Rocket, GraduationCap, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";
import JourneyChecklist from "@/components/JourneyChecklist";

const sections = [
  {
    title: "General Onboarding",
    description: "Get started with everything you need to begin working on Project Beet 2.0",
    icon: Rocket,
    href: "/onboarding",
    gradient: "from-primary/20 to-secondary/20",
    status: "Start Here",
  },
  {
    title: "Education",
    description: "Complete training modules to develop your annotation skills",
    icon: GraduationCap,
    href: "/education",
    gradient: "from-secondary/20 to-primary/20",
    status: "2 Tracks",
  },
  {
    title: "Complete the Assessment",
    description: "Take the paid assessment to qualify for live work",
    icon: HelpCircle,
    href: "#", // External link to be provided
    gradient: "from-primary/20 to-secondary/20",
    status: "Required",
  },
];

const Index = () => {
  return (
    <div className="space-y-10">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION: Premium Homepage Header
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 lg:p-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beets */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-20">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-24 md:h-24 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        <div className="absolute bottom-8 right-1/4 opacity-15 hidden md:block">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-12 h-12 animate-bounce"
            style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Welcome to the Portal</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Project Beet
            <span className="block text-secondary">2.0</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
            Your complete onboarding and training portal for data annotation excellence. 
            Master the skills needed to create professional AI training data with Handshake AI.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/onboarding/welcome"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/90 border-2 border-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-white font-medium">3 Learning Tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Journey Steps", value: "6", sublabel: "to complete" },
          { label: "Training Modules", value: "6", sublabel: "available" },
          { label: "Quality Rating", value: "A+", sublabel: "target goal" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="relative text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
          </div>
        ))}
      </section>

      {/* Your Journey Checklist - Moved above Quick Navigation */}
      <JourneyChecklist />

      {/* Quick Start Cards */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Quick Navigation</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                to={section.href}
                className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-card border-2 border-border hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                  {section.status}
                </div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {section.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  {section.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={beetIcon} alt="" className="w-14 h-14" />
            <div>
              <h3 className="text-xl font-bold text-foreground">Ready to become a Beet expert?</h3>
              <p className="text-muted-foreground">Start with onboarding, then dive into education modules.</p>
            </div>
          </div>
          
          <Link
            to="/education"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Explore Education
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
