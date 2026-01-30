import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Quote, ListChecks, Square, CheckSquare, ChevronDown, FileText, Target, Sparkles, Eye } from "lucide-react";
import GuessExampleQuiz from "@/components/rubrics/GuessExampleQuiz";
import ComparisonExample from "@/components/rubrics/ComparisonExample";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const STORAGE_KEY = "rubrics-criterion-guidelines-read";

interface GuidelineCardProps {
  number: number;
  title: string;
  explanation: string;
  children: React.ReactNode;
  isConfirmed: boolean;
}

const GuidelineCard = ({ 
  number, 
  title, 
  explanation, 
  children, 
  isConfirmed
}: GuidelineCardProps) => {
  return (
    <div className={cn(
      "rounded-xl border-2 bg-card overflow-hidden transition-all duration-300",
      isConfirmed ? "border-success/30" : "border-border"
    )}>
      {/* Header */}
      <div className="px-5 py-4 bg-muted/30 border-b border-border flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-2 py-0.5 rounded text-xs font-bold transition-colors",
              isConfirmed ? "bg-success/20 text-success" : "bg-primary/10 text-primary"
            )}>
              {number}
            </span>
            <span className="font-semibold text-foreground">{title}</span>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors",
          isConfirmed 
            ? "bg-success/10 border-success/30 text-success" 
            : "bg-muted/50 border-border text-muted-foreground"
        )}>
          {isConfirmed ? (
            <CheckSquare className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{isConfirmed ? "Answered" : "Not answered"}</span>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="px-5 pt-4 pb-2">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-foreground leading-relaxed">{explanation}</p>
        </div>
      </div>
      
      {/* Interactive quiz content */}
      <div className="p-5 pt-3">
        {children}
      </div>
    </div>
  );
};

