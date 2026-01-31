import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InputFileCharacteristics = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Input File Best Practices
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          How Input Files Should Appear in Prompts
        </h2>
      </div>

      {/* Core Characteristics */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Key Characteristics
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">Inputs are <strong>explicitly acknowledged</strong> as existing</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">Inputs are the <strong>authoritative source of truth</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">Referenced <strong>before tasks begin</strong>, not mid-execution</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">Scope is always <strong>clear and closed</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">Files are <strong>tied to concrete actions</strong>, not decorative</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">Treated as <strong>stable, complete artifacts</strong></span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Valid Patterns */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">
            Three Valid Ways to Reference Input Files
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            All three are <strong className="text-foreground">unambiguous</strong> and valid. The balance is between maximum traceability and realistic professional communication.
          </p>
          
          <div className="space-y-4">
            {/* Most Specific */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                <div className="w-0.5 h-full bg-primary/20 mt-1" />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">Enumerated Lists</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Most Specific</span>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">
                  "You'll find everything you need in the attached files: COA.xlsx, Insurance.pdf…"
                </p>
                <p className="text-xs text-muted-foreground">
                  Zero guessing. Perfect traceability. Best for complex multi-file tasks.
                </p>
              </div>
            </div>

            {/* Named Explicitly */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary/80">2</div>
                <div className="w-0.5 h-full bg-primary/15 mt-1" />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">Named Explicitly</p>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">
                  "The attached spreadsheet titled 'Population' contains…"
                </p>
                <p className="text-xs text-muted-foreground">
                  Clear identifier. Re-referenced when tasks begin. Very common in professional asks.
                </p>
              </div>
            </div>

            {/* Grouped but Scoped */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">3</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">Grouped but Scoped</p>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Most Realistic</span>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">
                  "Use the attached reference files…"
                </p>
                <p className="text-xs text-muted-foreground">
                  Scope is closed and unambiguous. Mirrors how professionals often communicate.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The key:</strong> All three are unambiguous about what files to use. 
              Choose based on task complexity and what feels natural for the professional context.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What NOT to do */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-3">
            What Good Input References Never Do
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Assume undocumented external data</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Require web browsing or research</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Leave the source of truth unclear</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Introduce files mid-execution unexpectedly</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputFileCharacteristics;
