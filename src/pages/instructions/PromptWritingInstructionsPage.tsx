import { useState } from "react";
import { PenTool, ChevronRight, Briefcase, FileText, GitBranch, ClipboardList, Files, Shield, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChooseTaskSection,
  ReviewJobSection,
  SelectWorkflowSection,
  PromptRequirementsSection,
  DraftPromptSection,
  CreateInputFilesSection,
  QualityGateSection,
  ExampleBreakdownSection,
} from "./prompt-writing-sections";

const sections = [
  { id: "choose-task", label: "1. Choose a Task", icon: Briefcase, component: ChooseTaskSection },
  { id: "review-job", label: "2. Review Job Description", icon: FileText, component: ReviewJobSection },
  { id: "select-workflow", label: "3. Select Workflow", icon: GitBranch, component: SelectWorkflowSection },
  { id: "requirements", label: "4. Prompt Requirements", icon: ClipboardList, component: PromptRequirementsSection },
  { id: "draft-prompt", label: "5. Draft the Prompt", icon: PenTool, component: DraftPromptSection },
  { id: "input-files", label: "6. Create Input Files", icon: Files, component: CreateInputFilesSection },
  { id: "quality-gate", label: "7. Quality Gate", icon: Shield, component: QualityGateSection },
  { id: "example", label: "Example Breakdown", icon: Layers, component: ExampleBreakdownSection },
];

const PromptWritingInstructionsPage = () => {
  const [activeSection, setActiveSection] = useState("choose-task");

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || ChooseTaskSection;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
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

        {/* Vertical Navigation - Below Header */}
        <nav className="border-b border-border p-4 md:p-6">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6 md:p-8 lg:p-10">
          <ActiveComponent />
          
          {/* Navigation Footer */}
          <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
            {(() => {
              const currentIndex = sections.findIndex(s => s.id === activeSection);
              const prevSection = sections[currentIndex - 1];
              const nextSection = sections[currentIndex + 1];
              
              return (
                <>
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
                </>
              );
            })()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromptWritingInstructionsPage;
