import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";

const UsingLinksSlide = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Input File Best Practices
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Using Links in Prompts
        </h2>
      </div>

      {/* Intro Card */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Some prompts include links as a source of information (e.g., a policy page, documentation, or background reading). Links can be helpful, but only if the prompt is explicit about how the link should be used and avoids common access issues.
          </p>
        </CardContent>
      </Card>

      {/* Do / Don't Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Use Links When They Are
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Reference / context (helpful, not required)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>A public standard (with requirements stated in prompt)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Supplementary information that supports the task</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4 text-destructive" />
              Avoid These
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Paywalled links (news, gated reports)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Login-required content (portals, private docs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Unstable pages (real-time search results)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Good Examples */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Good Examples
          </h3>
          <div className="space-y-3">
            <div className="bg-muted/30 rounded-lg p-3 border">
              <p className="text-xs font-medium text-primary mb-1">Link as optional context</p>
              <p className="text-sm text-muted-foreground italic">
                "Write a 1-page summary... Optional background link (for context): https://nist.gov/..."
              </p>
              <p className="text-xs text-muted-foreground mt-2">✔ Task is clear without the link. Link role is labeled.</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 border">
              <p className="text-xs font-medium text-primary mb-1">Link as reference standard</p>
              <p className="text-sm text-muted-foreground italic">
                "Draft a memo following the AI RMF (reference): https://nist.gov/... Include: summary, 3 recommendations, 2 risks."
              </p>
              <p className="text-xs text-muted-foreground mt-2">✔ Link is clearly a reference. Requirements still in prompt.</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 border">
              <p className="text-xs font-medium text-primary mb-1">Key points included inline</p>
              <p className="text-sm text-muted-foreground italic">
                "Use this article for context... Key points to include: Point A, Point B. Deliverable: customer-friendly FAQ."
              </p>
              <p className="text-xs text-muted-foreground mt-2">✔ Task doable without link. Source of truth captured in prompt.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bad Examples */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            Bad Examples
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 text-sm">
              <span className="text-destructive font-medium shrink-0">❌</span>
              <div>
                <span className="italic text-muted-foreground">"Read this Bloomberg article and summarize it: [link]"</span>
                <span className="text-xs text-muted-foreground ml-2">Access not guaranteed</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-destructive font-medium shrink-0">❌</span>
              <div>
                <span className="italic text-muted-foreground">"Use this website to complete the task: https://example.com"</span>
                <span className="text-xs text-muted-foreground ml-2">No scope defined</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-destructive font-medium shrink-0">❌</span>
              <div>
                <span className="italic text-muted-foreground">"Check current listings on LoopNet and summarize the top 10..."</span>
                <span className="text-xs text-muted-foreground ml-2">Not timeless</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">Always State the Link's Role</h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center p-2 bg-background rounded border">
                  <p className="font-medium text-foreground text-xs mb-1">Optional context</p>
                  <p className="text-xs text-muted-foreground italic">"Use only if helpful"</p>
                </div>
                <div className="text-center p-2 bg-background rounded border">
                  <p className="font-medium text-foreground text-xs mb-1">Reference standard</p>
                  <p className="text-xs text-muted-foreground italic">"Follow this guidance"</p>
                </div>
                <div className="text-center p-2 bg-background rounded border">
                  <p className="font-medium text-foreground text-xs mb-1">Source of truth</p>
                  <p className="text-xs text-muted-foreground italic">"Extract X from this"</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsingLinksSlide;
