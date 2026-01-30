import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, AlertTriangle, BookOpen, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import BeetProgressTracker from "@/components/prompt-writing/BeetProgressTracker";
import beetIcon from "@/assets/beet-icon.png";

const Module1 = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Progress Tracker */}
      <BeetProgressTracker />

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION: Premium Module Header
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 mb-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beet */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 opacity-25">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-20 md:h-20 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Step 1 of 3</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            The "Knowledge Work"
            <span className="block text-secondary">Gap</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl">
            Understanding why AI models struggle with professional work — and how Beet prompts help solve this.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Foundation Concepts</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-8">
        
        {/* Essential Context Card */}
        <article className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 md:p-10 shadow-lg">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-semibold uppercase tracking-wide">
              Essential Context
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
            AI models have become exceptionally good at verifiable, discrete tasks:
          </p>
          
          <ul className="space-y-3 mb-8 ml-1">
            {["Fact-checking", "Simple coding", "Summarizing short texts"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
            However, real-world professional work involves <strong className="text-primary">long-horizon reasoning</strong> and <strong className="text-primary">nuanced taste</strong> — areas where current models are far from succeeding.
          </p>
          
          <p className="text-lg text-foreground leading-relaxed mb-6">
            Professional domains (like Law, Medicine, Finance, and Engineering) don't just require "answers"; they require navigating complex sequences of logic, managing conflicting constraints, and interpreting messy input files with a specific professional judgment.
          </p>
          
          <div className="mt-8 p-5 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              In this section, we are tackling the critical first step of solving this problem: <strong className="text-primary">Writing realistic "Beet" Prompts.</strong>
            </p>
          </div>
        </article>

        {/* The Gap Visualization - Enhanced */}
        <div className="rounded-2xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-muted/50 to-transparent">
            <h2 className="text-lg font-bold text-foreground">The Gap at a Glance</h2>
            <p className="text-sm text-muted-foreground">AI capabilities vs. professional requirements</p>
          </div>
          
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* AI Does Well */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">What AI Does Well</h3>
                  <p className="text-xs text-muted-foreground">Discrete, verifiable tasks</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["Fact-checking", "Simple coding", "Summarizing"].map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Reality */}
            <div className="p-6 bg-gradient-to-br from-warning/5 to-transparent">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Professional Reality</h3>
                  <p className="text-xs text-muted-foreground">Complex judgment & expertise</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Long-horizon reasoning",
                  "Nuanced taste",
                  "Conflicting constraints",
                  "Multi-step logic",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 rounded-lg bg-warning/5 border border-warning/10">
                    <div className="w-6 h-6 rounded-full bg-warning/15 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 70% Failure Rule - Enhanced */}
        <div className="rounded-2xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-br from-[hsl(var(--beet-light))] to-transparent">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--beet))]/20 to-[hsl(var(--beet))]/10 flex items-center justify-center flex-shrink-0">
                <img src={beetIcon} alt="" className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  The <span className="text-[hsl(var(--beet))]">"70% Failure"</span> Rule
                </h2>
                <div className="space-y-4">
                  <p className="text-base text-foreground leading-relaxed">
                    By generating prompts that induce failure modes and are representative of real world tasks, we create the high-value training data necessary to teach AI models how to actually perform professional work.
                  </p>
                  
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    The two hardest skills for a prompt writer are gaining an intuition for how a model fails and how to make it harder without making it longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Warning - Enhanced with subtle attention pulse */}
        <div className="rounded-2xl border-2 border-warning/30 bg-gradient-to-br from-warning/10 via-warning/5 to-transparent shadow-md overflow-hidden animate-attention-pulse">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-warning/30 to-warning/15 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  ⚠️ The Quality Bar is Unforgiving
                </h3>
                <div className="space-y-4">
                  <p className="text-base text-foreground leading-relaxed">
                    Quality is not just "important" in Project Beet — <strong className="text-primary">it is the entire product</strong>. The bar for acceptance is extremely high.
                  </p>
                  <div className="space-y-3 mt-4">
                    {[
                      { text: "If it feels easy to write", desc: "it will likely be easy for the model to solve — not useful data." },
                      { text: "Do not skim.", desc: "Fellows who don't read every word fail the assessment." },
                      { text: "You're engineering professional scenarios.", desc: "Take your time." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-warning/20">
                        <span className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-warning font-bold text-sm">{i + 1}</span>
                        </span>
                        <p className="text-foreground">
                          <strong>{item.text}</strong> {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Enhanced */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-muted/30 via-card to-muted/30 p-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost"
              onClick={() => {
                navigate("/education/prompt-writing");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 text-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Overview
            </Button>
            
            <Button 
              onClick={() => {
                navigate("/education/prompt-writing/module-2");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
            >
              Continue to Unpacking the Prompt
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module1;
