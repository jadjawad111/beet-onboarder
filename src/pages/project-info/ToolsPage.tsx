import { FileText, Brain, PenTool, Scale, AlertTriangle, Clock, CheckCircle2, Download, DollarSign } from "lucide-react";

const ToolsPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-white">
        {/* Section Number */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary">4</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
            Final Step
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Assessment Information</h1>
        <p className="text-lg text-white/90 max-w-2xl">
          The assessment evaluates whether you understand the core concepts and can apply professional judgment.
        </p>
      </div>

      {/* What It Evaluates */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">What the Assessment Evaluates</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <Brain className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Core Concepts</h3>
            <p className="text-sm text-muted-foreground">Human data and model training fundamentals</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <PenTool className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Prompt Design</h3>
            <p className="text-sm text-muted-foreground">How to design high-quality Beet prompts</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <Scale className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Rubric Writing</h3>
            <p className="text-sm text-muted-foreground">Rigorous, generalizable rubrics</p>
          </div>
        </div>
      </section>

      {/* Assessment Structure */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Assessment Structure</h2>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-foreground">General Understanding</h4>
              <p className="text-sm text-muted-foreground">Human data concepts, evaluations, and Project Beet 2.0 goals</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-foreground">Prompt Writing</h4>
              <p className="text-sm text-muted-foreground">Reasoning about strong Beet 2.0 prompts and meaningful model failures</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-foreground">Rubric Design</h4>
              <p className="text-sm text-muted-foreground">Weights, categories, generalizability, and judge-based evaluation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before You Start */}
      <section>
        <div className="flex gap-4 p-5 rounded-xl border-2 border-warning/40 bg-warning/5">
          <Download className="w-6 h-6 text-warning flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Work Offline First</h3>
            <p className="text-muted-foreground mb-3">
              We strongly recommend completing the assessment offline first using the provided template.
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                The platform may not reliably save progress
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                Work is only saved upon final submission
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What It Is and Isn't */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">What the Assessment Is — and Is Not</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              It IS:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-foreground">✓ Open-resource</li>
              <li className="text-foreground">✓ Reasoning-heavy</li>
              <li className="text-foreground">✓ Focused on professional judgment</li>
              <li className="text-foreground">✓ Representative of real work</li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-border bg-muted/50">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              It is NOT:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">✗ A speed test</li>
              <li className="text-muted-foreground">✗ A trivia quiz</li>
              <li className="text-muted-foreground">✗ Something you can pass without reading the material</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Time */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
        <Clock className="w-5 h-5 text-primary" />
        <p className="text-foreground">
          <span className="font-medium">Time expectation:</span> Most candidates spend several hours. This is normal.
        </p>
      </div>

      {/* Compensation */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Compensation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-primary">$600 USD</span>
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Pass the assessment
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Score in top 10% of passing candidates
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                Submit an approved task post-training
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="text-2xl font-bold text-foreground">$200 USD</span>
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Pass the assessment
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                Submit an approved task post-training
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;