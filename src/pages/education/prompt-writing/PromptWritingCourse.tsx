import { 
  PresentationLayout, 
  TitleSlide, 
  ContentSlide, 
  BulletSlide,
  QuoteSlide,
  SectionDividerSlide 
} from "@/components/presentation";
import type { Slide } from "@/components/presentation/PresentationLayout";
import PromptQualityChecklist from "@/components/presentation/slides/PromptQualityChecklist";
import CoreElementsHover from "@/components/presentation/slides/CoreElementsHover";
import ComparisonGrid from "@/components/learning/ComparisonGrid";
import { Lightbulb } from "lucide-react";

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
    id: "prompt-what-is-good",
    section: "Prompt Writing",
    title: "What is a good prompt?",
    content: (
      <ContentSlide title='What is a "good" prompt really?' layout="left">
        <div className="space-y-4">
          <p className="mb-6">A good prompt is one that is:</p>
          <PromptQualityChecklist />
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "prompt-why-matter",
    section: "Prompt Writing",
    title: "Why do good prompts matter?",
    content: (
      <ContentSlide title='Why do "good" prompts matter?' layout="left">
        <div className="space-y-6">
          <div className="flex gap-4 p-6 rounded-lg border bg-card">
            <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="mb-4">
                <strong className="text-foreground">Without training on good prompts, models will not be able to learn how to perform well on professional tasks,</strong> because these tasks are often non-representative of real-world domains.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>If a prompt is not realistic, the model cannot generalize well to real professional work.</li>
                <li>If a prompt is overly contrived, the resulting behavior does not transfer to actual use cases.</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4 p-6 rounded-lg border bg-card">
            <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="mb-4">
                <strong className="text-foreground">If a prompt is not clear and direct, it becomes difficult to evaluate model responses</strong> and impossible to determine whether the model succeeded or failed.
              </p>
              <p className="text-muted-foreground">
                For successful reinforcement learning, it is imperative that this is not the case. Clear prompts make outcomes evaluable.
              </p>
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "prompt-difficulty",
    section: "Prompt Writing",
    title: "Importance of difficulty",
    content: (
      <ContentSlide title="The importance of Prompt difficulty" layout="left">
        <div className="space-y-6">
          <p>
            <strong className="text-foreground">If a prompt is not sufficiently difficult, the model will not have anything meaningful to learn.</strong>
          </p>
          <p>
            In these cases, the model can already perform the task sufficiently well, and additional training does not lead to improvement.
          </p>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "prompt-6-elements",
    section: "Prompt Writing",
    title: "The 6 core elements",
    content: (
      <ContentSlide title='The 6 core elements of a "good" prompt' layout="left">
        <div className="space-y-6">
          <p>
            A "good" prompt in Beet 2.0 has all six of the following attributes:
          </p>
          <CoreElementsHover />
          <p className="text-muted-foreground">
            Each attribute captures a different aspect of how real professional tasks are communicated and evaluated.
          </p>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "element-1-unambiguous",
    section: "Prompt Writing",
    title: "Element #1 — Unambiguous",
    content: (
      <ContentSlide title="Element #1 — Unambiguous" layout="left">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
              <p>
                The prompt avoids vague terms and is clear about what needs to be done, while maintaining realism. The task should be specific enough that the model does not need to guess what is being asked.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Why it matters</p>
              <p className="mb-3">
                In professional domains, <strong className="text-foreground">"interpret it how you want" is a failure.</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                We need to grade these models. If the prompt is vague, we cannot distinguish between:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1 ml-2">
                <li>a model failure (the model couldn't do the math), and</li>
                <li>a prompt failure (the ask was never clear)</li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Examples</p>
            <ComparisonGrid 
              items={[
                {
                  context: "Finance",
                  bad: {
                    text: "Analyze Verizon's free cash flow using EBIT.",
                    issue: "Which year? What tax rate should be used? How should CapEx be treated?"
                  },
                  good: {
                    text: "Calculate Unlevered Free Cash Flow using EBIT NOPAT, using the provided 10-K extractions. Assume a tax rate of 28.80%."
                  }
                },
                {
                  context: "Nurse Scheduling",
                  bad: {
                    text: "Create a schedule for the hospital using the attached surgeon requests.",
                    issue: "What are the hours? Are weekends included?"
                  },
                  good: {
                    text: "Create a Monday–Friday schedule. ORs function 24/7, but surgeons prefer 6am–4pm. The hospital has four dedicated trauma ORs."
                  }
                },
                {
                  context: "Semiconductor Risk",
                  bad: {
                    text: "Analyze the risk of the ETF based on the provided spreadsheets.",
                    issue: "Is risk volatility? Geopolitical exposure? Supply chain disruption?"
                  },
                  good: {
                    text: "Quantify the ETF's vulnerability to the six scenarios in the 'Policy_Shocks' tab. Report portfolio return impact as a percentage (two decimals)."
                  }
                }
              ]}
            />
          </div>
        </div>
      </ContentSlide>
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
