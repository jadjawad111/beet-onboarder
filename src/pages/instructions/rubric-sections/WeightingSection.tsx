import { Scale, Lightbulb, AlertTriangle } from "lucide-react";

const WeightingSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Criterion Weighting Guidelines</h3>
            <p className="text-base text-foreground leading-relaxed">
              <strong className="text-primary">Remember:</strong> weighting is relative – similar criteria should receive similar or the same weights.
            </p>
          </div>
        </div>
      </div>

      {/* Weight Ranges */}
      <div className="space-y-4">
        {/* 50-100 */}
        <div className="rounded-xl border-2 border-green-500/30 bg-green-50/30 dark:bg-green-950/20 overflow-hidden">
          <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20 flex items-center justify-between">
            <span className="font-bold text-foreground">High Weight: 50 - 100</span>
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-bold">Critical</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-foreground font-medium">Highly relevant to prompt. A key answer to an explicitly asked question.</p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Prompt:</strong> What phase of tides is the northeastern US experiencing right now?</p>
              <p className="text-sm text-foreground"><strong>Criterion:</strong> Response states that the Northeastern US is experiencing high tide at midnight on December 6th.</p>
              <p className="text-sm text-primary mt-2"><strong>Weight: 100</strong></p>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>NOTE:</strong> The main concept and deliverable should likely be weighted 100. Key details that are necessary to answer the prompt should likely be in the 70-90 range. Other important aspects of answers to explicitly asked questions should be 50-70.
              </p>
            </div>
          </div>
        </div>

        {/* 20-50 */}
        <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/30 dark:bg-yellow-950/20 overflow-hidden">
          <div className="px-4 py-3 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-between">
            <span className="font-bold text-foreground">Medium Weight: 20 - 50</span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-sm font-bold">Important</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-foreground font-medium">An important explanation, an implicit ask, or a common incorrect answer.</p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Examples</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-foreground"><strong>Criterion:</strong> Response explains that the northeastern US is experiencing high tide because *CONCISE EXPLANATION*</p>
                  <p className="text-sm text-primary"><strong>Weight: 25</strong></p>
                </div>
                <div>
                  <p className="text-sm text-foreground"><strong>Criterion:</strong> Response does not state that the Northeastern US is experiencing low tide at midnight December 6th.</p>
                  <p className="text-sm text-primary"><strong>Weight: 25</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-20 */}
        <div className="rounded-xl border-2 border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20 overflow-hidden">
          <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between">
            <span className="font-bold text-foreground">Low Weight: 1 - 20</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-bold">Nice to Have</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-foreground font-medium">Something that is nice to have but is ultimately not critical. A fringe inclusion in the rubric.</p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Prompt:</strong> What phase of tides is the northeastern US experiencing right now?</p>
              <p className="text-sm text-foreground"><strong>Criterion:</strong> Response explains that the Northeastern US experiences a semidiurnal tidal period.</p>
              <p className="text-sm text-primary mt-2"><strong>Weight: 1</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Example */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">How Weights Affect Scoring</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid gap-3">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm"><strong>Response A:</strong> "The NE US is in low tide." → <strong className="text-destructive">0/125 points</strong></p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm"><strong>Response B:</strong> "Hey, unfortunately I don't know the tide right now." → <strong className="text-yellow-700 dark:text-yellow-300">25/125 points</strong></p>
              <p className="text-xs text-muted-foreground mt-1">Gets points for not stating incorrect information (low tide)</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm"><strong>Response C:</strong> "The NE US is in high tide." → <strong className="text-green-700 dark:text-green-300">125/125 points</strong></p>
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
              You should not be afraid to give something a lower weight. <strong className="text-primary">The most important thing is that the weights reflect relative importance.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightingSection;
