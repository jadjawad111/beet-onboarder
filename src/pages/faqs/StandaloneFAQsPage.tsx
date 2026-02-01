import { HelpCircle, Mail, MessageSquare, ExternalLink, FileText, DollarSign, Clock, UserCheck, AlertTriangle } from "lucide-react";
import ContentHeader from "@/components/layout/ContentHeader";

const DISCORD_LINK = "https://discord.gg/GbtUVawyrv";

const primaryResources = [
  {
    name: "Official Email",
    description: "General inquiries and escalations",
    link: "mailto:projectbeet@joinhandshake.com",
    linkText: "projectbeet@joinhandshake.com"
  },
  {
    name: "Payment Dispute Form",
    description: "For missing payments or payout issues",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfu4Se-oUxcjWk82Ro7gGbzVy5HX4lIdczadNtAQgZGewBFxQ/viewform",
    linkText: "Submit Form"
  },
  {
    name: "Fellow Support Guide",
    description: "Comprehensive help documentation",
    link: "https://support.joinhandshake.com/hc/en-us/articles/32263794676375-MOVE-Fellowship-Support-Guide",
    linkText: "View Guide"
  },
  {
    name: "Payment Policy",
    description: "Official payment terms and schedules",
    link: "https://support.joinhandshake.com/hc/en-us/articles/33614619791767-Handshake-AI-Fellowship-Program-Payment-Policy",
    linkText: "View Policy"
  },
  {
    name: "Payment Tracker",
    description: "Check pending and past payments",
    link: "https://docs.google.com/document/d/1vbfwmvoFPCcecjI-m-EHMwAxujiN2tlmO81uDWBEBQM/edit?tab=t.0",
    linkText: "View Tracker"
  },
];

const workAuthFaqs = [
  {
    q: "What are the work authorization requirements?",
    a: "You must be based in the United States with valid U.S. work authorization. A Social Security Number (SSN) or Taxpayer Identification Number (TIN) is required to complete onboarding and receive payment. If you do not yet have an SSN or TIN, you may wait until you receive one to complete onboarding."
  },
  {
    q: "Who do I contact for F-1 / CPT / OPT support?",
    a: "Contact Handshake AI Fellow Support via the Contact Support button in the platform. Your DSO may request an offer letter — be prepared to provide ideal start and end dates. We recommend contacting your DSO first to confirm requirements."
  },
];

const paymentFaqs = [
  {
    q: "When do I get paid?",
    a: "Payments are issued weekly, based on work submitted the prior week. Work is tracked Monday–Sunday (PT), and payments are issued Wednesday evenings (~6pm PT). Example: You submit work between Mon 11/10 – Sun 11/17. Payment is issued by Wed 11/19. If you start a task before Sunday but submit after, it counts toward the next week."
  },
  {
    q: "Why don't I see hours in Deel or Stripe?",
    a: "This is normal. Time does not appear until payment is issued. Deel / Stripe will show $0 until Wednesday payouts are processed. You can check pending payments using the weekly payment tracker."
  },
  {
    q: "What if I don't see my payment by Thursday?",
    a: "Submit a Payment Dispute Form (linked above). Support will investigate and resolve the issue. Do not submit a dispute before Wednesday evening — it is usually just processing."
  },
];

const fellowFaqs = [
  {
    q: "What makes me an 'official' Beet Fellow?",
    a: "You become an official Fellow once you: (1) Complete and pass the assessment, (2) Are allocated to Project Beet, (3) Attend the Live Kickoff Call, and (4) Sign the Project Beet contract."
  },
  {
    q: "Is assessment and training time paid?",
    a: "Yes — assessment and onboarding time are paid via a one-time onboarding bonus. Only time spent inside the annotation dashboard is paid afterward."
  },
  {
    q: "When will I receive my onboarding bonus?",
    a: "The Wednesday after your contract is signed, by approximately 6pm PT. The bonus is contingent on at least one task being reviewed and approved."
  },
  {
    q: "Why might my onboarding bonus take two payment cycles?",
    a: "This can happen if: there was a contract issue (Deel / Stripe), your task was approved late Sunday or Monday, or a bank transfer failed and rolled to the next week. If you haven't received it by the second Wednesday, submit a payment dispute."
  },
];

const timeTrackingFaqs = [
  {
    q: "How is time tracked?",
    a: "Time is automatically tracked in the annotation platform. You do not need to log time manually."
  },
  {
    q: "What is the time cap per task?",
    a: "The time cap per task is currently being determined. We will update this section when we have confirmation."
  },
  {
    q: "Can I abandon a task to reset the timer?",
    a: "No. Revisions are part of the same task. Starting a new task to reset the timer is not allowed. We prioritize quality and integrity."
  },
  {
    q: "Do I get paid if my task is sent back or rejected?",
    a: "Yes — as long as you submit the task, time is paid (up to the cap)."
  },
];

