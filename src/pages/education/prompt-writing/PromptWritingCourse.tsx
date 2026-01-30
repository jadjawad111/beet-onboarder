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
import ElementExampleRow from "@/components/presentation/slides/ElementExampleRow";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Target } from "lucide-react";

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
    parentId: "prompt-6-elements",
    content: (
      <ContentSlide title="Element #1 — Unambiguous" layout="left">
        <div className="space-y-6">
          {/* Definition Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                  <p className="text-foreground">
                    The prompt avoids vague terms and is clear about what needs to be done, while maintaining realism. The task should be specific enough that the model does not need to guess what is being asked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                  <p className="mb-3 text-foreground">
                    In professional domains, <strong>"interpret it how you want" is a failure.</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    We need to grade these models. If the prompt is vague, we cannot distinguish between:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                    <li>a model failure (the model couldn't do the work), and</li>
                    <li>a prompt failure (the ask was never clear)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
            <div className="space-y-4">
              <ElementExampleRow
                context="Finance"
                bad="Analyze Verizon's free cash flow using EBIT."
                issue="Which year? What tax rate should be used? How should CapEx be treated?"
                good="Calculate Unlevered Free Cash Flow using EBIT NOPAT, using the provided 10-K extractions. Assume a tax rate of 28.80%."
              />
              <ElementExampleRow
                context="Nurse Scheduling"
                bad="Create a schedule for the hospital using the attached surgeon requests."
                issue="What are the hours? Are weekends included?"
                good="Create a Monday–Friday schedule. ORs function 24/7, but surgeons prefer 6am–4pm. The hospital has four dedicated trauma ORs."
              />
              <ElementExampleRow
                context="Semiconductor Risk"
                bad="Analyze the risk of the ETF based on the provided spreadsheets."
                issue="Is risk volatility? Geopolitical exposure? Supply chain disruption?"
                good="Quantify the ETF's vulnerability to the six scenarios in the 'Policy_Shocks' tab. Report portfolio return impact as a percentage (two decimals)."
              />
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "element-2-professional-role",
    section: "Prompt Writing",
    title: "Element #2 — Professional Role & Context",
    parentId: "prompt-6-elements",
    content: (
      <ContentSlide title="Element #2 — Professional Role & Context" layout="left">
        <div className="space-y-6">
          {/* Definition Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                  <p className="text-foreground">
                    The prompt assigns a specific professional persona with skin in the game. It defines the hierarchy, the audience, and the stakes of the task.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                  <p className="mb-3 text-foreground">
                    The professional role tells the model what standard to meet (for example, a Senior VP analyzes risk differently than a Junior Assistant).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Context mirrors how real professional tasks are communicated. The model must demonstrate judgment by identifying what information is relevant and what can be ignored.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
            <div className="space-y-4">
              <ElementExampleRow
                context="Pharma / Clinical"
                bad="You are an AI assistant helping with drug data."
                issue="No role, no seniority, no stakes, and no indication of how the output will be used."
                good="You are a Clinical Pharmacology Lead at a biopharmaceutical sponsor. The program team requires an interim PK/PD review to prepare for an internal governance meeting."
              />
              <ElementExampleRow
                context="Concierge"
                bad="Plan a trip to Istanbul for a rich client."
                issue="Client expectations, standards, and constraints are undefined."
                good="You are the Chief of Staff for an ultra-high net worth individual who exited his last venture for over $1 billion. You need to ensure every moment of the trip is handled with white glove service."
              />
              <ElementExampleRow
                context="Audio Engineering"
                bad="Mix this song so it sounds good."
                issue='"Sounds good" is subjective and does not establish professional standards.'
                good="You are a mixing engineer working with a film studio on a diegetic song in a major motion picture. The director has requested aggressive, clearly audible T-Pain–style auto-tune."
              />
              <ElementExampleRow
                context="Government Administration"
                bad="Summarize these articles about AI in government."
                issue="The audience, purpose, and decision context are unclear."
                good="You are an Administrative Operations Lead in a government department. There is a strategic goal to expand automation. Create a scan to guide strategic planning."
              />
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "element-3-realistic",
    section: "Prompt Writing",
    title: "Element #3 — Realistic & NOT Contrived",
    parentId: "prompt-6-elements",
    content: (
      <ContentSlide title="Element #3 — Realistic & NOT Contrived" layout="left">
        <div className="space-y-6">
          {/* Definition Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                  <p className="text-foreground">
                    The prompt mimics the messy, dense, and unpolished nature of real-world artifacts such as emails, memos, and Slack messages. It avoids "AI-speak."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                  <p className="mb-3 text-foreground">
                    We are training models to replace or assist workers in reality, not in a lab.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Real work does not come with perfectly nested bullet points, artificial scaffolding, or instructional hints.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
            <div className="space-y-4">
              <ElementExampleRow
                context="Finance / Salary"
                bad="Please calculate the following: (E.g. Salary) (E.g. Taxes) Please format as a table."
                issue="This structure does not resemble real professional inputs."
                good="Apollo Braun profile: Annual salary $99,604.08. Started working June 1. 12% of net pay directed to investment. Create an Excel spreadsheet…"
              />
              <ElementExampleRow
                context="Legal"
                bad="Translate this modeling contract into a recipe for cookies to explain it to me."
                issue="Contrived and unrelated to how legal work is actually performed."
                good="Please provide a professionally written, clear, and concise email to your client, no longer than 600 words, addressing issues she should look out for."
              />
              <ElementExampleRow
                context="Engineering"
                bad="Task: Look at the file. Step 1: Make a 3D model. Step 2: Make a list."
                issue="Over-structured and artificial."
                good="Your biggest client has sent a 2D drawing. Your job is to (a) create a 3D part and (b) select the fastener that fits exactly."
              />
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "element-4-timelessness",
    section: "Prompt Writing",
    title: "Element #4 — Timelessness",
    parentId: "prompt-6-elements",
    content: (
      <ContentSlide title="Element #4 — Timelessness (Relative Dating)" layout="left">
        <div className="space-y-6">
          {/* Definition Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                  <p className="text-foreground">
                    The prompt establishes a "current date" within the scenario logic rather than relying on real-world calendar dates or current events that will age out.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                  <p className="mb-3 text-foreground">
                    If a prompt says "Today is Tuesday," it may be false when the model is tested in the future.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Prompts must anchor time explicitly within the scenario.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
            <div className="space-y-4">
              <ElementExampleRow
                context="Retail Planning"
                bad="Plan the sales for next month (October 2023)."
                issue="Relies on a real-world date that will become outdated."
                good="It is September 2024. You have been tasked with leading the 2024 Black Friday event. Create an eight-week preparation plan."
              />
              <ElementExampleRow
                context="Real Estate"
                bad="Find houses for sale right now."
                issue='"Right now" has no fixed meaning.'
                good="It is June 24, 2025. Select homes to show this weekend. The buyers are only in town for two days."
              />
              <ElementExampleRow
                context="Concierge"
                bad="Plan a trip for next summer."
                issue="Time reference is ambiguous and unstable."
                good="The first day is June 1. Day 2 is June 2. Day 3 is June 3, the wedding day."
              />
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "element-5-clear-asks",
    section: "Prompt Writing",
    title: "Element #5 — Clear Asks",
    parentId: "prompt-6-elements",
    content: (
      <ContentSlide title="Element #5 — Clear Asks" layout="left">
        <div className="space-y-6">
          {/* Definition Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                  <p className="text-foreground">
                    Clear asks explicitly define the output format, audience, and quality bar. The model should not have to guess whether the output is a PDF, CSV, or Python script.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                  <p className="mb-3 text-foreground">
                    The format is often part of the work.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A Python script is useless to a CEO who asked for a PowerPoint.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
            <div className="space-y-4">
              <ElementExampleRow
                context="Data Analysis"
                bad="Give me the data."
                issue="The format and intended use are undefined."
                good="Create an Excel workbook named SemiETF_PolicyRisk.xlsx with exactly five tabs, in exactly this order: Holdings_Clean, Exposure_By_Region…"
              />
              <ElementExampleRow
                context="Design / CAD"
                bad="Make a 3D file."
                issue="File type, naming conventions, and downstream usage are unclear."
                good="Save the output as a STEP file named coverplate.step. List the number, radius, and length in a separate Excel file."
              />
              <ElementExampleRow
                context="Marketing"
                bad="Make a presentation."
                issue="Audience and success criteria are undefined."
                good="Design a modern PDF presentation deck (approximately 15–18 slides). Each slide should focus on a core service category."
              />
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "element-6-clear-constraints",
    section: "Prompt Writing",
    title: "Element #6 — Clear Constraints",
    parentId: "prompt-6-elements",
    content: (
      <ContentSlide title="Element #6 — Clear Constraints" layout="left">
        <div className="space-y-6">
          {/* Definition Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
                  <p className="text-foreground">
                    Clear constraints explicitly define must-nots, resource limitations, and style rules. These are the guardrails that make the task meaningfully difficult.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why it matters</p>
                  <p className="text-foreground">
                    Constraints force the model to trade off between competing goals such as speed vs. accuracy or brevity vs. completeness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
            <div className="space-y-4">
              <ElementExampleRow
                context="Finance"
                bad="Make a spreadsheet for the investment."
                issue="No validation or calculation constraints are defined."
                good="The tables should be dynamic with no hardcoded cells. If a number cannot be traced to the spreadsheet output, it must not be stated."
              />
              <ElementExampleRow
                context="Nurse Scheduling"
                bad="Schedule the surgeries."
                issue="No competing priorities or real-world constraints."
                good="The hospital prioritizes trauma readiness, maximizes weekday utilization, and the ER has mentioned a potential mass casualty event."
              />
              <ElementExampleRow
                context="Audio"
                bad="Auto-tune the vocals."
                issue="Creative direction and constraints are missing."
                good="The director has requested an aggressive and clearly audible auto-tune effect, similar to T-Pain."
              />
              <ElementExampleRow
                context="Inventory"
                bad="Order more stock."
                issue="Budget and channel constraints are absent."
                good="Do not plan receipts under $10k per month in stores or under $6k per month in e-commerce."
              />
            </div>
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
