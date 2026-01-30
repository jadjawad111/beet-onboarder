import { Link } from "react-router-dom";
import { BookOpen, PenTool, Box, ArrowRight, GraduationCap, Sparkles, Trophy, Lock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";
import { cn } from "@/lib/utils";

const educationCategories = [
  {
    title: "Prompt Writing",
    description: "Master the art of creating prompts that challenge AI models with realistic, complex scenarios",
    icon: PenTool,
    href: "/education/prompt-writing",
    modules: 3,
    gradient: "from-secondary/20 to-primary/20",
    status: "Available",
    locked: false,
  },
  {
    title: "Rubrics Creation",
    description: "Master the process of creating Rubrics tasks",
    icon: Box,
    href: "/education/rubrics",
    modules: 3,
    gradient: "from-primary/20 to-secondary/20",
    status: "Available",
    locked: false,
  },
  {
    title: "Beet Specific Project Instructions",
    description: "Core guidelines and foundational knowledge for the project",
    icon: BookOpen,
    href: "/education/general",
    modules: 4,
    gradient: "from-primary/20 to-secondary/20",
    status: "Coming Soon",
    locked: true,
  },
];

const EducationIndex = () => {
  return (
    <div className="space-y-10">
      <Breadcrumbs />
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION: Premium Education Header
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 lg:p-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beet */}
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
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Project Beet 2.0</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Education
            <span className="block text-secondary">& Training</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Complete these training modules to develop your annotation skills and become a certified Beet expert.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/education/prompt-writing"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              Start with Prompt Writing
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-medium text-white">
                    {i}
                  </div>
                ))}
              </div>
              <span>3 Training Tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Training Tracks", value: "2", sublabel: "available" },
          { label: "Total Modules", value: "6", sublabel: "to complete" },
          { label: "Certification", value: "✓", sublabel: "on completion" },
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

      {/* Training Tracks */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Training Tracks</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 auto-rows-fr">
          {educationCategories.map((category) => {
            const Icon = category.icon;
            const isAvailable = category.status === "Available";
            const isLocked = category.locked;
            
            const cardContent = (
              <div
                className={cn(
                  "group relative flex flex-col h-full p-6 md:p-8 rounded-2xl bg-card border-2 shadow-md transition-all duration-300",
                  isLocked 
                    ? "border-border/50 opacity-60 cursor-not-allowed" 
                    : isAvailable 
                      ? "border-primary/30 hover:border-primary hover:shadow-xl" 
                      : "border-border hover:border-muted-foreground/50 hover:shadow-xl"
                )}
              >
                {/* Status Badge */}
                <div className={cn(
                  "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5",
                  isLocked
                    ? "bg-muted/50 text-muted-foreground border border-border/50"
                    : isAvailable 
                      ? "bg-success/15 text-success border border-success/30" 
                      : "bg-muted text-muted-foreground border border-border"
                )}>
                  {isLocked && <Lock className="w-3 h-3" />}
                  {category.status}
                </div>
                
                {/* Icon */}
                <div className="relative mb-6 mt-4">
                  <div className={cn(
                    "w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center transition-transform duration-300",
                    category.gradient,
                    !isLocked && "group-hover:scale-110"
                  )}>
                    <Icon className={cn(
                      "w-8 h-8 md:w-10 md:h-10",
                      isLocked ? "text-muted-foreground/50" : isAvailable ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className={cn(
                  "text-xl md:text-2xl font-bold mb-2 transition-colors",
                  isLocked 
                    ? "text-muted-foreground/60"
                    : isAvailable 
                      ? "text-foreground group-hover:text-primary" 
                      : "text-muted-foreground"
                )}>
                  {category.title}
                </h3>
                
                <p className={cn(
                  "leading-relaxed flex-1 mb-6",
                  isLocked ? "text-muted-foreground/50" : "text-muted-foreground"
                )}>
                  {category.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={cn(
                    "text-sm",
                    isLocked ? "text-muted-foreground/50" : "text-muted-foreground"
                  )}>
                    {category.modules} Modules
                  </span>
                  <div className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-all",
                    isLocked 
                      ? "text-muted-foreground/50"
                      : isAvailable 
                        ? "text-primary group-hover:gap-3" 
                        : "text-muted-foreground"
                  )}>
                    {isLocked ? "Locked" : isAvailable ? "Start Learning" : "Coming Soon"}
                    {isLocked ? <Lock className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </div>
                </div>
              </div>
            );

            // Don't wrap in Link if locked
            if (isLocked) {
              return <div key={category.title}>{cardContent}</div>;
            }
            
            return (
              <Link key={category.title} to={category.href}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Ready to get started?</h3>
              <p className="text-muted-foreground">Begin with Prompt Writing — our most popular track.</p>
            </div>
          </div>
          
          <Link
            to="/education/prompt-writing"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Start Prompt Writing
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EducationIndex;
