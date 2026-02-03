import { Shield, CheckSquare, User, Target, Clock, FileOutput, Lock, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Example {
  weak: string;
  whyFails: string;
  strong: string;
  whyWorks: string;
}

interface Element {
  number: number;
  title: string;
  icon: React.ElementType;
  definition: string;
  whyItMatters: string;
  example?: Example;
}

const QualityGateSection = () => {
  const elements: Element[] = [
    {
      number: 1,
      title: "Unambiguous",
      icon: CheckSquare,
      definition: "The prompt avoids vague terms and is clear about what needs to be done, while maintaining realism. The task is specific enough that the model does not need to guess what is being asked.",
      whyItMatters: "In professional domains, \"interpret it how you want\" is a failure. We need to grade these models. If the prompt is vague, we cannot distinguish between:\n\n• A model failure (the model couldn't do the work)\n• A prompt failure (the ask was never clear)",
      example: {
        weak: "Review the department's administrative processes and suggest improvements.",
        whyFails: "The terms \"review\" and \"improvements\" are vague. There is no defined scope, no specified output, and no clear success criteria, so it is impossible to tell whether a failure is due to the model or the prompt.",
        strong: "Create a two-page briefing memo identifying three specific inefficiencies in the department's records management process and propose one actionable improvement per inefficiency, using evidence from the provided inventory and staff workload files.",
        whyWorks: "The task, scope, and outputs are explicit. The model does not need to guess what is being asked or what a complete answer looks like.",
      },
    },
    {
      number: 2,
      title: "Professional Role & Context",
      icon: User,
      definition: "The prompt assigns a specific professional persona with skin in the game. It defines the hierarchy, the audience, and the stakes of the task.",
      whyItMatters: "The professional role tells the model what standard to meet (e.g., a Senior VP analyzes risk differently than a Junior Assistant). Context mirrors how real professional tasks are communicated. The model must demonstrate judgment by identifying what information is relevant and what can be ignored.",
      example: {
        weak: "You are an administrative manager preparing information for leadership.",
        whyFails: "The role is generic, the audience is undefined, and there are no stated stakes or accountability.",
        strong: "You are the Administrative Services Manager for a mid-sized state agency, reporting to the Deputy Director of Operations. This briefing will be reviewed in a weekly operations meeting and used to decide whether to reallocate administrative staff in the next quarter.",
        whyWorks: "The role, hierarchy, audience, and stakes are explicit. The model must reason at the appropriate professional level.",
      },
    },
    {
      number: 3,
      title: "Realistic & NOT Contrived",
      icon: Target,
      definition: "A realistic prompt asks the model to perform a task that a real professional in that role would plausibly be responsible for, using outputs they could actually produce within real workflows and constraints. A prompt is contrived when it asks for an outcome that bypasses systems, approvals, or role boundaries, even if it sounds professional.",
      whyItMatters: "We are training models to perform real job tasks inside real organizations. If a prompt ignores how work is actually done, the model may learn patterns that look correct but cannot transfer to real-world use. This produces misleading training signals and weak generalization.",
      example: {
        weak: "As an Administrative Services Manager, redesign the agency's entire staffing model and approve the final budget.",
        whyFails: "The task exceeds the authority of the role, bypasses approval processes, and ignores how work is actually done in organizations.",
        strong: "As the Administrative Services Manager, prepare a staffing recommendation memo outlining two reallocation options, including risks and tradeoffs, for review by Finance and final approval by the Deputy Director.",
        whyWorks: "The task aligns with realistic role boundaries and reflects real organizational workflows.",
      },
    },
    {
      number: 4,
      title: "Timelessness (Relative Dating)",
      icon: Clock,
      definition: "The prompt establishes a \"current date\" within the scenario logic rather than relying on real-world calendar dates or current events that will age out.",
      whyItMatters: "If a prompt says \"Today is Tuesday,\" it may be false when the model is tested in the future.",
      example: {
        weak: "Today is March 12, 2024. Prepare a report for next Friday's meeting.",
        whyFails: "The prompt relies on real-world calendar dates that will become invalid over time.",
        strong: "Assume this task is being performed during Week 2 of the current quarterly planning cycle, with the deliverable due before the next scheduled operations review.",
        whyWorks: "Time is anchored within the scenario logic, keeping the prompt valid over time.",
      },
    },
    {
      number: 5,
      title: "Clear Deliverable",
      icon: FileOutput,
      definition: "Clear deliverable explicitly defines the output format, audience, and quality bar. The model should not have to guess whether the output is a PDF, CSV, or Python script.",
      whyItMatters: "The format is often part of the work. A Python script is useless to a CEO who asked for a PowerPoint.",
      example: {
        weak: "Summarize your findings and present them to leadership.",
        whyFails: "The output format, structure, and quality bar are undefined.",
        strong: "Produce a two- to three-page DOCX briefing memo for senior leadership, written in formal government memo style, including an executive summary, findings, and recommendations. Do not produce slides or code.",
        whyWorks: "The output format, audience, and expectations are explicitly defined.",
      },
    },
    {
      number: 6,
      title: "Clear Constraints",
      icon: Lock,
      definition: "Clear constraints define real-world limitations and tradeoffs: resource constraints, competing priorities, business rules, and operational boundaries. These go beyond output formatting to include the guardrails that make professional tasks meaningfully difficult.",
      whyItMatters: "Constraints force the model to trade off between competing goals such as speed vs. accuracy or brevity vs. completeness.",
      example: {
        weak: "Provide the best possible solution to improve administrative efficiency.",
        whyFails: "There are no constraints or tradeoffs, encouraging generic or idealized responses.",
        strong: "Constraints include no additional headcount or budget increases, compliance with existing state records retention policy, implementation within 90 days, and the use of partial and inconsistent data from two legacy systems.",
        whyWorks: "The constraints reflect real-world limitations and force meaningful tradeoffs, making the task realistically difficult.",
      },
    },
  ];

  const ExampleBlock = ({ example }: { example: Example }) => (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      {/* Weak Example */}
      <div className="rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
            <X className="w-3.5 h-3.5 text-destructive" />
          </div>
          <p className="text-xs font-semibold text-destructive uppercase tracking-wider">Weak Example</p>
        </div>
        <p className="text-sm text-foreground italic mb-3">"{example.weak}"</p>
        <div className="pt-3 border-t border-destructive/20">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Why This Fails</p>
          <p className="text-sm text-muted-foreground">{example.whyFails}</p>
        </div>
      </div>

      {/* Strong Example */}
      <div className="rounded-lg border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">Strong Example</p>
        </div>
        <p className="text-sm text-foreground italic mb-3">"{example.strong}"</p>
        <div className="pt-3 border-t border-green-500/20">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Why This Works</p>
          <p className="text-sm text-muted-foreground">{example.whyWorks}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 6: Run a Quality Checklist</h3>
            <p className="text-base text-foreground leading-relaxed">
              Use this checklist to verify your prompt meets all quality requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Elements */}
      <div className="space-y-4">
        {elements.map((element) => {
          const Icon = element.icon;

          return (
            <div
              key={element.number}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Element Header */}
              <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{element.number}</span>
                </div>
                <Icon className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">{element.title}</h4>
              </div>

              {/* Element Content */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Definition
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {element.definition}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
                    Why It Matters
                  </p>
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                    {element.whyItMatters}
                  </p>
                </div>

                {element.example && <ExampleBlock example={element.example} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QualityGateSection;
