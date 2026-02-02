import { ListChecks, MessageSquareQuote, Scale, Tag, Link, Hash, AlertCircle } from "lucide-react";

const RubricItemsSection = () => {
  const principles = [
    {
      name: "Atomicity",
      description: "Each criterion evaluates exactly one concept"
    },
    {
      name: "Self-Containment",
      description: "A criterion can be evaluated using only the information it contains (plus the response being graded)."
    },
    {
      name: "Objectivity",
      description: "Criteria use specific, measurable language—not vague qualifiers"
    },
    {
      name: "Independence",
      description: "Criteria do not reference or depend on other criteria"
    },
    {
      name: "Binary Evaluation",
      description: "Each criterion is clearly satisfied or not satisfied—no partial credit"
    },
    {
      name: "Weight Calibration",
      description: "Weights reflect relative importance to task success"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <ListChecks className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Rubric Items</h3>
            <p className="text-base text-foreground leading-relaxed">
              For this project, each criterion requires the following 6 pieces of supporting information.
            </p>
          </div>
        </div>
      </div>

      {/* The 6 Components */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Criterion */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">1. Criterion</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A statement that asserts what a model response would do to earn points. It should be clear, concise, readable, and atomic. It should be evaluable (there should never be ambiguity in whether or not a model response has fulfilled the criteria). These statements should be binary – they can only be true or false, with no shades of grey.
          </p>
        </div>

        {/* Rationale */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquareQuote className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">2. Rationale</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A brief explanation of why this criterion is included.
          </p>
        </div>

        {/* Weight */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">3. Weight</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A score representing its relative importance compared to all other points in the rubric.
          </p>
        </div>

        {/* Category */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">4. Category</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Each criterion must fall under one of the designated categories: Instruction Following, Reasoning, Extraction, or Formatting.
          </p>
        </div>

        {/* Citation */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Link className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">5. Citation</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A publicly accessible web URL that supports the decision for including the criterion. Citations are optional, but they are required when the criterion depends on factual information.
          </p>
        </div>

        {/* Implicit/Explicit */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Hash className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">6. Implicit/Explicit</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Tag each criterion as Implicit or Explicit to clarify where the requirement comes from.
          </p>
        </div>
      </div>

      {/* Principles Table */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Key Principles for Writing Criteria</p>
        </div>
        <div className="divide-y divide-border">
          {principles.map((principle, index) => (
            <div key={index} className="p-4 flex items-start gap-4">
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold min-w-fit">
                {principle.name}
              </span>
              <p className="text-sm text-foreground">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Minimum and Max Criteria */}
      <div className="p-5 rounded-xl bg-warning/10 border-2 border-warning/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-warning/15 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Criteria Count Requirements</h4>
            <div className="space-y-2 text-sm text-foreground">
              <p><strong className="text-warning">Minimum 20 criteria:</strong> A rubric with less than 20 criteria is insufficient to capture all of the elements of the response we need to evaluate.</p>
              <p><strong className="text-warning">Maximum 250 criteria:</strong> So many items makes evaluating an accurate response difficult. Too many criteria diminishes the importance of each criteria.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Vocab */}
      <div className="rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="font-semibold text-foreground mb-3">Common Vocab / Acronyms</h4>
        <ul className="space-y-2 text-sm text-foreground">
          <li><strong>C1, C2, C3…</strong> = Short-hand for rubric 'Criterion 1', 'Criterion 2', etc. You may see these abbreviations in feedback from reviewers (e.g. C1 has issues with stacking because…)</li>
          <li><strong>R1, R2</strong> = 'Review 1', 'Review 2'. These are the review tiers for the project. Tasks are usually reviewed at R1 and potentially again at R2.</li>
        </ul>
      </div>
    </div>
  );
};

export default RubricItemsSection;
