import { Card, CardContent } from "@/components/ui/card";
import { Link, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react";

const UsingLinksSlide = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Using Links in Prompts
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          When and How to Include Links
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm">
          Some prompts include links as a source of information (e.g., a policy page, documentation, or background reading). Links can be helpful, but only if the prompt is explicit about how the link should be used and avoids common access issues.
        </p>
      </div>

      {/* What links are good for + Big NOs side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* What links are good for */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              What Links Are Good For
            </h3>
            <p className="text-sm text-muted-foreground mb-3">Use links when they are:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Reference / context (helpful, not required)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">A public standard you want followed</span>
                  <p className="text-xs text-muted-foreground">And you state the requirements in the prompt</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Supplementary information that supports the task</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Big NOs */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Big NOs (Avoid These)
            </h3>
            <p className="text-sm text-muted-foreground mb-3">These patterns commonly break prompts:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Paywalled links</span>
                  <p className="text-xs text-muted-foreground">News sites, subscription research, gated reports</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Login-required content</span>
                  <p className="text-xs text-muted-foreground">Company portals, Google Docs without public access, internal tools</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Unstable / changing pages</span>
                  <p className="text-xs text-muted-foreground">Real-time search results with no scoping</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Good Examples */}
      <Card className="border-2 border-primary/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            Good Examples (and why they work)
          </h3>
          <p className="text-base text-muted-foreground mb-6">Concrete examples of how to reference links properly.</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Good Example 1 */}
            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Link is optional context</p>
              <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                "Write a 1-page summary of the AI Risk Management approach.<br/>
                Optional background link (for context): https://www.nist.gov/...<br/>
                Deliverable: 5 bullets + 2 risks + 2 recommendations."
              </p>
              <div className="space-y-1">
                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium block w-fit">✔ Task is clear without the link</span>
                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium block w-fit">✔ Link role is labeled</span>
              </div>
            </div>

            {/* Good Example 2 */}
            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Link is a reference standard</p>
              <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                "Draft a short policy memo that follows the principles of the AI RMF (reference): https://www.nist.gov/...<br/>
                Include: executive summary, 3 recommendations, 2 risks."
              </p>
              <div className="space-y-1">
                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium block w-fit">✔ Link is clearly a reference</span>
                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium block w-fit">✔ Requirements still in prompt</span>
              </div>
            </div>

            {/* Good Example 3 */}
            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Key points included inline</p>
              <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                "Use this article for context: https://example.com/article<br/>
                Key points to include: Point A, Point B...<br/>
                Deliverable: rewrite into a customer-friendly FAQ."
              </p>
              <div className="space-y-1">
                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium block w-fit">✔ Task doable without link</span>
                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-medium block w-fit">✔ Source of truth in prompt</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bad Examples */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Bad Examples (and what to do instead)
          </h3>
          <div className="space-y-3">
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Paywalled / gated link is required</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Read this Bloomberg article and summarize it: [link]"</p>
                <p className="text-xs text-muted-foreground mt-1">❌ Access is not guaranteed</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Vague "use this link" with no direction</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Use this website to complete the task: https://example.com"</p>
                <p className="text-xs text-muted-foreground mt-1">❌ No scope: what to pull, what matters, what format, what output?</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Real-time web state treated as reproducible</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Check current listings on LoopNet and summarize the top 10..."</p>
                <p className="text-xs text-muted-foreground mt-1">❌ Results can change run-to-run. "Top 10" is not stable. Task becomes not timeless!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practice Summary */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Best Practice: Be Explicit When You Use Links
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            When you include a link, always state which of these it is:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium text-foreground">Optional context</p>
                <p className="text-sm text-muted-foreground italic">"Use this link as optional background."</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary/80 flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium text-foreground">Reference standard</p>
                <p className="text-sm text-muted-foreground italic">"Use this link as the reference standard."</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium text-foreground">Source of truth</p>
                <p className="text-sm text-muted-foreground italic">"From this link, extract X and then produce Y."</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">The Key:</strong> A simple sentence clarifying the link's role makes your prompt clear, usable, and less likely to be rejected.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsingLinksSlide;
