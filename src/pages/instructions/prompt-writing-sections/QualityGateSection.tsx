import { Shield, Target, FileOutput, Sparkles, User, MapPin, AlertTriangle, FileCheck, FileInput, X, Check } from "lucide-react";

interface Example {
  weak: string;
  whyFails: string;
  strong: string;
  whyWorks: string;
}

interface Element {
  number: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  definition: string;
  whyItMatters: string;
  subPoints?: { label: string; icon: React.ElementType; description: string }[];
  example?: Example;
}

const QualityGateSection = () => {
  const elements: Element[] = [
    {
      number: 1,
      title: "Realistic",
      subtitle: "Professional Role & Context; Clear Constraints",
      icon: Target,
      definition: "The prompt assigns a specific professional persona with skin in the game, defines the hierarchy, audience, and stakes. It includes real-world limitations and tradeoffs: resource constraints, competing priorities, business rules, and operational boundaries. The task reflects how work is actually done in organizations—not bypassing systems, approvals, or role boundaries.",
      whyItMatters: "We are training models to perform real job tasks inside real organizations. The professional role tells the model what standard to meet (a Senior VP analyzes risk differently than a Junior Assistant). If a prompt ignores how work is actually done, the model may learn patterns that look correct but cannot transfer to real-world use. Constraints force the model to trade off between competing goals such as speed vs. accuracy or brevity vs. completeness.",
      example: {
        weak: "You are an administrative manager. Redesign the agency's entire staffing model and provide the best possible solution with no limitations.",
        whyFails: "The role is generic with no hierarchy or stakes. The task exceeds role authority, bypasses approval processes, and has no constraints or tradeoffs—encouraging generic or idealized responses.",
        strong: "You are the Administrative Services Manager for a mid-sized state agency, reporting to the Deputy Director of Operations. Prepare a staffing recommendation memo outlining two reallocation options for review by Finance and final approval by the Deputy Director. Constraints: no additional headcount, compliance with state records retention policy, implementation within 90 days, and use of partial data from two legacy systems.",
        whyWorks: "The role, hierarchy, audience, and stakes are explicit. The task aligns with realistic role boundaries, reflects real organizational workflows, and includes constraints that force meaningful tradeoffs.",
      },
    },
    {
      number: 2,
      title: "Unambiguous",
      subtitle: "Clear Deliverable",
      icon: FileOutput,
      definition: "The prompt avoids vague terms and is clear about what needs to be done. It explicitly defines the output format, audience, structure, and quality bar. The model should not have to guess what is being asked or what a complete answer looks like.",
      whyItMatters: "In professional domains, \"interpret it how you want\" is a failure. If the prompt is vague, we cannot distinguish between a model failure (the model couldn't do the work) and a prompt failure (the ask was never clear). The format is often part of the work—a Python script is useless to a CEO who asked for a PowerPoint.",
      example: {
        weak: "Review the department's processes and summarize your findings for leadership.",
        whyFails: "The terms \"review\" and \"summarize\" are vague. There is no defined scope, no specified output format, structure, or quality bar, making it impossible to tell whether a failure is due to the model or the prompt.",
        strong: "Create a two-page DOCX briefing memo identifying three specific inefficiencies in the department's records management process and propose one actionable improvement per inefficiency. Write in formal government memo style with an executive summary, findings, and recommendations. Do not produce slides or code.",
        whyWorks: "The task, scope, output format, structure, and quality bar are all explicit. The model knows exactly what to produce and what a complete answer looks like.",
      },
    },
    {
      number: 3,
      title: "Challenging",
      subtitle: "Sufficiently Difficult to Induce Meaningful Model Learning",
      icon: Sparkles,
      definition: "The prompt is complex enough that the model must demonstrate real professional judgment, not just pattern matching. It requires integrating multiple sources, making tradeoffs, and producing work that tests the boundaries of model capabilities.",
      whyItMatters: "Easy tasks don't teach models anything new. We need prompts that push the model to reason, prioritize, and synthesize—the kinds of tasks where getting it right requires genuine understanding, not just surface-level responses.",
      subPoints: [
        {
          label: "A. Role + Audience + Stakes",
          icon: User,
          description: "Defines the professional persona, who the deliverable is for, and consequences of failure",
        },
        {
          label: "B. Scenario + Domain Specifics",
          icon: MapPin,
          description: "Operational setting, what's in scope vs. out of scope, situational details that drive judgment",
        },
        {
          label: "C. Constraints + Challenges",
          icon: AlertTriangle,
          description: "Time, staffing, policies, compliance, partial data, competing priorities",
        },
        {
          label: "D. Deliverables (Exact)",
          icon: FileCheck,
          description: "File formats, required content, tone, length, structure",
        },
        {
          label: "E. Input Files",
          icon: FileInput,
          description: "Supporting materials that enable the task (spreadsheets, PDFs, emails, etc.)",
        },
      ],
      example: {
        weak: "Write a report about improving office efficiency.",
        whyFails: "The task is trivially easy—no specific role, no scenario context, no constraints, no defined deliverable format, and no input files to synthesize. Any generic response could satisfy this.",
        strong: "As the Administrative Services Manager, using the attached inventory spreadsheet and staff workload report, prepare a staffing recommendation memo that analyzes current allocation inefficiencies, proposes two reallocation options with risk assessments, and recommends one option with justification—all within the constraint of no additional headcount and 90-day implementation timeline.",
        whyWorks: "The prompt requires integrating multiple input files, making tradeoffs between constraints, and producing a structured deliverable that demonstrates professional judgment. It includes all 5 components: role/audience/stakes, scenario specifics, constraints, exact deliverables, and input files.",
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
            <h3 className="text-xl font-bold text-foreground mb-2">Step 5: Quality Checklist</h3>
            <p className="text-base text-foreground leading-relaxed">
              Every prompt must pass these three quality gates before submission.
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
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{element.number}</span>
                  </div>
                  <Icon className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">{element.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-2 ml-11">{element.subtitle}</p>
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

                {/* Sub-points for Challenging */}
                {element.subPoints && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Required Components
                    </p>
                    <div className="grid gap-2">
                      {element.subPoints.map((point) => {
                        const PointIcon = point.icon;
                        return (
                          <div
                            key={point.label}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                          >
                            <PointIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{point.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{point.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

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
