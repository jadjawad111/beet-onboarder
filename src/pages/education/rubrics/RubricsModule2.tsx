import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, ArrowLeft, BookOpen, Target, Zap, Scale, 
  CheckCircle2, FileText, Lightbulb, Eye, Tag, Sparkles, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";
import BeetConfetti, { triggerBeetConfetti } from "@/components/prompt-writing/BeetConfetti";
import RubricSectionCard from "@/components/rubrics/RubricSectionCard";
import RubricsProgressTracker from "@/components/rubrics/RubricsProgressTracker";
import ProgressBlockedOverlay from "@/components/rubrics/ProgressBlockedOverlay";

// Content sections
import CriterionContent from "./module2-sections/CriterionContent";
import WeightContent from "./module2-sections/WeightContent";
import CategoryContent from "./module2-sections/CategoryContent";
import RationaleContent from "./module2-sections/RationaleContent";
import ImplicitExplicitContent from "./module2-sections/ImplicitExplicitContent";

const MODULE_STORAGE_KEY = "rubrics-module-2-complete";
const SECTIONS_READ_KEY = "rubrics-module-2-sections-read";
const CRITERION_GUIDELINES_KEY = "rubrics-criterion-guidelines-read";

type SectionId = "criterion" | "weight" | "category" | "rationale" | "implicit-explicit";

const SECTION_ORDER: SectionId[] = [
  "criterion",
  "weight",
  "category",
  "rationale",
  "implicit-explicit",
];

const SECTION_LABELS: Record<SectionId, string> = {
  "criterion": "Read Criterion section",
  "weight": "Read Weight section",
  "category": "Read Category section",
  "rationale": "Read Rationale section",
  "implicit-explicit": "Read Implicit vs Explicit section",
};

