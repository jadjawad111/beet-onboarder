import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, BookOpen, Target, Lightbulb, Check, AlertTriangle, X, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ═══════════════════════════════════════════════════════════════

const SectionDivider = ({ number, title, subtitle }: { number: number; title: string; subtitle: string }) => (
  <div className="py-12 border-b-4 border-primary bg-gradient-to-r from-primary/5 to-transparent print:break-before-page">
    <div className="flex items-center gap-4 mb-4">
      <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-lg">
        Section {number}
      </span>
    </div>
    <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-lg text-muted-foreground">{subtitle}</p>
  </div>
);

const SlideBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-8 border-b border-border print:break-inside-avoid">
    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
      <BookOpen className="w-5 h-5 text-primary" />
      {title}
    </h3>
    <div className="space-y-4 text-foreground leading-relaxed">
      {children}
    </div>
  </div>
);

const DefinitionCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="border-l-4 border-l-primary">
    <CardContent className="p-4">
      <div className="flex gap-3">
        <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Definition</p>
          <p className="text-foreground">{children}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WhyItMattersCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="border-l-4 border-l-amber-500">
    <CardContent className="p-4">
      <div className="flex gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Why It Matters</p>
          <div className="text-foreground">{children}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ExampleRow = ({ context, bad, issue, good }: { context: string; bad: string; issue: string; good: React.ReactNode }) => (
  <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg print:break-inside-avoid">
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-1">{context}</p>
      <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
        <p className="text-xs font-semibold text-red-600 mb-1 flex items-center gap-1">
          <X className="w-3 h-3" /> Bad
        </p>
        <p className="text-sm text-foreground">{bad}</p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded w-full">
        <p className="text-xs font-semibold text-amber-600 mb-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Issue
        </p>
        <p className="text-sm text-foreground">{issue}</p>
      </div>
    </div>
    <div>
      <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded">
        <p className="text-xs font-semibold text-green-600 mb-1 flex items-center gap-1">
          <Check className="w-3 h-3" /> Good
        </p>
        <p className="text-sm text-foreground">{good}</p>
      </div>
    </div>
  </div>
);

const ElementBox = ({ number, name, description }: { number: number; name: string; description?: string }) => (
  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
      {number}
    </div>
    <div>
      <p className="font-semibold text-foreground">{name}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  </div>
);

const ErrorBox = ({ number, name, description, color = "destructive" }: { number: number; name: string; description: string; color?: "destructive" | "amber" }) => (
  <div className="flex items-start gap-3 p-4 border rounded-lg">
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0",
      color === "destructive" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"
    )}>
      {number}
    </div>
    <div>
      <p className="font-semibold text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const CriterionExample = ({ bad, badExplanation, good, goodExplanation, quickTest }: { 
  bad: string; 
  badExplanation: string; 
  good: string; 
  goodExplanation: string;
  quickTest: string;
}) => (
  <div className="space-y-4 mt-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-xs font-semibold text-red-600 mb-2">✗ Bad Criterion</p>
        <p className="text-sm">{bad}</p>
        <p className="text-xs text-muted-foreground mt-2">{badExplanation}</p>
      </div>
      <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-xs font-semibold text-green-600 mb-2">✓ Good Criterion</p>
        <p className="text-sm">{good}</p>
        <p className="text-xs text-muted-foreground mt-2">{goodExplanation}</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground"><strong>Quick Test:</strong> {quickTest}</p>
  </div>
);

