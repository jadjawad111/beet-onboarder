import { GitBranch, FileOutput } from "lucide-react";

const SelectWorkflowSection = () => {
  const exampleWorkflows = [
    "Creating Research Summary Reports",
    "Procedure Development and Documentation",
    "Action Item Tracking",
    "Checklist Creation",
    "Schedule Creation",
    "Staff Memo Drafting",
    "Organizational Chart Creation",
    "Briefing Notes",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <GitBranch className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 3: Select the Deliverable Workflow Type</h3>
            <p className="text-base text-foreground leading-relaxed">
              Choose at least one workflow to base your prompt on that naturally leads to professional deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* Guidance */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileOutput className="w-5 h-5 text-primary" />
          Workflow Selection
        </h4>
        <div className="p-5 rounded-xl bg-card border border-border">
          <p className="text-foreground leading-relaxed">
            For your selected occupation, choose at least one workflow to base your prompt on. The workflow should <strong>naturally lead to professional deliverables</strong>.
          </p>
        </div>
      </div>

      {/* Example */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Example: Administrative Services Manager Workflows
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {exampleWorkflows.map((workflow) => (
              <span
                key={workflow}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
              >
                {workflow}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectWorkflowSection;
