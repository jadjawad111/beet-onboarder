import { 
  Settings, Mail, MessageSquare, CheckCircle2, Lightbulb, AlertTriangle,
  Users, UserPlus, Video, ExternalLink, Clock, Target, Rocket, ArrowRight
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageNavigation from "@/components/PageNavigation";
import { cn } from "@/lib/utils";
import { usePageVisit } from "@/hooks/usePageVisit";

// Track page visit
const useWorkflowVisit = () => usePageVisit("onboarding-workflow-visited");

// Section Card wrapper matching Welcome/Access page style
const SectionCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn(
    "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm",
    className
  )}>
    {children}
  </div>
);

// Section Header matching Welcome/Access page style
const SectionHeader = ({ 
  icon: Icon, 
  title, 
  number 
}: { 
  icon: React.ElementType; 
  title: string;
  number: string;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="relative">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-primary flex items-center justify-center">
        <span className="text-xs font-bold text-primary">{number}</span>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
  </div>
);

// Key Takeaways Component
const KeyTakeaways = ({ items }: { items: string[] }) => (
  <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 mt-6">
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="w-5 h-5 text-amber-500" />
      <h4 className="font-bold text-slate-900 dark:text-white">Key Takeaways</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Onboarding Path Card
const PathCard = ({ 
  icon: Icon, 
  title, 
  items,
  videoLabel,
  highlight
}: { 
  icon: React.ElementType; 
  title: string; 
  items: string[];
  videoLabel: string;
  highlight?: boolean;
}) => (
  <div className={cn(
    "rounded-xl border p-5 transition-all duration-300",
    highlight 
      ? "border-primary/40 bg-primary/5" 
      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
  )}>
    <div className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center mb-4 shadow-md",
      highlight 
        ? "bg-gradient-to-br from-primary to-secondary" 
        : "bg-gradient-to-br from-slate-500 to-slate-600"
    )}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h4 className="font-bold mb-3 text-slate-900 dark:text-white">{title}</h4>
    <ul className="space-y-2 mb-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
    <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
      <Video className="w-4 h-4 text-red-500 flex-shrink-0" />
      <span className="text-sm text-slate-600 dark:text-slate-300">{videoLabel}</span>
      <span className="text-xs text-slate-400 ml-auto">(Link embedded)</span>
    </div>
  </div>
);

