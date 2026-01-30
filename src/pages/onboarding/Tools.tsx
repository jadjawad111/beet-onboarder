import Breadcrumbs from "@/components/Breadcrumbs";
import PageNavigation from "@/components/PageNavigation";
import { 
  FileText, 
  Brain, 
  PenTool, 
  Scale, 
  Download, 
  AlertTriangle, 
  Link2, 
  Clock, 
  Target, 
  DollarSign, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { usePageVisit } from "@/hooks/usePageVisit";

// Track page visit
const useToolsVisit = () => usePageVisit("onboarding-tools-visited");

// Reusable section header component
const SectionHeader = ({ number, title, icon: Icon }: { number: number; title: string; icon: React.ComponentType<{ className?: string }> }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-md">
      {number}
    </div>
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
  </div>
);

// Reusable section card wrapper
const SectionCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm ${className}`}>
    {children}
  </div>
);

// Assessment module card
const ModuleCard = ({ 
  number, 
  title, 
  icon: Icon, 
  items,
  note
}: { 
  number: number; 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  items: string[];
  note?: string;
}) => (
  <div className="bg-muted/30 rounded-xl border border-border p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="text-primary font-bold text-sm">{number}</span>
      </div>
      <Icon className="w-5 h-5 text-primary" />
      <h4 className="font-semibold text-foreground">{title}</h4>
    </div>
    <p className="text-sm text-muted-foreground mb-3">This section evaluates your ability to:</p>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    {note && (
      <p className="mt-3 text-sm text-muted-foreground italic">{note}</p>
    )}
  </div>
);

// Compensation tier card
const CompensationCard = ({ 
  amount, 
  requirements,
  highlight = false
}: { 
  amount: string; 
  requirements: string[];
  highlight?: boolean;
}) => (
  <div className={`rounded-xl border-2 p-5 ${highlight ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'}`}>
    <div className={`text-2xl font-bold mb-3 ${highlight ? 'text-primary' : 'text-foreground'}`}>
      {amount}
    </div>
    <ul className="space-y-2">
      {requirements.map((req, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
          <span>{req}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Tools = () => {
  useToolsVisit();
  
  return (
    <div className="space-y-8 pb-24">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Final Step</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Assessment Information
          </h1>
          
          <p className="text-lg md:text-xl text-white leading-relaxed">
            The assessment is the final module in onboarding for Project Beet 2.0. Its purpose is to evaluate whether you understand the core concepts and can apply professional judgment.
          </p>
        </div>
      </section>

      {/* What the Assessment Evaluates */}
      <SectionCard>
        <SectionHeader number={1} title="What the Assessment Evaluates" icon={Target} />
        
        <p className="text-foreground leading-relaxed mb-6">
          The assessment evaluates whether you understand:
        </p>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
            <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Core Concepts</p>
              <p className="text-sm text-muted-foreground">Human data and model training fundamentals</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
            <PenTool className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Prompt Design</p>
              <p className="text-sm text-muted-foreground">How to design high-quality Beet prompts</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
            <Scale className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Rubric Writing</p>
              <p className="text-sm text-muted-foreground">Rigorous, generalizable rubrics for complex reasoning</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-foreground font-medium">
            The assessment reflects the level of judgment required for real work on the project.
          </p>
        </div>
      </SectionCard>

      {/* Access the Assessment */}
      <SectionCard>
        <SectionHeader number={2} title="Accessing the Assessment" icon={Link2} />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <ExternalLink className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground mb-1">Assessment Link</p>
            <p className="text-sm text-muted-foreground">👉 [LINK TO THE ASSESSMENT HERE]</p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
          <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-foreground">
            You are allowed to reference this onboarding manual and all associated educational materials while completing the assessment.
          </p>
        </div>
      </SectionCard>

      {/* Assessment Structure */}
      <SectionCard>
        <SectionHeader number={3} title="Assessment Structure" icon={FileText} />
        
        <p className="text-foreground leading-relaxed mb-6">
          The assessment consists of three main modules:
        </p>
        
        <div className="grid gap-4">
          <ModuleCard
            number={1}
            title="General Understanding"
            icon={Brain}
            items={[
              "Grasp human data and model training concepts",
              "Understand evaluations and rubrics",
              "Know the goals and philosophy of Project Beet 2.0"
            ]}
            note="These questions are not designed to be tricky, but they do require careful reading and conceptual clarity."
          />
          
          <ModuleCard
            number={2}
            title="Prompt Writing"
            icon={PenTool}
            items={[
              "Reason about what makes a strong Beet 2.0 prompt",
              "Identify or design prompts that reflect real professional work",
              "Understand how prompts induce meaningful model failures"
            ]}
            note="This section tests judgment and reasoning, not memorization."
          />
          
          <ModuleCard
            number={3}
            title="Rubric Design"
            icon={Scale}
            items={[
              "Write or assess rubric criteria",
              "Reason about weights, categories, and generalizability",
              "Understand the constraints of judge-based evaluation"
            ]}
            note="This is often the most challenging part of the assessment. That is intentional."
          />
        </div>
      </SectionCard>

      {/* Before You Start */}
      <SectionCard className="border-2 border-warning/30 bg-gradient-to-br from-warning/5 to-card">
        <SectionHeader number={4} title="Before You Start (Please Read Carefully)" icon={AlertTriangle} />
        
        {/* Work Offline First */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Strong Recommendation: Work Offline First</h3>
          </div>
          
          <p className="text-foreground leading-relaxed mb-4">
            We strongly recommend completing the assessment offline first, using the provided template.
          </p>
          
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 mb-4">
            <p className="font-medium text-foreground mb-2">Why this matters:</p>
            <ul className="space-y-1">
              <li className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-warning">•</span>
                <span>The assessment platform may not reliably save progress</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-warning">•</span>
                <span>Your work is only saved upon final submission</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-warning">•</span>
                <span>This is a difficult assessment, and we do not want you to lose work due to technical issues</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="font-medium text-foreground mb-2">Best practice:</p>
            <ol className="space-y-1">
              {[
                "Download the assessment template",
                "Complete all sections offline",
                "Review your work carefully",
                "Paste your final answers into the platform",
                "Submit once everything is complete"
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Reference Materials */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Reference Materials</h3>
          </div>
          
          <p className="text-foreground leading-relaxed mb-4">
            Any reference files, links, or visuals needed for the assessment will be clearly labeled and explicitly linked within the assessment itself.
          </p>
          
          <p className="text-foreground leading-relaxed">
            Before starting, make sure you can access all linked materials. If you cannot access a required file or link, pause and use the support channels listed earlier.
          </p>
        </div>
      </SectionCard>

      {/* What the Assessment Is and Is Not */}
      <SectionCard>
        <SectionHeader number={5} title="What the Assessment Is — and Is Not" icon={Lightbulb} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              The assessment IS:
            </h4>
            <ul className="space-y-2">
              {[
                "Open-resource",
                "Reasoning-heavy",
                "Focused on professional judgment",
                "Representative of the real work on Project Beet 2.0"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-5 rounded-xl bg-muted/50 border border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              The assessment is NOT:
            </h4>
            <ul className="space-y-2">
              {[
                "A speed test",
                "A trivia quiz",
                "Something you can complete successfully without reading the material"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-muted-foreground">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
          <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-foreground">
            <span className="font-medium">Time expectation:</span> Most candidates spend several hours completing the assessment. This is normal.
          </p>
        </div>
      </SectionCard>

      {/* Compensation & Incentives */}
      <SectionCard>
        <SectionHeader number={6} title="Compensation & Incentives" icon={DollarSign} />
        
        <p className="text-foreground leading-relaxed mb-2">
          You may have already seen this information via email. We are restating it here for clarity.
        </p>
        
        <p className="text-muted-foreground mb-6">
          Before onboarding, there is a paid assessment and training step. Compensation depends on assessment performance and submission of an approved task after training.
        </p>

        <h4 className="font-semibold text-foreground mb-4">Compensation Structure</h4>
        
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <CompensationCard
            amount="$600 USD"
            requirements={[
              "You pass the assessment",
              "You score in the top 10% of passing candidates",
              "You submit an approved task post-training"
            ]}
            highlight
          />
          <CompensationCard
            amount="$200 USD"
            requirements={[
              "You pass the assessment",
              "You submit an approved task post-training"
            ]}
          />
        </div>

        <p className="text-sm text-muted-foreground italic">
          Additional details will be shared after assessment review.
        </p>
      </SectionCard>

      {/* What to Focus on Right Now */}
      <SectionCard>
        <SectionHeader number={7} title="What to Focus on Right Now" icon={Target} />
        
        <p className="text-foreground leading-relaxed mb-4">
          Before starting the assessment, make sure that:
        </p>
        
        <div className="grid gap-3">
          {[
            "You have read and understood this onboarding material",
            "You know where to find all reference resources",
            "You plan to complete the assessment offline first",
            "You are prepared to work carefully and deliberately"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-foreground">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-foreground">
            <span className="font-semibold">There are no trick questions.</span> Ambiguity appears only where it mirrors real professional work.
          </p>
        </div>
      </SectionCard>

      {/* Final Reminder */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3">Final Reminder</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Project Beet 2.0 focuses on the hardest parts of professional reasoning — not surface-level correctness. The assessment reflects that bar.
            </p>
            <p className="text-foreground font-medium">
              You are not expected to be perfect. You are expected to think carefully.
            </p>
            <p className="text-primary font-semibold mt-4">
              When you're ready, proceed to the assessment.
            </p>
          </div>
        </div>
      </section>

      <PageNavigation
        previousPage={{ title: "Getting Set Up", href: "/onboarding/workflow" }}
        nextPage={{ title: "Communication & Support", href: "/onboarding/communication" }}
      />
    </div>
  );
};

export default Tools;
