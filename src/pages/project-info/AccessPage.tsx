import { AlertTriangle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const AccessPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-white">
        {/* Section Number */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary">2</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
            Essential Context
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Beet 1.0 → Beet 2.0</h1>
        <p className="text-lg text-white/90 max-w-2xl">
          Understanding the evolution from evaluation-focused work to test construction.
        </p>
      </div>

      {/* Warning */}
      <div className="flex gap-4 p-5 rounded-xl border-2 border-warning/40 bg-warning/5">
        <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Beet 2.0 Is Not a Small Iteration</h3>
          <p className="text-muted-foreground">
            It represents a fundamental shift in responsibility, judgment, and difficulty.
          </p>
        </div>
      </div>

      {/* Beet 1.0 vs 2.0 Comparison */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">What Changed</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center">1.0</span>
              Beet 1.0 — Evaluation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                Clients designed the prompts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                Clients supplied input files
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                You evaluated model outputs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                ~80-100+ criteria rubrics
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-primary text-white text-xs font-bold flex items-center justify-center">2.0</span>
              Beet 2.0 — Test Construction
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <strong>You</strong> design the prompt
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <strong>You</strong> define or create input files
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <strong>You</strong> write the rubric
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <strong>You</strong> induce meaningful model failure
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">The Core Shift</h2>
        <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
          <div className="text-center px-4">
            <div className="text-sm text-muted-foreground mb-1">From</div>
            <div className="font-semibold text-foreground">Grading outputs</div>
          </div>
          <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="text-center px-4">
            <div className="text-sm text-muted-foreground mb-1">To</div>
            <div className="font-semibold text-primary">Engineering tests</div>
          </div>
        </div>
        <p className="text-muted-foreground mt-4">
          Instead of scoring a model against a fixed answer, you are now engineering realistic professional scenarios that expose where models break down.
        </p>
      </section>

      {/* The Deliverable */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">The Deliverable in Beet 2.0</h2>
        <div className="p-5 rounded-xl border border-border bg-card">
          <p className="text-muted-foreground mb-4">
            A human-made deliverable may still be created — but its role is different. It exists to help you think clearly:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              Understand what a competent professional response looks like
            </li>
            <li className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              Identify which dimensions of quality actually matter
            </li>
            <li className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              Write rubric criteria that are concrete and judgeable
            </li>
          </ul>
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-foreground font-medium">
              The deliverable is a thinking tool — not the final product.
            </p>
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Key Differences Summary</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium text-foreground">Aspect</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Beet 1.0</th>
                <th className="text-left p-3 font-medium text-primary">Beet 2.0</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="bg-card">
                <td className="p-3 font-medium text-foreground">Focus</td>
                <td className="p-3 text-muted-foreground">Evaluation</td>
                <td className="p-3 text-primary font-medium">Test Construction</td>
              </tr>
              <tr className="bg-card">
                <td className="p-3 font-medium text-foreground">Prompt Source</td>
                <td className="p-3 text-muted-foreground">Client-provided</td>
                <td className="p-3 text-primary font-medium">You create it</td>
              </tr>
              <tr className="bg-card">
                <td className="p-3 font-medium text-foreground">Rubric Size</td>
                <td className="p-3 text-muted-foreground">80-100+ criteria</td>
                <td className="p-3 text-primary font-medium">15-25 criteria</td>
              </tr>
              <tr className="bg-card">
                <td className="p-3 font-medium text-foreground">Goal</td>
                <td className="p-3 text-muted-foreground">Match gold standard</td>
                <td className="p-3 text-primary font-medium">Induce failure</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Line */}
      <div className="flex gap-4 p-5 rounded-xl border border-primary/30 bg-primary/5">
        <Zap className="w-6 h-6 text-primary flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Bottom Line</h3>
          <p className="text-muted-foreground">
            This is harder work — and more valuable work. You're not just grading anymore. You're building the tests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;