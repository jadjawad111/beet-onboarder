import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react";

const UsingLinksSlide = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
          <Link className="w-3 h-3" />
          Best Practices
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Using Links in Prompts</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Some prompts include links as a source of information (e.g., a policy page, documentation, or background reading). Links can be helpful — but only if the prompt is explicit about how the link should be used and avoids common access issues.
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-6 pr-4">
          {/* What links are good for */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What links are good for</h3>
                  <p className="text-sm text-muted-foreground mb-3">Use links when they are:</p>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Reference / context (helpful, not required)</li>
                    <li>• A public standard you want followed (and you state the requirements in the prompt)</li>
                    <li>• Supplementary information that supports the task</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Big NOs */}
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Big NOs (Avoid these)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    These patterns commonly break prompts because the content may not be accessible or stable:
                  </p>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Paywalled links (news sites, subscription research, gated reports)</li>
                    <li>• Login-required content (company portals, Google Docs without public access, internal tools)</li>
                    <li>• Unstable / changing pages used as if results are reproducible (real-time search results with no scoping)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Good Examples Section */}
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Good Examples (and why they work)
            </h3>
            <div className="space-y-4">
              {/* Good Example 1 */}
              <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                    Good Example 1: Link is optional context
                  </p>
                  <div className="bg-white dark:bg-card rounded-md p-3 border mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Prompt</p>
                    <p className="text-sm text-foreground">
                      "Write a 1-page summary of the AI Risk Management approach.<br/>
                      Optional background link (for context): https://www.nist.gov/itl/ai-risk-management-framework<br/>
                      Deliverable: 5 bullets + 2 risks + 2 recommendations."
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why it works:</span>
                      <ul className="mt-1 space-y-0.5">
                        <li>• The task is clear even without the link</li>
                        <li>• The link's role is labeled (optional background)</li>
                        <li>• The output format is defined</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Good Example 2 */}
              <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                    Good Example 2: Link is a reference standard (but requirements are still in the prompt)
                  </p>
                  <div className="bg-white dark:bg-card rounded-md p-3 border mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Prompt</p>
                    <p className="text-sm text-foreground">
                      "Draft a short policy memo that follows the principles of the AI RMF (reference): https://www.nist.gov/itl/ai-risk-management-framework<br/>
                      Include:<br/>
                      • a 2–3 sentence executive summary<br/>
                      • 3 recommendations<br/>
                      • 2 implementation risks."
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why it works:</span>
                      <ul className="mt-1 space-y-0.5">
                        <li>• The link is clearly a reference standard</li>
                        <li>• The prompt still contains the actual deliverable requirements</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Good Example 3 */}
              <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                    Good Example 3: If the link matters, include the key points inline
                  </p>
                  <div className="bg-white dark:bg-card rounded-md p-3 border mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Prompt</p>
                    <p className="text-sm text-foreground">
                      "Use this article for context: https://example.com/article<br/>
                      Key points to include (provided here so the task is self-contained):<br/>
                      • Point A…<br/>
                      • Point B…<br/>
                      Deliverable: rewrite these points into a customer-friendly FAQ."
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why it works:</span>
                      <ul className="mt-1 space-y-0.5">
                        <li>• Even if the link can't be opened, the task is still doable</li>
                        <li>• The "source of truth" content is captured in the prompt</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bad Examples Section */}
          <div>
            <h3 className="text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Bad Examples (and what to do instead)
            </h3>
            <div className="space-y-4">
              {/* Bad Example 1 */}
              <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                    Bad Example 1: Paywalled / gated link is required
                  </p>
                  <div className="bg-white dark:bg-card rounded-md p-3 border mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bad Prompt</p>
                    <p className="text-sm text-foreground">
                      "Read this Bloomberg article and summarize it: [link]"
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why it breaks:</span> Access is not guaranteed
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Bad Example 2 */}
              <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                    Bad Example 2: Vague "use this link" with no direction
                  </p>
                  <div className="bg-white dark:bg-card rounded-md p-3 border mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bad Prompt</p>
                    <p className="text-sm text-foreground">
                      "Use this website to complete the task: https://example.com"
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why it breaks:</span> No scope: what to pull, what matters, what format, what output?
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Bad Example 3 */}
              <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                    Bad Example 3: Real-time web state treated as reproducible
                  </p>
                  <div className="bg-white dark:bg-card rounded-md p-3 border mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bad Prompt</p>
                    <p className="text-sm text-foreground">
                      "Check current listings on LoopNet and summarize the top 10…"
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Why it breaks:</span>
                      <ul className="mt-1 space-y-0.5">
                        <li>• Results can change run-to-run</li>
                        <li>• "Top 10" is not stable without filters + time + explicit variability</li>
                        <li>• Task becomes not timeless!</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Best Practice Summary */}
          <Card className="border-2 border-primary/30 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Best Practice: Be explicit when you use links</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When you include a link, always state which of these it is:
                  </p>
                  <ul className="space-y-2 text-sm text-foreground mb-4">
                    <li><strong>Optional context</strong> ("use only if helpful")</li>
                    <li><strong>Reference standard</strong> ("follow this framework / guidance")</li>
                    <li><strong>Source of truth</strong> ("extract these specific items from this page")</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mb-2">A simple sentence does the job:</p>
                  <div className="space-y-1 text-sm font-mono bg-muted/50 p-3 rounded-md">
                    <p>"Use this link as optional background."</p>
                    <p>"Use this link as the reference standard."</p>
                    <p>"From this link, extract X and then produce Y."</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UsingLinksSlide;
