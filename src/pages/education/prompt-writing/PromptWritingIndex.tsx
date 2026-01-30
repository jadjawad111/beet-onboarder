import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Target, CheckCircle2, Sparkles, RotateCcw } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import beetIcon from "@/assets/beet-icon.png";

const resetPromptWritingProgress = () => {
  // Clear all prompt writing related localStorage keys
  const keysToRemove = Object.keys(localStorage).filter(key => 
    key.startsWith('prompt-writing-') || 
    key.startsWith('module-') ||
    key.startsWith('prompts-read') ||
    key.startsWith('bad-vs-good-') ||
    key.startsWith('failure-mode-') ||
    key.startsWith('checklist-') ||
    key.startsWith('beet-confetti-')
  );
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  toast({
    title: "Progress Reset",
    description: `Cleared ${keysToRemove.length} items. Reloading...`,
  });
  
  setTimeout(() => window.location.reload(), 500);
};

const modules = [
  {
    number: 1,
    title: "Introduction",
    subtitle: "The \"Knowledge Work\" Gap",
    description: "Understand why AI struggles with complex professional tasks and what makes Beet prompts different.",
    icon: BookOpen,
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    number: 2,
    title: "Unpacking the Prompt",
    subtitle: "Attributes & Model Failures",
    description: "Master the 7 core attributes and learn to craft prompts that expose AI weaknesses.",
    icon: Target,
    gradient: "from-secondary/20 to-primary/20",
  },
  {
    number: 3,
    title: "Validation Checklist",
    subtitle: "Requirements & Testing",
    description: "Use the definitive checklist to validate every prompt you write meets Beet 2.0 standards.",
    icon: CheckCircle2,
    gradient: "from-primary/20 to-secondary/20",
  },
];

const PromptWritingIndex = () => {
  return (
    <div className="space-y-12">
      <Breadcrumbs />
      {/* Hero Section */}
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
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Project Beet 2.0</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master the Art of
            <span className="block text-secondary">Prompt Writing</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Learn to craft professional prompts that challenge AI models with realistic, complex scenarios. 
            Your prompts will help build the next generation of AI capabilities.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/education/prompt-writing/course"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              Start Course
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
              <span>3 Interactive Modules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Core Attributes", value: "7", sublabel: "to master" },
          { label: "Failure Modes", value: "3", sublabel: "to exploit" },
          { label: "Checklist Items", value: "10+", sublabel: "to validate" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border shadow-sm"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
          </div>
        ))}
      </section>

      {/* Module Cards */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Learning Path</h2>
          <div className="flex-1 h-px bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={resetPromptWritingProgress}
            className="text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Progress
          </Button>
        </div>
        
        <div className="space-y-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.number}
                to={`/education/prompt-writing/module-${module.number}`}
                className="group relative flex items-start gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Module Number & Icon */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {module.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm font-medium text-primary/70 mb-3">
                        {module.subtitle}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
                
                {/* Progress Line Connector */}
                {index < modules.length - 1 && (
                  <div className="absolute left-[2.5rem] md:left-[3rem] top-full w-0.5 h-4 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={beetIcon} alt="" className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-bold text-foreground">Ready to become a Beet expert?</h3>
              <p className="text-muted-foreground">Complete all 3 modules to master prompt writing.</p>
            </div>
          </div>
          
          <Link
            to="/education/prompt-writing/course"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Start Course
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PromptWritingIndex;
