import { Mail, MessageSquare, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

const WorkflowPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
            Setup Guide
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Getting Set Up</h1>
        <p className="text-lg text-white/90 max-w-2xl">
          What happens next, what you need to do now, and what can wait.
        </p>
      </div>

      {/* Don't Take Assessment Yet */}
      <div className="flex gap-4 p-5 rounded-xl border-2 border-warning/40 bg-warning/5">
        <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Important</h3>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Do not take the assessment</strong> until you have read through this entire instruction manual and educational material.
          </p>
        </div>
      </div>

      {/* How You'll Access */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">How You'll Access Project Beet 2.0</h2>
        <div className="p-5 rounded-xl border border-border bg-card">
          <p className="text-muted-foreground mb-4">
            You should have received an email from Handshake inviting you to onboard. That email redirects you to the assessment.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-semibold text-foreground mb-2">New Fellows</h4>
              <p className="text-sm text-muted-foreground">
                Complete standard onboarding (identity verification, agreements) first, then proceed to assessment.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-semibold text-foreground mb-2">Existing Fellows</h4>
              <p className="text-sm text-muted-foreground">
                Email invite leads directly to the assessment. No additional onboarding required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Communication */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Communication & Support</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Slack (Primary)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Main channel for project communication. You'll be invited after:
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Completing general onboarding
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Signing the required contract
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Email Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              For access issues, blockers, or technical problems:
            </p>
            <a 
              href="mailto:projectbeet@joinhandshake.com" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border text-primary font-medium text-sm hover:border-primary/50 transition-colors"
            >
              projectbeet@joinhandshake.com
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Your Journey */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Where You Are Right Now</h2>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 rounded-xl border-2 border-primary/30 bg-primary/5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-primary">Step 1: Context & Preparation ← You are here</h4>
              <p className="text-sm text-muted-foreground">Complete onboarding and the assessment</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-foreground">Step 2: Review</h4>
              <p className="text-sm text-muted-foreground">Your submission is reviewed</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-foreground">Step 3: Detailed Information</h4>
              <p className="text-sm text-muted-foreground">If you pass, you receive project structure, tasking, and operational details</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Matters Now */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">What Matters Right Now</h2>
        <div className="grid gap-3">
          {[
            { num: 1, text: "Read and understand this onboarding material" },
            { num: 2, text: "Complete the educational modules (Prompt Writing + Rubrics)" },
            { num: 3, text: "Take the assessment when ready" },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                {item.num}
              </div>
              <span className="text-foreground font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-muted-foreground">
          You don't need to understand everything about the project yet. That comes later.
        </p>
      </section>
    </div>
  );
};

export default WorkflowPage;