import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Rocket, Clock, Sparkles, GraduationCap, ClipboardCheck, Hourglass, Users, BookOpen, Play, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyStep {
  step: number;
  title: string;
  description: string;
  href: string | null;
  icon: LucideIcon;
  active: boolean;
  isExternal?: boolean;
  isWaiting?: boolean;
}

const journeySteps: JourneyStep[] = [
  {
    step: 1,
    title: "Complete General Onboarding Module",
    description: "Review all essential project information and guidelines",
    href: "/onboarding",
    icon: Rocket,
    active: true,
  },
  {
    step: 2,
    title: "Complete Educational Modules",
    description: "Prompt Writing & Rubrics Creation training",
    href: "/education",
    icon: GraduationCap,
    active: true,
  },
  {
    step: 3,
    title: "Complete Project Beet 2.0 Assessment",
    description: "Paid qualification assessment",
    href: null,
    icon: ClipboardCheck,
    isExternal: true,
    active: true,
  },
  {
    step: 4,
    title: "Holding Time — Assessment Processing",
    description: "Your assessment is being reviewed",
    href: null,
    icon: Hourglass,
    active: true,
    isWaiting: true,
  },
  {
    step: 5,
    title: "Attend Kick-Off Sessions",
    description: "Once proceeded, join the orientation",
    href: null,
    icon: Users,
    active: false,
  },
  {
    step: 6,
    title: "Begin Project Beet 2.0 Onboarding",
    description: "Short project-specific orientation",
    href: null,
    icon: BookOpen,
    active: false,
  },
  {
    step: 7,
    title: "Begin Live Work",
    description: "Start working on assigned tasks",
    href: null,
    icon: Play,
    active: false,
  },
];

const JourneyChecklist = () => {
  const activeSteps = journeySteps.filter(s => s.active).length;
  const totalSteps = journeySteps.length;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-muted/20 shadow-xl">
      {/* Premium top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                <Rocket className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-secondary-foreground" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Your Journey</h2>
              <p className="text-muted-foreground">Follow these steps to get started</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Current Focus</div>
              <div className="text-lg font-bold text-primary">Steps 1–{activeSteps}</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex gap-1.5">
              {journeySteps.map((step, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    step.active 
                      ? "bg-gradient-to-br from-primary to-secondary shadow-sm shadow-primary/30" 
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-3">
          {journeySteps.map((item, index) => {
            const isGreyedOut = !item.active;
            
            const content = (
              <div
                className={cn(
                  "group relative flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl border transition-all duration-300",
                  isGreyedOut
                    ? "bg-muted/20 border-border/30"
                    : "bg-card hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Icon with Step Badge */}
                <div className="relative flex-shrink-0">
                  <div
                    className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                      isGreyedOut
                        ? "bg-muted/50"
                        : "bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105"
                    )}
                  >
                    <item.icon className={cn(
                      "w-6 h-6 md:w-7 md:h-7",
                      isGreyedOut ? "text-muted-foreground" : "text-primary"
                    )} />
                  </div>
                  {/* Step number badge in corner */}
                  <div
                    className={cn(
                      "absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md",
                      isGreyedOut
                        ? "bg-muted text-muted-foreground"
                        : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-primary/20"
                    )}
                  >
                    {item.step}
                  </div>
                  {item.isWaiting && !isGreyedOut && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center animate-pulse">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      "font-semibold text-base md:text-lg transition-colors",
                      isGreyedOut ? "text-muted-foreground/60" : "text-foreground group-hover:text-primary"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm mt-0.5 transition-colors",
                      isGreyedOut ? "text-muted-foreground/40" : "text-muted-foreground"
                    )}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Action indicator */}
                {!isGreyedOut && (
                  <div className="flex-shrink-0">
                    {item.href ? (
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ) : item.isExternal ? (
                      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ExternalLink className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ) : item.isWaiting ? (
                      <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xs font-medium text-amber-600">Pending</span>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Greyed out overlay text */}
                {isGreyedOut && (
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50">
                    <span className="text-xs font-medium text-muted-foreground/50">Coming Soon</span>
                  </div>
                )}
              </div>
            );

            // Wrap in Link if there's an href
            if (item.href && !isGreyedOut) {
              return (
                <Link key={item.step} to={item.href} className="block animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={item.step} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Bottom helper text */}
        <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Complete steps 1–4 to unlock the remaining journey</span>
        </div>
      </div>
    </section>
  );
};

export default JourneyChecklist;
