import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, GraduationCap, Lock, Mail, MessageCircle, ExternalLink, Star, DollarSign, Clock, CheckCircle2, X, Sparkles } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";
import handshakeLogo from "@/assets/handshake-logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Index = () => {
  // Project Information is locked for dogfooding
  const isProjectInfoLocked = true;
  const [showLockedDialog, setShowLockedDialog] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Show welcome modal on first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("beet-welcome-seen");
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem("beet-welcome-seen", "true");
    setShowWelcomeModal(false);
  };

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

      {/* Main Content with RHS Banner */}
      <div className="px-8 py-12">
        {/* Top Section: Cards + Handshake Banner side by side */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Column - Get Started + Need Help */}
          <div className="flex-1 max-w-4xl flex flex-col">
            <h2 className="text-lg font-semibold text-foreground mb-6">Get Started</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Information Card - LOCKED */}
              {isProjectInfoLocked ? (
                <div 
                  onClick={() => setShowLockedDialog(true)}
                  className="relative p-6 rounded-2xl border border-border bg-muted/30 cursor-pointer opacity-60 hover:opacity-70 transition-opacity"
                >
                  {/* Lock badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    <Lock className="w-3 h-3" />
                    Locked
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    Project Information
                  </h3>
                  <p className="text-muted-foreground/70 text-sm">
                    Everything you need to know about Beet 2.0 - setup, workflow, tools, and FAQs.
                  </p>
                </div>
              ) : (
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
                  <p className="text-muted-foreground text-sm">
                    Everything you need to know about Beet 2.0 - setup, workflow, tools, and FAQs.
                  </p>
                </Link>
              )}

              {/* Training Course Card */}
              <Link 
                to="/education/beet"
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all"
              >
                {/* Required Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary to-secondary/70 text-white text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  REQUIRED
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Project Beet 2.0 Training Course
                </h3>
                <p className="text-muted-foreground text-sm">
                  Complete the training course covering Prompt Writing and Rubrics to qualify.
                </p>
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-6 p-6 rounded-2xl border border-border bg-card flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="mailto:projectbeet@joinhandshake.com"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground group-hover:text-primary transition-colors">Support Email</p>
                    <p className="text-sm text-muted-foreground">projectbeet@joinhandshake.com</p>
                  </div>
                </a>
                <a 
                  href="https://discord.gg/M57meSRXcH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#5865F2]/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#5865F2]" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground group-hover:text-[#5865F2] transition-colors">Discord Community</p>
                    <p className="text-sm text-muted-foreground">Primary communication channel</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Handshake AI Platform Banner */}
          <div className="lg:w-80 xl:w-96 flex flex-col lg:pt-10">
            <a
              href="https://ai.joinhandshake.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary/70 hover:shadow-xl transition-all flex flex-col justify-between flex-1"
            >
              {/* Background logos */}
              <div className="absolute top-8 right-8 opacity-20">
                <img src={handshakeLogo} alt="" className="w-28 h-28 object-contain" />
              </div>
              <div className="absolute bottom-12 right-1/3 opacity-10">
                <img src={handshakeLogo} alt="" className="w-16 h-16 object-contain" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Main Platform
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Handshake AI Platform
                </h3>
                <p className="text-white/80 text-sm">
                  This is where most of your work happens. Access tasking, projects, and more.
                </p>
              </div>
              
              <div className="relative z-10 flex items-center gap-2 text-white font-medium mt-6 group-hover:translate-x-1 transition-transform">
                <span>Open Platform</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>

        {/* Onboarding & Tasking Incentives Section */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-2">Onboarding & Tasking Incentives</h2>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
            Earn up to $1,200 for getting started
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">$500</p>
              <p className="text-sm text-muted-foreground">Pass the onboarding assessment</p>
            </div>
            
            <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">$250</p>
              <p className="text-sm text-muted-foreground">Complete your first task</p>
            </div>
            
            <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">$250</p>
              <p className="text-sm text-muted-foreground">Complete your second task</p>
            </div>
            
            <div className="p-5 rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">+$200</p>
              <p className="text-sm text-muted-foreground">Bonus: Pass within 48 hours</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Bonuses are stackable. Complete onboarding fast and start earning immediately.
          </p>
        </div>

      </div>

      {/* Locked Dialog */}
      <Dialog open={showLockedDialog} onOpenChange={setShowLockedDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Thank You for Your Interest!
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              We will be sharing more details on the project via Discord.
            </DialogDescription>
          </DialogHeader>
          <a
            href="https://discord.gg/M57meSRXcH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 transition-colors group mt-2"
          >
            <div className="w-10 h-10 rounded-lg bg-[#5865F2]/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#5865F2]" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-[#5865F2] transition-colors">Join our Discord</p>
              <p className="text-xs text-muted-foreground">discord.gg/M57meSRXcH</p>
            </div>
          </a>
        </DialogContent>
      </Dialog>

      {/* Welcome Incentive Modal - First Visit Only */}
      <Dialog open={showWelcomeModal} onOpenChange={handleCloseWelcome}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-primary" />
              Welcome Incentive 🎉
            </DialogTitle>
            <DialogDescription className="pt-2 text-lg font-semibold text-foreground">
              Earn up to $1,200 just for getting started
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">$500</p>
                <p className="text-sm text-muted-foreground">For passing the onboarding assessment</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">$250</p>
                <p className="text-sm text-muted-foreground">For your first task</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">$250</p>
                <p className="text-sm text-muted-foreground">For your second task</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">+$200 bonus</p>
                <p className="text-sm text-muted-foreground">If you pass within 48 hours</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleCloseWelcome}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Got It
          </button>
          
          <p className="text-xs text-center text-muted-foreground">
            Bonuses are awarded after successful completion. Terms apply.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;