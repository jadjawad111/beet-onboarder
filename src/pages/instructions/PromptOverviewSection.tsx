import { FileText, ChevronDown } from "lucide-react";

const PromptOverviewSection = () => {
  return (
    <div className="space-y-8">
      {/* What is a Prompt? Definition Block */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border-2 border-sky-500/30 shadow-sm">
        <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-2 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-xs uppercase tracking-wider">Definition</span>
          What is a Prompt?
        </h3>
        <p className="text-foreground leading-relaxed">
          In Beet 2.0, a prompt is a request that mimics a real-world task or request that will be given to a professional in your respective domain.
        </p>
      </div>

      {/* Workflow Diagram */}
      <div className="space-y-4">
        {/* Step 1: Prompt - CURRENT */}
        <div className="p-5 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold">1</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-primary">Prompt</h3>
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Current
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                The instruction that defines what the model should do
              </p>
            </div>
          </div>
        </div>

        {/* Input Files - CURRENT (nested under prompt) */}
        <div className="ml-8 p-4 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-semibold text-foreground">+ Input Files</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Current
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Supporting documents and data
              </p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-2">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>

        {/* Step 2: Golden Example Deliverable */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <span className="text-muted-foreground font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Golden Example Deliverable</h3>
              <p className="text-muted-foreground text-sm">
                Your attempt at the actual output
              </p>
              <p className="text-muted-foreground/70 text-sm italic mt-1">
                Use the deliverable to help inform the rubric
              </p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-2">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>

        {/* Step 3: Rubric */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <span className="text-muted-foreground font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground italic">Rubric</h3>
              <p className="text-muted-foreground text-sm">
                Criteria that define what makes a good response
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptOverviewSection;
