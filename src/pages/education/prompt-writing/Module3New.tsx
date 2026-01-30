import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ChecklistBoard, BeetProgressTracker, BeetConfetti } from "@/components/prompt-writing";
import { Link } from "react-router-dom";
import beetIcon from "@/assets/beet-icon.png";

const CHECKLIST_GROUPS = [
  {
    title: "Core Attributes",
    requirement: "ALL REQUIRED — If any Core Attribute is missing, the prompt must be revised.",
    requireAll: true,
    items: [
      {
        id: "attr-1",
        label: "1. Unambiguous",
        subItems: [
          "The primary task is clear and specific",
          "A professional would not need to ask clarifying questions",
          "Ambiguity, if present, reflects real-world messiness—not missing instructions",
          "The prompt allows reviewers to clearly distinguish model failure from prompt failure",
        ]
      },
      {
        id: "attr-2",
        label: "2. Professional Role & Context",
        subItems: [
          "A specific professional role is assigned",
          "The role implies a standard of judgment (seniority matters)",
          "The audience and stakeholders are clear",
          "The task has real professional stakes",
        ]
      },
      {
        id: "attr-3",
        label: "3. Realistic (Not Contrived)",
        subItems: [
          "The scenario plausibly occurs in real professional work",
          "Language mirrors real emails, memos, briefs, or instructions",
          "Artifacts referenced (files, layouts, contracts, spreadsheets) are realistic",
          "The prompt does not rely on puzzles, tricks, or artificial rules",
        ]
      },
      {
        id: "attr-4",
        label: "4. Timeless (Relative Dating)",
        subItems: [
          "The scenario defines its own internal \"current date\" or timeline",
          "The task does not depend on the model's real-world current date",
          "Dates and time references are internally consistent",
        ]
      },
      {
        id: "attr-5",
        label: "5. Clear Ask",
        subItems: [
          "The required deliverable is explicitly defined",
          "The output format is specified (memo, spreadsheet, PDF, plan, etc.)",
          "The intended audience and quality bar are clear",
          "The model does not need to guess how the work should be delivered",
        ]
      },
      {
        id: "attr-6",
        label: "6. Clear Constraints",
        subItems: [
          "Real-world constraints are explicitly stated",
          "Constraints create tradeoffs that require judgment",
          "\"Must not\" constraints are clear where relevant",
          "Constraints are professional—not arbitrary or gimmicky",
        ]
      },
      {
        id: "attr-7",
        label: "7. Possible to Solve",
        subItems: [
          "A competent human professional could complete the task with the given inputs",
          "No missing files, hidden rules, or secret logic",
          "Required domain knowledge matches the assigned role",
        ]
      },
    ]
  },
  {
    title: "Model Failure Modes",
    requirement: "AT LEAST ONE REQUIRED — A prompt is not a Beet prompt until it reliably induces one or more of these.",
    requireAll: false,
    items: [
      {
        id: "failure-a",
        label: "A. Extraction Failure",
        subItems: [
          "Hallucination: invents data to fill gaps",
          "Omission: misses critical information buried in the input",
          "Misinterpretation: reads data but applies it incorrectly (e.g., projections treated as actuals)",
        ]
      },
      {
        id: "failure-b",
        label: "B. Reasoning Failure",
        subItems: [
          "Dependency collapse: later steps ignore earlier results",
          "Constraint violation: ignores a \"must not\" to satisfy another goal",
          "Invalid inference: draws conclusions that are logically or professionally unsound",
        ]
      },
      {
        id: "failure-c",
        label: "C. Formatting / Deliverable Failure",
        subItems: [
          "Wrong output format",
          "Structural mismatch (memo vs email, static vs dynamic)",
          "Hard-coded or non-functional outputs where dynamic ones are required",
        ]
      },
    ]
  },
];

const Module3 = () => {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Mark module as complete when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          localStorage.setItem("prompt-module-3-complete", "true");
        }
      },
      { threshold: 0.5 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs />
      
      {/* Progress Tracker */}
      <BeetProgressTracker />

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION: Premium Module Header
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-warning via-warning/90 to-orange-500 p-8 md:p-12 mb-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beet */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 opacity-25">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-20 md:h-20 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">Step 3 of 3 — Final Step!</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Beet 2.0 Prompt
            <span className="block text-orange-100">Validation Checklist</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            The definitive checklist for validating every prompt you write. Use this as your final quality gate before submission.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <span className="text-2xl font-bold text-warning">7</span>
              <span className="text-sm font-medium text-foreground">Core Attributes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <span className="text-2xl font-bold text-warning">3</span>
              <span className="text-sm font-medium text-foreground">Failure Modes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <Trophy className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-foreground">Complete to Master</span>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-8">
        {/* Essential Context Card */}
        <article className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 md:p-10 shadow-lg">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-semibold uppercase tracking-wide">
              Essential Context
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
            A <strong className="text-primary">Beet 2.0 prompt</strong> is a realistic professional scenario designed to induce <strong className="text-primary">at least one meaningful model failure</strong> while satisfying <strong className="text-primary">all Core Attributes</strong>.
          </p>
          
          <div className="mt-6 p-5 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              A prompt is valid only if it satisfies <strong className="text-primary">every Core Attribute</strong> and induces <strong className="text-primary">at least one Failure Mode</strong> defined below.
            </p>
          </div>
        </article>

        {/* Interactive Checklist */}
        <ChecklistBoard 
          groups={CHECKLIST_GROUPS} 
          storagePrefix="pw-m3"
        />

        {/* Litmus Test - Enhanced */}
        <article className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 md:p-10 shadow-lg">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-semibold uppercase tracking-wide">
              Litmus Test
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Beet 2.0 Litmus Test
          </h3>
          
          <p className="text-lg text-muted-foreground mb-6">
            A prompt qualifies as Beet 2.0 only if:
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">It satisfies <strong className="text-primary">every Core Attribute</strong></span>
            </li>
            <li className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">It causes the model to fail via <strong className="text-primary">at least one defined Failure Mode</strong></span>
            </li>
          </ul>
          
          <div className="p-5 rounded-xl bg-warning/10 border-2 border-warning/30">
            <p className="text-lg text-foreground leading-relaxed font-medium">
              ⚠️ <strong className="text-warning">If the model output is perfect, the prompt has failed.</strong>
            </p>
          </div>
        </article>

        {/* Beet Confetti Button */}
        <BeetConfetti />

        {/* Completion CTA */}
        <div ref={bottomRef} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-success/10 via-card to-success/10 border-2 border-success/30 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">🎉 You've completed the Prompt Writing training!</h3>
                <p className="text-muted-foreground">You're now ready to write Beet 2.0 prompts. Next up: Rubrics Creation.</p>
              </div>
            </div>
            
            <Link
              to="/education/rubrics"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-success to-success/80 text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Continue to Rubrics
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Navigation - Enhanced */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-muted/30 via-card to-muted/30 p-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost"
              onClick={() => {
                navigate("/education/prompt-writing/module-2");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 text-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Unpacking the Prompt
            </Button>
            
            <Button 
              onClick={() => {
                navigate("/education/prompt-writing");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
            >
              Complete & Return
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module3;
