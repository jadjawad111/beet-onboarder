import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, MessageCircle, Zap, Shield, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";

const faqCategories = [
  {
    title: "Getting Started",
    description: "Common questions about beginning your work on Project Beet",
    icon: Zap,
    href: "/faqs/category-1",
    questionCount: 12,
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    title: "Workflow & Processes",
    description: "Questions about daily workflows, submissions, and processes",
    icon: MessageCircle,
    href: "/faqs/category-2",
    questionCount: 15,
    gradient: "from-secondary/20 to-primary/20",
  },
  {
    title: "Technical Support",
    description: "Technical questions and troubleshooting common issues",
    icon: Shield,
    href: "/faqs/category-3",
    questionCount: 10,
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    title: "Quality & Feedback",
    description: "Questions about quality standards, reviews, and feedback",
    icon: Sparkles,
    href: "/faqs/category-4",
    questionCount: 8,
    gradient: "from-secondary/20 to-primary/20",
  },
];

const FAQIndex = () => {
  const totalQuestions = faqCategories.reduce((acc, cat) => acc + cat.questionCount, 0);
  
  return (
    <div className="space-y-8">
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beet */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 opacity-20">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-20 md:h-20 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Help Center</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Frequently Asked
            <span className="block text-secondary">Questions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Find answers to common questions about Project Beet. 
            Browse by category or search for specific topics.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: "Categories", value: faqCategories.length.toString(), sublabel: "topics covered" },
          { label: "Questions", value: totalQuestions.toString(), sublabel: "answered" },
          { label: "Updated", value: "Daily", sublabel: "new content" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="text-center p-4 md:p-5 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border/50 shadow-sm"
          >
            <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">{stat.value}</div>
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
          </div>
        ))}
      </section>

      {/* FAQ Categories */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Browse by Category</h2>
            <p className="text-sm text-muted-foreground">Select a category to view related questions</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                to={category.href}
                className="group relative flex flex-col p-6 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Question count badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                  {category.questionCount} Questions
                </div>
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">
                  {category.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  View FAQs
                  <ArrowRight className="h-4 w-4" />
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-secondary/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={beetIcon} alt="" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Can't find what you're looking for?</h3>
              <p className="text-sm text-muted-foreground">Reach out to the team for additional support</p>
            </div>
          </div>
          
          <Link
            to="/onboarding/communication"
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Get Support
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQIndex;