const FailureModeCard = ({ title, subtitle, items }: { title: string; subtitle: string; items: { name: string; description: string }[] }) => (
  <Card className="border-t-4 border-t-primary">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <span className="text-green-600 text-xs">✓</span>
        </div>
        <div>
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-3 text-xs">
        {items.map((item, idx) => (
          <div key={idx}>
            <p className="font-medium text-primary">{item.name}</p>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const CourseReference = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - hidden when printing */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/education/beet")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print / Save as PDF
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 print:px-0 print:py-0">
        {/* Title Page */}
        <div className="text-center py-16 border-b-4 border-primary print:break-after-page">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Beet 2.0</h1>
          <p className="text-xl text-muted-foreground mb-8">Complete Training Course Reference</p>
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
            <p className="text-sm text-primary font-medium">Comprehensive Guide • All Sections</p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: Overview of Project Beet */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <SectionDivider 
          number={1} 
          title="Overview of Project Beet" 
          subtitle="Understanding the goals and methodology of Project Beet 2.0"
        />

        <SlideBlock title="What is the goal of the project?">
          <p>
            AI models are good at a lot of things; however, they struggle significantly when completing tasks that resemble professional domains — for instance, trying to create complicated financial reports or complete nuanced tax forms.
          </p>
          <p className="font-semibold">
            The goal is to produce high-quality training data to help models improve across multiple occupations.
          </p>
        </SlideBlock>

        <SlideBlock title="What will you be doing?">
          <p>
            You will be designing tasks that you ideally would want your model to do in your job. Task design will be specific to your industry.
          </p>
          <p>In order for models to learn from the tasks you create, each task needs:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>A prompt / input information</strong> that instructs the model what you want it to do</li>
            <li><strong>A rubric</strong> where you are breaking down, in a systematic way, what a good response or output will be</li>
          </ul>
        </SlideBlock>

        <SlideBlock title="How does AI learning work?">
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Reinforcement Learning</p>
          <p>
            In AI research today, reinforcement learning is one of the primary ways models are trained to perform well on professional tasks.
          </p>
          <p>
            The AI lab takes your prompt, runs models against it multiple times, evaluates the outputs using your rubrics, and uses those evaluations to guide the model toward better performance over time.
          </p>
        </SlideBlock>

        <SlideBlock title="How does what you do accomplish the goal?">
          <p>
            You will be designing realistic tasks that represent your expertise in your domain.
          </p>
          <p>
            You will be training models by coming up with realistic tasks and thoughtful rubrics that evaluate different responses from models in a more programmatic way.
          </p>
        </SlideBlock>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: Prompt Writing */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <SectionDivider 
          number={2} 
          title="Prompt Writing" 
          subtitle="Crafting effective prompts for professional tasks"
        />

        <SlideBlock title="What is a Prompt?">
          <DefinitionCard>
            A <strong>prompt</strong> is the instruction or question you give to an AI model to tell it what you want it to do.
          </DefinitionCard>
          <Card className="border-2 border-primary/30 bg-primary/5 mt-4">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-primary mb-1">What is a Prompt for Beet 2.0?</p>
              <p className="text-foreground">
                A <strong>Beet 2.0 prompt</strong> is a prompt that mimics a real-world ask or request that would be given to a professional in your respective domain.
              </p>
            </CardContent>
          </Card>
        </SlideBlock>

        <SlideBlock title="The Goal of This Section">
          <p className="text-lg mb-4">By the end of this section, you should be able to write prompts that are:</p>
          <div className="grid gap-4">
            <Card className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-green-600">1</span>
                  <div>
                    <p className="font-semibold text-foreground">Realistic</p>
                    <p className="text-sm text-muted-foreground">Prompts that mirror real professional workflows and domain expertise</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-blue-600">2</span>
                  <div>
                    <p className="font-semibold text-foreground">Unambiguous</p>
                    <p className="text-sm text-muted-foreground">Clear, specific instructions that leave no room for misinterpretation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-amber-600">3</span>
                  <div>
                    <p className="font-semibold text-foreground">Challenging</p>
                    <p className="text-sm text-muted-foreground">Sufficiently difficult to induce meaningful model learning opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideBlock>

        <SlideBlock title='Why do "good" prompts matter?'>
          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="mb-2">
                <strong>Without training on good prompts, models will not be able to learn how to perform well on professional tasks,</strong> because these tasks are often non-representative of real-world domains.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>If a prompt is not realistic, the model cannot generalize well to real professional work.</li>
                <li>If a prompt is overly contrived, the resulting behavior does not transfer to actual use cases.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="mb-2">
                <strong>If a prompt is not clear and direct, it becomes difficult to evaluate model responses</strong> and impossible to determine whether the model succeeded or failed.
              </p>
              <p className="text-muted-foreground">
                For successful reinforcement learning, it is imperative that this is not the case. Clear prompts make outcomes evaluable.
              </p>
            </CardContent>
          </Card>
        </SlideBlock>

        <SlideBlock title="The importance of Prompt difficulty">
          <p>
            <strong>If a prompt is not sufficiently difficult, the model will not have anything meaningful to learn.</strong> In these cases, the model can already perform the task sufficiently well, and additional training does not lead to improvement.
          </p>
          <p>
            Ultimately, the prompt itself needs to be difficult enough. We can attempt to do this by writing prompts that invoke multi-step reasoning or more convoluted sets of steps, as long as they are realistic.
          </p>
        </SlideBlock>

        <SlideBlock title="What Makes a Prompt Difficult?">
          <p className="text-muted-foreground mb-4">A good prompt induces model failures. That's where learning happens.</p>
          <div className="overflow-hidden rounded-xl border-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold"></th>
                  <th className="p-4 text-center font-semibold text-green-600">Model Succeeds</th>
                  <th className="p-4 text-center font-semibold text-destructive">Model Fails</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold bg-muted/30">Easy for Professional</td>
                  <td className="p-4 text-center text-muted-foreground">Too easy, no learning</td>
                  <td className="p-4 text-center bg-green-50 dark:bg-green-950/30 border-2 border-green-500">
                    <span className="font-bold text-green-600">✓ Good prompt!</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-muted/30">Hard for Professional</td>
                  <td className="p-4 text-center text-muted-foreground">Impressive, but rare</td>
                  <td className="p-4 text-center bg-green-50 dark:bg-green-950/30 border-2 border-green-500">
                    <span className="font-bold text-green-600">✓ Good prompt!</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground italic mt-4">
            The goal is to create prompts where the model fails. That's when reinforcement learning can improve performance.
          </p>
        </SlideBlock>

        <SlideBlock title="What Does It Mean for a Model to Fail?">
          <p className="text-muted-foreground mb-4">Model failures fall into three categories:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FailureModeCard
              title="Extraction Failures"
              subtitle='(The "Blind Spot")'
              items={[
                { name: "Hallucination", description: "The model invents data that isn't in the file to fill a gap." },
                { name: "Omission", description: "The model misses a critical detail buried in a large document." },
                { name: "Misinterpretation", description: "The model reads the data but misunderstands the context." },
              ]}
            />
            <FailureModeCard
              title="Reasoning Failures"
              subtitle='(The "Logic Break")'
              items={[
                { name: "Dependency Collapse", description: "The model solves Step 1 correctly but forgets that Step 2 depends on the result." },
                { name: "Constraint Violation", description: "The model ignores a negative constraint because it's trying too hard to satisfy a positive one." },
                { name: "Invalid Inference", description: "The model makes a logical leap that is factually or professionally unsound." },
              ]}
            />
            <FailureModeCard
              title="Formatting Failures"
              subtitle='(The "Professional Gap")'
              items={[
                { name: "Wrong Output Format", description: "You asked for a CSV file, and it gave you a text table in the chat window." },
                { name: "Structure Mismatch", description: "You asked for a 'Memo with an Executive Summary,' and it gave you a casual email." },
                { name: "Formula Stagnation", description: "You asked for a 'dynamic Excel spreadsheet,' and it gave you hard-coded numbers." },
              ]}
            />
          </div>
        </SlideBlock>

        <SlideBlock title="How to Test for Model Failures">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-4">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Run it through a Model</h4>
                <p className="text-xs text-muted-foreground">If perfect on first try, it's too easy.</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-green-500">
              <CardContent className="p-4">
                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Run Multiple Times</h4>
                <p className="text-xs text-muted-foreground">Run it 3 times and read the responses to see how well it did.</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-amber-500">
              <CardContent className="p-4">
                <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center mb-3">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Check for Clarifying Questions</h4>
                <p className="text-xs text-muted-foreground">If the model asks for more info, the prompt is ambiguous.</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500">
              <CardContent className="p-4">
                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Human Intern Test</h4>
                <p className="text-xs text-muted-foreground">Could a smart intern solve this?</p>
              </CardContent>
            </Card>
          </div>
        </SlideBlock>

        <SlideBlock title='The 6 core elements of a "good" prompt'>
          <p className="mb-4">A "good" prompt in Beet 2.0 has all six of the following attributes:</p>
          <div className="space-y-2">
            <ElementBox number={1} name="Unambiguous" />
            <ElementBox number={2} name="Professional Role & Context" />
            <ElementBox number={3} name="Realistic & NOT Contrived" />
            <ElementBox number={4} name="Timelessness" />
            <ElementBox number={5} name="Clear Deliverable" />
            <ElementBox number={6} name="Clear Constraints" />
          </div>
        </SlideBlock>

        {/* Element #1 */}
        <SlideBlock title="Element #1 — Unambiguous">
          <DefinitionCard>
            The prompt avoids vague terms and is clear about what needs to be done, while maintaining realism. The task should be specific enough that the model does not need to guess what is being asked.
          </DefinitionCard>
          <WhyItMattersCard>
            <p className="mb-2">In professional domains, <strong>"interpret it how you want" is a failure.</strong></p>
            <p className="text-sm text-muted-foreground">We need to grade these models. If the prompt is vague, we cannot distinguish between a model failure (the model couldn't do the work) and a prompt failure (the ask was never clear).</p>
          </WhyItMattersCard>
          <div className="space-y-3 mt-4">
            <ExampleRow
              context="Finance"
              bad="Analyze Verizon's free cash flow using EBIT."
              issue="Which year? What tax rate should be used? How should CapEx be treated?"
              good={<>Calculate Unlevered Free Cash Flow using EBIT NOPAT, <strong className="text-green-600">using the provided 10-K extractions</strong>. <strong className="text-green-600">Assume a tax rate of 28.80%</strong>.</>}
            />
            <ExampleRow
              context="Nurse Scheduling"
              bad="Create a schedule for the hospital using the attached surgeon requests."
              issue="What are the hours? Are weekends included?"
              good={<>Create a <strong className="text-green-600">Monday–Friday schedule</strong>. ORs function 24/7, but surgeons prefer 6am–4pm. The hospital has <strong className="text-green-600">four dedicated trauma ORs</strong>.</>}
            />
            <ExampleRow
              context="Semiconductor Risk"
              bad="Analyze the risk of the ETF based on the provided spreadsheets."
              issue="Is risk volatility? Geopolitical exposure? Supply chain disruption?"
              good={<>Quantify the ETF's vulnerability to the <strong className="text-green-600">six scenarios in the 'Policy_Shocks' tab</strong>. <strong className="text-green-600">Report portfolio return impact as a percentage (two decimals)</strong>.</>}
            />
          </div>
        </SlideBlock>

        {/* Element #2 */}
        <SlideBlock title="Element #2 — Professional Role & Context">
          <DefinitionCard>
            The prompt assigns a specific professional persona with skin in the game. It defines the hierarchy, the audience, and the stakes of the task.
          </DefinitionCard>
          <WhyItMattersCard>
            <p className="mb-2">The professional role tells the model what standard to meet (for example, a Senior VP analyzes risk differently than a Junior Assistant).</p>
            <p className="text-sm text-muted-foreground">Context mirrors how real professional tasks are communicated. The model must demonstrate judgment by identifying what information is relevant and what can be ignored.</p>
          </WhyItMattersCard>
          <div className="space-y-3 mt-4">
            <ExampleRow
              context="Pharma / Clinical"
              bad="You are an AI assistant helping with drug data."
              issue="No role, no seniority, no stakes, and no indication of how the output will be used."
              good={<>You are a <strong className="text-green-600">Clinical Pharmacology Lead</strong> at a biopharmaceutical sponsor. The program team requires an interim PK/PD review to prepare for an <strong className="text-green-600">internal governance meeting</strong>.</>}
            />
            <ExampleRow
              context="Concierge"
              bad="Plan a trip to Istanbul for a rich client."
              issue="Client expectations, standards, and constraints are undefined."
              good={<>You are the <strong className="text-green-600">Chief of Staff</strong> for an ultra-high net worth individual who exited his last venture for over $1 billion. You need to ensure every moment of the trip is handled with <strong className="text-green-600">white glove service</strong>.</>}
            />
            <ExampleRow
              context="Audio Engineering"
              bad="Mix this song so it sounds good."
              issue='"Sounds good" is subjective and does not establish professional standards.'
              good={<>You are a <strong className="text-green-600">mixing engineer</strong> working with a film studio on a diegetic song in a major motion picture. The <strong className="text-green-600">director has requested</strong> aggressive T-Pain–style auto-tune.</>}
            />
            <ExampleRow
              context="Government Administration"
              bad="Summarize these articles about AI in government."
              issue="The audience, purpose, and decision context are unclear."
              good={<>You are an <strong className="text-green-600">Administrative Operations Lead</strong> in a government department. There is a strategic goal to expand automation. Create a scan to <strong className="text-green-600">guide strategic planning</strong>.</>}
            />
          </div>
        </SlideBlock>

        {/* Element #3 */}
        <SlideBlock title="Element #3 — Realistic & NOT Contrived">
          <DefinitionCard>
            A realistic prompt asks the model to perform a task that a real professional in that role would plausibly be responsible for, using outputs they could actually produce within real workflows and constraints. A prompt is <strong>contrived</strong> when it asks for an outcome that bypasses systems, approvals, or role boundaries, even if it sounds professional.
          </DefinitionCard>
          <WhyItMattersCard>
            <p className="mb-2">We are training models to perform real job tasks inside real organizations.</p>
            <p className="text-sm text-muted-foreground">If a prompt ignores how work is actually done, the model may learn patterns that look correct but cannot transfer to real-world use.</p>
          </WhyItMattersCard>
          <div className="space-y-3 mt-4">
            <ExampleRow
              context="Finance / Payroll"
              bad="Go into Workday and modify the payroll records for three employees to adjust their salaries and tax withholdings to meet the new budget targets."
              issue="Finance professionals do not directly edit payroll records. Changes require HR coordination, approvals, and system-level permissions."
              good={<><strong className="text-green-600">Review the payroll data</strong> for three employees and <strong className="text-green-600">prepare a spreadsheet</strong> summarizing proposed salary and tax adjustments needed to meet the new budget targets. Include justification and notes for HR review.</>}
            />
            <ExampleRow
              context="Legal"
              bad="Update this signed client contract to remove unfavorable clauses and send the revised version to the client."
              issue="Lawyers cannot unilaterally change executed contracts. Contract modifications require amendments, negotiation, and counterparty approval."
              good={<>Review this signed client contract and <strong className="text-green-600">draft a memo</strong> identifying clauses that may be unfavorable, along with <strong className="text-green-600">recommended amendment language</strong> and next steps for client discussion.</>}
            />
          </div>
        </SlideBlock>

        {/* Element #4 */}
        <SlideBlock title="Element #4 — Timelessness (Relative Dating)">
          <DefinitionCard>
            The prompt establishes a "current date" within the scenario logic rather than relying on real-world calendar dates or current events that will age out.
          </DefinitionCard>
          <WhyItMattersCard>
            <p className="mb-2">If a prompt says "Today is Tuesday," it may be false when the model is tested in the future.</p>
            <p className="text-sm text-muted-foreground">Prompts must anchor time explicitly within the scenario.</p>
          </WhyItMattersCard>
          <div className="space-y-3 mt-4">
            <ExampleRow
              context="Retail Planning"
              bad="Plan the sales for next month (October 2023)."
              issue="Relies on a real-world date that will become outdated."
              good={<><strong className="text-green-600">It is September 2024</strong>. You have been tasked with leading the 2024 Black Friday event. Create an <strong className="text-green-600">eight-week preparation plan</strong>.</>}
            />
            <ExampleRow
              context="Real Estate"
              bad="Find houses for sale right now."
              issue='"Right now" has no fixed meaning.'
              good={<><strong className="text-green-600">It is June 24, 2025</strong>. Select homes to show this weekend. The <strong className="text-green-600">buyers are only in town for two days</strong>.</>}
            />
            <ExampleRow
              context="Concierge"
              bad="Plan a trip for next summer."
              issue="Time reference is ambiguous and unstable."
              good={<>Day 1 is June 1. Day 2 is June 2. <strong className="text-green-600">Day 3 is June 3, the wedding day</strong>.</>}
            />
          </div>
        </SlideBlock>

        {/* Element #5 */}
        <SlideBlock title="Element #5 — Clear Deliverable">
          <DefinitionCard>
            Clear deliverable explicitly defines the output format, audience, and quality bar. The model should not have to guess whether the output is a PDF, CSV, or Python script.
          </DefinitionCard>
          <WhyItMattersCard>
            <p className="mb-2">The format is often part of the work.</p>
            <p className="text-sm text-muted-foreground">A Python script is useless to a CEO who asked for a PowerPoint.</p>
          </WhyItMattersCard>
          <div className="space-y-3 mt-4">
            <ExampleRow
              context="Data Analysis"
              bad="Give me the data."
              issue="The format and intended use are undefined."
              good={<>Create an <strong className="text-green-600">Excel workbook named SemiETF_PolicyRisk.xlsx</strong> with <strong className="text-green-600">exactly five tabs</strong>, in exactly this order: Holdings_Clean, Exposure_By_Region…</>}
            />
            <ExampleRow
              context="Design / CAD"
              bad="Make a 3D file."
              issue="File type, naming conventions, and downstream usage are unclear."
              good={<>Save the output as a <strong className="text-green-600">STEP file named coverplate.step</strong>. List the number, radius, and length in a <strong className="text-green-600">separate Excel file</strong>.</>}
            />
            <ExampleRow
              context="Marketing"
              bad="Make a presentation."
              issue="Audience and success criteria are undefined."
              good={<>Design a modern <strong className="text-green-600">PDF presentation deck</strong> (approximately <strong className="text-green-600">15–18 slides</strong>). Each slide should focus on a core service category.</>}
            />
          </div>
        </SlideBlock>

        {/* Element #6 */}
        <SlideBlock title="Element #6 — Clear Constraints">
          <DefinitionCard>
            Clear constraints define <strong>real-world limitations and tradeoffs</strong>: resource constraints, competing priorities, business rules, and operational boundaries. These go beyond output formatting to include the guardrails that make professional tasks meaningfully difficult.
          </DefinitionCard>
          <WhyItMattersCard>
            <p>Constraints force the model to trade off between competing goals such as speed vs. accuracy or brevity vs. completeness.</p>
          </WhyItMattersCard>
          <div className="space-y-3 mt-4">
            <ExampleRow
              context="Finance"
              bad="Make a spreadsheet for the investment."
              issue="No validation or calculation constraints are defined."
              good={<>The tables should be dynamic with <strong className="text-green-600">no hardcoded cells</strong>. If a number cannot be traced to the spreadsheet output, it <strong className="text-green-600">must not be stated</strong>.</>}
            />
            <ExampleRow
              context="Nurse Scheduling"
              bad="Schedule the surgeries."
              issue="No competing priorities or real-world constraints."
              good={<>The hospital <strong className="text-green-600">prioritizes trauma readiness</strong>, maximizes weekday utilization, and the ER has mentioned a potential mass casualty event.</>}
            />
            <ExampleRow
              context="Audio"
              bad="Auto-tune the vocals."
              issue="Creative direction and constraints are missing."
              good={<>The director has requested an <strong className="text-green-600">aggressive auto-tune</strong> effect, similar to T-Pain.</>}
            />
          </div>
        </SlideBlock>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2.5: Input Files */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <SectionDivider 
          number={2.5} 
          title="Input Files" 
          subtitle="Supporting documents and data for your task"
        />

        <SlideBlock title="Why Input Files Matter">
          <p>
            <strong>Professional domain tasks often require reference material in order to be representative.</strong> These need to be accounted for and considered as part of the task design.
          </p>
          <p>
            In professional work, you rarely give instructions without providing the necessary materials. A financial analyst needs the spreadsheet data. An auditor needs the population file. A buyer needs the vendor quotations.
          </p>
          <Card className="border-2 border-primary/30 bg-primary/5 mt-4">
            <CardContent className="p-4">
              <p className="font-semibold text-foreground mb-2">Input files vs. Output deliverables</p>
              <p className="text-sm text-muted-foreground">
                Input files are materials you provide with the prompt. The deliverable is what the model creates. They are not the same thing.
              </p>
            </CardContent>
          </Card>
        </SlideBlock>

        <SlideBlock title="Input File Best Practices">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Name files explicitly in the prompt</p>
                    <p className="text-sm text-muted-foreground">Reference input files by their exact names so the model knows which materials to use.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Make files self-contained</p>
                    <p className="text-sm text-muted-foreground">All data needed to complete the task should be in the input files. No external lookups required.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Reference specific tabs, columns, or sections</p>
                    <p className="text-sm text-muted-foreground">For spreadsheets and documents, specify exactly where relevant data lives.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideBlock>

        <SlideBlock title="Using Links in Prompts">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <LinkIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Important: Links in Prompts</p>
                  <p className="text-sm">
                    <strong>Avoid using URLs or hyperlinks in prompts.</strong> Models cannot reliably access web pages or external links. All necessary information should be included directly in the prompt or attached as input files.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideBlock>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: Golden Example Deliverable */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <SectionDivider 
          number={3} 
          title="Golden Example Deliverable" 
          subtitle="Your attempt at the actual deliverable"
        />

        <SlideBlock title="What is a Golden Example Deliverable?">
          <p>
            <strong>A Golden Example Deliverable is your attempt at producing the actual deliverable for a task.</strong> While the model will not train directly on your deliverable, producing a Golden Example Deliverable is critical because it forces you to deeply understand what a good output looks like, what truly matters in the task, and which elements should be captured and evaluated in the rubric.
          </p>
          <p>
            Based on our review of thousands of these tasks, we consistently see that fellows who produce thoughtful, well-reasoned Golden Example Deliverables go on to create significantly higher-quality rubrics and tasks overall. <strong>In our experience, those who invest care and effort into their Golden Example Deliverables score meaningfully higher.</strong>
          </p>
        </SlideBlock>

        <SlideBlock title="What a Golden Example Deliverable does not need to be">
          <p>
            A Golden Example Deliverable <strong>is not a perfect, polished final product</strong>.
          </p>
          <p>
            It does not need to be perfect, fully polished, or something you would confidently send to your boss or a client.
          </p>
          <p>
            However, it does need to be <strong>sufficiently thoughtful and detailed</strong> so that you have a complete understanding of what a strong output would include.
          </p>
          <p className="text-primary font-medium">
            The goal is comprehension and evaluation, not perfection.
          </p>
        </SlideBlock>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: Rubrics */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <SectionDivider 
          number={4} 
          title="Rubrics" 
          subtitle="Learning how to effectively build good Rubric Criterion"
        />

        <SlideBlock title="What is a rubric?">
          <p>
            <strong>A rubric is your way of evaluating responses or outputs to the task you designed in a systematic way.</strong>
          </p>
          <p>
            The conceptual goal of a good rubric is to ensure that no satisfactory or good output would fail, but no bad output would pass.
          </p>
          <p>
            Rubrics in this case are much more detailed and specific than rubrics you may be used to, such as those used in a sixth grade class. They are somewhere between a checklist and a mark scheme for high school essays — closer to a <strong>checklist-style open-ended mark scheme</strong>. The way they differ from a checklist is primarily that <strong>weights are included</strong>.
          </p>
          <Card className="mt-4 border-2 border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-lg">
                A rubric is a <strong className="underline decoration-primary decoration-2">collection of criteria</strong> that collectively define what a good response is to a specific prompt, <strong>now and in the future</strong>.
              </p>
            </CardContent>
          </Card>
        </SlideBlock>

        <SlideBlock title="Why do we need a rubric?">
          <p>
            As AI models move beyond verifiable, discrete tasks and into real-world reasoning tasks, <strong>evaluation becomes more complex</strong>. For many professional tasks, a response cannot be graded with a simple right or wrong check.
          </p>
          <p>
            In expert domains, quality depends on multiple dimensions. A response might be factually correct but incomplete, well-written but unsafe, or persuasive but poorly reasoned. That is why evaluation requires <strong>nuanced, multi-criteria judgment</strong>, similar to how people assess work in real jobs.
          </p>
          <p>
            In these contexts, "good enough" is rarely binary. It is a combination of <strong>accuracy, completeness, reasoning, clarity, tone, safety, and task fit</strong>.
          </p>
        </SlideBlock>

        <SlideBlock title="The Rubric Judge (Judge Models)">
          <p className="text-muted-foreground mb-4">
            Once a Rubric has been created, future responses to the prompt will be evaluated using a <strong>judge model</strong>.
          </p>
          <p className="text-muted-foreground mb-4">
            You can think of a judge model as a very simple AI that does only three things:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <p className="font-medium text-foreground">Reads one criterion</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <p className="font-medium text-foreground">Reads the output produced by the prompt (the deliverable)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <p className="font-medium text-foreground">Decides whether the criterion is TRUE or FALSE</p>
            </div>
          </div>
          <Card className="mt-4 border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <p className="font-semibold text-foreground mb-2">Important Constraint</p>
              <p className="text-sm text-muted-foreground">
                The judge model evaluates these in <strong className="text-primary">isolation</strong>:
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground mt-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  It does not read <strong className="text-foreground">the original prompt</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  It does not read <strong className="text-foreground">input files</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  It does not read <strong className="text-foreground">other criteria</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  It does not have access to <strong className="text-foreground">the Internet</strong>
                </li>
              </ul>
            </CardContent>
          </Card>
        </SlideBlock>

        <SlideBlock title="Why good rubrics matter">
          <p>
            Rubrics are necessary to evaluate tasks where there is <strong>not one black-and-white correct answer</strong>.
          </p>
          <p>
            In professional work, there is often more than one good way to produce an output. While in math there is often one right answer, in the real world there are multiple ways to build an LBO model, create a holiday itinerary, or design a farming schedule.
          </p>
          <p>
            In order to evaluate a model doing that work well, <strong>you need a rubric</strong>.
          </p>
          <Card className="mt-4 border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Key Insight</p>
              <p>Without good rubrics, you would not have a good way to determine which outputs are good or bad and therefore should be rewarded. Without that reward signal, AI models cannot improve.</p>
            </CardContent>
          </Card>
        </SlideBlock>

        <SlideBlock title="What really makes up a good Rubric and good Rubric Criterion?">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3 text-primary">Rubric Characteristics</h4>
              <div className="space-y-2">
                <Card><CardContent className="p-3"><p><strong>Coverage</strong> — A good rubric is exhaustive. It covers the full breadth of what matters for evaluating the task.</p></CardContent></Card>
                <Card><CardContent className="p-3"><p><strong>Professional Judgment</strong> — A good rubric captures the nuanced taste and expertise of the profession.</p></CardContent></Card>
                <Card><CardContent className="p-3"><p><strong>Evaluator Consistency</strong> — A good rubric produces consistent results across evaluators.</p></CardContent></Card>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-primary">Criterion Characteristics</h4>
              <div className="space-y-2">
                <Card><CardContent className="p-3"><p><strong>Not Stacked</strong> — A good criterion evaluates one thing at a time.</p></CardContent></Card>
                <Card><CardContent className="p-3"><p><strong>Programmatically Verifiable</strong> — A good criterion can be evaluated at scale.</p></CardContent></Card>
                <Card><CardContent className="p-3"><p><strong>Consistently Evaluable</strong> — A good criterion returns the same result when applied repeatedly.</p></CardContent></Card>
                <Card><CardContent className="p-3"><p><strong>Self-contained</strong> — A good criterion can be evaluated using only the deliverable itself.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </SlideBlock>

        {/* 8 Criterion-Level Issues */}
        <SlideBlock title="The 8 Core Criterion-Level Issues">
          <p className="mb-4 text-muted-foreground">
            Each criterion you write must avoid these eight common errors. A criterion that violates any of these will cause inconsistent or unreliable evaluations.
          </p>
          <div className="space-y-3">
            <ErrorBox number={1} name="Ambiguous" description="Uses subjective language or undefined standards" />
            <ErrorBox number={2} name="Not Self-contained" description="Relies on external context the judge can't access" />
            <ErrorBox number={3} name="Stacked" description="Bundles multiple independent checks into one" />
            <ErrorBox number={4} name="Convoluted Phrasing" description="Longer or more complex than necessary" />
            <ErrorBox number={5} name="Process Words" description="Evaluates how it was made, not what it is" />
            <ErrorBox number={6} name="Incorrect Label" description="Implicit/Explicit label doesn't match whether requirement is stated" />
            <ErrorBox number={7} name="Inaccurate Weighting" description="Weight doesn't reflect relative importance" />
            <ErrorBox number={8} name="Restrictive" description="Overfits to a narrow version of the 'right answer'" />
          </div>
        </SlideBlock>

        {/* Criterion Error #1 */}
        <SlideBlock title="Criterion Error #1 — Ambiguous">
          <DefinitionCard>
            A criterion is ambiguous when a judge model cannot reliably mark it true or false because it uses subjective language, undefined standards, or fuzzy thresholds. Ambiguity leads to inconsistent scoring across evaluators and future responses.
          </DefinitionCard>
          <CriterionExample
            bad="The proposal deck is well-organized."
            badExplanation='"Well-organized" is subjective and open to interpretation.'
            good="The proposal deck includes a slide titled 'Risks and Mitigations'."
            goodExplanation="Checks for a specific, observable artifact."
            quickTest="Could two reasonable reviewers disagree while reading the same output?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Look for subjective adjectives like "good," "clear," "professional," or "correct."</li>
              <li>Look for undefined standards such as "best practices" or "high quality."</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Criterion Error #2 */}
        <SlideBlock title="Criterion Error #2 — Not Self-contained">
          <DefinitionCard>
            A criterion is not self-contained when it relies on information outside the criterion and the deliverable. The judge model evaluates each criterion in isolation and does not read the prompt, input files, or links.
          </DefinitionCard>
          <CriterionExample
            bad="The summary includes the total Q1 sales from the input data."
            badExplanation='The judge model does not have access to "the input data."'
            good="The summary states total Q1 sales are $1,240,000."
            goodExplanation="All required context is included directly."
            quickTest="Could someone judge this criterion using only the criterion text and the deliverable?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Look for references like "from the prompt," "from the input file," or "as described above."</li>
              <li>Look for pronouns that require external context.</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Criterion Error #3 */}
        <SlideBlock title="Criterion Error #3 — Stacked">
          <DefinitionCard>
            A criterion is stacked when it measures two or more independent checks at once. Because scoring is binary, partial success still results in failure, creating noisy and unfair scoring.
          </DefinitionCard>
          <CriterionExample
            bad="The email includes the meeting date and the Zoom link."
            badExplanation="Bundles two independent requirements into one check."
            good="The email includes the meeting date."
            goodExplanation="Evaluates a single requirement."
            quickTest="Could a response satisfy part of this criterion but still fail it?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Look for "and," "as well as," or multiple nouns in one criterion.</li>
              <li>Ask whether partial compliance is possible.</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Criterion Error #4 */}
        <SlideBlock title="Criterion Error #4 — Convoluted Phrasing">
          <DefinitionCard>
            A criterion has convoluted phrasing when it is longer or more complex than necessary, making it harder to interpret consistently.
          </DefinitionCard>
          <CriterionExample
            bad="The summary report has a table in it where the title indicates that it is meant to be a summary of the values for farm produce production for 2026."
            badExplanation="Wordy, indirect, and harder to parse."
            good="The table in the Summary Report includes a title indicating it summarizes farm produce production for 2026."
            goodExplanation="Concise, direct, and easy to evaluate."
            quickTest="Can you rewrite it in one shorter sentence without losing meaning?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Look for long dependent clauses or repeated phrasing.</li>
              <li>Notice if you have to reread the criterion.</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Criterion Error #5 */}
        <SlideBlock title="Criterion Error #5 — Process Words">
          <DefinitionCard>
            A criterion uses process words when it evaluates how the deliverable was produced rather than what the deliverable contains or is.
          </DefinitionCard>
          <CriterionExample
            bad="The sample track is converted into an MP4 file."
            badExplanation='"Converted" describes a process that is not observable in the final output.'
            good="The sample track is an MP4 file."
            goodExplanation="Evaluates the observable state of the deliverable."
            quickTest="Could the deliverable be correct even if you don't know how it was made?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Look for verbs like "converted," "validated," "ensured," or "followed."</li>
              <li>Look for phrases describing intent or method.</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Criterion Error #6 */}
        <SlideBlock title="Criterion Error #6 — Incorrect Label">
          <DefinitionCard>
            The Implicit/Explicit label is incorrect when it does not align with whether the requirement is directly stated in the prompt (Explicit) or implied by the task and requires intermediate steps or domain judgment (Implicit).
          </DefinitionCard>
          <CriterionExample
            bad="The 1040 package includes Schedule A. [Labeled: Explicit]"
            badExplanation="Whether Schedule A is required depends on interpreting the client's documents → should be Implicit."
            good="The 1040 package is in PDF format. [Labeled: Explicit]"
            goodExplanation="Prompt directly says PDF, so Explicit label is correct."
            quickTest="Is this requirement directly stated word-for-word in the prompt?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Traceability test: Can you point to a sentence in the prompt that directly states the requirement?</li>
              <li>If yes → Explicit. If it requires intermediate steps or judgment → Implicit.</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Criterion Error #7 */}
        <SlideBlock title="Criterion Error #7 — Inaccurate Weighting">
          <DefinitionCard>
            Inaccurate weighting occurs when a criterion's assigned weight does not reflect its true importance to the task. A trivial formatting check should not carry the same weight as a core functional requirement.
          </DefinitionCard>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-xs font-semibold text-red-600 mb-2">✗ Inaccurate</p>
              <p className="text-sm">"The report uses Times New Roman font." <span className="text-red-600 font-bold">(Weight: 90)</span></p>
              <p className="text-xs text-muted-foreground mt-2">Font choice is trivial polish, not a core requirement.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs font-semibold text-green-600 mb-2">✓ Accurate</p>
              <p className="text-sm">"The report uses Times New Roman font." <span className="text-green-600 font-bold">(Weight: 10)</span></p>
              <p className="text-xs text-muted-foreground mt-2">Minor formatting weighted appropriately low.</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground"><strong>Quick Test:</strong> Would getting this criterion wrong truly matter for the task's success?</p>
        </SlideBlock>

        {/* Criterion Error #8 */}
        <SlideBlock title="Criterion Error #8 — Restrictive">
          <DefinitionCard>
            Restrictive criteria are those that overfit to a specific "correct" output rather than evaluating acceptable variations. A criterion is restrictive when it would reject alternative valid solutions that meet the task requirements.
          </DefinitionCard>
          <CriterionExample
            bad="The executive summary uses exactly three bullet points."
            badExplanation="Overly prescriptive—four bullets could be equally acceptable."
            good="The executive summary includes a bulleted list of key findings."
            goodExplanation="Allows flexibility while checking the core requirement."
            quickTest="Would this criterion reject other valid approaches to the same task?"
          />
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Ask: "Is there only one way to satisfy this requirement?"</li>
              <li>Look for overly specific counts, exact wording, or narrow format requirements.</li>
            </ul>
          </div>
        </SlideBlock>

        {/* 3 Rubric-Level Issues */}
        <SlideBlock title="The 3 Core Rubric-Level Issues">
          <p className="mb-4 text-muted-foreground">
            These are rubric-level issues that affect overall quality. Unlike criterion-level errors, these problems span across the rubric as a whole.
          </p>
          <div className="space-y-3">
            <ErrorBox number={1} name="Redundancy" description="Criteria overlap with each other or check the same thing" color="amber" />
            <ErrorBox number={2} name="Missing Criteria" description="Fails to include criteria for essential requirements" color="amber" />
            <ErrorBox number={3} name="Relative Weighting" description="Relative weights across criteria don't reflect comparative importance" color="amber" />
          </div>
        </SlideBlock>

        {/* Rubric Error #1 */}
        <SlideBlock title="Rubric Issue #1 — Redundancy">
          <DefinitionCard>
            Redundancy is a rubric-level error where criteria overlap with each other or check the same underlying requirement multiple times. This inflates the importance of certain aspects and creates unfair scoring when the same thing is evaluated twice.
          </DefinitionCard>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-xs font-semibold text-red-600 mb-2">✗ Redundant Criteria</p>
              <p className="text-sm mb-2">"The summary includes a company overview section."</p>
              <p className="text-sm">"The summary contains a paragraph describing the company."</p>
              <p className="text-xs text-muted-foreground mt-2">Both check the same requirement—double-counting.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs font-semibold text-green-600 mb-2">✓ Single Criterion</p>
              <p className="text-sm">"The summary includes a company overview section."</p>
              <p className="text-xs text-muted-foreground mt-2">Single, clear criterion for this requirement.</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Overlap test: Would satisfying criterion A automatically satisfy criterion B?</li>
              <li>Double-counting test: If a deliverable fails one, would it likely also fail another?</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Rubric Error #2 */}
        <SlideBlock title="Rubric Issue #2 — Missing Criteria">
          <DefinitionCard>
            Missing Criteria is a rubric-level error: the rubric fails to include criteria for one or more essential requirements (core prompt asks, critical failure modes, or key quality dimensions). This allows clearly bad or incomplete deliverables to score well.
          </DefinitionCard>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Do a prompt decomposition and make a checklist of explicit must-haves. Verify each has at least one criterion.</li>
              <li>Run a "bad-but-polished" thought experiment: Could a deliverable omit a core requirement and still score high?</li>
              <li>Check category coverage: Are Instruction Following + Reasoning + Formatting represented appropriately?</li>
              <li>Check failure-mode coverage: Are common wrong responses penalized?</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Rubric Error #3 */}
        <SlideBlock title="Rubric Issue #3 — Relative Weighting">
          <DefinitionCard>
            Relative weighting is a rubric-level error where the weights across criteria don't reflect their comparative importance. Even if individual weights seem reasonable in isolation, the relative balance between criteria may be off.
          </DefinitionCard>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-xs font-semibold text-red-600 mb-2">✗ Imbalanced Weights</p>
              <p className="text-sm mb-1">"Incident date placeholder" <span className="text-red-600">(Weight: 90)</span></p>
              <p className="text-sm mb-1">"Location placeholder" <span className="text-red-600">(Weight: 30)</span></p>
              <p className="text-sm">"Headings are bolded" <span className="text-red-600">(Weight: 90)</span></p>
              <p className="text-xs text-muted-foreground mt-2">Why is location weighted so much lower than date? Why is formatting equal to core requirements?</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs font-semibold text-green-600 mb-2">✓ Balanced Weights</p>
              <p className="text-sm mb-1">"Incident date placeholder" <span className="text-green-600">(Weight: 90)</span></p>
              <p className="text-sm mb-1">"Location placeholder" <span className="text-green-600">(Weight: 90)</span></p>
              <p className="text-sm">"Headings are bolded" <span className="text-green-600">(Weight: 20)</span></p>
              <p className="text-xs text-muted-foreground mt-2">Core requirements weighted consistently, formatting weighted lower.</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">How to Detect:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Pairwise comparison: Compare weights of similar-importance criteria—are they consistent?</li>
              <li>Category balance: Do "polish" criteria collectively outweigh "core" criteria?</li>
              <li>Proportionality test: Does a 90-weight criterion really matter 9× more than a 10-weight criterion?</li>
            </ul>
          </div>
        </SlideBlock>

        {/* Rubrics Are Iterative */}
        <SlideBlock title="Rubrics Are Iterative: Dogfooding Them">
          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Core Idea</p>
              <p>Great rubrics are almost never written correctly on the first attempt. They improve through iteration, by pressure-testing them against multiple responses and observing how they behave in practice.</p>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Why Iteration is Necessary</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Overfitting the rubric to the original Gold response</li>
                <li>Liking or anchoring on the specific model response you happened to see first</li>
                <li>Missing important failure modes that only appear in other responses</li>
                <li>Overweighting or underweighting certain criteria unintentionally</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">What "Dogfooding" Means</p>
              <p className="mb-2">Dogfooding a rubric means using it the same way it will be used in training. You generate multiple responses to the same prompt and apply your rubric to all of them, including:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Strong responses</li>
                <li>Weak responses</li>
                <li>Intentionally flawed responses</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">What to Dogfood</p>
              <p className="mb-2"><strong>1. The Full Rubric</strong></p>
              <p className="text-sm text-muted-foreground mb-3">Ask: Does the rubric, as a whole, separate good responses from bad ones? Do the top-scoring responses actually look like what you consider "good"?</p>
              <p className="mb-2"><strong>2. Individual Criteria</strong></p>
              <p className="text-sm text-muted-foreground">Ask: Does this criterion behave consistently across responses? Does it accidentally depend on context the judge model cannot see?</p>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Key Takeaway</p>
              <p className="font-medium">A rubric is not a static artifact. It is a tool that improves through use. Dogfooding helps ensure your rubric is robust, generalizable, and aligned with how models will actually be trained.</p>
            </CardContent>
          </Card>
        </SlideBlock>

        {/* Footer */}
        <div className="py-12 text-center border-t mt-12 print:break-before-page">
          <p className="text-muted-foreground">End of Reference Guide</p>
          <p className="text-sm text-muted-foreground mt-2">Project Beet 2.0 Training Course</p>
        </div>
      </main>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-before-page {
            break-before: page;
          }
          .print\\:break-after-page {
            break-after: page;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseReference;
