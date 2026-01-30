import { Lightbulb, CheckCircle2, XCircle, AlertTriangle, MessageSquareQuote } from "lucide-react";

const RationaleContent = () => {
  return (
    <div className="space-y-10">
      {/* Definition Hero */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <MessageSquareQuote className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">What is Rationale?</h3>
            <p className="text-base text-foreground leading-relaxed">
              <strong className="text-primary">Rationale</strong> explains why the criterion exists and why it matters to evaluate. This helps both the reviewer and the client understand your justification for including it.
            </p>
          </div>
        </div>
      </div>

      {/* What rationale should explain */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">A good rationale should explain:</h4>
        
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { num: "1", text: "What quality or requirement the criterion protects" },
            { num: "2", text: "Why it matters for a good professional deliverable" },
            { num: "3", text: "What could go wrong if it is not evaluated" },
          ].map((item) => (
            <div 
              key={item.num}
              className="p-4 rounded-xl bg-card border-2 border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-primary font-bold">{item.num}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Example with Criterion + Good/Bad Rationales */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        {/* Header with Example Criterion */}
        <div className="p-6 bg-gradient-to-r from-muted/80 to-muted/40 border-b-2 border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Example Criterion</p>
          <p className="text-base text-foreground leading-relaxed font-medium">
            "The Last Will and Testament indicates that David T. Nguyen will take the estate only if they survive the testator."
          </p>
        </div>

        {/* Good/Bad Rationales Grid */}
        <div className="p-6">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Compare the Rationales</p>
          
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Bad Example A */}
            <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 overflow-hidden">
              <div className="px-4 py-3 bg-destructive/10 border-b border-destructive/20 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="font-semibold text-sm text-foreground">Bad</span>
              </div>
              <div className="p-4">
                <div className="p-3 rounded-lg bg-card border border-border mb-3 min-h-[60px]">
                  <p className="text-sm text-foreground">"cuz david is the spouse"</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Ambiguous, unprofessional, doesn't explain why it matters.
                  </p>
                </div>
              </div>
            </div>

            {/* Bad Example B */}
            <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 overflow-hidden">
              <div className="px-4 py-3 bg-destructive/10 border-b border-destructive/20 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="font-semibold text-sm text-foreground">Bad</span>
              </div>
              <div className="p-4">
                <div className="p-3 rounded-lg bg-card border border-border mb-3 min-h-[60px]">
                  <p className="text-sm text-foreground">"Since david is her husband, he should get the estate if she passes"</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Rationalizes the will's content, not why the criterion exists in the rubric.
                  </p>
                </div>
              </div>
            </div>

            {/* Good Example */}
            <div className="rounded-xl border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 overflow-hidden">
              <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-sm text-foreground">Good</span>
              </div>
              <div className="p-4">
                <div className="p-3 rounded-lg bg-card border border-border min-h-[60px]">
                  <p className="text-sm text-foreground leading-relaxed">
                    "This criterion ensures The Will correctly identifies David T. Nguyen as the spouse and captures the survivorship condition, which is required for the primary beneficiary clause to function as intended."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note Callout */}
          <div className="mt-4 p-4 rounded-xl bg-warning/10 border-2 border-warning/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong className="text-warning">Important note:</strong> Always remember we are not rationalizing the response, but the criteria item!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Takeaway</h4>
            <p className="text-sm text-foreground leading-relaxed">
              A good rationale explains why the criterion needs to exist <strong className="text-primary">in the rubric</strong>, not why the content itself is correct. Focus on what the criterion protects and what could go wrong if it's not evaluated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RationaleContent;
