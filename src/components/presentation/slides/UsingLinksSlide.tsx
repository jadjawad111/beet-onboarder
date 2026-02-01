import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, Check, X, Lightbulb } from "lucide-react";

const UsingLinksSlide = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-2">
          <Link className="w-3 h-3" />
          Best Practices
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Using Links in Prompts</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm">
          Some prompts include links as a source of information (e.g., a policy page, documentation, or background reading). Links can be helpful, but only if the prompt is explicit about how the link should be used and avoids common access issues.
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          Below are best practices to make sure your prompt stays clear, usable, and less likely to be rejected.
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="space-y-6 pr-4">
          {/* Two column layout for Good/Bad overview */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* What links are good for */}
            <Card className="border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">What links are good for</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Use links when they are:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Reference / context (helpful, not required)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>A public standard you want followed (and you state the requirements in the prompt)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Supplementary information that supports the task</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Big NOs */}
            <Card className="border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Big NOs (Avoid these)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  These patterns commonly break prompts because the content may not be accessible or stable:
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Paywalled links (news sites, subscription research, gated reports)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Login-required content (company portals, Google Docs without public access, internal tools)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Unstable / changing pages used as if results are reproducible (real-time search results with no scoping)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Good Examples Section */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Good Examples (and why they work)
            </h3>
            <div className="space-y-3">
              {/* Good Example 1 */}
              <Card className="border">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Good Example 1: Link is optional context
                  </p>
                  <div className="bg-muted/30 rounded-md p-3 border border-dashed mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Prompt</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      "Write a 1-page summary of the AI Risk Management approach.<br/>
                      Optional background link (for context): https://www.nist.gov/itl/ai-risk-management-framework<br/>
                      Deliverable: 5 bullets + 2 risks + 2 recommendations."
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why it works:</span>
                    <span className="ml-2">The task is clear even without the link. The link's role is labeled (optional background). The output format is defined.</span>
                  </div>
                </CardContent>
              </Card>

              {/* Good Example 2 */}
              <Card className="border">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Good Example 2: Link is a reference standard (but requirements are still in the prompt)
                  </p>
                  <div className="bg-muted/30 rounded-md p-3 border border-dashed mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Prompt</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      "Draft a short policy memo that follows the principles of the AI RMF (reference): https://www.nist.gov/itl/ai-risk-management-framework<br/>
                      Include:<br/>
                      • a 2–3 sentence executive summary<br/>
                      • 3 recommendations<br/>
                      • 2 implementation risks."
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why it works:</span>
                    <span className="ml-2">The link is clearly a reference standard. The prompt still contains the actual deliverable requirements.</span>
                  </div>
                </CardContent>
              </Card>

              {/* Good Example 3 */}
              <Card className="border">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Good Example 3: If the link matters, include the key points inline
                  </p>
                  <div className="bg-muted/30 rounded-md p-3 border border-dashed mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Prompt</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      "Use this article for context: https://example.com/article<br/>
                      Key points to include (provided here so the task is self-contained):<br/>
                      • Point A…<br/>
                      • Point B…<br/>
                      Deliverable: rewrite these points into a customer-friendly FAQ."
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why it works:</span>
                    <span className="ml-2">Even if the link can't be opened, the task is still doable. The "source of truth" content is captured in the prompt.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bad Examples Section */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <X className="w-4 h-4" />
              Bad Examples (and what to do instead)
            </h3>
            <div className="space-y-3">
              {/* Bad Example 1 */}
              <Card className="border">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Bad Example 1: Paywalled / gated link is required
                  </p>
                  <div className="bg-muted/30 rounded-md p-3 border border-dashed mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bad Prompt</p>
                    <p className="text-sm text-foreground">
                      "Read this Bloomberg article and summarize it: [link]"
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why it breaks:</span>
                    <span className="ml-2">Access is not guaranteed.</span>
                  </div>
                </CardContent>
              </Card>

              {/* Bad Example 2 */}
              <Card className="border">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Bad Example 2: Vague "use this link" with no direction
                  </p>
                  <div className="bg-muted/30 rounded-md p-3 border border-dashed mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bad Prompt</p>
                    <p className="text-sm text-foreground">
                      "Use this website to complete the task: https://example.com"
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why it breaks:</span>
                    <span className="ml-2">No scope: what to pull, what matters, what format, what output?</span>
                  </div>
                </CardContent>
              </Card>

              {/* Bad Example 3 */}
              <Card className="border">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Bad Example 3: Real-time web state treated as reproducible
                  </p>
                  <div className="bg-muted/30 rounded-md p-3 border border-dashed mb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bad Prompt</p>
                    <p className="text-sm text-foreground">
                      "Check current listings on LoopNet and summarize the top 10…"
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why it breaks:</span>
                    <span className="ml-2">Results can change run-to-run. "Top 10" is not stable without filters + time + explicit variability. Task becomes not timeless!</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Best Practice Summary */}
          <Card className="border-2">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-foreground" />
                </div>
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
                  <div className="space-y-1 text-sm font-mono bg-muted/50 p-3 rounded-md text-foreground">
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