const Workflow = () => {
  useWorkflowVisit();
  
  return (
    <div className="pb-24">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,211,216,0.3),transparent_50%)]" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-secondary/30 blur-xl" />
        
        <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Setup Guide</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Getting Set Up
          </h1>
          
          <p className="text-xl text-white/95 max-w-3xl leading-relaxed">
            This section explains what happens next, what you need to do right now, 
            and what can safely wait until later.
          </p>
        </div>
      </div>

      {/* Goal Statement */}
      <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              The Goal Here Is Simple
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Make sure you are correctly set up <strong>before taking the assessment</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: How You'll Access */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Mail} title="How You'll Access Project Beet 2.0" number="1" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
          To begin onboarding, you should have received an email from Handshake inviting you 
          to onboard onto Project Beet 2.0.
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          That email will redirect you directly to the assessment.
        </p>

        {/* Important Warning */}
        <div className="rounded-xl border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Important</h4>
              <p className="text-amber-800 dark:text-amber-200 mb-3">
                <strong>Do not take the assessment</strong> until you have read through this entire 
                instruction manual and educational material.
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                The assessment is designed to test your understanding of the concepts explained here. 
                Skipping this material significantly reduces your chances of passing.
              </p>
            </div>
          </div>
        </div>

        <KeyTakeaways items={[
          "You'll receive an email from Handshake to begin onboarding",
          "The email redirects you to the assessment",
          "Do NOT take the assessment until you've completed all educational material"
        ]} />
      </SectionCard>

      {/* Section 2: Onboarding Paths */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Users} title="Onboarding Paths" number="2" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Your onboarding flow depends on whether you are new to Handshake projects or an existing fellow.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <PathCard
            icon={UserPlus}
            title="For Net New Fellows"
            items={[
              "You will follow our standard onboarding process",
              "This includes identity verification, agreements, and initial setup",
              "Once complete, you will be directed to the Project Beet 2.0 assessment"
            ]}
            videoLabel="A short Loom video walking through this process"
            highlight
          />
          <PathCard
            icon={Users}
            title="For Existing Fellows"
            items={[
              "You will receive an email from our Growth team",
              "That email will invite you directly to Project Beet 2.0",
              "The assessment will already be available for you to take"
            ]}
            videoLabel="A Loom video specific to existing fellows"
          />
        </div>

        <KeyTakeaways items={[
          "New fellows: Complete standard onboarding first, then take assessment",
          "Existing fellows: Email invite leads directly to the assessment",
          "Both paths converge at the same assessment"
        ]} />
      </SectionCard>

      {/* Section 3: Communication & Support */}
      <SectionCard className="mb-8">
        <SectionHeader icon={MessageSquare} title="Communication & Support" number="3" />

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* Slack */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-md">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">
              Slack <span className="text-xs font-normal text-primary ml-2">(Primary Channel)</span>
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Slack is the main channel for communication on Project Beet.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                You will be invited to Slack after:
              </p>
              <ul className="space-y-1">
                {["Completing general onboarding", "Signing the required contract"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Project updates, clarifications, and announcements will be shared there.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm font-medium text-primary">
                Make sure you have access to Slack before proceeding.
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-md">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Email Support</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              For all support inquiries, you can email:
            </p>
            <a 
              href="mailto:projectbeet@joinhandshake.com" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-primary font-medium text-sm hover:border-primary/50 transition-colors"
            >
              projectbeet@joinhandshake.com
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 mb-4">
              This inbox is monitored by both the Project Beet team and a dedicated support team.
            </p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Use email for:</p>
            <ul className="space-y-1">
              {["Access issues", "Onboarding blockers", "Assessment-related technical problems"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <KeyTakeaways items={[
          "Slack is the primary communication channel for Project Beet",
          "You'll get Slack access after completing onboarding and signing contracts",
          "Email projectbeet@joinhandshake.com for access issues or technical problems"
        ]} />
      </SectionCard>

      {/* Section 4: Where You Are Right Now */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Rocket} title="Where You Are Right Now" number="4" />

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 mb-6">
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            If you look at the <strong className="text-slate-900 dark:text-white">"Your Journey"</strong> section 
            on the homepage, you are currently at <strong className="text-primary">Step 1</strong>.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            This step is intentionally focused on context and preparation.
          </p>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The process will move forward in stages:
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">1</span>
            </div>
            <span className="text-slate-700 dark:text-slate-300">You complete onboarding and the assessment</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">2</span>
            </div>
            <span className="text-slate-700 dark:text-slate-300">Your submission is reviewed</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">3</span>
            </div>
            <div>
              <span className="text-slate-900 dark:text-white font-medium">If you pass, you will receive much more detailed information about:</span>
              <ul className="mt-2 space-y-1 ml-4">
                {["Project structure", "Tasking", "Expectations", "Operational details required to succeed"].map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 list-disc">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            You do not need to understand everything about the project yet.
          </p>
        </div>

        <KeyTakeaways items={[
          "You are currently at Step 1 — focused on context and preparation",
          "After passing the assessment, you'll receive detailed project information",
          "Don't worry about understanding everything yet — that comes later"
        ]} />
      </SectionCard>

      {/* Section 5: What Matters Right Now */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Target} title="What Matters Right Now" number="5" />

        <div className="rounded-xl border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="font-bold text-amber-900 dark:text-amber-100">Very Important</p>
          </div>
        </div>

        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Before moving on, make sure you focus on <strong className="text-slate-900 dark:text-white">only these three things</strong>:
        </p>

        <div className="grid gap-4 mb-6">
          {[
            { num: "1", text: "Confirm you have access to Slack", icon: MessageSquare },
            { num: "2", text: "Read and digest all educational material in this onboarding", icon: Lightbulb },
            { num: "3", text: "Access and complete the assessment", icon: CheckCircle2 },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">{item.num}</span>
              </div>
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-slate-900 dark:text-white">{item.text}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg font-medium text-slate-900 dark:text-white mb-4">That's it.</p>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 mb-6">
          <p className="text-slate-700 dark:text-slate-300 mb-3">
            If you pass the assessment, you will receive:
          </p>
          <ul className="space-y-2">
            {["Significantly more detail", "Operational guidance", "Project-specific expectations"].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="font-medium text-slate-900 dark:text-white">
            Until then, your only job is to prepare properly and complete the assessment thoughtfully.
          </p>
        </div>

        <KeyTakeaways items={[
          "Focus on just 3 things: Slack access, reading materials, and the assessment",
          "More details and guidance come after you pass the assessment",
          "Your only job right now is to prepare and complete the assessment thoughtfully"
        ]} />
      </SectionCard>

      {/* Final Reminder */}
      <div className="rounded-2xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              Final Reminder
            </h2>
            <p className="text-amber-800 dark:text-amber-200 mb-4">
              <strong>Project Beet 2.0 is intentionally challenging.</strong> The assessment reflects that.
            </p>
            <p className="text-amber-800 dark:text-amber-200 mb-4">
              Taking the time to read and understand this material is not optional — 
              <strong> it is part of the evaluation</strong>.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-100 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-700">
              <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="font-medium text-amber-900 dark:text-amber-100">
                Once you're ready, proceed to the assessment.
              </span>
            </div>
          </div>
        </div>
      </div>

      <PageNavigation
        previousPage={{ title: "Context Sharing", href: "/onboarding/access" }}
        nextPage={{ title: "Assessment Information", href: "/onboarding/tools" }}
      />
    </div>
  );
};

export default Workflow;
