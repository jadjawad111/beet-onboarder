import { Link, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, PenTool, Box, Sparkles, Clock, Target } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";

const categoryInfo: Record<string, { 
  title: string; 
  description: string; 
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  gradient: string;
}> = {
  general: {
    title: "General Project Instructions",
    description: "Core guidelines and foundational knowledge for the project. Learn the essential principles that guide all annotation work.",
    icon: BookOpen,
    tagline: "Foundation",
    gradient: "from-primary via-primary/90 to-secondary",
  },
  "prompt-writing": {
    title: "Prompt Writing",
    description: "Master the art of creating prompts that challenge AI models with realistic, complex scenarios.",
    icon: PenTool,
    tagline: "Core Skill",
    gradient: "from-secondary via-primary/90 to-primary",
  },
  rubrics: {
    title: "Rubrics Creation",
    description: "Master the process of creating comprehensive rubrics for evaluating AI model outputs with precision and consistency.",
    icon: Box,
    tagline: "Advanced",
    gradient: "from-primary via-primary/90 to-secondary",
  },
};

const moduleData: Record<string, { title: string; description: string; duration: string }[]> = {
  general: [
    { title: "Project Overview", description: "Understand the project goals and your role", duration: "15 min" },
    { title: "Quality Standards", description: "Learn what makes high-quality annotations", duration: "20 min" },
    { title: "Best Practices", description: "Master the techniques that lead to success", duration: "25 min" },
    { title: "Common Mistakes", description: "Avoid pitfalls that can affect your work", duration: "15 min" },
  ],
  "prompt-writing": [
    { title: "Foundations of Prompt Writing", description: "Core concepts and the 70% failure rule", duration: "30 min" },
    { title: "Prompt Anatomy", description: "Structure and components of effective prompts", duration: "35 min" },
    { title: "Advanced Techniques", description: "Complex scenarios and edge cases", duration: "40 min" },
  ],
  rubrics: [
    { title: "Rubric Introduction", description: "Understanding evaluation criteria basics", duration: "5 min" },
    { title: "Criteria Design", description: "Creating clear and measurable criteria", duration: "25 min" },
    { title: "Scoring Guidelines", description: "Developing consistent scoring systems", duration: "30 min" },
    { title: "Edge Cases", description: "Handling ambiguous evaluation scenarios", duration: "25 min" },
  ],
};

const ModuleList = () => {
  const { category } = useParams<{ category: string }>();
  const info = categoryInfo[category || ""] || { 
    title: "Unknown", 
    description: "", 
    icon: BookOpen,
    tagline: "Module",
    gradient: "from-primary to-secondary"
  };
  const modules = moduleData[category || ""] || [];
  const Icon = info.icon;

  const totalDuration = modules.reduce((acc, m) => {
    const mins = parseInt(m.duration) || 0;
    return acc + mins;
  }, 0);

  return (
    <div className="space-y-8">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${info.gradient} p-8 md:p-12`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beet */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 opacity-20">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-20 md:h-20 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{info.tagline}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {info.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {info.description}
          </p>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: "Modules", value: modules.length.toString(), sublabel: "to complete", icon: Target },
          { label: "Duration", value: `~${totalDuration}`, sublabel: "minutes total", icon: Clock },
          { label: "Status", value: "Ready", sublabel: "to begin", icon: Sparkles },
        ].map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <div 
              key={i} 
              className="text-center p-4 md:p-5 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border/50 shadow-sm"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">{stat.value}</div>
              <div className="text-sm font-medium text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </div>
          );
        })}
      </section>

      {/* Modules List */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Learning Modules</h2>
            <p className="text-sm text-muted-foreground">Complete these modules in order for the best experience</p>
          </div>
        </div>

        <div className="space-y-3">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={`/education/${category}/module-${index + 1}`}
              className="group relative flex items-center gap-4 p-5 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon with Number Badge */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                {/* Subtle number badge */}
                <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                  {index + 1}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {module.description}
                </p>
              </div>
              
              {/* Duration Badge */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {module.duration}
              </div>
              
              {/* Arrow */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted/50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={beetIcon} alt="" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Ready to begin?</h3>
              <p className="text-sm text-muted-foreground">Start with {modules[0]?.title || "Module 1"}</p>
            </div>
          </div>
          
          <Link
            to={`/education/${category}/module-1`}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Start Learning
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ModuleList;