const RubricsModule2 = () => {
  const navigate = useNavigate();
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [sectionsRead, setSectionsRead] = useState<SectionId[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBlockedOverlay, setShowBlockedOverlay] = useState(false);
  const [criterionGuidelinesRead, setCriterionGuidelinesRead] = useState<number[]>([]);

  // Load completion state from localStorage
  useEffect(() => {
    try {
      const moduleStored = localStorage.getItem(MODULE_STORAGE_KEY) === "true";

      const sectionsStored = localStorage.getItem(SECTIONS_READ_KEY);
      const parsedSections: SectionId[] = (() => {
        if (!sectionsStored) return [];
        const parsed = JSON.parse(sectionsStored);
        return Array.isArray(parsed) ? (parsed as SectionId[]) : [];
      })();

      // Load criterion guidelines read state
      const guidelinesStored = localStorage.getItem(CRITERION_GUIDELINES_KEY);
      const parsedGuidelines: number[] = (() => {
        if (!guidelinesStored) return [];
        const parsed = JSON.parse(guidelinesStored);
        return Array.isArray(parsed) ? (parsed as number[]) : [];
      })();
      setCriterionGuidelinesRead(parsedGuidelines);

      setSectionsRead(parsedSections);

      // IMPORTANT: Only allow the module to be considered "complete" if all sections are read.
      // This also self-heals stale localStorage from older builds.
      const canBeComplete = moduleStored && parsedSections.length === SECTION_ORDER.length;
      setIsModuleComplete(canBeComplete);
      if (moduleStored && !canBeComplete) {
        localStorage.removeItem(MODULE_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to load module completion state:", e);
    }
    setIsLoaded(true);
  }, []);

  // Re-check criterion guidelines when they might change (poll localStorage)
  useEffect(() => {
    const checkGuidelines = () => {
      try {
        const guidelinesStored = localStorage.getItem(CRITERION_GUIDELINES_KEY);
        if (guidelinesStored) {
          const parsed = JSON.parse(guidelinesStored);
          if (Array.isArray(parsed)) {
            setCriterionGuidelinesRead(parsed);
          }
        }
      } catch (e) {
        // Ignore errors
      }
    };

    // Check every 500ms for changes (to react to child component updates)
    const interval = setInterval(checkGuidelines, 500);
    return () => clearInterval(interval);
  }, []);

  const markSectionAsRead = useCallback((sectionId: SectionId) => {
    // For criterion section, require all 3 guidelines to be confirmed first
    if (sectionId === "criterion") {
      const guidelines = (() => {
        try {
          const stored = localStorage.getItem(CRITERION_GUIDELINES_KEY);
          return stored ? JSON.parse(stored) : [];
        } catch {
          return [];
        }
      })();
      if (!Array.isArray(guidelines) || guidelines.length < 3) {
        // Can't mark as read yet - show overlay with requirements
        setShowBlockedOverlay(true);
        return;
      }
    }

    setSectionsRead(prev => {
      if (prev.includes(sectionId)) return prev;
      const updated = [...prev, sectionId];
      localStorage.setItem(SECTIONS_READ_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isSectionRead = useCallback((sectionId: SectionId) => {
    return sectionsRead.includes(sectionId);
  }, [sectionsRead]);

  const isSectionLocked = useCallback((sectionId: SectionId) => {
    const sectionIndex = SECTION_ORDER.indexOf(sectionId);
    if (sectionIndex === 0) return false; // First section never locked
    
    // Check if all previous sections are read
    for (let i = 0; i < sectionIndex; i++) {
      if (!sectionsRead.includes(SECTION_ORDER[i])) {
        return true;
      }
    }
    return false;
  }, [sectionsRead]);

  const allSectionsRead = sectionsRead.length === SECTION_ORDER.length;

  const handleCompleteModule = () => {
    if (!allSectionsRead) {
      setShowBlockedOverlay(true);
      return;
    }
    setIsModuleComplete(true);
    localStorage.setItem(MODULE_STORAGE_KEY, "true");
    triggerBeetConfetti();
  };

  const handleLockedClick = () => {
    setShowBlockedOverlay(true);
  };

  // Check if all 3 guidelines are confirmed
  const allGuidelinesConfirmed = criterionGuidelinesRead.length >= 3;

  // Generate checklist items for the overlay
  const checklistItems = [
    // Add guidelines requirement first (for Criterion section)
    {
      id: "criterion-guidelines",
      label: "Confirm all 3 General Guidelines (in Criterion section)",
      isComplete: allGuidelinesConfirmed,
    },
    // Then the sections
    ...SECTION_ORDER.map(sectionId => ({
      id: sectionId,
      label: SECTION_LABELS[sectionId],
      isComplete: sectionsRead.includes(sectionId),
    })),
  ];

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

      {/* Progress Blocked Overlay */}
      <ProgressBlockedOverlay
        isOpen={showBlockedOverlay}
        onClose={() => setShowBlockedOverlay(false)}
        title="Complete all sections first"
        description="You need to read all 5 sections before you can complete this module."
        items={checklistItems}
      />

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
              <span className="text-sm font-medium text-primary">Step 2 of 3</span>
            </div>
            {isModuleComplete && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Anatomy of
            <span className="block text-secondary">a Rubric</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl">
            Break down each component of a rubric, how to write it, and the common mistakes to avoid.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">5 Components</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{sectionsRead.length}/5 read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTRODUCTION CARD
          ═══════════════════════════════════════════════════════════════ */}
      <article className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 md:p-10 shadow-lg mb-8">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
        
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-semibold uppercase tracking-wide">
            Overview
          </span>
        </div>
        
        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
          In this module, we will break down each component of a rubric, how to write it, and the common mistakes to avoid.
        </p>
        
        <div className="p-5 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm font-semibold text-foreground mb-3">Each rubric item includes:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Criterion", icon: FileText },
              { label: "Weight", icon: Scale },
              { label: "Category", icon: Tag },
              { label: "Rationale", icon: Lightbulb },
              { label: "Implicit or Explicit", icon: Eye },
            ].map((item) => (
              <div 
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION CARDS
          ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-6">
        
        {/* Section 2A: Criterion */}
        <RubricSectionCard
          title="Criterion"
          subtitle="Binary statements that can be evaluated as true or false"
          icon={<FileText className="w-6 h-6" />}
          sectionNumber={1}
          isLocked={isSectionLocked("criterion")}
          isRead={isSectionRead("criterion")}
          onMarkAsRead={() => markSectionAsRead("criterion")}
          onLockedClick={handleLockedClick}
          canMarkAsRead={allGuidelinesConfirmed}
        >
          <CriterionContent />
        </RubricSectionCard>

        {/* Section 2B: Weight */}
        <RubricSectionCard
          title="Weight"
          subtitle="Scores from -100 to 100 representing relative importance"
          icon={<Scale className="w-6 h-6" />}
          sectionNumber={2}
          isLocked={isSectionLocked("weight")}
          isRead={isSectionRead("weight")}
          onMarkAsRead={() => markSectionAsRead("weight")}
          onLockedClick={handleLockedClick}
        >
          <WeightContent />
        </RubricSectionCard>

        {/* Section 2C: Category */}
        <RubricSectionCard
          title="Category"
          subtitle="Labels for what aspect of the output a criterion evaluates"
          icon={<Tag className="w-6 h-6" />}
          sectionNumber={3}
          isLocked={isSectionLocked("category")}
          isRead={isSectionRead("category")}
          onMarkAsRead={() => markSectionAsRead("category")}
          onLockedClick={handleLockedClick}
        >
          <CategoryContent />
        </RubricSectionCard>

        {/* Section 2D: Rationale */}
        <RubricSectionCard
          title="Rationale"
          subtitle="Explanations for why each criterion exists and matters"
          icon={<Lightbulb className="w-6 h-6" />}
          sectionNumber={4}
          isLocked={isSectionLocked("rationale")}
          isRead={isSectionRead("rationale")}
          onMarkAsRead={() => markSectionAsRead("rationale")}
          onLockedClick={handleLockedClick}
        >
          <RationaleContent />
        </RubricSectionCard>

        {/* Section 2E: Implicit vs Explicit */}
        <RubricSectionCard
          title="Implicit vs Explicit"
          subtitle="Tagging whether criteria measure stated or implied requirements"
          icon={<Eye className="w-6 h-6" />}
          sectionNumber={5}
          isLocked={isSectionLocked("implicit-explicit")}
          isRead={isSectionRead("implicit-explicit")}
          onMarkAsRead={() => markSectionAsRead("implicit-explicit")}
          onLockedClick={handleLockedClick}
        >
          <ImplicitExplicitContent />
        </RubricSectionCard>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          COMPLETE MODULE BUTTON
          ═══════════════════════════════════════════════════════════════ */}
      {!isModuleComplete && (
        <div className="mt-10 p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-foreground mb-2">Ready to continue?</h3>
            {allSectionsRead ? (
              <p className="text-sm text-muted-foreground">
                You've read all 5 sections. Mark this module as complete to continue.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Read all 5 sections above ({sectionsRead.length}/5 read) before marking this module complete.
              </p>
            )}
          </div>
          <Button
            onClick={handleCompleteModule}
            className={`w-full gap-3 py-6 text-lg font-semibold transition-all group ${
              allSectionsRead 
                ? "bg-gradient-to-r from-primary to-primary/80 hover:opacity-90" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {allSectionsRead ? (
              <>
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                Complete Module 2
                <CheckCircle2 className="w-5 h-5" />
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Read all sections to unlock ({sectionsRead.length}/5)
              </>
            )}
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
              navigate("/education/rubrics/module-1");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="gap-2 text-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rubric Introduction
          </Button>
          
          {isModuleComplete ? (
            <Button 
              onClick={() => {
                navigate("/education/rubrics/module-3");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
            >
              Continue to Common Errors
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={handleLockedClick}
              className="gap-2 px-4 py-2 text-muted-foreground hover:bg-muted"
            >
              <Lock className="w-4 h-4" />
              Complete module to continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RubricsModule2;