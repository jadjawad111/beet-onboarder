import { useState } from "react";
import { FileText, ChevronRight, BookOpen, ListChecks, Scale, Tag, FileCheck, Target, Layout, Video, AlertCircle, Brain, ClipboardCheck, CheckCircle2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  IntroductionSection,
  RubricItemsSection,
  WeightingSection,
  CategoriesSection,
  CriteriaRulesSection,
  SpecificitySection,
  FormattingExamplesSection,
  VideoRubricsSection,
  CommonIssuesSection,
  RubricEducationSection,
  AllComponentsCompleteSection,
  CompleteSection
} from "./rubric-sections";

const sections = [
  { id: "introduction", label: "Introduction", icon: BookOpen, component: IntroductionSection },
   { id: "understanding-rubrics", label: "Understanding AI Training", icon: Brain, component: RubricEducationSection },
   { id: "rubric-items", label: "Rubric Components", icon: ListChecks, component: RubricItemsSection, isParent: true },
  { id: "criteria-rules", label: "Criterion", icon: FileCheck, component: CriteriaRulesSection, parent: "rubric-items" },
  { id: "weighting", label: "Weight", icon: Scale, component: WeightingSection, parent: "rubric-items" },
  { id: "categories", label: "Category", icon: Tag, component: CategoriesSection, parent: "rubric-items" },
  { id: "specificity", label: "General vs Specific", icon: Target, component: SpecificitySection },
  { id: "formatting", label: "Formatting Examples", icon: Layout, component: FormattingExamplesSection },
   { id: "videos", label: "Video Rubrics Examples", icon: Video, component: VideoRubricsSection },
   { id: "common-issues", label: "Common Issues", icon: AlertCircle, component: CommonIssuesSection },
   { id: "all-components-complete", label: "All Components Complete", icon: CheckCircle2, component: AllComponentsCompleteSection },
   { id: "complete", label: "Complete!", icon: Trophy, component: CompleteSection },
];

const RubricWritingInstructionsPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || IntroductionSection;
 
   // Special rendering for RubricItemsSection to pass navigation callback
   const renderActiveComponent = () => {
     if (activeSection === "rubric-items") {
       return <RubricItemsSection onNavigate={setActiveSection} />;
     }
     return <ActiveComponent />;
   };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Rubric Writing Instructions</h1>
              <p className="text-muted-foreground">Guidelines and best practices for creating rubrics</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <nav className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 flex-shrink-0">
            {/* Mobile: Horizontal scroll with visible scrollbar */}
            <div className="lg:hidden">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-4">
                  {sections.filter(s => !('parent' in s)).map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
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
                <ScrollBar orientation="horizontal" className="h-2.5 bg-muted/50 rounded-full" />
              </ScrollArea>
            </div>
            
            {/* Desktop: Vertical list */}
            <div className="hidden lg:flex lg:flex-col gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isChild = 'parent' in section;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "flex items-center gap-2 py-2 rounded-lg text-sm transition-colors w-full text-left",
                      isChild ? "pl-8 pr-3 font-normal" : "px-3 font-medium",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn("flex-shrink-0", isChild ? "w-3.5 h-3.5" : "w-4 h-4")} />
                    <span>{section.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-auto">
             {renderActiveComponent()}
            
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
    </div>
  );
};

export default RubricWritingInstructionsPage;
