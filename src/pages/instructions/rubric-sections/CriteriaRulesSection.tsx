import { FileCheck, AlertTriangle, CheckCircle2, XCircle, Lightbulb, MinusCircle, PlusCircle } from "lucide-react";

const CriteriaRulesSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Criteria Rules</h3>
            <p className="text-base text-foreground leading-relaxed">
              Each rubric criterion should adhere to the following rules, in order from most to least important.
            </p>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-6">
        {/* Rule 1: Clear and Unambiguous */}
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          <div className="px-5 py-4 bg-destructive/5 border-b border-border flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-bold">HIGHEST</span>
            <span className="font-bold text-foreground">Clear and Unambiguous</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              Each criterion should be clear, descriptive, unambiguous, specific, and concise. Criteria should be binary (true or false) and objective.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-semibold text-destructive">Bad Example</span>
                </div>
                <p className="text-sm text-foreground mb-2">"[80 points] The output document states that the nurse correctly adjusted the patient's medications based on the lab results."</p>
                <p className="text-xs text-muted-foreground">This criterion is too vague—"correctly" is undefined, it doesn't specify which labs, which medications, which standing orders apply, or what changes should be made.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Good Example</span>
                </div>
                <p className="text-sm text-foreground">"[80 points] The output document states that the nurse initiated Aranesp 10 mcg IVP each treatment for any patient with HGB &lt; 10.0."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 2: Self-Contained */}
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          <div className="px-5 py-4 bg-destructive/5 border-b border-border flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-bold">HIGHEST</span>
            <span className="font-bold text-foreground">Self-Contained</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              Each criterion will be evaluated on the task response independently, and separately from the others. It must contain complete, full information so we can judge whether the criterion is true or false for the particular task response.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              The grader model will only be able to see the response it is grading and a single criterion at a time. Each criterion should contain all necessary information to grade a response.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-semibold text-destructive">Bad Example</span>
                </div>
                <p className="text-sm text-foreground">"Mentions the male lead actor in the 2021 movie 'Dune: Part One'"</p>
                <p className="text-xs text-muted-foreground mt-2">This would not be considered assessable without knowing who the relevant actors are.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Good Example</span>
                </div>
                <p className="text-sm text-foreground">"Mentions the male lead actor in the 2021 movie 'Dune: Part One' is Timothée Chalamet."</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p><strong>Important:</strong> Criteria should be evaluable without internet access. Avoid criteria that require additional research via the internet.</p>
                  <p className="mt-2">Related to internet access, submitting rubric items like "is this link broken" or "does this link go to a 404 error page" is not answerable without internet access. Please avoid those rubric items.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule: No References to Other Criteria */}
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          <div className="px-5 py-4 bg-warning/5 border-b border-border flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-bold">IMPORTANT</span>
            <span className="font-bold text-foreground">No References to Other Criteria</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">Criteria should not reference each other.</p>
            
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <span>Don't have criteria like: "[30] Includes a valid experimental approach not listed above" – what's above? What if we shuffle the order?</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <span>Abbreviations need to be expanded in every criterion. "[30] Mentions that Gabrieli et al looks at control of memory retrieval" should be rewritten as "[50] Mentions that 'Neural Systems Underlying the Suppression of Unwanted Memories' (John Gabrieli et al, Science, 2001) looks at control of memory retrieval."</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>If you have a few consecutive criteria about the same scientific paper, each criterion should repeat the name of the paper.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rule: Non-Stacked */}
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          <div className="px-5 py-4 bg-warning/5 border-b border-border flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-bold">HIGHEST</span>
            <span className="font-bold text-foreground">Non-Stacked</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              Each criterion should have a single statement / thesis, so a partially-correct answer can better earn partial credit. Most stacked criteria with the word "and" can be broken up into multiple pieces.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-semibold text-destructive">Stacked (Bad)</span>
                </div>
                <p className="text-sm text-foreground">"[65] Includes the Greek alphabet and states that it has 24 letters."</p>
                <p className="text-xs text-muted-foreground mt-2">What happens if a response mentions the Greek alphabet but doesn't state how many letters it has? Then this item would be false, even though it's sort of 50% true.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Split (Good)</span>
                </div>
                <div className="text-sm text-foreground space-y-1">
                  <p>"[65] Includes the Greek alphabet."</p>
                  <p>"[65] States that the Greek alphabet has 24 letters."</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Exception:</strong> If you believe that two different things need to be included for either to have any value, you can group them together. For example, a task that includes "What are the coordinates of the Imperial Palace in Tokyo, to two decimal places?" might have a rubric item like:
              </p>
              <p className="text-sm text-primary mt-2">"[35] Includes the latitude 139.75°E and the longitude 35.69°N"</p>
              <p className="text-xs text-muted-foreground mt-2">This is one statement, and not a stacked criterion because a longitude is not very helpful without a latitude!</p>
            </div>
          </div>
        </div>

        {/* Negative Criteria */}
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          <div className="px-5 py-4 bg-primary/5 border-b border-border flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">MODERATE</span>
            <span className="font-bold text-foreground">Negative Criteria</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              Negative examples are as helpful as positive examples. Any task will have an infinite number of incorrect responses. However, negative criteria can be useful when they are specifically targeted at ways you think the model might get confused.
            </p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-foreground mb-2"><strong>Example:</strong> "[75] Doesn't include the coordinate pair 39.92°N, 116.40°E."</p>
              <p className="text-xs text-muted-foreground">Justification: These are the coordinates of the imperial palace in Beijing, when the prompt asked for the coordinates of the imperial palace in Tokyo.</p>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p><strong>Gotcha:</strong> Avoid double counting with both positive and negative criteria:</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-destructive">"[5] Includes reference to X"</p>
                    <p className="text-destructive">"[5] Doesn't include reference to X"</p>
                  </div>
                  <p className="mt-2">This double counts the reference to X!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Default Criteria */}
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          <div className="px-5 py-4 bg-muted/50 border-b border-border flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold">DOES NOT MATTER</span>
            <span className="font-bold text-foreground">Default Criteria</span>
          </div>
          <div className="p-5">
            <p className="text-sm text-foreground mb-3">You can assume the following are default criteria for all good answers, and so you don't need to write criteria about:</p>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-muted-foreground" />
                <span>Correct grammar and spelling</span>
              </li>
              <li className="flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-muted-foreground" />
                <span>Making sure the response cites sources</span>
              </li>
              <li className="flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-muted-foreground" />
                <span>Cited sources must contain the information referenced</span>
              </li>
            </ul>
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
              The order of criteria in the rubric doesn't matter. What matters is that each criterion is clear, self-contained, non-stacked, and properly weighted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaRulesSection;
