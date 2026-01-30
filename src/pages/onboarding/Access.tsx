import { 
  Layers, Users, FileText, Target, Scale, ArrowRight, Sparkles,
  AlertTriangle, Lightbulb, CheckCircle2, GraduationCap, Zap,
  Video, Presentation, ExternalLink, Archive
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageNavigation from "@/components/PageNavigation";
import { cn } from "@/lib/utils";
import { usePageVisit } from "@/hooks/usePageVisit";

// Track page visit
const useAccessVisit = () => usePageVisit("onboarding-access-visited");

// Section Card wrapper matching Welcome page style
const SectionCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn(
    "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm",
    className
  )}>
    {children}
  </div>
);

// Section Header matching Welcome page style
const SectionHeader = ({ 
  icon: Icon, 
  title, 
  number 
}: { 
  icon: React.ElementType; 
  title: string;
  number: string;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="relative">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-500 flex items-center justify-center">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{number}</span>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
  </div>
);

// Key Takeaways Component matching Welcome page
const KeyTakeaways = ({ items }: { items: string[] }) => (
  <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 p-5 mt-6">
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="w-5 h-5 text-amber-500" />
      <h4 className="font-bold text-slate-900 dark:text-white">Key Takeaways</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Feature Card Component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  items,
  highlight
}: { 
  icon: React.ElementType; 
  title: string; 
  items: string[];
  highlight?: boolean;
}) => (
  <div className={cn(
    "rounded-xl border p-5 transition-all duration-300",
    highlight 
      ? "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30" 
      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
  )}>
    <div className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center mb-4 shadow-md",
      highlight 
        ? "bg-gradient-to-br from-amber-500 to-orange-500" 
        : "bg-gradient-to-br from-indigo-500 to-purple-600"
    )}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h4 className="font-bold mb-3 text-slate-900 dark:text-white">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Comparison Table Row
const ComparisonRow = ({ 
  label, 
  beet1, 
  beet2 
}: { 
  label: string; 
  beet1: string; 
  beet2: string;
}) => (
  <div className="grid grid-cols-3 gap-4 py-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
    <div className="font-medium text-sm text-slate-900 dark:text-white">{label}</div>
    <div className="text-sm text-slate-500 dark:text-slate-400">{beet1}</div>
    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{beet2}</div>
  </div>
);

