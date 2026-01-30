import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, KeyRound, Workflow, Wrench, MessageSquare, Award, CheckSquare, Rocket, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";

const onboardingSteps = [
  {
    title: "Welcome",
    description: "Understand Human Data and Handshake AI's role",
    icon: BookOpen,
    href: "/onboarding/welcome",
    color: "from-indigo-200 to-purple-200 dark:from-indigo-900/50 dark:to-purple-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    badgeColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
    isSpecial: true,
  },
  {
    title: "Context Sharing, Beet 1.0",
    description: "Understand how Beet 1.0 worked and the shift to Beet 2.0",
    icon: KeyRound,
    href: "/onboarding/access",
    color: "from-secondary/20 to-primary/20",
  },
  {
    title: "Getting Set Up",
    description: "What happens next and what you need to do right now",
    icon: Workflow,
    href: "/onboarding/workflow",
    color: "from-primary/20 to-secondary/20",
  },
  {
    title: "Assessment Information",
    description: "What to expect from the qualification assessment",
    icon: Wrench,
    href: "/onboarding/tools",
    color: "from-secondary/20 to-primary/20",
  },
  {
    title: "Communication & Support",
    description: "Know how to get help and stay connected",
    icon: MessageSquare,
    href: "/onboarding/communication",
    color: "from-primary/20 to-secondary/20",
  },
];

const OnboardingIndex = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12">
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
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Getting Started</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Project Onboarding
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Complete these 5 steps to get fully set up with Project Beet. 
          Each step builds on the last to prepare you for success.
          </p>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: "Steps", value: "5", sublabel: "to complete" },
          { label: "Time", value: "~30", sublabel: "minutes total" },
          { label: "Status", value: "Ready", sublabel: "to begin" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="text-center p-4 md:p-5 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border/50 shadow-sm"
          >
            <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
          </div>
        ))}
      </section>

      {/* Steps List */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Your Onboarding Journey</h2>
            <p className="text-sm text-muted-foreground">Follow these steps in order for the best experience</p>
          </div>
        </div>

        <div className="space-y-4">
          {onboardingSteps.map((step, index) => {
            const Icon = step.icon;
            const isSpecial = 'isSpecial' in step && step.isSpecial;
            const iconColor = 'iconColor' in step ? step.iconColor : "text-primary";
            const badgeColor = 'badgeColor' in step ? step.badgeColor : "bg-primary";
            
            return (
              <Link
                key={step.title}
                to={step.href}
                className={`group relative flex items-start gap-5 p-5 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 ${
                  isSpecial 
                    ? "border-indigo-300 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900/50" 
                    : "border-border/60 hover:border-primary/30"
                }`}
              >
                {/* Special badge for Welcome */}
                {isSpecial && (
                  <div className="absolute -top-2 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold shadow-md">
                    Essential Reading
                  </div>
                )}
                
                {/* Icon Container with Number Badge */}
                <div className="relative flex-shrink-0">
                  {/* Number badge - top left corner of icon */}
                  <div className={`absolute -top-1 -left-1 z-10 w-5 h-5 rounded-md text-white text-[10px] font-bold flex items-center justify-center shadow-sm ${badgeColor}`}>
                    {index + 1}
                  </div>
                  {/* Icon box */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className={`font-semibold text-base transition-colors mb-1 ${
                    isSpecial 
                      ? "text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300" 
                      : "text-foreground group-hover:text-primary"
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow */}
                <ArrowRight className={`h-5 w-5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2 ${
                  isSpecial 
                    ? "text-indigo-400 group-hover:text-indigo-600" 
                    : "text-muted-foreground group-hover:text-primary"
                }`} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={beetIcon} alt="" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Ready to begin?</h3>
              <p className="text-sm text-muted-foreground">Start with Welcome</p>
            </div>
          </div>
          
          <Link
            to="/onboarding/welcome"
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OnboardingIndex;
