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
        subtitle="Training Course"
      />
    ),
  },
  {
    id: "overview-goal",
    section: "Overview of Project Beet",
    title: "What is the goal?",
    content: (
      <ContentSlide title="What is the goal of the project?" layout="left">
        <div className="space-y-6">
          <p>
            AI models are good at a lot of things; however, they struggle significantly when completing tasks that resemble professional domains — for instance, trying to create complicated financial reports or complete nuanced tax forms.
          </p>
          <p>
            <strong className="text-foreground">The goal is to produce high-quality training data to help models improve across multiple occupations.</strong>
          </p>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "overview-what-you-do",
    section: "Overview of Project Beet",
    title: "What will you do?",
    content: (
      <ContentSlide title="What will you be doing?" layout="left">
        <div className="space-y-6">
          <p>
            You will be designing tasks that you ideally would want your model to do in your job. Task design will be specific to your industry.
          </p>
          <p>
            In order for models to learn from the tasks you create, each task needs:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-foreground">A prompt / input information</strong> that instructs the model what you want it to do</li>
            <li><strong className="text-foreground">A rubric</strong> where you are breaking down, in a systematic way, what a good response or output will be</li>
          </ul>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "overview-how-it-works",
    section: "Overview of Project Beet",
    title: "How AI learns",
    content: (
      <ContentSlide title="How does this work?" layout="left">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Reinforcement Learning</p>
          <p>
            In AI research today, reinforcement learning is one of the primary ways models are trained to perform well on professional tasks.
          </p>
          <p>
            The AI lab takes your prompt, runs models against it multiple times, evaluates the outputs using your rubrics, and uses those evaluations to guide the model toward better performance over time.
          </p>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "overview-accomplish-goal",
    section: "Overview of Project Beet",
    title: "Your contribution",
    content: (
      <ContentSlide title="How does what you do accomplish the goal?" layout="left">
        <div className="space-y-6">
          <p>
            You will be designing realistic tasks that represent your expertise in your domain.
          </p>
          <p>
            You will be training models by coming up with realistic tasks and thoughtful rubrics that evaluate different responses from models in a more programmatic way.
          </p>
        </div>
      </ContentSlide>
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
