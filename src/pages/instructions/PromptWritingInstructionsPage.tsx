import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PenTool, ChevronRight } from "lucide-react";
import {
  ChooseTaskSection,
  ReviewJobSection,
  SelectWorkflowSection,
  DraftPromptSection,
  QualityGateSection,
  ExampleBreakdownSection,
} from "./prompt-writing-sections";

const sections = [
  { id: "choose-task", label: "1. Choose a Task", component: ChooseTaskSection },
  { id: "review-job", label: "2. Review Job Description", component: ReviewJobSection },
  { id: "select-workflow", label: "3. Select Workflow", component: SelectWorkflowSection },
  { id: "draft-prompt", label: "4. Prompt Requirements", component: DraftPromptSection },
  { id: "example", label: "Example Breakdown", component: ExampleBreakdownSection },
  { id: "quality-gate", label: "5. Quality Checklist", component: QualityGateSection },
];

const PromptWritingInstructionsPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("choose-task");

  // Sync with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && sections.some(s => s.id === hash)) {
      setActiveSection(hash);
    }
  }, [location.hash]);

  // Update URL hash when section changes
  useEffect(() => {
    if (activeSection) {
      window.history.replaceState(null, "", `#${activeSection}`);
    }
  }, [activeSection]);

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || ChooseTaskSection;
  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const prevSection = sections[currentIndex - 1];
  const nextSection = sections[currentIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Prompt Writing Instructions</h1>
              <p className="text-muted-foreground">Step-by-step workflow for writing professional prompts</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6 md:p-8 lg:p-10">
          <ActiveComponent />
          
          {/* Navigation Footer */}
          <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
            {prevSection ? (
              <button
                onClick={() => setActiveSection(prevSection.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>{prevSection.label}</span>
              </button>
            ) : (
              <div />
            )}
            
            {nextSection ? (
              <button
                onClick={() => setActiveSection(nextSection.id)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>{nextSection.label}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromptWritingInstructionsPage;