const Access = () => {
  useAccessVisit();
  
  return (
    <div className="pb-24">
      <Breadcrumbs />
      
      {/* Hero Section - Matching Welcome page style */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3),transparent_50%)]" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-purple-400/20 blur-xl" />
        
        <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Essential Context</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-400/30 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Before You Begin</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Context Sharing: Beet 1.0 → 2.0
          </h1>
          
          <p className="text-xl text-white/95 max-w-3xl leading-relaxed">
            Understanding the evolution from evaluation-focused work to test construction 
            is essential for succeeding in Project Beet 2.0.
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-2xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              Beet 2.0 Is Not a Small Iteration
            </h2>
            <p className="text-amber-800 dark:text-amber-200">
              It represents a <strong>fundamental shift in responsibility, judgment, and difficulty</strong>. 
              Before you begin any work in Project Beet 2.0, it's important to understand how this project 
              evolved and why the expectations are different now.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Beet 1.0 Overview */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Layers} title="Project Beet 1.0 — What the Work Was" number="1" />
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
          Project Beet 1.0 was primarily about <strong className="text-slate-900 dark:text-white">evaluation</strong>.
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          At that stage, the hardest problems were downstream: <em>How do we judge whether an AI model's 
          response is good or bad?</em> To answer that, Beet 1.0 relied on a clear division of labor.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <FeatureCard
            icon={Users}
            title="Client-Driven Scenarios"
            items={[
              "Clients designed the prompts",
              "Clients often supplied the input files",
              "Fellows did not design the professional scenario",
              "The task was not to invent the test — it was to evaluate the result"
            ]}
          />
          <FeatureCard
            icon={FileText}
            title="What Fellows Actually Did"
            items={[
              "Produced a Golden Human-Made Deliverable",
              "Created a Comprehensive Rubric (~80–100+ criteria)",
              "The golden deliverable = ideal professional response",
              "The rubric defined how model responses would be scored"
            ]}
          />
        </div>

        <KeyTakeaways items={[
          "Beet 1.0 focused on evaluating model outputs, not designing tests",
          "Clients provided prompts and scenarios; Fellows evaluated results",
          "Fellows created both a 'golden example' and a detailed rubric",
          "The professional context and constraints were already decided for you"
        ]} />
      </SectionCard>

      {/* Section 2: Evaluation Process */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Scale} title="What 'Evaluation' Meant in Practice" number="2" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Evaluation in Beet 1.0 followed a relatively straightforward logic:
        </p>

        {/* Flow Diagram */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 flex-wrap">
          <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200">
            Prompt + Files
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
          <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200">
            Model Output
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
          <div className="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Scored Against Rubric
          </div>
        </div>

        <div className="space-y-4 text-slate-600 dark:text-slate-300 mb-6">
          <p>
            Fellows first created the golden example. Then they wrote rubric criteria that measured 
            how closely a model's response matched that example.
          </p>
          <p>
            If the model output aligned closely with the golden deliverable, it scored well. 
            If it diverged, it scored poorly. This allowed consistent, repeatable comparison between 
            <strong className="text-slate-900 dark:text-white"> expert-level human work</strong> and 
            <strong className="text-slate-900 dark:text-white"> model-generated work</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 p-5 mb-6">
          <p className="text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">Result:</strong> The deliverable was the anchor, 
            and the rubric measured alignment to it. Success meant matching the gold standard.
          </p>
        </div>

        {/* Rubric Role */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
          <h4 className="font-bold text-slate-900 dark:text-white mb-3">The Role of Rubrics in Beet 1.0</h4>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Rubrics in Beet 1.0 were intentionally large and exhaustive:
          </p>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">~80–100+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Individual Criteria</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-center">
              <span className="text-sm text-slate-600 dark:text-slate-300">Highly specific checks tied to the golden deliverable</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-center">
              <span className="text-sm text-slate-600 dark:text-slate-300">Designed to answer one core question</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 font-medium text-center">
              "Did the model produce the same thing a skilled human would have produced?"
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mt-4">
            This approach worked well for grading outputs — but it had limits.
          </p>
        </div>

        <KeyTakeaways items={[
          "The evaluation workflow: Prompt + Files → Model Output → Scored Against Rubric",
          "The golden deliverable served as the 'answer key' for scoring",
          "Rubrics were large (~80–100+ criteria) and tied directly to the golden example",
          "This approach optimized for grading, not for understanding why models fail"
        ]} />
      </SectionCard>

      {/* Section 3: Beet 2.0 Overview */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Sparkles} title="Project Beet 2.0 — What Changed" number="3" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
          Beet 2.0 <strong className="text-slate-900 dark:text-white">moves upstream</strong>.
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Instead of only evaluating model outputs, Beet 2.0 focuses on 
          <strong className="text-slate-900 dark:text-white"> constructing the tests themselves</strong>. 
          This changes who is responsible for what.
        </p>

        <FeatureCard
          icon={Zap}
          title="A Shift in Responsibility — In Beet 2.0:"
          items={[
            "You design the prompt",
            "You define or assume the input files",
            "You write the rubric",
            "You are responsible for inducing meaningful model failure"
          ]}
          highlight
        />

        <div className="mt-6 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Rather than scoring a model against a fixed answer, you are now engineering realistic 
            professional scenarios that expose where models break down.
          </p>
          <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-700">
            <p className="font-semibold text-slate-900 dark:text-white">
              This is harder work — and more valuable work.
            </p>
          </div>
        </div>

        <KeyTakeaways items={[
          "Beet 2.0 shifts focus from evaluating outputs to constructing tests",
          "You are now responsible for designing prompts, files, and rubrics",
          "The goal is to induce meaningful model failures, not just grade responses",
          "This requires stronger professional judgment and principled thinking"
        ]} />
      </SectionCard>

      {/* Section 4: Deliverable Distinction */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Target} title="The Deliverable in Beet 2.0" number="4" />

        {/* Warning callout */}
        <div className="rounded-xl border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Read This Carefully</h4>
              <p className="text-amber-800 dark:text-amber-200">
                In Beet 2.0, a human-made deliverable may still be created — but its role is different.
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
          <strong className="text-slate-900 dark:text-white">The deliverable exists to help you think clearly.</strong>
        </p>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 mb-6">
          <p className="text-slate-700 dark:text-slate-300 mb-3">It helps you:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">Understand what a competent professional response could look like</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">Identify which dimensions of quality actually matter</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">Write rubric criteria that are concrete and judgeable</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 p-5 mb-6">
          <p className="font-bold text-slate-900 dark:text-white mb-2">However:</p>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>The deliverable is no longer the thing being graded.</strong>
          </p>
        </div>

        <div className="space-y-4 text-slate-600 dark:text-slate-300 mb-6">
          <p>
            The prompt and rubric together define the test. The rubric must be able to evaluate 
            <strong className="text-slate-900 dark:text-white"> any future response</strong> — not just one ideal example.
          </p>
        </div>

        <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
          <p className="font-semibold text-red-800 dark:text-red-200">
            If your rubric only works for a single "perfect" answer, it fails.
          </p>
        </div>

        <KeyTakeaways items={[
          "The deliverable is now a 'thinking aid,' not an answer key",
          "The prompt + rubric together define the test",
          "The rubric must evaluate any future response, not just one ideal example",
          "A rubric that only works for one 'perfect' answer is a failed rubric"
        ]} />
      </SectionCard>

      {/* Section 5: Side-by-Side Comparison */}
      <SectionCard className="mb-8">
        <SectionHeader icon={GraduationCap} title="Beet 1.0 vs Beet 2.0 — Side-by-Side" number="5" />

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-sm text-slate-900 dark:text-white">Dimension</div>
            <div className="font-semibold text-sm text-slate-500 dark:text-slate-400">Beet 1.0</div>
            <div className="font-semibold text-sm text-indigo-600 dark:text-indigo-400">Beet 2.0</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900">
            <ComparisonRow label="Who designs the prompt?" beet1="Client" beet2="Fellows" />
            <ComparisonRow label="Primary focus" beet1="Evaluation" beet2="Training Data" />
            <ComparisonRow label="Deliverable role" beet1="Answer key" beet2="Thinking aid" />
            <ComparisonRow label="Rubric" beet1="Criterion to judge model output" beet2="Criterion to judge model output" />
            <ComparisonRow label="Core goal" beet1="Evaluation" beet2="Training Data" />
          </div>
        </div>

        <KeyTakeaways items={[
          "The fundamental shift: from evaluation to test construction",
          "You now own the entire design process, not just scoring",
          "Success is defined by inducing failure, not matching an ideal",
          "The goal is teaching models how to reason, not just grading them"
        ]} />
      </SectionCard>

      {/* Section 6: Why This Matters */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Zap} title="Why This Shift Matters" number="6" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Modern AI systems no longer fail only because they lack knowledge.
        </p>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 mb-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">They fail because:</p>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "They miss dependencies",
              "They violate constraints",
              "They apply logic inconsistently",
              "They produce outputs that look professional but aren't"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 p-5 mb-6">
          <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Beet 2.0 exists to surface those failures.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Beet 1.0 optimized for</p>
              <p className="font-medium text-slate-700 dark:text-slate-300">Grading</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 border border-indigo-200 dark:border-indigo-700">
              <p className="text-sm text-indigo-600 dark:text-indigo-400">Beet 2.0 optimizes for</p>
              <p className="font-bold text-indigo-700 dark:text-indigo-300">Teaching models how to reason</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
          <p className="text-slate-700 dark:text-slate-300 mb-3">That requires:</p>
          <div className="grid md:grid-cols-3 gap-3">
            {["Better prompts", "More principled rubrics", "Stronger professional judgment"].map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <KeyTakeaways items={[
          "Modern AI fails due to reasoning gaps, not just lack of knowledge",
          "Beet 2.0 is designed to surface and expose those reasoning failures",
          "The shift is from grading outputs to teaching models to reason",
          "Everything in this onboarding builds on this distinction"
        ]} />
      </SectionCard>

      {/* Reference Materials */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Archive} title="Reference Materials (Historical)" number="7" />

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          For those who want additional background, we've included two reference materials from earlier 
          Project Beet bootcamps:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <a 
            href="https://drive.google.com/file/d/1NivGmJpor9fkBi2dHQ85tUbVlGJWsZNz/view" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Bootcamp Walkthrough Video
                    </h4>
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Reference only — Google Drive
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a 
            href="https://docs.google.com/presentation/d/1vdiy172U6FWmff--0skWrUhlgfnpSZxMZWRJDjR_iUE/edit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Presentation className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Bootcamp Presentation Deck
                    </h4>
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Reference only — Google Slides
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 p-4">
          <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
            These materials reflect earlier project assumptions and are included to show how the thinking 
            has evolved — <strong>not as current training content</strong>.
          </p>
        </div>
      </SectionCard>

      <PageNavigation
        previousPage={{ title: "Welcome", href: "/onboarding/welcome" }}
        nextPage={{ title: "Getting Set Up", href: "/onboarding/workflow" }}
      />
    </div>
  );
};

export default Access;
