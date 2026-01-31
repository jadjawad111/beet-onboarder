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
          <h3 className="font-semibold text-foreground mb-4">
            Three Valid Ways to Reference Input Files
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Gold Standard: Enumerated Lists</p>
              <p className="text-sm text-foreground italic">
                "You'll find everything you need in the attached files: COA.xlsx, Insurance.pdf, Prepaid_Expenses.pdf…"
              </p>
            </div>
            <div className="border-l-2 border-primary/60 pl-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Strong: Named Explicitly</p>
              <p className="text-sm text-foreground italic">
                "The attached spreadsheet titled 'Population' contains…"
              </p>
            </div>
            <div className="border-l-2 border-muted-foreground/40 pl-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Acceptable: Grouped but Scoped</p>
              <p className="text-sm text-foreground italic">
                "Use the attached reference files…"
              </p>
            </div>
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
