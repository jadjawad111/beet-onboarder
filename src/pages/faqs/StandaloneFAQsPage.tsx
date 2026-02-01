import { HelpCircle, Mail, MessageSquare, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/layout/ContentHeader";

const faqs = [
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

const StandaloneFAQsPage = () => {
  return (
    <div className="min-h-screen">
      <ContentHeader 
        title="Frequently Asked Questions"
        subtitle="Common questions about Project Beet 2.0"
      />
      
      <div className="px-6 lg:px-10 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Still Have Questions?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://discord.gg/GbtUVawyrv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors block"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Discord</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Once you have access, ask questions in the designated channel. The community and team are responsive.
                </p>
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
