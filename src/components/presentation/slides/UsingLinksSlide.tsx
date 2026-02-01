import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Lightbulb, AlertTriangle } from "lucide-react";

const UsingLinksSlide = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Input File Best Practices
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Using Links in Prompts
        </h2>
      </div>

      {/* Intro Card */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Some prompts include links as a source of information (e.g., a policy page, documentation, or background reading). Links can be helpful, but only if the prompt is explicit about how the link should be used and avoids common access issues.
          </p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Below are best practices to make sure your prompt stays clear, usable, and less likely to be rejected.
          </p>
        </CardContent>
      </Card>

      {/* What links are good for */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            What Links Are Good For
          </h3>
          <p className="text-xs text-muted-foreground mb-3">Use links when they are:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Reference / context</strong> (helpful, not required)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>A public standard</strong> you want followed (and you state the requirements in the prompt)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Supplementary information</strong> that supports the task</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Big NOs */}
      <Card className="border-destructive/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            Big NOs (Avoid These)
          </h3>
          <p className="text-xs text-muted-foreground mb-3">These patterns commonly break prompts because the content may not be accessible or stable:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span><strong>Paywalled links</strong> (news sites, subscription research, gated reports)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span><strong>Login-required content</strong> (company portals, Google Docs without public access, internal tools)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span><strong>Unstable / changing pages</strong> used as if results are reproducible (real-time search results with no scoping)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Good Example 1 */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Good Example: Link is optional context
          </h3>
          <div className="bg-muted/30 rounded-lg p-3 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Prompt:</p>
            <p className="text-sm italic leading-relaxed">
              "Write a 1-page summary of the AI Risk Management approach.<br />
              Optional background link (for context): https://www.nist.gov/itl/ai-risk-management-framework<br />
              Deliverable: 5 bullets + 2 risks + 2 recommendations."
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary mb-1">Why it works:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>The task is clear even without the link</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>The link's role is labeled (optional background)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>The output format is defined</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Good Example 2 */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Good Example: Link is a reference standard
          </h3>
          <div className="bg-muted/30 rounded-lg p-3 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Prompt:</p>
            <p className="text-sm italic leading-relaxed">
              "Draft a short policy memo that follows the principles of the AI RMF (reference): https://www.nist.gov/itl/ai-risk-management-framework<br />
              Include:<br />
              • a 2–3 sentence executive summary<br />
              • 3 recommendations<br />
              • 2 implementation risks."
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary mb-1">Why it works:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>The link is clearly a reference standard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>The prompt still contains the actual deliverable requirements</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Good Example 3 */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Good Example: Key points included inline
          </h3>
          <div className="bg-muted/30 rounded-lg p-3 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Prompt:</p>
            <p className="text-sm italic leading-relaxed">
              "Use this article for context: https://example.com/article<br />
              Key points to include (provided here so the task is self-contained):<br />
              • Point A…<br />
              • Point B…<br />
              Deliverable: rewrite these points into a customer-friendly FAQ."
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary mb-1">Why it works:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Even if the link can't be opened, the task is still doable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>The "source of truth" content is captured in the prompt</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Bad Example 1 */}
      <Card className="border-destructive/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            Bad Example: Paywalled / Gated Link is Required
          </h3>
          <div className="bg-muted/30 rounded-lg p-3 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Prompt:</p>
            <p className="text-sm italic leading-relaxed">
              "Read this Bloomberg article and summarize it: [link]"
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong>Why it breaks:</strong> Access is not guaranteed. Bloomberg articles are often paywalled.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bad Example 2 */}
      <Card className="border-destructive/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            Bad Example: Vague "use this link" with no direction
          </h3>
          <div className="bg-muted/30 rounded-lg p-3 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Prompt:</p>
            <p className="text-sm italic leading-relaxed">
              "Use this website to complete the task: https://example.com"
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong>Why it breaks:</strong> No scope: what to pull, what matters, what format, what output?
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bad Example 3 */}
      <Card className="border-destructive/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            Bad Example: Real-time web state treated as reproducible
          </h3>
          <div className="bg-muted/30 rounded-lg p-3 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Prompt:</p>
            <p className="text-sm italic leading-relaxed">
              "Check current listings on LoopNet and summarize the top 10…"
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p><strong>Why it breaks:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Results can change run-to-run</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>"Top 10" is not stable without filters + time + explicit variability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Task becomes not timeless!</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="w-full">
              <h3 className="font-semibold text-foreground mb-3 text-base">Best Practice: Be Explicit When You Use Links</h3>
              <p className="text-sm text-muted-foreground mb-4">When you include a link, always state which of these it is:</p>
              <div className="space-y-2 mb-4">
                <div className="p-3 bg-background rounded-lg border">
                  <p className="font-medium text-foreground text-sm mb-1">Optional context</p>
                  <p className="text-xs text-muted-foreground italic">"use only if helpful"</p>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <p className="font-medium text-foreground text-sm mb-1">Reference standard</p>
                  <p className="text-xs text-muted-foreground italic">"follow this framework / guidance"</p>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <p className="font-medium text-foreground text-sm mb-1">Source of truth</p>
                  <p className="text-xs text-muted-foreground italic">"extract these specific items from this page"</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">A simple sentence does the job:</p>
              <div className="bg-background rounded-lg p-3 border space-y-1">
                <p className="text-sm italic text-muted-foreground">"Use this link as optional background."</p>
                <p className="text-sm italic text-muted-foreground">"Use this link as the reference standard."</p>
                <p className="text-sm italic text-muted-foreground">"From this link, extract X and then produce Y."</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsingLinksSlide;
