import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, ArrowDown, BookOpen, Target, Zap, Scale, Brain, Workflow, Lightbulb, Eye, EyeOff, CheckCircle2, XCircle, Sparkles, Lock, RotateCcw, Info, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";
import BeetConfetti, { triggerBeetConfetti } from "@/components/prompt-writing/BeetConfetti";
import RubricsProgressTracker from "@/components/rubrics/RubricsProgressTracker";
import { useRubricsModule1Completion } from "@/hooks/useRubricsModule1Completion";

const RubricsModule1 = () => {
  const navigate = useNavigate();
  const { isComplete, markComplete } = useRubricsModule1Completion();

  const handleCompleteModule = () => {
    markComplete();
    triggerBeetConfetti();
  };
  const criterionComponents = [
    {
      title: "Criterion",
      description: "A binary true/false statement that measures something about the expected response.",
      icon: CheckCircle2,
    },
    {
      title: "Weight",
      description: "A score from -100 to 100 that evaluates how important that criterion is.",
      icon: Scale,
    },
    {
      title: "Category",
      description: "What aspect of the deliverable the criterion measures.",
      icon: Target,
      subItems: ["Instruction Following", "Reasoning", "Extraction", "Formatting"],
    },
    {
      title: "Rationale",
      description: "Your explanation for why the criterion exists and why it matters to evaluate.",
      icon: Lightbulb,
    },
    {
      title: "Implicit or Explicit",
      description: "Whether the criterion measures something explicitly asked for in the prompt, or something implied that requires expert judgment.",
      icon: Eye,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <Breadcrumbs />
      
      {/* Beet Confetti Component */}
      <BeetConfetti showButton={false} />

      {/* Progress Tracker */}
      <RubricsProgressTracker />

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
            {isComplete && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Rubric
            <span className="block text-secondary">Introduction</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl">
            Understanding how rubrics power AI training and why generalizable evaluation matters.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Foundation Concepts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-8">
        
        {/* ═══════════════════════════════════════════════════════════════
            INTRODUCTION - Non-collapsible Premium Section
            ═══════════════════════════════════════════════════════════════ */}
        <article className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-8 md:p-10 shadow-lg">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-semibold uppercase tracking-wide">
              Essential Context
            </span>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              As AI models move beyond verifiable, discrete tasks and into real-world reasoning tasks, evaluation becomes more complex. For many professional tasks, a response cannot be graded with a simple right/wrong check.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed">
              In expert domains, quality depends on multiple dimensions. A response might be <span className="text-green-600 dark:text-green-400">factually correct</span> <span className="text-red-500 dark:text-red-400">but incomplete</span>, <span className="text-green-600 dark:text-green-400">well-written</span> <span className="text-red-500 dark:text-red-400">but unsafe</span>, or <span className="text-green-600 dark:text-green-400">persuasive</span> <span className="text-red-500 dark:text-red-400">but poorly reasoned</span>. That is why evaluation requires <strong className="text-primary">nuanced, multi-criteria judgment</strong>, similar to how people assess work in real jobs.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed">
              You will see this across the domains in this project: medicine, customer support, law, music production, finance, computer science, sales, and more. In these contexts, "good enough" is rarely binary. It is a combination of <strong className="text-primary">accuracy, completeness, reasoning, clarity, tone, safety, and task fit</strong>.
            </p>
            
            <div className="mt-8 p-5 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                In this section, you will learn the most challenging part of Project Beet 2.0: <strong className="text-primary">how to use rubrics to evaluate complex work consistently.</strong>
              </p>
            </div>
          </div>
        </article>

        {/* ═══════════════════════════════════════════════════════════════
            THE GENERALIZABLE RUBRIC RULE
            ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-br from-[hsl(var(--beet-light))] to-transparent">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--beet))]/20 to-[hsl(var(--beet))]/10 flex items-center justify-center flex-shrink-0">
                <img src={beetIcon} alt="" className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  The <span className="text-[hsl(var(--beet))]">"Generalizable Rubric"</span> Rule
                </h2>
                <div className="space-y-4">
                  <p className="text-base text-foreground leading-relaxed">
                    When writing rubrics for a prompt, the goal is to ensure that the rubric can accurately evaluate <strong className="text-primary">any future response</strong>, whether human-generated or model-generated.
                  </p>
                  
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    This means your rubric should not grade only the specific response you had in mind. If there are other valid responses that fulfill what the prompt is requesting, your rubric should still evaluate them appropriately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MODULE 1: HOW ARE RUBRICS USED IN AI TRAINING?
            ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border-2 border-border bg-card shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-muted/50 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">How Are Rubrics Used in AI Training?</h2>
                <p className="text-sm text-muted-foreground">Understanding your impact on model improvement</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <p className="text-base text-foreground leading-relaxed">
              To write strong rubrics, it is important to understand how your work is used to improve the next generation of AI models.
            </p>
            
            <p className="text-base text-foreground leading-relaxed">
              In Project Beet 2.0, rubrics are used to <strong className="text-primary">grade any future response</strong> to a prompt. A rubric is a <strong className="text-primary">collection of criteria</strong> that collectively define what a <strong className="text-primary">good response</strong> is to a specific prompt, now and in the future.
            </p>
            
            {/* What is a criterion? */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                What is a criterion?
              </h3>
              
              <p className="text-sm text-muted-foreground mb-5">Each criterion you create includes:</p>
              
              <div className="grid gap-4">
                {criterionComponents.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="group relative flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-gradient-to-br from-muted/20 to-transparent hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        {item.subItems && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.subItems.map((sub, i) => (
                              <span 
                                key={i}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What is a rubric? */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-primary" />
                What is a rubric?
              </h3>
              
              <p className="text-base text-foreground leading-relaxed mb-4">
                A rubric is a <strong className="text-primary">collection of criteria</strong> that together define what makes a good response.
              </p>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-5">
                <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground/80">
                  On Project Beet, the average rubric had <strong className="text-primary">over 90 items</strong>.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <div 
                      key={num}
                      className="flex flex-col gap-1.5 px-4 py-3 rounded-xl border border-border/60 bg-muted/30"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">{num}</span>
                        Criterion
                      </div>
                      <div className="flex flex-wrap gap-1.5 pl-6">
                        {["Weight", "Category", "Rationale", "Implicit/Explicit"].map((component) => (
                          <span 
                            key={component}
                            className="px-2 py-0.5 text-xs rounded-full bg-background border border-border/50 text-muted-foreground"
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-0.5 text-muted-foreground text-lg font-bold">
                  <span>•</span>
                  <span>•</span>
                  <span>•</span>
                </div>
              </div>
              
              {/* Transition to Judge Model */}
              <div className="mt-6">
                <p className="text-base text-muted-foreground mb-3 text-center">
                  We'll break down each component in Module 2. First, understand this key concept:
                </p>
                <button 
                  onClick={() => document.getElementById('judge-model-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/25 hover:border-orange-500/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/30 transition-colors">
                    <ArrowDown className="w-5 h-5 text-orange-500 animate-bounce" />
                  </div>
                  <span className="text-lg font-bold text-foreground group-hover:text-orange-600 transition-colors">
                    The Judge Model
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MODULE 1A: THE RUBRIC JUDGE (JUDGE MODELS)
            ═══════════════════════════════════════════════════════════════ */}
        <div id="judge-model-section" className="rounded-2xl border-2 border-border bg-card shadow-md overflow-hidden scroll-mt-24">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-muted/50 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">The Rubric Judge (Judge Models)</h2>
                <p className="text-sm text-muted-foreground">How your criteria are evaluated</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <p className="text-base text-foreground leading-relaxed">
              Once you have created your rubric, future responses to the prompt will be evaluated using a <strong className="text-primary">judge model</strong>.
            </p>
            
            <p className="text-base text-foreground leading-relaxed">
              You can think of a judge model as a very simple AI that does only three things:
            </p>
            
            <div className="grid gap-4 my-6">
              {/* Step 1: Reads one criterion */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <p className="text-foreground font-medium">Reads one criterion</p>
                </div>
                <div className="ml-12 p-4 rounded-lg bg-card border-2 border-primary/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Current Criterion</p>
                    <p className="text-sm text-foreground font-medium italic">"The report includes an executive summary section."</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Reads the deliverable */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <p className="text-foreground font-medium">Reads the output produced by the prompt (the deliverable)</p>
                </div>
                <div className="ml-12 p-4 rounded-lg bg-card border-2 border-secondary/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Deliverable</p>
                    <div className="text-sm text-foreground space-y-1">
                      <p className="font-medium">📄 Production Report 2026</p>
                      <p className="text-xs text-muted-foreground">• Executive Summary • Key Findings • Recommendations...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Decides true/false */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <p className="text-foreground font-medium">Decides whether the criterion is true or false based on what it sees in the deliverable</p>
                </div>
                <div className="ml-12 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-success/10 border-2 border-success/30 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-xs text-success font-semibold uppercase">True</p>
                      <p className="text-xs text-muted-foreground">Criterion is satisfied</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 border-2 border-destructive/30 flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <div>
                      <p className="text-xs text-destructive font-semibold uppercase">False</p>
                      <p className="text-xs text-muted-foreground">Criterion not met</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mt-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-primary" />
              </div>
              <p className="text-base font-semibold text-foreground">
                The judge model repeats these steps for every criterion until it reaches the end of the rubric.
              </p>
            </div>
            
            {/* Important Constraint */}
            <div className="mt-8 rounded-xl border-2 border-warning/30 bg-gradient-to-br from-warning/10 via-warning/5 to-transparent p-6">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-warning" />
                Important Constraint
              </h4>
              
              <p className="text-base text-foreground leading-relaxed mb-4">
                The judge model evaluates these in <strong className="text-primary">isolation</strong>:
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3 text-foreground">
                  <XCircle className="w-4 h-4 text-warning flex-shrink-0" />
                  <span>It does not read <strong>the prompt</strong></span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <XCircle className="w-4 h-4 text-warning flex-shrink-0" />
                  <span>It does not read <strong>input files</strong></span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <XCircle className="w-4 h-4 text-warning flex-shrink-0" />
                  <span>It does not read <strong>other criteria</strong></span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <XCircle className="w-4 h-4 text-warning flex-shrink-0" />
                  <span>It does not have access to <strong>the Internet</strong></span>
                </li>
              </ul>
              
              {/* Visual: Judge Model Isolation */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-muted/50 to-card border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">What the Judge Model Sees</p>
                
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                  {/* Visible to Judge */}
                  <div className="flex flex-col">
                    <p className="text-xs font-medium text-primary mb-3">Visible to Judge:</p>
                    <div className="flex-1 flex flex-col justify-between gap-3">
                      {[
                        { label: "Current Criterion", icon: "✓", desc: "The single criterion being evaluated" },
                        { label: "Deliverable", icon: "📄", desc: "The model's output/response" },
                      ].map((item, i) => (
                        <div 
                          key={i}
                          className="flex-1 flex items-center gap-3 px-4 py-4 rounded-lg bg-primary/10 border-2 border-primary/30"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-semibold text-foreground">{item.label}</span>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hidden from Judge */}
                  <div className="flex flex-col">
                    <p className="text-xs font-medium text-muted-foreground mb-3">Hidden from Judge:</p>
                    <div className="flex-1 flex flex-col justify-between gap-2">
                      {[
                        { label: "Prompt", icon: "📝" },
                        { label: "Input Files", icon: "📁" },
                        { label: "Other Criteria", icon: "📋" },
                        { label: "The Internet", icon: "🌐" },
                      ].map((item, i) => (
                        <div 
                          key={i}
                          className="flex-1 flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50 border-2 border-destructive/30 opacity-60"
                        >
                          <span>{item.icon}</span>
                          <span className="text-sm text-muted-foreground line-through">{item.label}</span>
                          <XCircle className="w-4 h-4 text-destructive ml-auto flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-warning/10 border-2 border-warning/30 animate-attention-pulse">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground font-medium leading-relaxed">
                    This constraint is extremely important to remember when writing criteria. Understanding it will help you avoid many common errors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MODULE 1B: THE TRAINING PROCESS
            ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border-2 border-border bg-card shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-muted/50 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                <Workflow className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">The AI Model Training Process</h2>
                <p className="text-sm text-muted-foreground">From rubric to model improvement</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <p className="text-base text-foreground leading-relaxed">
              Once a high-quality prompt and rubric is created, they can be provided to an AI model to guide and improve its output through the following process:
            </p>
            
            {/* Visual Pipeline */}
            <div className="space-y-6">
              {/* Step 1: Strong Foundations */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-primary/15 to-primary/5 border-2 border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="font-bold text-foreground">Strong Foundations</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">You have a strong prompt and a strong rubric.</p>
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-24 rounded-lg bg-card border-2 border-primary/40 shadow-md flex flex-col items-center justify-center p-2">
                      <FileText className="w-8 h-8 text-primary mb-1" />
                      <span className="text-xs font-medium text-center">Prompt</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary">+</span>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-24 rounded-lg bg-card border-2 border-primary/40 shadow-md flex flex-col items-center justify-center p-2">
                      <Scale className="w-8 h-8 text-primary mb-1" />
                      <span className="text-xs font-medium text-center">Rubric</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Mass Generation */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-secondary/15 to-secondary/5 border-2 border-secondary/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="font-bold text-foreground">Mass Generation</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">The prompt is given to a model, which generates thousands of responses.</p>
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="w-14 h-16 rounded-lg bg-card border border-border shadow flex items-center justify-center">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map((n) => (
                      <div key={n} className="w-12 h-14 rounded-lg bg-card border border-secondary/40 shadow-sm flex items-center justify-center" style={{ transform: `rotate(${(n-3)*5}deg)` }}>
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">×1000s</span>
                </div>
              </div>

              {/* Step 3: Automated Evaluation */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-500/5 border-2 border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h4 className="font-bold text-foreground">Automated Evaluation</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">The judge model evaluates every response using your rubric.</p>
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="w-16 h-20 rounded-lg bg-card border border-border shadow flex flex-col items-center justify-center p-2">
                    <FileText className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground">Response</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  <div className="w-20 h-24 rounded-lg bg-amber-500/10 border-2 border-amber-500/40 shadow flex flex-col items-center justify-center p-2">
                    <Brain className="w-7 h-7 text-amber-500 mb-1" />
                    <span className="text-[10px] text-amber-600 font-medium">Judge Model</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-success/20 border border-success/30">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      <span className="text-[10px] text-success font-medium">True</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-destructive/20 border border-destructive/30">
                      <XCircle className="w-3 h-3 text-destructive" />
                      <span className="text-[10px] text-destructive font-medium">False</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Scoring */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-500/5 border-2 border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">4</div>
                  <h4 className="font-bold text-foreground">Scoring</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">The judge model assigns each response a score based on the rubric evaluation.</p>
                <div className="flex items-center justify-center gap-3 py-4 flex-wrap">
                  {[
                    { score: 92, color: "success" },
                    { score: 87, color: "success" },
                    { score: 64, color: "amber-500" },
                    { score: 45, color: "amber-500" },
                    { score: 23, color: "destructive" },
                  ].map((item, i) => (
                    <div key={i} className="w-14 h-18 rounded-lg bg-card border border-border shadow flex flex-col items-center justify-center p-2 gap-1">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        item.color === "success" ? "bg-success/20 text-success" :
                        item.color === "destructive" ? "bg-destructive/20 text-destructive" :
                        "bg-amber-500/20 text-amber-600"
                      }`}>
                        {item.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 5: Performance Ranking */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500/15 to-purple-500/5 border-2 border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm">5</div>
                  <h4 className="font-bold text-foreground">Performance Ranking</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">We identify the top-performing and bottom-performing responses.</p>
                <div className="flex items-center justify-center gap-8 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-medium text-success">Top Performers</span>
                    <div className="flex flex-col gap-1">
                      {[1,2,3].map((n) => (
                        <div key={n} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/15 border border-success/30">
                          <span className="text-xs font-bold text-success">#{n}</span>
                          <div className="w-6 h-6 rounded bg-success/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-20 w-px bg-border" />
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-medium text-destructive">Bottom Performers</span>
                    <div className="flex flex-col gap-1">
                      {[1,2,3].map((n) => (
                        <div key={n} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/15 border border-destructive/30">
                          <div className="w-6 h-6 rounded bg-destructive/20 flex items-center justify-center">
                            <XCircle className="w-4 h-4 text-destructive" />
                          </div>
                          <span className="text-xs font-bold text-destructive">#{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6 & 7: Reinforcement - Combined visual */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Positive */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-success/15 to-success/5 border-2 border-success/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-success text-white flex items-center justify-center font-bold text-sm">6</div>
                    <h4 className="font-bold text-foreground text-sm">Positive Reinforcement</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">We feed high-scoring responses back into the model and explicitly indicate: "This is what good looks like. When you encounter a similar prompt in the future, this is what the output should be like."</p>
                  <div className="flex flex-col items-center gap-3 py-2">
                    <div className="relative">
                      <div className="w-16 h-20 rounded-lg bg-card border-2 border-success/50 shadow-md flex flex-col items-center justify-center">
                        <FileText className="w-6 h-6 text-success" />
                        <span className="text-[10px] text-success font-medium mt-1">High Score</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-success flex items-center justify-center shadow">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <ArrowDown className="w-5 h-5 text-success" />
                    <div className="px-3 py-2 rounded-lg bg-success/20 border border-success/30">
                      <span className="text-xs font-medium text-success">"Do more like this"</span>
                    </div>
                  </div>
                </div>

                {/* Negative */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-destructive/15 to-destructive/5 border-2 border-destructive/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-destructive text-white flex items-center justify-center font-bold text-sm">7</div>
                    <h4 className="font-bold text-foreground text-sm">Negative Reinforcement</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">We feed low-scoring responses back into the model and explicitly indicate: "This is what bad looks like. When you encounter a similar prompt in the future, avoid producing outputs like this."</p>
                  <div className="flex flex-col items-center gap-3 py-2">
                    <div className="relative">
                      <div className="w-16 h-20 rounded-lg bg-card border-2 border-destructive/50 shadow-md flex flex-col items-center justify-center opacity-60">
                        <FileText className="w-6 h-6 text-destructive" />
                        <span className="text-[10px] text-destructive font-medium mt-1">Low Score</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive flex items-center justify-center shadow">
                        <XCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <ArrowDown className="w-5 h-5 text-destructive" />
                    <div className="px-3 py-2 rounded-lg bg-destructive/20 border border-destructive/30">
                      <span className="text-xs font-medium text-destructive">"Avoid this"</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Goal */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Goal</h4>
                  <p className="text-foreground leading-relaxed">
                    As the model iterates through this process, it improves until most responses score near perfect on the rubric.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Key Implication */}
            <div className="mt-6 p-5 rounded-xl bg-[hsl(var(--beet-light))] border border-[hsl(var(--beet))]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--beet))]/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-[hsl(var(--beet))]" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Key Implication: Keeping Your Rubric Generalizable</h4>
                  <p className="text-foreground leading-relaxed">
                    This is why your rubric must be able to evaluate <strong className="text-primary">unknown future outputs that may still be correct</strong>, not just the specific response you had in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Module Button */}
        {!isComplete && (
          <div className="p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-foreground mb-2">Ready to continue?</h3>
              <p className="text-sm text-muted-foreground">
                Make sure you've understood the concepts above before marking this module complete.
              </p>
            </div>
            <Button
              onClick={handleCompleteModule}
              className="w-full gap-3 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all group"
            >
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              Complete Module 1
              <CheckCircle2 className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-muted/30 via-card to-muted/30 p-6 mt-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost"
              onClick={() => {
                navigate("/education/rubrics");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gap-2 text-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Overview
            </Button>
            
            {isComplete ? (
              <Button 
                onClick={() => {
                  navigate("/education/rubrics/module-2");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
              >
                Continue to Anatomy of a Rubric
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50 border border-border">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Complete module to continue
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubricsModule1;
