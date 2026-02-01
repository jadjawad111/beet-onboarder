import { CheckCircle2, XCircle, FileText, Lightbulb, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InputFileCharacteristics = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Input File Best Practices
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          How Input Files Actually Appear in Good Prompts
        </h2>
      </div>

      {/* Core Characteristics */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Core Characteristics
          </h3>
          <p className="text-sm text-muted-foreground mb-4 italic">What's consistently true in quality prompts</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Inputs are explicitly acknowledged as existing</span>
                  <p className="text-xs text-muted-foreground">The prompt clearly signals that files are provided (attached, reference files, source files, etc.).</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Inputs are the authoritative source of truth</span>
                  <p className="text-xs text-muted-foreground">The task is grounded in the provided files, not outside knowledge or guessing.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Inputs are introduced before execution begins</span>
                  <p className="text-xs text-muted-foreground">Files are declared before the task depends on them. They may be used later, but not discovered later.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">The input scope is clear and closed</span>
                  <p className="text-xs text-muted-foreground">The model knows which materials count as inputs and that nothing else is required.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Files are tied to concrete actions</span>
                  <p className="text-xs text-muted-foreground">Prompts explain how the files are used (analyze, calculate, reconcile, copy, summarize).</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-foreground">Inputs are treated as stable artifacts</span>
                  <p className="text-xs text-muted-foreground">Files are assumed complete, correct, and usable as provided.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valid Ways to Reference */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-2">
            Valid Ways to Reference Input Files
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            All of these work. The difference is specificity vs. realism, not correctness.
          </p>
          
          <div className="space-y-4">
            {/* Enumerated Lists */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">Enumerated Lists</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Most Explicit</span>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">
                  "You'll find everything you need in the attached files: COA.xlsx, Aurisic_Prepaid_Insurance.pdf…"
                </p>
                <p className="text-xs text-muted-foreground">
                  Zero guessing. Best for complex, multi-file tasks. Ideal for audits, accounting, reconciliation work.
                </p>
              </div>
            </div>

            {/* Named Explicitly */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary/80">2</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">Named Explicitly in Narrative</p>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">
                  "The attached spreadsheet titled 'Population' contains Anti-Financial Crime Risk Metrics for Q2 and Q3 2024."
                </p>
                <p className="text-xs text-muted-foreground">
                  File is named and contextualized. Often re-referenced when tasks begin. Very common in professional asks.
                </p>
              </div>
            </div>

            {/* Grouped but Scoped */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">3</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">Grouped but Scoped</p>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Most Natural</span>
                </div>
                <p className="text-sm text-muted-foreground italic mb-1">
                  "Use the attached reference files, which include income, costs, and tax withholding data…"
                </p>
                <p className="text-xs text-muted-foreground">
                  Scope is closed and unambiguous. Mirrors how people actually communicate at work. Slightly less precise, still valid.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">The Key:</strong> All valid prompts make it clear what files exist before the task depends on them. Files may be used later in the steps, but they are not introduced as a surprise dependency.</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Real Examples - MAIN SECTION */}
      <Card className="border-2 border-primary/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            What This Looks Like in Real Prompts
          </h3>
          <p className="text-base text-muted-foreground mb-6">Concrete examples from quality prompts, highlighting the structure.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Example 1 – Explicit, early declaration</p>
              <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">"The attached spreadsheet titled 'Population' contains Anti-Financial Crime Risk Metrics…"</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ File declared before steps</span>
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Reused throughout</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Example 2 – Grouped inputs, still upfront</p>
              <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">"Use the attached reference files, which include income, costs, and tax withholding data…"</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Files scoped before instructions</span>
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ No guessing required</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Example 3 – Template + data both declared early</p>
              <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">"Using the attached Word template titled 'Social Developmental History Template' and the notes document…"</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Multiple inputs, clear roles</span>
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ No mid-task discovery</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Example 4 – Primary + supporting files</p>
              <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">"Use Aurisic_Financials_3-25-1.xlsx as your primary template… The following April source files are also attached…"</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Hierarchy of inputs</span>
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Fully declared upfront</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Example 5 – Creative/audio task</p>
              <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">"You have been provided with a drum track (see attached, DRUM REFERENCE TRACK.WAV)."</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Input declared before composition</span>
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ File is operational</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-5 border-2 border-border hover:border-primary/40 transition-colors">
              <p className="text-base font-semibold text-primary mb-2">Example 6 – Open-world task (intentionally different)</p>
              <p className="text-base text-muted-foreground italic mb-4 leading-relaxed">"Conduct SEO research and choose four related keywords…"</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Explicitly allows external lookup</span>
                <span className="text-sm bg-primary/15 text-primary px-3 py-1.5 rounded-full font-medium">✔ Not pretending to be file-based</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What NOT to do */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Avoid These Input File Mistakes
          </h3>
          <div className="space-y-3">
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Referencing data that wasn't provided</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Pull the customer list from our internal CRM…"</p>
                <p className="text-xs text-muted-foreground mt-1">❌ The model has no access to internal systems. All required data must be attached.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Requiring undisclosed external lookup</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Research current LIBOR rates online and use them…"</p>
                <p className="text-xs text-muted-foreground mt-1">❌ If current data is required, it must be provided or the task explicitly framed as open-world.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Being vague about which data matters</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Using the relevant data, complete the analysis…"</p>
                <p className="text-xs text-muted-foreground mt-1">❌ Which data? Which file? The model shouldn't infer.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">Introducing a new dependency mid-task</span>
              </div>
              <div className="bg-background/50 rounded p-2 text-sm">
                <p className="text-destructive/80 italic">"Step 1: Summarize… Step 2: Create charts… Step 3: Now refer to Budget.xlsx…"</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ❌ This fails only if Budget.xlsx was not declared earlier.<br/>
                  ✔ Sequencing <em>usage</em> is fine. ❌ Sequencing <em>discovery</em> is not.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputFileCharacteristics;
