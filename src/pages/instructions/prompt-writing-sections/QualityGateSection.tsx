import { Shield, CheckSquare, User, Target, Clock, FileOutput, Lock } from "lucide-react";

const QualityGateSection = () => {
  const elements = [
    {
      number: 1,
      title: "Unambiguous",
      icon: CheckSquare,
      definition: "The prompt avoids vague terms and is clear about what needs to be done, while maintaining realism. The task is specific enough that the model does not need to guess what is being asked.",
      whyItMatters: "In professional domains, \"interpret it how you want\" is a failure. We need to grade these models. If the prompt is vague, we cannot distinguish between:\n\n• A model failure (the model couldn't do the work)\n• A prompt failure (the ask was never clear)",
    },
    {
      number: 2,
      title: "Professional Role & Context",
      icon: User,
      definition: "The prompt assigns a specific professional persona with skin in the game. It defines the hierarchy, the audience, and the stakes of the task.",
      whyItMatters: "The professional role tells the model what standard to meet (e.g., a Senior VP analyzes risk differently than a Junior Assistant). Context mirrors how real professional tasks are communicated. The model must demonstrate judgment by identifying what information is relevant and what can be ignored.",
    },
    {
      number: 3,
      title: "Realistic & NOT Contrived",
      icon: Target,
      definition: "A realistic prompt asks the model to perform a task that a real professional in that role would plausibly be responsible for, using outputs they could actually produce within real workflows and constraints. A prompt is contrived when it asks for an outcome that bypasses systems, approvals, or role boundaries, even if it sounds professional.",
      whyItMatters: "We are training models to perform real job tasks inside real organizations. If a prompt ignores how work is actually done, the model may learn patterns that look correct but cannot transfer to real-world use. This produces misleading training signals and weak generalization.",
    },
    {
      number: 4,
      title: "Timelessness (Relative Dating)",
      icon: Clock,
      definition: "The prompt establishes a \"current date\" within the scenario logic rather than relying on real-world calendar dates or current events that will age out.",
      whyItMatters: "If a prompt says \"Today is Tuesday,\" it may be false when the model is tested in the future.",
    },
    {
      number: 5,
      title: "Clear Deliverable",
      icon: FileOutput,
      definition: "Clear deliverable explicitly defines the output format, audience, and quality bar. The model should not have to guess whether the output is a PDF, CSV, or Python script.",
      whyItMatters: "The format is often part of the work. A Python script is useless to a CEO who asked for a PowerPoint.",
    },
    {
      number: 6,
      title: "Clear Constraints",
      icon: Lock,
      definition: "Clear constraints define real-world limitations and tradeoffs: resource constraints, competing priorities, business rules, and operational boundaries. These go beyond output formatting to include the guardrails that make professional tasks meaningfully difficult.",
      whyItMatters: "Constraints force the model to trade off between competing goals such as speed vs. accuracy or brevity vs. completeness.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 7: Run a Quality Gate</h3>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QualityGateSection;