const paymentScheduleFaqs = [
  {
    q: "What is the payment schedule?",
    a: "Work week runs Monday–Sunday (PT). Payouts are issued Wednesday evenings. There is no live hours dashboard yet. Canvas modules and optional meetings are not paid — only explicitly designated mandatory training may be paid."
  },
  {
    q: "What's the difference between Deel and Stripe?",
    a: "Handshake is currently transitioning from Deel to Stripe. Net new Fellows are mostly on Stripe, while existing Fellows may still be on Deel. Full migration will occur over the next ~3 months. If something doesn't match your situation, contact support, raise a ticket, or use Discord once added."
  },
];

const generalFaqs = [
  {
    q: "Do I need prior experience with AI to participate?",
    a: "No specific AI experience is required. What matters is your professional expertise and ability to think critically about complex tasks."
  },
  {
    q: "How long does the assessment take?",
    a: "Most candidates spend several hours. This is normal — it's designed to test deep understanding, not speed."
  },
  {
    q: "Can I use reference materials during the assessment?",
    a: "Yes! The assessment is open-resource. You can reference this onboarding manual and all educational materials."
  },
  {
    q: "What happens if I don't pass the assessment?",
    a: "You may have the opportunity to retake it after a waiting period. Focus on thoroughly understanding the material before attempting."
  },
  {
    q: "How do I get access to Discord?",
    a: "You'll be invited to Discord after completing general onboarding and signing the required contract."
  },
];

// Helper function to highlight Discord mentions and make them clickable
const highlightDiscord = (text: string) => {
  const parts = text.split(/(Discord)/gi);
  return parts.map((part, index) => {
    if (part.toLowerCase() === 'discord') {
      return (
        <a
          key={index}
          href={DISCORD_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          Discord
        </a>
      );
    }
    return part;
  });
};

const FAQSection = ({ 
  title, 
  icon: Icon, 
  faqs 
}: { 
  title: string; 
  icon: React.ElementType; 
  faqs: { q: string; a: string }[] 
}) => (
  <section>
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-semibold text-foreground mb-2">{highlightDiscord(faq.q)}</h3>
          <p className="text-sm text-muted-foreground">{highlightDiscord(faq.a)}</p>
        </div>
      ))}
    </div>
  </section>
);

const StandaloneFAQsPage = () => {
  return (
    <div className="min-h-screen">
      <ContentHeader 
        title="Frequently Asked Questions"
        subtitle="Common questions about Project Beet 2.0"
      />
      
      <div className="px-6 lg:px-10 py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Primary Resources */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Primary Resources</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Discord Card - Featured */}
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors group sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary">
                    Discord Channel
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Community for questions and updates</p>
                <span className="text-sm text-primary font-semibold flex items-center gap-1">
                  discord.gg/GbtUVawyrv
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
              
              {primaryResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
                >
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    {resource.linkText}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* STEM OPT Warning */}
          <div className="flex gap-4 p-4 rounded-xl border-2 border-warning/40 bg-warning/5">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">STEM OPT Notice</h3>
              <p className="text-sm text-muted-foreground">
                We are currently unable to support STEM OPT work authorization.
              </p>
            </div>
          </div>

          {/* Work Authorization */}
          <FAQSection title="Work Authorization (CPT / OPT / Eligibility)" icon={UserCheck} faqs={workAuthFaqs} />

          {/* Payments */}
          <FAQSection title="Payments — Most Common Questions" icon={DollarSign} faqs={paymentFaqs} />

          {/* Becoming a Fellow */}
          <FAQSection title="Becoming an Official Beet Fellow" icon={UserCheck} faqs={fellowFaqs} />

          {/* Time Tracking */}
          <FAQSection title="Time Tracking & Pay Caps" icon={Clock} faqs={timeTrackingFaqs} />

          {/* Payment Schedule */}
          <FAQSection title="Payment Schedule & Rules" icon={DollarSign} faqs={paymentScheduleFaqs} />

          {/* General FAQs */}
          <FAQSection title="General Questions" icon={HelpCircle} faqs={generalFaqs} />

          {/* Still Have Questions */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Still Have Questions?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors block"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary">Discord</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Once you have access, ask questions in the designated channel. The community and team are responsive.
                </p>
                <span className="text-sm text-primary font-semibold flex items-center gap-1">
                  discord.gg/GbtUVawyrv
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
              <div className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Email</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  For urgent issues or access problems:
                </p>
                <a 
                  href="mailto:projectbeet@joinhandshake.com" 
                  className="text-primary font-medium text-sm hover:underline"
                >
                  projectbeet@joinhandshake.com
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StandaloneFAQsPage;