// Step accordion item component
interface StepAccordionProps {
  stepNumber: number;
  title: string;
  description: string;
  visual: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const StepAccordion = ({ stepNumber, title, description, visual, isOpen, onToggle }: StepAccordionProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <button 
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
            isOpen 
              ? "bg-primary/5 border-primary/30 shadow-md" 
              : "bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border"
          )}
        >
          <div className={cn(
            "w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0 transition-colors",
            isOpen 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground"
          )}>
            {stepNumber}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-foreground">{title}</h5>
          </div>
          <ChevronDown className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-4 pb-4 pt-2 ml-14">
          <p className="text-sm text-muted-foreground">{description}</p>
          {visual}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const CriterionContent = () => {
  const [readGuidelines, setReadGuidelines] = useState<number[]>([]);
  const [openSteps, setOpenSteps] = useState<number[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReadGuidelines(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load guidelines read state:", e);
    }
  }, []);

  // Mark guideline as confirmed (one-way, no toggle back)
  const confirmGuideline = (guidelineNumber: number) => {
    setReadGuidelines(prev => {
      if (prev.includes(guidelineNumber)) return prev;
      const updated = [...prev, guidelineNumber];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-8">
      {/* Definition */}
      <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-base text-foreground leading-relaxed">
          A <strong className="text-primary">criterion</strong> is a binary statement that can be evaluated as <strong>true</strong> or <strong>false</strong>. It measures one component of the expected response. This is what the judge model reads and uses to decide true/false.
        </p>
      </div>

      {/* How to determine criteria */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" />
          How to determine what criteria to write
        </h4>
        
        <div className="space-y-3">
          {[
{
              title: "Start with an outline or mock version of the deliverable",
              description: "Create a detailed outline of the expected prompt response, including the content you expect in the final deliverable. Creating a mock response to the prompt helps ground your rubric in reality.",
              icon: FileText,
              visual: (
                <div className="mt-4 p-4 rounded-lg bg-card border-2 border-dashed border-primary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground text-sm">Example: Mock Deliverable Outline</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Section 1: Executive Summary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Section 2: Key Findings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Section 3: Recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Appendix: Supporting Data</span>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Add the essential criteria first",
              description: "Decompose your prompt. What must be present for the response to be correct? These are explicit asks—requirements that must be included for correctness.",
              icon: Target,
              visual: (
                <div className="mt-4 p-4 rounded-lg bg-card border-2 border-dashed border-primary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground text-sm">Essential Criteria Examples</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-2 rounded bg-success/10 border border-success/20">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">"The production report includes a section heading for the executive summary."</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded bg-success/10 border border-success/20">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">"The executive summary section in the production report states that total production in 2026 was 450 units."</span>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Add additional criteria",
              description: "After essentials, consider what makes the response complete and usable. What enriches the answer? What makes the answer polished? What nice-to-have items are worth measuring (formatting, styling, structure)?",
              icon: Sparkles,
              visual: (
                <div className="mt-4 p-4 rounded-lg bg-card border-2 border-dashed border-primary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground text-sm">Additional Criteria Examples</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-2 rounded bg-secondary/10 border border-secondary/20">
                      <Sparkles className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">"The production report includes a page for the Table of Contents."</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded bg-secondary/10 border border-secondary/20">
                      <Sparkles className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">"All production unit numbers in the production report are whole numbers with no decimal places."</span>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Step back and assess your rubric as a whole",
              description: "Ask yourself—does this set of criteria comprehensively evaluate what an ideal future response will look like?",
              icon: Eye,
              visual: (
                <div className="mt-4 p-4 rounded-lg bg-card border-2 border-dashed border-primary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground text-sm">Self-Assessment Questions</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 p-2 rounded bg-muted/50 border border-border">
                      <span className="text-primary font-bold">?</span>
                      <span className="text-foreground">Does the set of criteria I've created cover all explicit asks of the prompt?</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded bg-muted/50 border border-border">
                      <span className="text-primary font-bold">?</span>
                      <span className="text-foreground">Would an ideal response score highly on all criteria?</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded bg-muted/50 border border-border">
                      <span className="text-primary font-bold">?</span>
                      <span className="text-foreground">Are there any gaps in what I'm measuring?</span>
                    </div>
                  </div>
                </div>
              )
            },
          ].map((step, i) => (
            <StepAccordion
              key={i}
              stepNumber={i + 1}
              title={step.title}
              description={step.description}
              visual={step.visual}
              isOpen={openSteps.includes(i)}
              onToggle={() => setOpenSteps(prev => 
                prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i]
              )}
            />
          ))}
        </div>
      </div>

      {/* General Guidelines - Always Open with Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-foreground">General guidelines for a good criterion</h4>
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            readGuidelines.length === 3 
              ? "bg-success/15 text-success"
              : "bg-muted text-muted-foreground"
          )}>
            {readGuidelines.length}/3 confirmed
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Answer each example quiz to confirm you understand the guideline.
        </p>
        
        <div className="space-y-4">
          {/* 1) Atomic */}
          <GuidelineCard
            number={1}
            title="Atomic"
            explanation="Each criterion should measure one specific aspect of the deliverable at a time. Do not bundle multiple requirements into a single check."
            isConfirmed={readGuidelines.includes(1)}
          >
            <GuessExampleQuiz
              goodExample="The itinerary includes San Francisco as one of the cities in the travel plan."
              badExample="The itinerary includes San Francisco and Seattle as cities to travel to."
              badExplanation="This measures two things. The judge model scores only true or false, so if a response includes one city but not the other, it still gets a 0. Break it into separate criteria."
              goodFirst={false}
              onAnswer={() => confirmGuideline(1)}
              isAlreadyAnswered={readGuidelines.includes(1)}
            />
          </GuidelineCard>

          {/* 2) Self-contained */}
          <GuidelineCard
            number={2}
            title="Self-contained"
            explanation="The judge only sees the deliverable and the criterion—nothing else. Include any necessary context inside the criterion so it can be evaluated as true/false without outside knowledge."
            isConfirmed={readGuidelines.includes(2)}
          >
            <GuessExampleQuiz
              goodExample="The M&A report states that Beet Corp's valuation is $97.56 Billion USD."
              badExample="The M&A report states Beet Corp's valuation from the company analysis input file."
              badExplanation="The judge model does not read input files."
              goodFirst={true}
              onAnswer={() => confirmGuideline(2)}
              isAlreadyAnswered={readGuidelines.includes(2)}
            />
          </GuidelineCard>

          {/* 3) Unambiguous */}
          <GuidelineCard
            number={3}
            title="Unambiguous"
            explanation="Write criteria in plain, direct language so they can be interpreted in only one way. Minimize subjective wording and leave as little room for interpretation as possible."
            isConfirmed={readGuidelines.includes(3)}
          >
            <GuessExampleQuiz
              goodExample="The product specification document states the download feature allows users to download rubrics from the platform."
              badExample="The document correctly defines the download feature."
              badExplanation={`"Correctly defines" is ambiguous and subjective. Specify what must be stated.`}
              goodFirst={true}
              onAnswer={() => confirmGuideline(3)}
              isAlreadyAnswered={readGuidelines.includes(3)}
            />
          </GuidelineCard>
        </div>
      </div>

      {/* How to write strong criteria + Criterion Templates - Combined Section */}
      <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        {/* Strong Criteria Header */}
        <div className="p-6 border-b border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h4 className="text-lg font-bold text-foreground">How to write strong criteria for Beet 2.0</h4>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">Use a consistent sentence structure so criteria are easy to write and easy to evaluate.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">Criteria should be specific, observable, and stated in plain language.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">Avoid layered or interpretive wording.</p>
            </div>
          </div>
        </div>

        {/* Criterion Templates */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-secondary" />
            </div>
            <h4 className="text-lg font-bold text-foreground">Criterion Templates</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-6 ml-[52px]">Reference these criterion sentence patterns to help structure your criteria consistently.</p>
        
          <div className="space-y-4">
          {/* Template 1: Deliverable-based */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 bg-muted/50 border-b border-border flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">1</span>
              <span className="font-semibold text-foreground">Deliverable-based</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-4 rounded-lg bg-card border-2 border-border">
                <p className="text-sm font-mono text-foreground leading-relaxed">
                  "The <span className="text-primary font-semibold">[deliverable reference]</span>{" "}
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">[is / states / includes / indicates]</span>{" "}
                  <span className="text-primary font-semibold">[specific, verifiable detail]</span>."
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Examples:</p>
                <ul className="space-y-2 text-sm">
                  <li className="p-3 rounded-lg bg-muted/50 border border-border text-foreground">
                    "The Last Testament Will is in PDF format."
                  </li>
                  <li className="p-3 rounded-lg bg-muted/50 border border-border text-foreground">
                    "The SOAP note states that the 15-year-old male is presenting with swelling on his forehead."
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Template 2: Asset-in-deliverable */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 bg-muted/50 border-b border-border flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">2</span>
              <span className="font-semibold text-foreground">Asset-in-deliverable (table/diagram/image)</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-4 rounded-lg bg-card border-2 border-border">
                <p className="text-sm font-mono text-foreground leading-relaxed">
                  "The <span className="text-primary font-semibold">[table/diagram/image]</span> in the{" "}
                  <span className="text-primary font-semibold">[deliverable reference]</span>{" "}
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">[states / includes / indicates]</span> that{" "}
                  <span className="text-primary font-semibold">[specific, verifiable detail]</span>."
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Example:</p>
                <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground">
                  "The annual bar graph in the payroll template includes a title indicating the graph displays annual revenue from 2020 to 2030."
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Referencing the output */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">Referencing the output in your criteria</h4>
        
        <p className="text-sm text-foreground leading-relaxed">
          Specify where information must live by referring to the output <strong className="text-primary">semantically or functionally</strong>, not by file type.
        </p>
        <p className="text-sm text-muted-foreground">
          For example, instead of "within audit_plan.txt," write "within the audit plan."
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border-2 border-destructive/30 bg-destructive/5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="font-semibold text-foreground text-sm">Avoid</span>
            </div>
            <ul className="space-y-1 text-sm text-foreground">
              <li>"The PDF..."</li>
              <li>"The deliverable..."</li>
              <li>"The output..."</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border-2 border-success/30 bg-success/5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="font-semibold text-foreground text-sm">Use</span>
            </div>
            <ul className="space-y-1 text-sm text-foreground">
              <li>"The last will document..."</li>
              <li>"The payroll template..."</li>
              <li>"The play script..."</li>
              <li>"The trailer video..."</li>
              <li>"The prescription note..."</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          This keeps criteria specific, especially when multiple files are required.
        </p>
      </div>

      {/* Use of quotes */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Quote className="w-5 h-5 text-primary" />
          The use of quotes
        </h4>
        
        <div className="p-5 rounded-xl bg-warning/10 border border-warning/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium mb-2">
                Be very selective with quotes. Quotes enforce exact matching, which can make your rubric too rigid.
              </p>
              <p className="text-sm text-muted-foreground">
                Use quotes only when something must be named exactly as required by the prompt.
              </p>
            </div>
          </div>
        </div>
        
        <ComparisonExample
          good={{
            label: "Use quotes when exact match required",
            content: 'The schedule document is titled "Captain Beety\'s Schedule".',
            explanation: "If the prompt requires the file be titled \"Captain Beety's Schedule,\" then quotes are appropriate."
          }}
          bad={{
            label: "Don't use quotes for flexible naming",
            content: 'The payroll template is titled "2026 Payroll Template".',
            explanation: "Many titles could be correct (for example \"FY26 Payroll Template,\" \"Payroll - 2026 Template\"). Avoid restricting the rubric unnecessarily."
          }}
        />
      </div>
    </div>
  );
};

export default CriterionContent;