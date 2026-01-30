import { AlertTriangle, TrendingDown, Scale, Target, Layers, Sparkles, Palette, Ban, FileSpreadsheet, Lightbulb } from "lucide-react";
import WeightRangeCard from "@/components/rubrics/WeightRangeCard";

const WeightContent = () => {
  return (
    <div className="space-y-10">
      {/* Definition Hero */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">What is Weight?</h3>
            <p className="text-base text-foreground leading-relaxed">
              <strong className="text-primary">Weight</strong> is a score from <span className="font-bold text-primary">-100 to +100</span> that represents how much a criterion should matter relative to other criteria in the same rubric.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Visual Cards */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">Weights are about impact</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 rounded-xl bg-card border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h5 className="font-semibold text-foreground">Failure Impact</h5>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If a criterion fails, how much does that damage the usefulness or correctness of the deliverable?
            </p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">Decision Weight</h5>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If two responses differ only on this criterion, should that difference decide the winner?
            </p>
          </div>
        </div>
      </div>

      {/* Core Rule */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-md">
        <h4 className="font-bold text-foreground mb-4 text-xl flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          The Core Rule
        </h4>
        <p className="text-base text-foreground leading-relaxed mb-5">
          Weights must reflect <strong className="text-primary">relative importance</strong> within this prompt and this deliverable.
        </p>
        
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "🎯", text: "The main ask dominates the score" },
            { icon: "📋", text: "Supporting details matter, but don't outweigh the main ask" },
            { icon: "✨", text: "Nice-to-haves don't distort evaluation" },
            { icon: "⚠️", text: "Major mistakes can be penalized with negative weights" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Apply professional judgment.</strong> Think about a real professional setting—how would you prioritize requirements?
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Don't debate small differences (e.g., 70 vs 80). In a large rubric, a difference of 10 usually has low impact. Focus on being <strong className="text-foreground">sensible</strong> and <strong className="text-foreground">consistent</strong>.
          </p>
        </div>
      </div>

      {/* Example Prompt */}
      <div className="rounded-xl border-2 border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide">Reference Prompt</span>
            <h4 className="font-semibold text-foreground mt-1">Payroll Forecast Template</h4>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-sm text-foreground leading-relaxed italic">
            "You work in the budgeting department at a Beet manufacturing company. Your manager wants to create a template for each department to record their monthly payroll cost. Create a dynamic payroll forecast template for 2026 that includes monthly headcount by role, monthly payroll cost, and an annual summary. It'll be important to include a line chart showing total payroll cost by month, so that its easy for department heads to visualize. The output should be an Excel spreadsheet."
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Deliverable:</span>
          <code className="text-xs bg-muted px-2 py-1 rounded text-foreground">Payroll Forecast Spreadsheet.xlsx</code>
        </div>
      </div>

      {/* Weight Ranges Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-amber-500 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-foreground">Weight Ranges & Examples</h4>
            <p className="text-sm text-muted-foreground">Example criteria from the Payroll Forecast prompt above</p>
          </div>
        </div>
        
        <div className="space-y-5">
          {/* 80-100 */}
          <WeightRangeCard
            range="80–100"
            title="Core Requirements"
            subtitle="Non-negotiable"
            description="Essential to meeting the prompt. If it fails, the deliverable has a critical error."
            accentColor="bg-gradient-to-r from-green-600 to-green-500 text-white"
            icon={<Target className="w-5 h-5" />}
            examples={[
              {
                criterion: "The Payroll Forecast Spreadsheet includes a monthly payroll cost field for January 2026.",
                weight: 90,
                explanation: "The prompt explicitly requires monthly payroll cost. Missing required month fields means the template is not doing its main job.",
                type: "deliverable"
              },
              {
                criterion: "The line chart in the Payroll Forecast Spreadsheet includes a visual line that indicates the total payroll cost by month for 2026.",
                weight: 100,
                explanation: "The prompt explicitly asks for a line chart showing total payroll cost by month. Missing this directly contradicts the prompt.",
                type: "asset"
              },
            ]}
          />

          {/* 50-70 */}
          <WeightRangeCard
            range="50–70"
            title="Complete & Usable"
            subtitle="Secondary requirements"
            description="Strongly affects completeness or decision usefulness, but still secondary to the main ask."
            accentColor="bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            icon={<Layers className="w-5 h-5" />}
            examples={[
              {
                criterion: "The Payroll Forecast Spreadsheet includes a column for average monthly payroll cost per role.",
                weight: 60,
                explanation: "While not explicitly required, a complete template often includes per-role cost fields to support calculations.",
                type: "deliverable"
              },
              {
                criterion: "The line chart in the Payroll Forecast Spreadsheet.xlsx includes a sub-heading indicating the y-axis is for payroll cost.",
                weight: 60,
                explanation: "A sub-heading is not explicitly required, but a complete graph typically includes labels that clarify what it measures.",
                type: "asset"
              },
            ]}
          />

          {/* 30-50 */}
          <WeightRangeCard
            range="30–50"
            title="Quality Differentiators"
            subtitle="Helpful, not required"
            description="Improves clarity or ease of use, but the deliverable still counts without them."
            accentColor="bg-gradient-to-r from-amber-500 to-amber-400 text-white"
            icon={<Sparkles className="w-5 h-5" />}
            examples={[
              {
                criterion: "The Payroll Forecast Spreadsheet includes a department name input field.",
                weight: 40,
                explanation: "A real template often includes department identification. This improves clarity, but it is not required for technical correctness.",
                type: "deliverable"
              },
              {
                criterion: "The monthly payroll table in the Payroll Forecast Spreadsheet includes consistent currency formatting for payroll cost values.",
                weight: 30,
                explanation: "Consistent units and formatting improve usability and professionalism, but they are not explicitly demanded.",
                type: "asset"
              },
            ]}
          />

          {/* 10-30 */}
          <WeightRangeCard
            range="10–30"
            title="Nice-to-Haves"
            subtitle="Polish & convenience"
            description="Adds polish or convenience, but should not meaningfully affect whether the deliverable is accepted."
            accentColor="bg-gradient-to-r from-gray-500 to-gray-400 text-white"
            icon={<Palette className="w-5 h-5" />}
            examples={[
              {
                criterion: "The Payroll Forecast Spreadsheet includes header rows that are a different color than input cells.",
                weight: 20,
                explanation: "This is a formatting preference that may be common, but it is a nice-to-have.",
                type: "deliverable"
              },
              {
                criterion: "The instructions section in the Payroll Forecast Spreadsheet includes a brief explanation of how payroll cost is calculated.",
                weight: 10,
                explanation: "Instructions and calculation explanations are not required by the prompt. They can help users, but should not drive acceptance.",
                type: "asset"
              },
            ]}
          />
        </div>
      </div>

      {/* Remember note - Above Negative Section */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-1">Remember</h5>
            <p className="text-sm text-foreground leading-relaxed">
              Even explicit items still need prioritization. Apply domain judgment because some explicit requirements are more important than others.
            </p>
          </div>
        </div>
      </div>

      {/* Negative Weights Section - Integrated */}
      <div className="rounded-2xl border-2 border-destructive/30 bg-gradient-to-br from-destructive/5 via-destructive/3 to-transparent overflow-hidden shadow-md">
        {/* Header */}
        <div className="p-6 border-b border-destructive/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-foreground">Negative Weights</h4>
              <p className="text-sm text-muted-foreground">Penalties for common wrong responses</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Definition */}
          <p className="text-base text-foreground leading-relaxed">
            A negative criterion is a <strong>positively stated, binary criterion</strong> that represents a mistake you want to punish. If true, it triggers a negative weight and reduces the total score.
          </p>
          
          {/* When & How Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Ban className="w-4 h-4 text-destructive" />
                When to use negative weights
              </h5>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Mistake is <strong>egregious</strong> (misleading, unusable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Mistake is <strong>common</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Prevent polished-but-wrong deliverables from scoring well</span>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                How to write them well
              </h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Specific and observable (true/false)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Focus on high-impact failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Non-overlapping with positive criteria</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Examples */}
          <WeightRangeCard
            range="Negative"
            title="Penalties for Mistakes"
            subtitle="Score reducers"
            description="Larger negatives for core instruction violations. Smaller negatives for wrong-but-not-catastrophic mistakes."
            accentColor="bg-gradient-to-r from-red-600 to-red-500 text-white"
            icon={<AlertTriangle className="w-5 h-5" />}
            examples={[
              {
                criterion: "The Payroll Forecast Spreadsheet includes payroll fields for 2025.",
                weight: -90,
                explanation: "Wrong year makes the template incorrect for the stated use case.",
                type: "deliverable"
              },
              {
                criterion: "All cells in the Payroll Forecast Spreadsheet are hardcoded values.",
                weight: -100,
                explanation: "The prompt asks for a dynamic template, which means formulas should be used to calculate fields that are meant to be calculated.",
                type: "deliverable"
              },
            ]}
          />

          {/* Required Guideline */}
          <div className="p-5 rounded-xl bg-warning/15 border-2 border-warning/40">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-warning/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-warning/30 text-warning text-xs font-bold uppercase tracking-wide">Required</span>
                  <h5 className="font-semibold text-foreground">Guideline</h5>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Include at least <strong className="text-warning">5 negatively weighted criteria</strong> in your rubric to check for egregious mistakes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightContent;
