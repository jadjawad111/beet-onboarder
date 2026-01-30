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
import PromptExerciseQuiz from "@/components/presentation/slides/PromptExerciseQuiz";
import BronzeExamplesSlide from "@/components/presentation/slides/BronzeExamplesSlide";
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
    id: "prompt-intro",
    section: "Prompt Writing",
    title: "Introduction",
    content: (
      <SectionDividerSlide 
        moduleNumber={2}
        title="Prompt Writing"
        subtitle="Crafting effective prompts for professional tasks"
        topics={[
          'What makes a prompt "good"',
          "The 6 core elements of quality prompts",
          "Deep dive into each element with examples",
          "Interactive exercises to test your understanding",
        ]}
      />
    ),
  },
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
          
          {/* Caveat Card */}
          <Card className="border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-600/50">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Before we continue</p>
                  <p className="text-foreground">
                    We will do a <strong>deep dive into each element</strong>. For educational purposes, we'll show excerpts from prompts to showcase these elements individually.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    In practice, prompts exist as a whole — full examples will be shown towards the end of this section.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                good={<>Calculate Unlevered Free Cash Flow using EBIT NOPAT, <strong className="text-green-600">using the provided 10-K extractions</strong>. <strong className="text-green-600">Assume a tax rate of 28.80%</strong>.</>}
              />
              <ElementExampleRow
                context="Nurse Scheduling"
                bad="Create a schedule for the hospital using the attached surgeon requests."
                issue="What are the hours? Are weekends included?"
                good={<>Create a <strong className="text-green-600">Monday–Friday schedule</strong>. ORs function 24/7, but surgeons prefer 6am–4pm. The hospital has <strong className="text-green-600">four dedicated trauma ORs</strong>.</>}
              />
              <ElementExampleRow
                context="Semiconductor Risk"
                bad="Analyze the risk of the ETF based on the provided spreadsheets."
                issue="Is risk volatility? Geopolitical exposure? Supply chain disruption?"
                good={<>Quantify the ETF's vulnerability to the <strong className="text-green-600">six scenarios in the 'Policy_Shocks' tab</strong>. <strong className="text-green-600">Report portfolio return impact as a percentage (two decimals)</strong>.</>}
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
                good={<>You are a <strong className="text-green-600">Clinical Pharmacology Lead</strong> at a biopharmaceutical sponsor. The program team requires an interim PK/PD review to prepare for an <strong className="text-green-600">internal governance meeting</strong>.</>}
              />
              <ElementExampleRow
                context="Concierge"
                bad="Plan a trip to Istanbul for a rich client."
                issue="Client expectations, standards, and constraints are undefined."
                good={<>You are the <strong className="text-green-600">Chief of Staff</strong> for an ultra-high net worth individual who exited his last venture for over $1 billion. You need to ensure every moment of the trip is handled with <strong className="text-green-600">white glove service</strong>.</>}
              />
              <ElementExampleRow
                context="Audio Engineering"
                bad="Mix this song so it sounds good."
                issue='"Sounds good" is subjective and does not establish professional standards.'
                good={<>You are a <strong className="text-green-600">mixing engineer</strong> working with a film studio on a diegetic song in a major motion picture. The <strong className="text-green-600">director has requested</strong> aggressive T-Pain–style auto-tune.</>}
              />
              <ElementExampleRow
                context="Government Administration"
                bad="Summarize these articles about AI in government."
                issue="The audience, purpose, and decision context are unclear."
                good={<>You are an <strong className="text-green-600">Administrative Operations Lead</strong> in a government department. There is a strategic goal to expand automation. Create a scan to <strong className="text-green-600">guide strategic planning</strong>.</>}
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
                good={<><strong className="text-green-600">Apollo Braun profile</strong>: Annual salary $99,604.08. Started working June 1. <strong className="text-green-600">12% of net pay directed to investment</strong>. Create an Excel spreadsheet…</>}
              />
              <ElementExampleRow
                context="Legal"
                bad="Translate this modeling contract into a recipe for cookies to explain it to me."
                issue="Contrived and unrelated to how legal work is actually performed."
                good={<>Please provide a professionally written <strong className="text-green-600">email to your client</strong>, <strong className="text-green-600">no longer than 600 words</strong>, addressing issues she should look out for.</>}
              />
              <ElementExampleRow
                context="Engineering"
                bad="Task: Look at the file. Step 1: Make a 3D model. Step 2: Make a list."
                issue="Over-structured and artificial."
                good={<>Your <strong className="text-green-600">biggest client has sent a 2D drawing</strong>. Your job is to (a) create a 3D part and (b) <strong className="text-green-600">select the fastener that fits exactly</strong>.</>}
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
                good={<><strong className="text-green-600">It is September 2024</strong>. You have been tasked with leading the 2024 Black Friday event. Create an <strong className="text-green-600">eight-week preparation plan</strong>.</>}
              />
              <ElementExampleRow
                context="Real Estate"
                bad="Find houses for sale right now."
                issue='"Right now" has no fixed meaning.'
                good={<><strong className="text-green-600">It is June 24, 2025</strong>. Select homes to show this weekend. The <strong className="text-green-600">buyers are only in town for two days</strong>.</>}
              />
              <ElementExampleRow
                context="Concierge"
                bad="Plan a trip for next summer."
                issue="Time reference is ambiguous and unstable."
                good={<>Day 1 is June 1. Day 2 is June 2. <strong className="text-green-600">Day 3 is June 3, the wedding day</strong>.</>}
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
                good={<>Create an <strong className="text-green-600">Excel workbook named SemiETF_PolicyRisk.xlsx</strong> with <strong className="text-green-600">exactly five tabs</strong>, in exactly this order: Holdings_Clean, Exposure_By_Region…</>}
              />
              <ElementExampleRow
                context="Design / CAD"
                bad="Make a 3D file."
                issue="File type, naming conventions, and downstream usage are unclear."
                good={<>Save the output as a <strong className="text-green-600">STEP file named coverplate.step</strong>. List the number, radius, and length in a <strong className="text-green-600">separate Excel file</strong>.</>}
              />
              <ElementExampleRow
                context="Marketing"
                bad="Make a presentation."
                issue="Audience and success criteria are undefined."
                good={<>Design a modern <strong className="text-green-600">PDF presentation deck</strong> (approximately <strong className="text-green-600">15–18 slides</strong>). Each slide should focus on a core service category.</>}
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
                good={<>The tables should be dynamic with <strong className="text-green-600">no hardcoded cells</strong>. If a number cannot be traced to the spreadsheet output, it <strong className="text-green-600">must not be stated</strong>.</>}
              />
              <ElementExampleRow
                context="Nurse Scheduling"
                bad="Schedule the surgeries."
                issue="No competing priorities or real-world constraints."
                good={<>The hospital <strong className="text-green-600">prioritizes trauma readiness</strong>, maximizes weekday utilization, and the ER has mentioned a potential mass casualty event.</>}
              />
              <ElementExampleRow
                context="Audio"
                bad="Auto-tune the vocals."
                issue="Creative direction and constraints are missing."
                good={<>The director has requested an <strong className="text-green-600">aggressive auto-tune</strong> effect, similar to T-Pain.</>}
              />
              <ElementExampleRow
                context="Inventory"
                bad="Order more stock."
                issue="Budget and channel constraints are absent."
                good={<><strong className="text-green-600">Do not plan receipts under $10k per month</strong> in stores or under $6k per month in e-commerce.</>}
              />
            </div>
          </div>
        </div>
      </ContentSlide>
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // INTERACTIVE QUIZ: Prompt Evaluation
  // ═══════════════════════════════════════════════════════════════
  {
    id: "prompt-quiz-intro",
    section: "Prompt Writing",
    title: "Interactive Quiz",
    content: (
      <ContentSlide title="Test Your Knowledge" layout="left">
        <div className="space-y-6">
          <p>
            Now let's put what you've learned into practice. You'll evaluate <strong className="text-foreground">3 prompt excerpts</strong> and identify which of the 6 core elements are problematic.
          </p>
          <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
            <p className="font-semibold mb-2">How it works:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Read each prompt excerpt carefully</li>
              <li>Select <strong className="text-foreground">all</strong> the elements that make the prompt problematic</li>
              <li>Submit to see detailed feedback on each element</li>
            </ul>
          </div>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "prompt-quiz-1",
    section: "Prompt Writing",
    title: "Exercise #1",
    parentId: "prompt-quiz-intro",
    content: (
      <PromptExerciseQuiz
        key="prompt-quiz-1"
        exerciseNumber={1}
        promptExcerpt={`You are responsible for 🟢leading a bridal sales team🟢 at a 🟢bridal store🟢.
The team has been struggling with handling customer objections and hesitations during the bridalwear purchasing process.

🔴Create a document🔴 to be used as 🔴a training🔴 on overcoming sales objections for the sales team.

The goal is to help improve how the team responds to customer concerns and increase successful purchases.`}
        correctAnswers={["clearAsks", "clearConstraints"]}
        feedback={{
          unambiguous: {
            isIssue: false,
            explanation: "The task is understandable: create training to help a sales team overcome objections.",
          },
          professional: {
            isIssue: false,
            explanation: "The prompt clearly establishes 🟢leading a bridal sales team🟢 at a 🟢bridal store🟢. This is sufficient role and domain context.",
          },
          realistic: {
            isIssue: false,
            explanation: "This resembles a real internal retail training request.",
          },
          timelessness: {
            isIssue: false,
            explanation: "This task does not require a time anchor.",
          },
          clearAsks: {
            isIssue: true,
            explanation: "The phrases 🔴Create a document🔴 and 🔴a training🔴 are underspecified. The prompt does not define format, length, structure, or delivery expectations.",
          },
          clearConstraints: {
            isIssue: true,
            explanation: "No constraints are provided (length, sections, tone, or success criteria), making the task difficult to evaluate.",
          },
        }}
      />
    ),
  },
  {
    id: "prompt-quiz-2",
    section: "Prompt Writing",
    title: "Exercise #2",
    parentId: "prompt-quiz-intro",
    content: (
      <PromptExerciseQuiz
        key="prompt-quiz-2"
        exerciseNumber={2}
        promptExcerpt={`You are a 🟢Retail Sales Manager🟢 responsible for leading your store through 🔴Black Friday🔴.
The store is located in the 🟢UK🟢, and this event is one of the most important trading periods of the year.

Reference materials are attached outlining performance goals and promotional activity.

🔴Create a preparation plan for Black Friday🔴 that outlines objectives and weekly action items.
Also 🔴create a launch deck🔴 for the sales team to support execution during the event.
Submit both documents when complete.`}
        correctAnswers={["timelessness", "clearAsks", "clearConstraints"]}
        feedback={{
          unambiguous: {
            isIssue: false,
            explanation: "The intent of the task is clear.",
          },
          professional: {
            isIssue: false,
            explanation: "The prompt establishes 🟢Retail Sales Manager🟢 in the 🟢UK🟢 with Black Friday as a critical business event.",
          },
          realistic: {
            isIssue: false,
            explanation: "This mirrors real retail operations planning.",
          },
          timelessness: {
            isIssue: true,
            explanation: "🔴Black Friday🔴 is referenced without anchoring the scenario to a specific year or internal timeline, causing the prompt to age out.",
          },
          clearAsks: {
            isIssue: true,
            explanation: "🔴Create a preparation plan🔴 and 🔴create a launch deck🔴 do not specify format, length, structure, or audience for each deliverable.",
          },
          clearConstraints: {
            isIssue: true,
            explanation: "There are no constraints around scope, required sections, design rules, or level of detail.",
          },
        }}
      />
    ),
  },
  {
    id: "prompt-quiz-3",
    section: "Prompt Writing",
    title: "Exercise #3",
    parentId: "prompt-quiz-intro",
    content: (
      <PromptExerciseQuiz
        key="prompt-quiz-3"
        exerciseNumber={3}
        promptExcerpt={`You are a 🟢Mechanical Engineer🟢 working at a small aerospace firm designing an experimental wing assembly for a next-generation aircraft.

To support an 🟢internal design review🟢, create a flow simulation report using the attached CFD simulation results and CAD model.
Summarize 🔴key performance metrics🔴 and discuss 🔴implications for aerodynamic performance🔴.
Organize the report clearly and export it for internal use.

This report will be used to brief the design team and guide future optimization work.`}
        correctAnswers={["unambiguous", "clearAsks"]}
        feedback={{
          unambiguous: {
            isIssue: true,
            explanation: "🔴key performance metrics🔴 and 🔴implications for aerodynamic performance🔴 are vague. The prompt does not define which metrics matter or how success is evaluated.",
          },
          professional: {
            isIssue: false,
            explanation: "The role and audience are clearly established: 🟢Mechanical Engineer🟢 preparing for an 🟢internal design review🟢.",
          },
          realistic: {
            isIssue: false,
            explanation: "This reflects a real engineering workflow.",
          },
          timelessness: {
            isIssue: false,
            explanation: "The task does not rely on a time anchor.",
          },
          clearAsks: {
            isIssue: true,
            explanation: "The prompt does not specify output format (e.g., PDF), required sections, or tabular vs narrative expectations.",
          },
          clearConstraints: {
            isIssue: false,
            explanation: "The issue is lack of clarity, not missing tradeoffs or guardrails.",
          },
        }}
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
        subtitle="Your attempt at the actual deliverable"
        topics={[
          "What a Bronze response is and why it matters",
          "What it does NOT need to be",
          "Real examples of Bronze responses",
        ]}
      />
    ),
  },
  {
    id: "bronze-what-is",
    section: '"Bronze" Response',
    title: "What is a Bronze response?",
    content: (
      <ContentSlide title="What is a Bronze response?" layout="left">
        <div className="space-y-6">
          <p>
            <strong className="text-foreground">A Bronze response is your attempt at producing the actual deliverable for a task.</strong>
          </p>
          <p>
            The model will not train directly on your deliverable. Producing a Bronze response helps you build a strong understanding of what matters in the output, what a good response looks like, and which elements should be captured and evaluated in your rubric.
          </p>
          <p className="text-muted-foreground">
            If you do not produce a Bronze response, or do not seriously attempt one, you will likely miss several key elements that are important for assessing model outputs.
          </p>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "bronze-not-perfect",
    section: '"Bronze" Response',
    title: "What it doesn't need to be",
    content: (
      <ContentSlide title="What a Bronze response does not need to be" layout="left">
        <div className="space-y-6">
          <p>
            A Bronze response, as the name implies, <strong className="text-foreground">is not a gold standard deliverable</strong>.
          </p>
          <p>
            It does not need to be perfect, fully polished, or something you would confidently send to your boss or a client.
          </p>
          <p>
            However, it does need to be <strong className="text-foreground">sufficiently thoughtful and detailed</strong> so that you have a complete understanding of what a strong output would include.
          </p>
          <p className="text-primary font-medium">
            The goal is comprehension and evaluation, not perfection.
          </p>
        </div>
      </ContentSlide>
    ),
  },
  {
    id: "bronze-examples",
    section: '"Bronze" Response',
    title: "Examples",
    content: <BronzeExamplesSlide />,
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
        topics={[
          "What rubrics are and why they matter",
          "How to structure evaluation criteria",
          "Examples of well-designed rubrics",
        ]}
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
