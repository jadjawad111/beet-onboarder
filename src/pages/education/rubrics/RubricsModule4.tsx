import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, ClipboardCheck, CheckCircle2, Sparkles, BookOpen, CloudRain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";
import BeetConfetti, { triggerBeetConfetti } from "@/components/prompt-writing/BeetConfetti";
import RubricsProgressTracker from "@/components/rubrics/RubricsProgressTracker";
import ChecklistSection from "@/components/rubrics/ChecklistSection";
import { useRubricsModule4Completion } from "@/hooks/useRubricsModule4Completion";
import { useState, useEffect } from "react";

const MODULE_4_FIRST_VISIT_KEY = "rubrics-module-4-first-visit";
const CHECK_ALL_DELAY_MS = 10 * 60 * 1000; // 10 minutes

// Checklist sections data
const CHECKLIST_DATA = [
  {
    id: "A",
    letter: "A",
    title: "Criterion statement quality",
    items: [
      { id: "a1", text: "Atomic: Does it measure only one thing?" },
      { id: "a2", text: "Binary: Can it be judged clearly as true or false?" },
      { id: "a3", text: "Self-contained: Could a judge evaluate it using only the deliverable (no prompt, no inputs, no other criteria)?" },
      { id: "a4", text: 'Unambiguous: Does it avoid vague words like "good," "correct," "well-written," "appropriate"?' },
      { id: "a5", text: "No stacking: If there are multiple requirements, did you split them into multiple criteria?" },
      { id: "a6", text: 'No process words: Are you measuring the final output, not a process (for example "converted," "calculated correctly," "documented accurately")?' },
    ],
  },
  {
    id: "B",
    letter: "B",
    title: "Wording and referencing",
    items: [
      { id: "b1", text: "Uses a consistent template: Deliverable-based or asset-in-deliverable-based." },
      { id: "b2", text: 'References the deliverable semantically: "the audit plan," "the payroll template," not "the PDF" or "the output."' },
      { id: "b3", text: "Quotes used only when necessary: If quotes are present, does the prompt truly require exact text?" },
    ],
  },
  {
    id: "C",
    letter: "C",
    title: "Weight",
    items: [
      { id: "c1", text: "Weight matches impact: If it fails, is the penalty or loss of points proportional to the real-world consequence?" },
      { id: "c2", text: "Consistent with similar items: Criteria of similar importance have similar weights." },
    ],
  },
  {
    id: "D",
    letter: "D",
    title: "Category",
    items: [
      { id: "d1", text: "Chosen exactly one: Instruction Following, Reasoning, Extraction, or Formatting." },
      { id: "d2", text: "Category matches what the criterion measures." },
    ],
  },
  {
    id: "E",
    letter: "E",
    title: "Rationale",
    items: [
      { id: "e1", text: "Explains why the criterion matters for evaluating a good response." },
      { id: "e2", text: "Is written clearly and professionally." },
      { id: "e3", text: "Does not just restate the prompt or provide a casual justification." },
    ],
  },
  {
    id: "F",
    letter: "F",
    title: "Implicit vs Explicit",
    items: [
      { id: "f1", text: "Explicit if directly asked for in the prompt" },
      { id: "f2", text: "Implicit if it is implied or requires expert judgment, interpretation of inputs, or inference from intermediate steps to arrive at the explicit request." },
    ],
  },
  {
    id: "G",
    letter: "G",
    title: "Negative criteria (if applicable)",
    items: [
      { id: "g1", text: "The criterion is positively stated and describes a mistake you want to punish." },
      { id: "g2", text: "If it evaluates true, it should clearly represent an egregious or common failure mode." },
      { id: "g3", text: "Negative weight magnitude matches severity (bigger negatives for more harmful mistakes)." },
      { id: "g4", text: "Not used for minor preferences (colors, optional polish, personal style)." },
    ],
  },
  {
    id: "H",
    letter: "H",
    title: "Generalizable rubric rule",
    items: [
      { id: "h1", text: "Would this criterion still score alternative correct responses as correct?" },
      { id: "h2", text: 'Does this criterion accidentally lock the rubric to one narrow "expected" phrasing or format?' },
    ],
  },
];

