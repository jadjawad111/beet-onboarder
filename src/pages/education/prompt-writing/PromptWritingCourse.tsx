import { 
  PresentationLayout, 
  TitleSlide, 
  ContentSlide, 
  BulletSlide,
  QuoteSlide,
  SectionDividerSlide 
} from "@/components/presentation";
import type { Slide } from "@/components/presentation/PresentationLayout";

// All slides for the Project Beet 2.0 Training Course
const slides: Slide[] = [
  // ═══════════════════════════════════════════════════════════════
  // SECTION 1: Overview of Project Beet
  // ═══════════════════════════════════════════════════════════════
  {
    id: "overview-welcome",
    section: "Overview of Project Beet",
    title: "Welcome",
    content: (
      <TitleSlide 
        title="Project Beet 2.0"
        subtitle="Master prompt writing and rubrics creation"
      />
    ),
  },
  {
    id: "overview-problem",
    section: "Overview of Project Beet",
    title: "The Problem",
    content: (
      <ContentSlide title="The Problem">
        <p className="mb-6">
          Today's AI models excel at simple tasks but struggle with the nuanced, 
          context-heavy work that knowledge professionals do every day.
        </p>
        <p>
          Your job is to create prompts that <strong className="text-foreground">expose these gaps</strong> and 
          help train the next generation of AI.
        </p>
      </ContentSlide>
    ),
  },
  {
    id: "overview-knowledge-work",
    section: "Overview of Project Beet",
    title: "What is Knowledge Work?",
    content: (
      <BulletSlide 
        title="What is Knowledge Work?"
        bullets={[
          "Tasks requiring expertise, judgment, and critical thinking",
          "Multi-step problems with competing constraints",
          "Real-world scenarios with incomplete information",
          "Decisions that require weighing trade-offs"
        ]}
        variant="arrow"
      />
    ),
  },
  {
    id: "overview-ai-gap",
    section: "Overview of Project Beet",
    title: "The AI Gap",
    content: (
      <QuoteSlide 
        quote="AI doesn't fail on the easy stuff. It fails on the subtle stuff — the things experts take years to master."
        attribution="Project Beet Philosophy"
      />
    ),
  },
  {
    id: "overview-your-role",
    section: "Overview of Project Beet",
    title: "Your Role",
    content: (
      <BulletSlide 
        title="Your Role"
        bullets={[
          "Create realistic scenarios that challenge AI",
          "Identify where models currently fall short",
          "Write prompts that require expert-level reasoning",
          "Help build training data for better AI"
        ]}
        variant="check"
      />
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 2: Prompt Writing
  // ═══════════════════════════════════════════════════════════════
  {
    id: "prompt-intro",
    section: "Prompt Writing",
    title: "Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={2}
        title="Prompt Writing"
        subtitle="The 7 core attributes of a quality prompt"
      />
    ),
  },
  {
    id: "prompt-attributes-overview",
    section: "Prompt Writing",
    title: "Core Attributes",
    content: (
      <ContentSlide title="The 7 Core Attributes">
        <p className="mb-6">
          Every Beet prompt must demonstrate these qualities to effectively 
          challenge AI and create valuable training data.
        </p>
        <p>
          Master these, and you'll consistently write prompts that matter.
        </p>
      </ContentSlide>
    ),
  },
  {
    id: "prompt-attr-1-2",
    section: "Prompt Writing",
    title: "Attributes 1-2",
    content: (
      <BulletSlide 
        title="Attributes 1-2"
        bullets={[
          "Realistic — Based on actual professional scenarios, not contrived examples",
          "Complex — Multiple steps, constraints, or competing priorities"
        ]}
        numbered
      />
    ),
  },
  {
    id: "prompt-attr-3-4",
    section: "Prompt Writing",
    title: "Attributes 3-4",
    content: (
      <BulletSlide 
        title="Attributes 3-4"
        bullets={[
          "Domain-Specific — Requires genuine expertise in a professional field",
          "Nuanced — Contains subtle details that change the correct approach"
        ]}
        numbered
      />
    ),
  },
  {
    id: "prompt-attr-5-6-7",
    section: "Prompt Writing",
    title: "Attributes 5-7",
    content: (
      <BulletSlide 
        title="Attributes 5-7"
        bullets={[
          "Unambiguous — Clear enough that experts would agree on quality",
          "Challenging — Exposes current AI limitations",
          "Valuable — The answer teaches something meaningful"
        ]}
        numbered
      />
    ),
  },
  {
    id: "prompt-failure-modes",
    section: "Prompt Writing",
    title: "Model Failure Modes",
    content: (
      <ContentSlide title="Model Failure Modes">
        <p className="mb-6">
          Understanding <strong className="text-foreground">how</strong> AI fails helps you write 
          better prompts. Look for these patterns:
        </p>
        <div className="grid gap-4 text-left max-w-2xl mx-auto mt-8">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <strong className="text-destructive">Hallucination</strong> — Making up facts confidently
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <strong className="text-warning">Oversimplification</strong> — Missing crucial nuance
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <strong className="text-primary">Pattern Matching</strong> — Giving generic answers
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "prompt-checklist-why",
    section: "Prompt Writing",
    title: "Why a Checklist?",
    content: (
      <QuoteSlide 
        quote="A checklist doesn't limit creativity — it ensures quality."
        attribution="The Beet Methodology"
      />
    ),
  },
  {
    id: "prompt-checklist-before",
    section: "Prompt Writing",
    title: "Before You Write",
    content: (
      <BulletSlide 
        title="Before You Write"
        bullets={[
          "Identify your domain expertise clearly",
          "Choose a realistic scenario from your experience",
          "Define what makes this task genuinely difficult",
          "Know what a good response looks like"
        ]}
        variant="check"
      />
    ),
  },
  {
    id: "prompt-checklist-during",
    section: "Prompt Writing",
    title: "As You Write",
    content: (
      <BulletSlide 
        title="As You Write"
        bullets={[
          "Include specific details that matter",
          "Add constraints that create trade-offs",
          "Remove anything that gives away the answer",
          "Ensure experts would find this worthwhile"
        ]}
        variant="check"
      />
    ),
  },
  {
    id: "prompt-checklist-submit",
    section: "Prompt Writing",
    title: "Before You Submit",
    content: (
      <BulletSlide 
        title="Before You Submit"
        bullets={[
          "Test against all 7 attributes",
          "Verify domain accuracy",
          "Confirm the prompt exposes AI weaknesses",
          "Self-review: Would you learn from the answer?"
        ]}
        variant="check"
      />
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 3: "Bronze" Response
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bronze-intro",
    section: '"Bronze" Response',
    title: "Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={3}
        title='"Bronze" Response'
        subtitle="Understanding response quality tiers"
      />
    ),
  },
  {
    id: "bronze-placeholder",
    section: '"Bronze" Response',
    title: "Coming Soon",
    content: (
      <ContentSlide title="Bronze Response Content">
        <p className="mb-6">
          Content for the Bronze Response section will be added here.
        </p>
        <p className="text-muted-foreground">
          This section will cover quality tiers and response evaluation.
        </p>
      </ContentSlide>
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 4: Rubrics
  // ═══════════════════════════════════════════════════════════════
  {
    id: "rubrics-intro",
    section: "Rubrics",
    title: "Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={4}
        title="Rubrics"
        subtitle="Creating effective evaluation criteria"
      />
    ),
  },
  {
    id: "rubrics-placeholder",
    section: "Rubrics",
    title: "Coming Soon",
    content: (
      <ContentSlide title="Rubrics Content">
        <p className="mb-6">
          Content for the Rubrics section will be added here.
        </p>
        <p className="text-muted-foreground">
          This section will cover how to create and apply rubrics.
        </p>
      </ContentSlide>
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // COMPLETION
  // ═══════════════════════════════════════════════════════════════
  {
    id: "final",
    section: "Rubrics",
    title: "Complete!",
    content: (
      <ContentSlide title="You're Ready!">
        <p className="mb-6">
          You now have the foundation to write prompts and create rubrics that 
          challenge AI and contribute to meaningful model improvements.
        </p>
        <p className="text-primary font-semibold">
          Go create something that matters.
        </p>
      </ContentSlide>
    ),
  },
];

const PromptWritingCourse = () => {
  const handleComplete = () => {
    // Mark the course as complete in localStorage
    localStorage.setItem('prompt-writing-course-complete', 'true');
  };

  return (
    <PresentationLayout 
      slides={slides}
      title="Prompt Writing"
      onComplete={handleComplete}
    />
  );
};

export default PromptWritingCourse;
