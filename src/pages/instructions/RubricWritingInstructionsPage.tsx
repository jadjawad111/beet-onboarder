import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileText, ChevronRight, BookOpen, ListChecks, Scale, Tag, FileCheck, Target, Layout, Video, AlertCircle, Brain, CheckCircle2, Trophy } from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
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
   { id: "all-components-complete", label: "Complete!", icon: CheckCircle2, component: AllComponentsCompleteSection },
   { id: "complete", label: "Copy Code Here", icon: Trophy, component: CompleteSection },
];

const RubricWritingInstructionsPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("introduction");

  // Sync active section with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && sections.some(s => s.id === hash)) {
      setActiveSection(hash);
    }
  }, [location.hash]);

  // Track section completion
  const { markPart3Section } = useCourseProgress();
  
  useEffect(() => {
    if (activeSection) {
      markPart3Section(activeSection);
    }
  }, [activeSection, markPart3Section]);

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
      <div className="max-w-5xl mx-auto">
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

        {/* Main Content */}
        <main className="p-6 md:p-8 lg:p-10">
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
  );
};

export default RubricWritingInstructionsPage;