const RubricsModule4 = () => {
  const navigate = useNavigate();
  const [canShowCheckAll, setCanShowCheckAll] = useState(false);
  
  const {
    isLoaded,
    isModuleComplete,
    toggleChecklistItem,
    checkAllInSection,
    resetSection,
    isSectionComplete,
    allChecklistComplete,
    completeModule,
    checklistChecked,
    checklistItems,
  } = useRubricsModule4Completion();

  // Track first visit time and enable "Check All" after 10 minutes
  useEffect(() => {
    const storedTime = localStorage.getItem(MODULE_4_FIRST_VISIT_KEY);
    const now = Date.now();
    
    if (!storedTime) {
      // First visit - store timestamp
      localStorage.setItem(MODULE_4_FIRST_VISIT_KEY, String(now));
    }
    
    const firstVisit = storedTime ? parseInt(storedTime, 10) : now;
    const elapsed = now - firstVisit;
    
    if (elapsed >= CHECK_ALL_DELAY_MS) {
      setCanShowCheckAll(true);
    } else {
      // Set a timer for when 10 min is reached
      const remainingTime = CHECK_ALL_DELAY_MS - elapsed;
      const timer = setTimeout(() => {
        setCanShowCheckAll(true);
      }, remainingTime);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCompleteModule = () => {
    completeModule();
    triggerBeetConfetti();
  };

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <Breadcrumbs />
      
      {/* Beet Confetti Component */}
      <BeetConfetti showButton={false} />

      {/* Progress Tracker */}
      <RubricsProgressTracker />

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 mb-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
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
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Step 4 of 4 — Final Step!</span>
            </div>
            {isModuleComplete && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Rubric Checklist
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Use this comprehensive checklist to validate every rubric item before submission.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">8-Part Checklist</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RUBRIC ITEM CHECKLIST
          ═══════════════════════════════════════════════════════════════ */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6 md:p-8 mb-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Rubric Item Checklist</h2>
              <p className="text-sm text-muted-foreground">Use this checklist for every rubric item before you submit it</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground">
              Complete all {Object.values(checklistItems).flat().length} checklist items across 8 categories.
            </p>
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              allChecklistComplete 
                ? "bg-green-500/15 text-green-700 dark:text-green-400"
                : "bg-muted text-muted-foreground"
            }`}>
              {checklistChecked.length}/{Object.values(checklistItems).flat().length} checked
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {CHECKLIST_DATA.map((section) => (
            <ChecklistSection
              key={section.id}
              id={section.id}
              letter={section.letter}
              title={section.title}
              items={section.items}
              checkedItems={checklistChecked}
              onToggleItem={toggleChecklistItem}
              onCheckAll={canShowCheckAll ? checkAllInSection : undefined}
              onResetSection={resetSection}
              isComplete={isSectionComplete(section.id)}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          COMPLETE MODULE BUTTON
          ═══════════════════════════════════════════════════════════════ */}
      {!isModuleComplete && (
        <div className="mt-10">
          <Button
            onClick={handleCompleteModule}
            className="w-full gap-3 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white transition-all group"
          >
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            Complete Rubrics Training
            <CheckCircle2 className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-muted/30 via-card to-muted/30 p-6 mt-10">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost"
            onClick={() => {
              navigate("/education/rubrics/module-3");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="gap-2 text-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Common Errors
          </Button>
          
          {isModuleComplete && (
            <Button 
              onClick={() => {
                navigate("/education/rubrics");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-white"
            >
              <CheckCircle2 className="h-4 w-4" />
              Rubrics Training Complete!
            </Button>
          )}
        </div>
      </div>

      {/* Make it Rain Button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="ghost"
          onClick={() => triggerBeetConfetti()}
          className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
        >
          <CloudRain className="h-4 w-4" />
          Make it rain
        </Button>
      </div>
    </div>
  );
};

export default RubricsModule4;
