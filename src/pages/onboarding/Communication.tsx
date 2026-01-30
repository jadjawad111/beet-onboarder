import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageNavigation from "@/components/PageNavigation";
import { usePageVisit } from "@/hooks/usePageVisit";
import { 
  Compass, 
  FileText, 
  DollarSign, 
  UserCheck, 
  Gift, 
  Clock, 
  Calendar, 
  Phone, 
  RefreshCw,
  ChevronDown,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Info,
  Mail,
  MessageSquare,
  Headphones,
  Lock as LockIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem = ({ question, children }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown className={cn(
          "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[1000px]" : "max-h-0"
      )}>
        <div className="p-4 pt-0 text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

interface FAQSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "success";
}

const FAQSection = ({ icon: Icon, title, children, variant = "default" }: FAQSectionProps) => {
  const borderColor = variant === "warning" ? "border-warning/30" : variant === "success" ? "border-primary/30" : "border-border";
  const iconBg = variant === "warning" ? "bg-warning/10" : variant === "success" ? "bg-primary/10" : "bg-primary/10";
  const iconColor = variant === "warning" ? "text-warning" : variant === "success" ? "text-primary" : "text-primary";
  
  return (
    <section className={cn("rounded-2xl border-2 p-6 bg-card shadow-sm", borderColor)}>
      <div className="flex items-center gap-3 mb-5">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
};

interface ContactCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href?: string;
  isEmail?: boolean;
  variant?: "primary" | "default";
}

const ContactCard = ({ icon: Icon, title, description, href, isEmail, variant = "default" }: ContactCardProps) => {
  const content = (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-xl border-2 transition-all",
      variant === "primary" 
        ? "bg-primary/5 border-primary/30 hover:border-primary/50" 
        : "bg-card border-border hover:border-primary/30",
      href && "cursor-pointer hover:shadow-md"
    )}>
      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {href && (
          <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary">
            {isEmail ? href : "Open Link"}
            <ExternalLink className="h-3 w-3" />
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={isEmail ? `mailto:${href}` : href} target={isEmail ? undefined : "_blank"} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
};

const Communication = () => {
  usePageVisit("onboarding-communication-visited");
  
  return (
    <div className="max-w-4xl pb-24">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 mb-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-primary text-sm font-medium mb-4">
            <Phone className="h-4 w-4" />
            Support & FAQs
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Communication & Support
          </h1>
          <p className="text-white text-lg max-w-2xl">
            This FAQ covers pay, eligibility, logistics, and operations. For questions about prompt quality, rubrics, or judgment, refer to the training modules.
          </p>
        </div>
      </div>

      {/* Primary Contact Section - FRONT AND CENTER */}
      <section className="rounded-2xl border-2 border-primary/30 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Headphones className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Need Help? Contact Us</h2>
            <p className="text-muted-foreground">Use these official channels for support</p>
          </div>
        </div>
        
        {/* Official Email - Prominent at top */}
        <a 
          href="mailto:projectbeet@joinhandshake.com"
          className="flex items-center gap-4 p-4 mb-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:shadow-lg cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground">Official Email</h3>
            <p className="text-sm text-muted-foreground">General inquiries and escalations</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-primary font-semibold">
            projectbeet@joinhandshake.com
            <ExternalLink className="h-4 w-4" />
          </div>
        </a>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard 
            icon={AlertTriangle}
            title="Payment Dispute Form"
            description="For missing payments or payout issues"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfu4Se-oUxcjWk82Ro7gGbzVy5HX4lIdczadNtAQgZGewBFxQ/viewform"
          />
          <ContactCard 
            icon={MessageSquare}
            title="Slack Channel"
            description="Community for questions and updates"
          />
          <ContactCard 
            icon={FileText}
            title="Fellow Support Guide"
            description="Comprehensive help documentation"
            href="https://support.joinhandshake.com/hc/en-us/articles/32263794676375-MOVE-Fellowship-Support-Guide"
          />
          <ContactCard 
            icon={DollarSign}
            title="Payment Policy"
            description="Official payment terms and schedules"
            href="https://support.joinhandshake.com/hc/en-us/articles/33614619791767-Handshake-AI-Fellowship-Program-Payment-Policy"
          />
          <ContactCard 
            icon={Calendar}
            title="Payment Tracker"
            description="Check pending and past payments"
            href="https://docs.google.com/document/d/1vbfwmvoFPCcecjI-m-EHMwAxujiN2tlmO81uDWBEBQM/edit?tab=t.0"
          />
        </div>
      </section>

      <div className="space-y-6">
        {/* Work Authorization */}
        <FAQSection icon={FileText} title="Work Authorization (CPT / OPT / Eligibility)">
          <FAQItem question="What are the work authorization requirements?">
            <p className="mb-3">To be eligible:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-3">
              <li>You must be based in the United States</li>
              <li>You must have valid U.S. work authorization</li>
              <li>A Social Security Number (SSN) or Taxpayer Identification Number (TIN) is required to:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Complete onboarding</li>
                  <li>Receive payment</li>
                </ul>
              </li>
            </ul>
            <p className="text-sm">If you do not yet have an SSN or TIN, you may wait until you receive one to complete onboarding.</p>
          </FAQItem>
          
          <FAQItem question="Who do I contact for F-1 / CPT / OPT support?">
            <p className="mb-3">Contact <strong className="text-foreground">Handshake AI Fellow Support</strong> via the Contact Support button in the platform.</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
              <li>Your DSO may request an offer letter</li>
              <li>Be prepared to provide ideal start and end dates</li>
              <li>We recommend contacting your DSO first to confirm requirements</li>
            </ul>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground"><strong>Important:</strong> We are currently unable to support STEM OPT work authorization.</p>
            </div>
          </FAQItem>
        </FAQSection>

        {/* Payments */}
        <FAQSection icon={DollarSign} title="Payments — Start Here (Most Common Questions)" variant="warning">
          <FAQItem question="When do I get paid? (The #1 confusion)">
            <p className="mb-3">Payments are issued weekly, based on work submitted the prior week.</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
              <li>Work is tracked <strong className="text-foreground">Monday–Sunday (PT)</strong></li>
              <li>Payments are issued <strong className="text-foreground">Wednesday evenings (~6pm PT)</strong></li>
            </ul>
            <div className="p-3 rounded-lg bg-muted/50 border border-border mb-4">
              <p className="text-sm"><strong className="text-foreground">Example:</strong> You submit work between Mon 11/10 – Sun 11/17. Payment is issued by Wed 11/19.</p>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">If you start a task before Sunday but submit after, it counts toward the next week.</p>
            </div>
          </FAQItem>
          
          <FAQItem question="Why don't I see hours in Deel or Stripe?">
            <p className="mb-3">This is normal.</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
              <li>Time does not appear until payment is issued</li>
              <li>Deel / Stripe will show $0 until Wednesday payouts are processed</li>
            </ul>
            <p className="text-sm">You can check pending payments using the <a href="https://docs.google.com/document/d/1vbfwmvoFPCcecjI-m-EHMwAxujiN2tlmO81uDWBEBQM/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">weekly payment tracker</a>.</p>
          </FAQItem>
          
          <FAQItem question="What if I don't see my payment by Thursday?">
            <p className="mb-3">If payment has not appeared after Wednesday 6pm PT:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
              <li>Submit a <a href="https://docs.google.com/forms/d/e/1FAIpQLSfu4Se-oUxcjWk82Ro7gGbzVy5HX4lIdczadNtAQgZGewBFxQ/viewform" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Payment Dispute Form</a></li>
              <li>Support will investigate and resolve the issue</li>
            </ul>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">Do not submit a dispute before Wednesday evening — it is usually just processing.</p>
            </div>
          </FAQItem>
        </FAQSection>

        {/* Becoming an Official Fellow */}
        <FAQSection icon={UserCheck} title="Becoming an Official Beet Fellow" variant="success">
          <FAQItem question="What makes me an 'official' Beet Fellow?">
            <p className="mb-3">You become an official Fellow once you:</p>
            <ul className="space-y-2 ml-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Complete and pass the assessment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Are allocated to Project Beet</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Attend the Live Kickoff Call</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Sign the Project Beet contract</span>
              </li>
            </ul>
          </FAQItem>
          
          <FAQItem question="Is assessment and training time paid?">
            <p className="mb-3"><strong className="text-foreground">Yes</strong> — assessment and onboarding time are paid via a one-time onboarding bonus.</p>
            <p className="text-sm">Only time spent inside the annotation dashboard is paid afterward.</p>
          </FAQItem>
        </FAQSection>

        {/* Onboarding Bonus */}
        <FAQSection icon={Gift} title="Onboarding Bonus & First Paycheck">
          <FAQItem question="When will I receive my onboarding bonus?">
            <p className="mb-3">Your onboarding bonus is paid:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-3">
              <li>The Wednesday after your contract is signed</li>
              <li>By approximately 6pm PT</li>
            </ul>
            <p className="text-sm">The bonus is contingent on at least one task being reviewed and approved.</p>
          </FAQItem>
          
          <FAQItem question="Why might my onboarding bonus take two payment cycles?">
            <p className="mb-3">This can happen if:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
              <li>There was a contract issue (Deel / Stripe)</li>
              <li>Your task was approved late Sunday or Monday</li>
              <li>A bank transfer failed and rolled to the next week</li>
            </ul>
            <p className="text-sm">If you haven't received it by the second Wednesday, submit a <a href="https://docs.google.com/forms/d/e/1FAIpQLSfu4Se-oUxcjWk82Ro7gGbzVy5HX4lIdczadNtAQgZGewBFxQ/viewform" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">payment dispute</a>.</p>
          </FAQItem>
        </FAQSection>

        {/* Time Tracking */}
        <FAQSection icon={Clock} title="Time Tracking & Pay Caps">
          <FAQItem question="How is time tracked?">
            <ul className="list-disc list-inside space-y-1">
              <li>Time is automatically tracked in the annotation platform</li>
              <li>You do not need to log time manually</li>
            </ul>
          </FAQItem>
          
          <FAQItem question="What is the time cap per task?">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">The time cap per task is currently being determined. We will update this section when we have confirmation.</p>
            </div>
          </FAQItem>
          
          <FAQItem question="Can I abandon a task to reset the timer?">
            <p className="mb-3"><strong className="text-foreground">No.</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Revisions are part of the same task</li>
              <li>Starting a new task to reset the timer is not allowed</li>
              <li>We prioritize quality and integrity</li>
            </ul>
          </FAQItem>
          
          <FAQItem question="Do I get paid if my task is sent back or rejected?">
            <p><strong className="text-foreground">Yes</strong> — as long as you submit the task, time is paid (up to the cap).</p>
          </FAQItem>
        </FAQSection>

        {/* Payment Schedule */}
        <FAQSection icon={Calendar} title="Payment Schedule & Rules">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground"><strong>Work week:</strong> Monday–Sunday (PT)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground"><strong>Payouts:</strong> Wednesday evenings</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">No live hours dashboard (yet)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Canvas modules and optional meetings are not paid</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Only explicitly designated mandatory training may be paid</span>
              </li>
            </ul>
          </div>
        </FAQSection>

        {/* Deel vs Stripe */}
        <FAQSection icon={RefreshCw} title="Deel vs Stripe (Important Note)">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="mb-4 text-foreground">Handshake is currently transitioning from Deel to Stripe.</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-4 text-muted-foreground">
              <li>Net new Fellows are mostly on Stripe</li>
              <li>Existing Fellows may still be on Deel</li>
              <li>Full migration will occur over the next ~3 months</li>
            </ul>
            <p className="text-sm text-muted-foreground">If something doesn't match your situation exactly: contact support, raise a ticket, or use Slack once added.</p>
          </div>
        </FAQSection>

        {/* Getting Into Production - LOCKED */}
        <section className="relative rounded-2xl border-2 border-border p-6 bg-card shadow-sm opacity-60">
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <LockIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">Coming Soon</p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">This section is coming soon.</p>
          </div>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Compass className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Getting Into Production</h2>
          </div>
          <div className="space-y-3 blur-sm pointer-events-none select-none">
            <div className="h-16 bg-muted/30 rounded-xl" />
            <div className="h-16 bg-muted/30 rounded-xl" />
          </div>
        </section>
      </div>

      {/* Footer Contact Section */}
      <section className="mt-12 pt-8 border-t-2 border-border">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">Quick Links & Support</h2>
          <p className="text-muted-foreground">All the resources you need in one place</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfu4Se-oUxcjWk82Ro7gGbzVy5HX4lIdczadNtAQgZGewBFxQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border text-foreground hover:bg-muted/50 transition-colors font-medium text-sm"
          >
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            Payment Dispute
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
          <a
            href="mailto:projectbeet@joinhandshake.com"
            className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border text-foreground hover:bg-muted/50 transition-colors font-medium text-sm"
          >
            <Mail className="h-4 w-4 flex-shrink-0" />
            Email Support
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
          <a
            href="https://docs.google.com/document/d/1vbfwmvoFPCcecjI-m-EHMwAxujiN2tlmO81uDWBEBQM/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border text-foreground hover:bg-muted/50 transition-colors font-medium text-sm"
          >
            <Calendar className="h-4 w-4 flex-shrink-0" />
            Payment Tracker
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
          <a
            href="https://support.joinhandshake.com/hc/en-us/articles/32263794676375-MOVE-Fellowship-Support-Guide"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border text-foreground hover:bg-muted/50 transition-colors font-medium text-sm"
          >
            <Headphones className="h-4 w-4 flex-shrink-0" />
            Fellow Support
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
          <a
            href="https://support.joinhandshake.com/hc/en-us/articles/33614619791767-Handshake-AI-Fellowship-Program-Payment-Policy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border text-foreground hover:bg-muted/50 transition-colors font-medium text-sm"
          >
            <DollarSign className="h-4 w-4 flex-shrink-0" />
            Payment Policy
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border text-muted-foreground font-medium text-sm">
            <MessageSquare className="h-4 w-4 flex-shrink-0" />
            Slack Channel
          </div>
        </div>
      </section>

      <PageNavigation
        previousPage={{ title: "Assessment Information", href: "/onboarding/tools" }}
        nextPage={{ title: "Beet 2.0 Education", href: "/education" }}
      />
    </div>
  );
};

export default Communication;
