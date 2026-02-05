# Instruction Pages Code Export

All code for Part 1: Prompt, Part 2: Deliverable, Part 3: Rubrics, and Interactive Examples pages.

**Dependencies required:** react, react-router-dom, lucide-react, @radix-ui/react-tabs, @radix-ui/react-collapsible, @radix-ui/react-hover-card, @radix-ui/react-dialog, class-variance-authority, tailwind-merge, clsx

**Shared UI components needed:** Card, Tabs, Collapsible, HoverCard, Dialog, Button (from shadcn/ui)

---

## Table of Contents

1. [Page-Level Components](#page-level-components)
2. [Part 1: Prompt Writing Sections](#part-1-prompt-writing-sections)
3. [Part 2: Deliverable (Golden Response)](#part-2-deliverable)
4. [Part 3: Rubric Writing Sections](#part-3-rubric-writing-sections)
5. [Interactive Examples Page](#interactive-examples-page)
6. [Supporting Components](#supporting-components)
7. [Data Files](#data-files)
8. [Index/Export Files](#index-export-files)

---

## Page-Level Components

### `src/pages/instructions/index.ts`

```tsx
export { default as PromptWritingInstructionsPage } from "./PromptWritingInstructionsPage";
export { default as InputFilesInstructionsPage } from "./InputFilesInstructionsPage";
export { default as RubricWritingInstructionsPage } from "./RubricWritingInstructionsPage";
export { default as GoldenResponseInstructionsPage } from "./GoldenResponseInstructionsPage";
export { default as InteractiveExamplesPage } from "./InteractiveExamplesPage";
```

### `src/pages/instructions/PromptWritingInstructionsPage.tsx`

```tsx
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
  InputFilesSection,
  ImportanceOfDifficultySection,
} from "./prompt-writing-sections";

const sections = [
  { id: "choose-task", label: "1. Choose a Task", component: ChooseTaskSection },
  { id: "review-job", label: "2. Review Job Description", component: ReviewJobSection },
  { id: "select-workflow", label: "3. Select Workflow", component: SelectWorkflowSection },
  { id: "draft-prompt", label: "4. Prompt Requirements", component: DraftPromptSection },
  { id: "example", label: "Example Breakdown", component: ExampleBreakdownSection },
  { id: "input-files", label: "Input Files", component: InputFilesSection },
  { id: "importance-of-difficulty", label: "Importance of Difficulty", component: ImportanceOfDifficultySection },
  { id: "quality-gate", label: "Quality Checklist", component: QualityGateSection },
];

const PromptWritingInstructionsPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("choose-task");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && sections.some(s => s.id === hash)) {
      setActiveSection(hash);
    }
  }, [location.hash]);

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

        <main className="p-6 md:p-8 lg:p-10">
          <ActiveComponent />
          
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
```

### `src/pages/instructions/InputFilesInstructionsPage.tsx`

```tsx
import { Files } from "lucide-react";
import CreateInputFilesSection from "./prompt-writing-sections/CreateInputFilesSection";

const InputFilesInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <Files className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Part 2: Input Files</h1>
              <p className="text-muted-foreground">Create input files to support your prompt with professional realism.</p>
            </div>
          </div>
        </div>

        <main className="p-6 md:p-8 lg:p-10">
          <CreateInputFilesSection />
        </main>
      </div>
    </div>
  );
};

export default InputFilesInstructionsPage;
```

### `src/pages/instructions/RubricWritingInstructionsPage.tsx`

```tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileText, ChevronRight, BookOpen, ListChecks, Scale, Tag, FileCheck, Target, Layout, Video, AlertCircle, Brain, CheckCircle2, Trophy } from "lucide-react";
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

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && sections.some(s => s.id === hash)) {
      setActiveSection(hash);
    }
  }, [location.hash]);

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || IntroductionSection;
 
   const renderActiveComponent = () => {
     if (activeSection === "rubric-items") {
       return <RubricItemsSection onNavigate={setActiveSection} />;
     }
     return <ActiveComponent />;
   };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">
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

        <main className="p-6 md:p-8 lg:p-10">
             {renderActiveComponent()}
            
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
```

### `src/pages/instructions/GoldenResponseInstructionsPage.tsx`

```tsx
import { Award, Lightbulb, Target, TrendingUp, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GoldenResponseInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Part 2: Deliverable</h1>
            <p className="text-muted-foreground">Create your reference point for what "good" looks like</p>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">What Is a Golden Example Deliverable?</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              A <span className="text-foreground font-medium">Golden Example Deliverable</span> is your own attempt at completing the task. Although the model will not train directly on your work, creating one helps you clarify what a strong response looks like, what truly matters in the task, and which elements should be reflected in the rubric.
            </p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    You can think of this process as reviewing work submitted by an intern. If you have done this before, you already know that you can clearly identify high-quality output, even when the work is not perfect. Later, the Golden Example Deliverable will be used and is critical for informing the rubrics or grading criteria you use to evaluate your intern's work 🙂
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-foreground font-medium">Based on our review of thousands of tasks:</p>
                  <p className="text-muted-foreground">
                    Fellows who produce thoughtful Golden Example Deliverables consistently create <span className="text-foreground font-medium">stronger prompts and more accurate rubrics</span>. When this step is skipped or rushed, important evaluation criteria are often missed, which makes it harder to assess model responses effectively.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Quality Standard</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-muted-foreground leading-relaxed">
                The Golden Example Deliverable does not need to be perfect, but it must be <span className="text-foreground font-medium">detailed and well considered enough</span> to give you a complete understanding of what a strong response should include. The goal is <span className="text-foreground font-medium">comprehension and evaluation</span>, not perfection.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GoldenResponseInstructionsPage;
```

### `src/pages/instructions/InteractiveExamplesPage.tsx`

```tsx
import { ClipboardCheck } from "lucide-react";
import { InteractiveExamplesSection } from "./rubric-sections";

const InteractiveExamplesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Interactive Examples</h1>
              <p className="text-muted-foreground">Practice with real rubric exercises</p>
            </div>
          </div>
        </div>

        <main className="p-6 md:p-8 lg:p-10">
          <InteractiveExamplesSection />
        </main>
      </div>
    </div>
  );
};

export default InteractiveExamplesPage;
```

---

## Part 1: Prompt Writing Sections

### `src/pages/instructions/prompt-writing-sections/index.ts`

```tsx
export { default as ChooseTaskSection } from "./ChooseTaskSection";
export { default as ReviewJobSection } from "./ReviewJobSection";
export { default as SelectWorkflowSection } from "./SelectWorkflowSection";
export { default as PromptRequirementsSection } from "./PromptRequirementsSection";
export { default as DraftPromptSection } from "./DraftPromptSection";
export { default as CreateInputFilesSection } from "./CreateInputFilesSection";
export { default as QualityGateSection } from "./QualityGateSection";
export { default as ExampleBreakdownSection } from "./ExampleBreakdownSection";
export { default as InputFilesSection } from "./InputFilesSection";
export { default as ImportanceOfDifficultySection } from "./ImportanceOfDifficultySection";
```

### `src/pages/instructions/prompt-writing-sections/ChooseTaskSection.tsx`

> **NOTE:** This file is very large. Copy from the source project directly. It contains the task list table with 44 occupations/sectors, highlighted example, and sector color mapping.

### `src/pages/instructions/prompt-writing-sections/ReviewJobSection.tsx`

> Copy from source. Contains Step 2 with job description review guidance and example.

### `src/pages/instructions/prompt-writing-sections/SelectWorkflowSection.tsx`

> Copy from source. Contains Step 3 with workflow selection and example workflows.

### `src/pages/instructions/prompt-writing-sections/DraftPromptSection.tsx`

> Copy from source. Contains Step 4 with core elements A-E, input file guidelines, and allowed file types.

### `src/pages/instructions/prompt-writing-sections/PromptRequirementsSection.tsx`

> Copy from source. Contains Step 4 alternate view with input files and allowed file types.

### `src/pages/instructions/prompt-writing-sections/ExampleBreakdownSection.tsx`

> Copy from source. Contains full prompt breakdown with color-coded hover cards.

### `src/pages/instructions/prompt-writing-sections/InputFilesSection.tsx`

> Copy from source (~419 lines). Contains tabbed examples (Audit/AFC, Automotive, Best Practices) with embedded iframes.

### `src/pages/instructions/prompt-writing-sections/ImportanceOfDifficultySection.tsx`

> Copy from source (~306 lines). Contains failure modes, artificial failures comparison table, and model testing guidance.

### `src/pages/instructions/prompt-writing-sections/QualityGateSection.tsx`

> Copy from source. Contains 3 quality gates (Realistic, Unambiguous, Challenging) with weak/strong examples.

### `src/pages/instructions/prompt-writing-sections/CreateInputFilesSection.tsx`

> Copy from source. Contains input file creation guidelines and example list.

---

## Part 3: Rubric Writing Sections

### `src/pages/instructions/rubric-sections/index.ts`

```tsx
export { default as IntroductionSection } from './IntroductionSection';
export { default as RubricItemsSection } from './RubricItemsSection';
export { default as WeightingSection } from './WeightingSection';
export { default as CategoriesSection } from './CategoriesSection';
export { default as CriteriaRulesSection } from './CriteriaRulesSection';
export { default as SpecificitySection } from './SpecificitySection';
export { default as ErrorsSection } from './ErrorsSection';
export { default as FormattingExamplesSection } from './FormattingExamplesSection';
export { default as NegativeItemsSection } from './NegativeItemsSection';
export { default as SpreadsheetRubricsSection } from './SpreadsheetRubricsSection';
export { default as VideoRubricsSection } from './VideoRubricsSection';
export { default as CommonIssuesSection } from './CommonIssuesSection';
export { default as RubricEducationSection } from './RubricEducationSection';
export { default as InteractiveExamplesSection } from './InteractiveExamplesSection';
export { default as AllComponentsCompleteSection } from './AllComponentsCompleteSection';
export { default as CompleteSection } from './CompleteSection';
```

### Individual Section Files

> All rubric section files should be copied directly from the source project:
> - `IntroductionSection.tsx` - What is a rubric, why we need them
> - `RubricEducationSection.tsx` - AI training process, judge models, good rubric characteristics
> - `RubricItemsSection.tsx` - 6 components (Criterion, Rationale, Weight, Category, Citation, Implicit/Explicit)
> - `CriteriaRulesSection.tsx` - Rules for writing criteria (clear, self-contained, non-stacked, etc.)
> - `WeightingSection.tsx` - Weight ranges (High/Medium/Low) and negative weights
> - `CategoriesSection.tsx` - 4 categories (Instruction Following, Reasoning, Extraction, Formatting)
> - `SpecificitySection.tsx` - General vs specific criteria with verifiability levels
> - `FormattingExamplesSection.tsx` - Excel/spreadsheet and Word document formatting criteria
> - `VideoRubricsSection.tsx` - Video rubric dimensions (technical, visual, audio, editing)
> - `CommonIssuesSection.tsx` - Tabbed view of criterion-level, rubric-level, and major/minor issues
> - `AllComponentsCompleteSection.tsx` - Task process summary diagram
> - `CompleteSection.tsx` - Course completion code display
> - `InteractiveExamplesSection.tsx` - Collapsible exercise cards with RubricInteractiveQuiz

---

## Supporting Components

### `src/components/presentation/slides/CriterionIssuesGrid.tsx`

> Copy from source (~277 lines). Contains 8 criterion-level issues with modal quiz dialogs. Depends on `CriterionErrorQuiz`.

### `src/components/presentation/slides/RubricIssuesGrid.tsx`

> Copy from source (~220 lines). Contains 3 rubric-level issues with modal dialogs. Depends on `RubricLevelQuiz`.

### `src/components/presentation/slides/CriterionErrorQuiz.tsx`

> Copy from source. Interactive A/B quiz for criterion errors.

### `src/components/presentation/slides/RubricLevelQuiz.tsx`

> Copy from source. Quiz component for rubric-level issues.

### `src/components/presentation/slides/RubricInteractiveQuiz.tsx`

> Copy from source. Full interactive rubric exercise with per-criterion error identification.

---

## Data Files

### `src/data/rubricQuizExercise1.ts`

> Copy from source. Contains exercise1Prompt, exercise1DeliverableUrl, exercise1Criteria for the Real Estate Brochure exercise.

### `src/data/rubricQuizExercise2.ts`

> Copy from source. Contains exercise2Prompt, exercise2DeliverableUrl, exercise2Criteria for the School & Real Estate Report exercise.

---

## How to Use This Export

1. Copy all the files listed above into the target Lovable project at the same paths
2. Ensure the target project has the same shadcn/ui components installed (Card, Tabs, Collapsible, HoverCard, Dialog, Button)
3. Ensure `@/lib/utils` exports `cn` (from clsx + tailwind-merge)
4. Set up routes in your App.tsx pointing to these pages
5. The sidebar navigation configuration (in AppSidebar.tsx) maps section IDs to URL hashes

**File count:** ~30 files total across pages, sections, components, and data.
