import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, GraduationCap, CheckCircle2, Clock } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/70 px-8 py-16 lg:py-24">
        {/* Bouncing beets */}
        <div className="absolute top-8 right-16 opacity-25">
          <img src={beetIcon} alt="" className="w-20 h-20 animate-bounce-slow" />
        </div>
        <div className="absolute bottom-8 right-1/3 opacity-15 hidden lg:block">
          <img src={beetIcon} alt="" className="w-14 h-14 animate-bounce-slow" style={{ animationDelay: '0.7s' }} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Training Portal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Welcome to Beet 2.0
          </h1>
          <p className="text-lg text-white/90 max-w-lg">
            Complete your onboarding and training to get started with the project.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-8 py-12">
        <h2 className="text-lg font-semibold text-foreground mb-6">Get Started</h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Project Information Card */}
          <Link 
            to="/project-info"
            className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              Project Information
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Everything you need to know about Beet 2.0 - setup, workflow, tools, and FAQs.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4" />
                0 of 5 complete
              </span>
            </div>
          </Link>

          {/* Training Course Card */}
          <Link 
            to="/education/prompt-writing/course"
            className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-foreground" />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              Project Beet 2.0 Training Course
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Complete the training course covering Prompt Writing and Rubrics to qualify.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                4 sections
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
