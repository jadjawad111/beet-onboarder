import { 
  PresentationLayout, 
  TitleSlide, 
  ContentSlide, 
  BulletSlide,
  QuoteSlide,
  SectionDividerSlide 
} from "@/components/presentation";
import type { Slide } from "@/components/presentation/PresentationLayout";

// All slides for the entire Prompt Writing track
const slides: Slide[] = [
  // ═══════════════════════════════════════════════════════════════
  // INTRO / TITLE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "title",
    title: "Welcome",
    content: (
      <TitleSlide 
        title="Prompt Writing"
        subtitle="Master the art of crafting professional AI prompts"
      />
    ),
  },
  
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: The Knowledge Work Gap
  // ═══════════════════════════════════════════════════════════════
  {
    id: "m1-intro",
    module: 1,
    title: "Module 1: Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={1}
        title="The Knowledge Work Gap"
        subtitle="Why AI struggles with complex professional tasks"
      />
    ),
  },
  {
    id: "m1-problem",
    module: 1,
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
    id: "m1-what-is-knowledge-work",
    module: 1,
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
    id: "m1-ai-gap",
    module: 1,
    title: "The AI Gap",
    content: (
      <QuoteSlide 
        quote="AI doesn't fail on the easy stuff. It fails on the subtle stuff — the things experts take years to master."
        attribution="Project Beet Philosophy"
      />
    ),
  },
  {
    id: "m1-your-role",
    module: 1,
    title: "Your Role",
    content: (
      <BulletSlide 
        title="Your Role as a Prompt Writer"
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
  // MODULE 2: Unpacking Beet 2.0
  // ═══════════════════════════════════════════════════════════════
  {
    id: "m2-intro",
    module: 2,
    title: "Module 2: Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={2}
        title="Unpacking Beet 2.0"
        subtitle="The 7 core attributes of a quality prompt"
      />
    ),
  },
  {
    id: "m2-attributes-overview",
    module: 2,
    title: "Core Attributes Overview",
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
    id: "m2-attr-1-2",
    module: 2,
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
    id: "m2-attr-3-4",
    module: 2,
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
    id: "m2-attr-5-6-7",
    module: 2,
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
    id: "m2-failure-modes",
    module: 2,
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

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: The Prompt Checklist
  // ═══════════════════════════════════════════════════════════════
  {
    id: "m3-intro",
    module: 3,
    title: "Module 3: Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={3}
        title="The Prompt Checklist"
        subtitle="Validate every prompt before submission"
      />
    ),
  },
  {
    id: "m3-why-checklist",
    module: 3,
    title: "Why a Checklist?",
    content: (
      <QuoteSlide 
        quote="A checklist doesn't limit creativity — it ensures quality."
        attribution="The Beet Methodology"
      />
    ),
  },
  {
    id: "m3-checklist-part1",
    module: 3,
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
    id: "m3-checklist-part2",
    module: 3,
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
    id: "m3-checklist-part3",
    module: 3,
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
  {
    id: "final",
    title: "Complete!",
    content: (
      <ContentSlide title="You're Ready!">
        <p className="mb-6">
          You now have the foundation to write prompts that challenge AI 
          and contribute to meaningful model improvements.
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
