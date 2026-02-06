import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Mail, MessageCircle, ExternalLink, Star, DollarSign, Clock, CheckCircle2, FileText, File, ClipboardList, ChevronDown, Sparkles } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Index = () => {
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
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/70 px-8 py-16 lg:py-20">
        {/* Bouncing beets */}
        <div className="absolute top-8 right-16 opacity-25">
          <img src={beetIcon} alt="" className="w-20 h-20 animate-bounce-slow" />
        </div>
        <div className="absolute bottom-8 right-1/3 opacity-15 hidden lg:block">
          <img src={beetIcon} alt="" className="w-14 h-14 animate-bounce-slow" style={{ animationDelay: '0.7s' }} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Training Portal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
            Welcome to Beet 2.0
          </h1>
         <p className="text-xl text-white/90 select-none" onDoubleClick={() => {
            const link = document.createElement('a');
            link.href = '/documentation/app-content.md';
            link.download = 'app-content.md';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>
            Training AI with Real-World Expertise
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12 max-w-5xl mx-auto space-y-12">
        
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            In Beet 2.0, you'll help train AI systems by designing realistic, challenging workflows drawn from your real professional work, and by reviewing and refining the rubrics used to evaluate model responses.
          </p>
        </section>

        {/* Your Goal - Workflow Diagram */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Goal</h2>
          <p className="text-muted-foreground mb-6">For each task, you will create:</p>
          
          <div className="space-y-4">
            {/* Step 1: Prompt */}
            <div className="p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">A Prompt</h3>
                  <p className="text-muted-foreground text-sm">
                    A realistic, complex workflow request from your real work that requires multi-step reasoning.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Files (nested under prompt) */}
            <div className="ml-8 p-4 rounded-xl border border-border bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">+ Input Files</h4>
                  <p className="text-muted-foreground text-sm">
                    Any documents, data, or historical files that provide important context for completing the task.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-2">
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>

            {/* Step 2: Ideal Deliverable */}
            <div className="p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">A Golden Example Deliverable</h3>
                  <p className="text-muted-foreground text-sm">
                    The complete file or set of files (e.g., Excel, PowerPoint, Word) you would produce in real work.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-2">
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>

            {/* Step 3: Revised Rubric */}
            <div className="p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">A Rubric</h3>
                  <p className="text-muted-foreground text-sm">
                    Criteria that define what makes a good response
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">What's Next?</h2>
          <div className="space-y-3">
            <Link 
              to="/instructions/prompt-writing"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">Complete this course</p>
                <p className="text-sm text-muted-foreground">You are required to complete the course. Upon completion, you will receive a code that unlocks your onboarding assessment.</p>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary to-secondary/70 text-white text-xs font-bold">
                <Star className="w-3 h-3 fill-current" />
                REQUIRED
              </div>
            </Link>

            <a 
              href="https://ai.joinhandshake.com/fellow/forms/686e5f85-49af-4816-a751-aaaaab3d97d8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">Complete the Onboarding Assessment</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>

            <a 
              href="https://ai.joinhandshake.com/admin/profiles"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <File className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 flex items-center">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">Start Your First Task at Handshake AI Platform</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </section>

        {/* Incentives Section */}
        <section className="p-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">Earn up to $1,200 for getting started</h2>
          
          {/* Horizontal flow with arrows */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
            {/* Step 1 */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border min-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">$500</p>
              <p className="text-xs text-muted-foreground text-center">Pass the onboarding assessment</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center px-2">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <div className="md:hidden py-1">
              <ChevronDown className="w-5 h-5 text-primary" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border min-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">$250</p>
              <p className="text-xs text-muted-foreground text-center">Your First Task Is Approved</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center px-2">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <div className="md:hidden py-1">
              <ChevronDown className="w-5 h-5 text-primary" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border min-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">$250</p>
              <p className="text-xs text-muted-foreground text-center">Your Second Task Is Approved</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center px-2">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <div className="md:hidden py-1">
              <ChevronDown className="w-5 h-5 text-primary" />
            </div>

            {/* Bonus */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 min-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">+$200</p>
              <p className="text-xs text-muted-foreground text-center">Pass within 48 hours</p>
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a 
              href="mailto:projectbeet@joinhandshake.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">Support Email</p>
                <p className="text-sm text-muted-foreground">projectbeet@joinhandshake.com</p>
              </div>
            </a>
            <a 
              href="https://discord.com/invite/vzngq3UWcS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#5865F2]/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#5865F2]" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-[#5865F2] transition-colors">Discord Community</p>
                <p className="text-sm text-muted-foreground">Primary communication channel</p>
              </div>
            </a>
          </div>
        </section>
      </div>

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
                <p className="text-sm text-muted-foreground">Your First Task Is Approved</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">$250</p>
                <p className="text-sm text-muted-foreground">Your Second Task Is Approved</p>
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
            Let's go!
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
