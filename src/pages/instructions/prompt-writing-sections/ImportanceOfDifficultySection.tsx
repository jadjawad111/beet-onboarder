import { AlertTriangle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Failure modes data
const FAILURE_MODES = [
  {
    type: "extraction" as const,
    title: "Extraction Failures (The \"Blind Spot\")",
    subtitle: "The model fails to pull correct data from input files. Real-world files are messy, and models often struggle to differentiate between \"noise\" and \"signal.\"",
    items: [
      { name: "Hallucination", description: "The model invents data that isn't in the file to fill a gap (e.g., making up a 'Country of Origin' because the cell was blank)." },
      { name: "Omission", description: "The model misses a critical detail buried in a large document (e.g., ignoring a footnote in a PDF that changes the tax rate)." },
      { name: "Misinterpretation", description: "The model reads the data but misunderstands the context (e.g., treating a 'Projected 2026' column as 'Actual 2025' data)." },
    ]
  },
  {
    type: "reasoning" as const,
    title: "Reasoning Failures (The \"Logic Break\")",
    subtitle: "The model has the right data but does the wrong thing with it. It fails to connect the dots or follow a complex chain of logic.",
    items: [
      { name: "Dependency Collapse", description: "The model solves Step 1 correctly but forgets that Step 2 depends on the result of Step 1, leading to a cascading error." },
      { name: "Constraint Violation", description: "The model ignores a negative constraint (e.g., 'Do not schedule overtime') because it is trying too hard to satisfy a positive constraint (e.g., 'Finish the project by Friday')." },
      { name: "Invalid Inference", description: "The model makes a logical leap that is factually or professionally unsound (e.g., assuming 'Revenue' equals 'Profit' without checking for expenses)." },
    ]
  },
  {
    type: "formatting" as const,
    title: "Formatting & Deliverable Failures (The \"Professional Gap\")",
    subtitle: "In knowledge work, how you deliver the answer is often as important as the answer itself.",
    items: [
      { name: "Wrong Output Format", description: "You asked for a downloadable .csv file, and it gave you a text table in the chat window. Incorrect headings or implicit stylistic asks included." },
      { name: "Structure Mismatch", description: "You asked for a 'Memo with an Executive Summary,' and it gave you a casual email." },
      { name: "Formula Stagnation", description: "You asked for a 'dynamic Excel spreadsheet with active formulas,' and it gave you a sheet with hard-coded numbers (static values)." },
    ]
  },
];

// Artificial failures comparison data
const ARTIFICIAL_FAILURES_DATA = [
  {
    scenario: "Nurse Manager",
    occupation: "Scheduling Surgeries",
    badTrap: "The Hidden Rule: \"Schedule these surgeries, but pretend that 'Dr. Kamal' is actually named 'Dr. Smith' and that hours are only 50 minutes long.\"",
    badReason: "It requires the model to roleplay a fantasy world, not a hospital. It tests \"Simon Says\" skills, not nursing logic.",
    goodTrap: "The Conflicting Constraint: \"Schedule the elective surgeries for Dr. Kamal... However, the ER has declared a mass casualty event, and you must strictly maintain 4 Trauma ORs open 24/7.\"",
    goodReason: "The model must choose between efficiency (scheduling everyone) and safety (keeping rooms empty). It forces the model to prioritize constraints like a real manager."
  },
  {
    scenario: "Investment Advisor",
    occupation: "Calculating ROI",
    badTrap: "The Arbitrary Filter: \"Calculate the ROI, but do not count any money invested on a Tuesday.\"",
    badReason: "This is a riddle. No financial advisor works like this.",
    goodTrap: "The Implicit Variable: \"Apollo's annual salary is $99,604. But he started working on June 1st. Calculate his 2023 investment potential.\"",
    goodReason: "The model often blindly uses the $99k figure. The trap is realizing June 1st means he only earned ~58% of that salary. This is a common payroll logic error."
  },
  {
    scenario: "Semiconductor Analyst",
    occupation: "Risk Analysis",
    badTrap: "The Random Exclusion: \"Analyze the risk of this ETF. By the way, ignore the third tab in the Excel sheet for no reason.\"",
    badReason: "It trains the model to ignore data without a valid reason.",
    goodTrap: "The Data Reconciliation: \"Calculate the exposure. Note: Some holdings in the 'Holdings' tab do not map to the 'Country_Exposure' tab.\"",
    goodReason: "Real data is messy. The model must realize some rows don't match and exclude them via logic, rather than hallucinating a country to fill the gap."
  },
  {
    scenario: "Pharmacology Lead",
    occupation: "Clinical Drug Review",
    badTrap: "The Secret Code: \"If the patient ID ends in '5', treat their dosage as double.\"",
    badReason: "This is a \"game,\" not pharmacology.",
    goodTrap: "The Professional Threshold: \"Flag patients whose AUC0-inf exceeds the typical therapeutic range (source from data provided).\"",
    goodReason: "It forces the model to interpret clinical thresholds, handle missing data, and reference real pharmacological standards."
  },
];

const ImportanceOfDifficultySection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Importance of Difficulty</h2>
        <p className="text-muted-foreground leading-relaxed">
          Understanding what makes a prompt truly challenging is crucial for creating valuable training data. 
          This section covers the types of failures we look for and how to avoid artificial difficulty.
        </p>
      </div>

      {/* What Makes a Prompt Difficult */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-warning/5 to-transparent">
          <h3 className="text-lg font-bold text-foreground">What Makes a Prompt Difficult?</h3>
          <p className="text-sm text-muted-foreground">Understanding structural failures vs. superficial complexity</p>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-foreground leading-relaxed">
            <strong>Remember:</strong> An important goal of prompt writing is to realistically extract failures in model outputs on knowledge work tasks. 
            This exposes the limits of what the model is capable of, allowing us to create rubrics that teach it how to fix those specific weaknesses.
          </p>
          <p className="text-foreground leading-relaxed">
            To create valuable training data, we need the model to fail in ways that matter. We are not hunting for typos or small glitches. 
            We are looking for <strong className="text-primary">Structural Failures</strong>—moments where the model proves it cannot yet handle 
            the complexity or requirements of a real job task.
          </p>
          <p className="text-foreground leading-relaxed">
            For professional domains, failures generally fall into three categories: <strong>Extraction</strong>, <strong>Reasoning</strong>, 
            and <strong>Formatting</strong>.
          </p>

          {/* Failure Categories */}
          <div className="space-y-4 mt-6">
            {FAILURE_MODES.map((mode) => (
              <div 
                key={mode.type}
                className={cn(
                  "rounded-xl border p-5",
                  mode.type === "extraction" && "border-destructive/30 bg-destructive/5",
                  mode.type === "reasoning" && "border-warning/30 bg-warning/5",
                  mode.type === "formatting" && "border-primary/30 bg-primary/5"
                )}
              >
                <h4 className="font-bold text-foreground mb-2">{mode.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{mode.subtitle}</p>
                <ul className="space-y-3">
                  {mode.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-3 h-3 text-foreground" />
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">{item.name}:</span>
                        <span className="text-muted-foreground ml-1">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Does It Mean for a Model to Fail */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8">
        <h3 className="text-lg font-bold text-foreground mb-4">What Does It Mean for a Model to Fail?</h3>
        <div className="space-y-4 text-foreground leading-relaxed">
          <p>
            A prompt can pass every general litmus test—it can be realistic, unambiguous, and have a perfect professional persona—but 
            it is <strong className="text-primary">not a valid Beet prompt</strong> until we see the Model Output.
          </p>
          <p>
            The only true measure of success is whether the prompt induces a failure.
          </p>
          <div className="bg-muted/30 rounded-lg p-4 space-y-2 mt-4">
            <p><strong>The "Litmus Test" (Entry Criteria):</strong> Does the prompt look like real work? Is the role clear? Are the files valid? (This gets you in the door).</p>
            <p><strong>The "True Test" (Success Criteria):</strong> Does the model output <strong className="text-destructive">fail</strong>?</p>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-warning/10 border-2 border-warning/30">
          <p className="text-lg text-foreground leading-relaxed font-medium">
            ⚠️ <strong className="text-warning">If the model output is perfect, the prompt has failed.</strong> It means the task was too easy, 
            and we have failed to capture the complexity gap between AI capabilities and human expertise.
          </p>
        </div>
      </div>

      {/* Avoiding Artificial Failures */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-destructive/5 to-transparent">
          <h3 className="text-lg font-bold text-foreground">Avoiding Artificial Failures</h3>
          <p className="text-sm text-muted-foreground">Real failures vs. "cheap" tricks</p>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-foreground leading-relaxed">
            There are several known methods for artificially causing models to fail by purposefully creating scenarios or injecting 
            text that don't actually provide a strong training signal. These "cheap" failures do not reflect true gaps in professional reasoning.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm border-collapse border rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground bg-muted/50">Scenario / Occupation</th>
                  <th className="text-left py-3 px-3 font-semibold text-destructive bg-destructive/5">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      The "Bad" Trap (Avoid)
                    </div>
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-success bg-success/5">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      The "Good" Logic Trap (Do This)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ARTIFICIAL_FAILURES_DATA.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-4 px-3 font-medium text-foreground align-top bg-muted/20">
                      <p className="font-bold">{row.scenario}</p>
                      <p className="text-xs text-muted-foreground">{row.occupation}</p>
                    </td>
                    <td className="py-4 px-3 text-foreground align-top bg-destructive/5">
                      <p className="mb-2">{row.badTrap}</p>
                      <p className="text-xs text-destructive italic">Why it's bad: {row.badReason}</p>
                    </td>
                    <td className="py-4 px-3 text-foreground align-top bg-success/5">
                      <p className="mb-2">{row.goodTrap}</p>
                      <p className="text-xs text-success italic">Why it works: {row.goodReason}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* How to Test for Model Failures */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <h3 className="text-lg font-bold text-foreground">How to Test for Model Failures</h3>
          <p className="text-sm text-muted-foreground">Validating your prompt actually induces meaningful failures</p>
        </div>
        <div className="p-6 space-y-4">
          {/* LLM Reminder Callout */}
          <div className="p-5 rounded-xl border-2 border-warning/30 bg-warning/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-2">⚠️ Reminder: This does not mean you should overly anchor on LLM use at all</p>
                <p className="text-sm text-foreground">
                  Using LLMs as brainstorming partners can be incredibly powerful—but only when combined with <strong>heavy human modification</strong>. 
                  While an LLM can help generate a baseline scenario, creating a high-quality Beet prompt requires a level of professional 
                  <strong> "taste"</strong> and nuance that an AI simply cannot reproduce.
                </p>
              </div>
            </div>
          </div>

          <p className="text-foreground leading-relaxed">
            It can be very hard to write a Beet prompt in a vacuum. You must verify that your prompt actually causes the model to stumble 
            for the right reasons while maintaining realism + all the other attributes.
          </p>
          <p className="font-semibold text-foreground">Actions you can take to improve quality:</p>

          <div className="space-y-3 mt-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Run it through a Model</p>
                <p className="text-sm text-muted-foreground">If the model answers perfectly on the first try, <strong className="text-destructive">your prompt is too easy.</strong></p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Check for "Clarifying Questions"</p>
                <p className="text-sm text-muted-foreground">If the model asks you for more info, your prompt isn't hard—it's <strong className="text-warning">ambiguous</strong>.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">The "Human Intern" Test</p>
                <p className="text-sm text-muted-foreground">Ask yourself: "Could a smart human intern solve this with these files?"</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-success/10 border border-success/20 text-foreground">
                    <strong className="font-semibold text-foreground">Yes →</strong>{" "}
                    <span className="text-foreground">It's a valid reasoning test.</span>
                  </div>
                  <div className="p-2 rounded bg-destructive/10 border border-destructive/20 text-foreground">
                    <strong className="font-semibold text-foreground">No →</strong>{" "}
                    <span className="text-foreground">It's an impossible task (invalid data).</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">4</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Run it Multiple Times</p>
                <p className="text-sm text-muted-foreground">
                  Models are probabilistic. Run the prompt 3 times. If it gets it right once but fails twice, you may have found an error-inducing prompt. 
                  If the model tries to solve a different question every time, maybe the prompt is too ambiguous!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportanceOfDifficultySection;
