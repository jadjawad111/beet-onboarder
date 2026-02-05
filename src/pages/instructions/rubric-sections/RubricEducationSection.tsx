 import { useState } from "react";
 import { cn } from "@/lib/utils";
 import { BookOpen, Brain, Lightbulb, Eye, CheckCircle2, ArrowRight } from "lucide-react";
 
 const rubricCharacteristics = [
   {
     title: "Coverage",
     description: "A good rubric is exhaustive. It covers the full breadth of what matters for evaluating the task. If something is important to quality, it should be reflected somewhere in the rubric.",
   },
   {
     title: "Professional Judgment",
     description: "A good rubric captures the nuanced taste and expertise of the profession — aspects of quality that are difficult to evaluate in isolation, but obvious to experienced practitioners.",
   },
   {
     title: "Evaluator Consistency",
     description: "A good rubric produces consistent results across evaluators. The majority of people evaluating the same output should arrive at the same score, allowing learning to converge.",
   },
 ];
 
 const criterionCharacteristics = [
   {
     title: "Not Stacked",
     description: "A good criterion evaluates one thing at a time. When multiple requirements are bundled, if one part fails the entire criterion fails — this makes it hard to assign accurate credit.",
   },
   {
     title: "Programmatically Verifiable",
     description: "A good criterion can be evaluated at scale. AI labs may need to apply thousands of criteria across millions of outputs, requiring automated or semi-automated evaluation.",
   },
   {
     title: "Consistently Evaluable",
     description: "A good criterion returns the same result when applied repeatedly to the same output. High variance across evaluations hinders model improvement.",
   },
   {
     title: "Self-contained",
     description: "A good criterion can be evaluated using only the deliverable itself. The evaluator doesn't have access to input files, so any necessary information must be included directly.",
   },
 ];
 
 const RubricEducationSection = () => {
   const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
 
   const toggleReveal = (section: string) => {
     setRevealedSections(prev => {
       const next = new Set(prev);
       if (next.has(section)) {
         next.delete(section);
       } else {
         next.add(section);
       }
       return next;
     });
   };
 
   return (
     <div className="space-y-8">
       {/* Header */}
       <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
         <div className="flex items-start gap-4">
           <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
             <Brain className="w-7 h-7 text-primary" />
           </div>
           <div>
             <h3 className="text-xl font-bold text-foreground mb-2">Understanding Rubrics in AI Training</h3>
             <p className="text-base text-foreground leading-relaxed">
               Learn how rubrics are used to train AI models and what makes a good rubric and criterion.
             </p>
           </div>
         </div>
       </div>
 
       {/* Section 1: How Rubrics Are Used in AI Training */}
       <div className="space-y-4">
         <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
           <BookOpen className="w-5 h-5 text-primary" />
           How Rubrics Are Used in AI Training
         </h3>
         
         <p className="text-foreground leading-relaxed">
           In Project Beet 2.0, rubrics are used to <strong>grade any future response</strong> to a prompt.
         </p>
         
         <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
           <p className="text-lg text-foreground">
             A rubric is a <strong className="underline decoration-primary decoration-2">collection of criteria</strong> that collectively define what a good response is to a specific prompt, <strong>now and in the future</strong>.
           </p>
         </div>
 
         <p className="text-foreground leading-relaxed">
           Once a strong prompt and rubric are created, they are used to guide model improvement through the following process:
         </p>
 
         {/* AI Training Process Visualization */}
         <div className="rounded-xl border-2 border-border bg-card p-6">
           <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
             <div className="flex flex-col items-center text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 min-w-[140px]">
               <span className="text-2xl mb-2">📝</span>
               <span className="font-semibold text-foreground">Prompt</span>
               <span className="text-xs text-muted-foreground">Given to AI model</span>
             </div>
             <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
             <div className="flex flex-col items-center text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20 min-w-[140px]">
               <span className="text-2xl mb-2">🤖</span>
               <span className="font-semibold text-foreground">Response</span>
               <span className="text-xs text-muted-foreground">Model produces output</span>
             </div>
             <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
             <div className="flex flex-col items-center text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 min-w-[140px]">
               <span className="text-2xl mb-2">📋</span>
               <span className="font-semibold text-foreground">Rubric</span>
               <span className="text-xs text-muted-foreground">Evaluates response</span>
             </div>
             <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
             <div className="flex flex-col items-center text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 min-w-[140px]">
               <span className="text-2xl mb-2">📊</span>
               <span className="font-semibold text-foreground">Score</span>
               <span className="text-xs text-muted-foreground">Guides improvement</span>
             </div>
           </div>
         </div>
       </div>
 
       {/* Section 2: The Rubric Judge */}
       <div className="space-y-4 pt-4 border-t border-border">
         <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
           <Brain className="w-5 h-5 text-primary" />
           The Rubric Judge (Judge Models)
         </h3>
         
         <p className="text-foreground leading-relaxed">
           Once a Rubric has been created, future responses to the prompt will be evaluated using a <strong>judge model</strong>.
         </p>
         
         <p className="text-foreground leading-relaxed">
           You can think of a judge model as a very simple AI that does only three things:
         </p>
         
         {/* Three steps */}
         <div className="space-y-4">
           {/* Step 1 */}
           <div className="flex items-start gap-3">
             <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
             <div className="flex-1">
               <p className="font-medium text-foreground mb-2">Reads one criterion</p>
               <div className="border-l-4 border-primary/40 bg-muted/30 rounded-r-md pl-4 py-3 pr-4">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Criterion</p>
                 <p className="text-sm text-foreground">"The report includes an executive summary section."</p>
               </div>
             </div>
           </div>
           
           {/* Step 2 */}
           <div className="flex items-start gap-3">
             <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
             <div className="flex-1">
               <p className="font-medium text-foreground mb-2">Reads the output produced by the prompt (the deliverable)</p>
               <div className="border-l-4 border-secondary/60 bg-muted/30 rounded-r-md pl-4 py-3 pr-4">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Deliverable</p>
                 <p className="text-sm text-foreground">Production Report 2026 — Executive Summary, Key Findings, Recommendations...</p>
               </div>
             </div>
           </div>
           
           {/* Step 3 */}
           <div className="flex items-start gap-3">
             <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
             <div className="flex-1">
               <p className="font-medium text-foreground mb-2">Decides whether the criterion is true or false</p>
               <div className="flex gap-2 flex-wrap">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/30">
                   <span className="text-sm font-semibold text-green-600 dark:text-green-400">TRUE</span>
                   <span className="text-xs text-green-600/70 dark:text-green-400/70">Criterion is satisfied</span>
                 </span>
                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/30">
                   <span className="text-sm font-semibold text-red-500 dark:text-red-400">FALSE</span>
                   <span className="text-xs text-red-500/70 dark:text-red-400/70">Criterion not met</span>
                 </span>
               </div>
             </div>
           </div>
         </div>
         
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
           <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs">↻</span>
           <span>The judge model repeats these steps for every criterion until it reaches the end of the rubric.</span>
         </div>
         
         {/* Important Constraint */}
         <div className="p-4 rounded-lg border bg-muted/20">
           <p className="font-semibold text-foreground mb-2">Important Constraint</p>
           <p className="text-sm text-muted-foreground mb-3">
             The judge model evaluates these in <strong className="text-primary">isolation</strong>:
           </p>
           <ul className="space-y-1.5 text-sm text-muted-foreground">
             <li className="flex items-center gap-2">
               <span className="text-destructive">•</span>
               It does not read <strong className="text-foreground">the prompt</strong>
             </li>
             <li className="flex items-center gap-2">
               <span className="text-destructive">•</span>
               It does not read <strong className="text-foreground">input files</strong>
             </li>
             <li className="flex items-center gap-2">
               <span className="text-destructive">•</span>
               It does not read <strong className="text-foreground">other criteria</strong>
             </li>
             <li className="flex items-center gap-2">
               <span className="text-destructive">•</span>
               It does not have access to <strong className="text-foreground">the Internet</strong>
             </li>
           </ul>
           <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
             This constraint is extremely important to remember when writing criteria. Understanding it will help you avoid many common errors.
           </p>
         </div>
       </div>
 
       {/* Section 3: What makes a good Rubric */}
       <div className="space-y-4 pt-4 border-t border-border">
         <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
           <Lightbulb className="w-5 h-5 text-primary" />
           Intuition: What really makes up a good Rubric and good Rubric Criterion?
         </h3>
         
         <p className="text-foreground leading-relaxed mb-4">
           Click each section to reveal the key characteristics:
         </p>
 
         {/* Good Rubric - Click to Reveal */}
         <button
           onClick={() => toggleReveal('rubric')}
           className={cn(
             "w-full text-left p-5 rounded-xl border-2 transition-all duration-300",
             revealedSections.has('rubric') 
               ? "bg-green-500/5 border-green-500/30" 
               : "bg-muted/30 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
           )}
         >
           <div className="flex items-start gap-4">
             <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
               revealedSections.has('rubric') ? "bg-green-500/20" : "bg-muted"
             )}>
               {revealedSections.has('rubric') ? (
                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
               ) : (
                 <Eye className="w-5 h-5 text-muted-foreground" />
               )}
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-muted-foreground mb-1">
                 {revealedSections.has('rubric') ? "A Good Rubric Has..." : "Click to reveal: What makes a good Rubric?"}
               </p>
               {revealedSections.has('rubric') ? (
                 <div className="space-y-3 mt-3">
                   {rubricCharacteristics.map((item, idx) => (
                     <div key={idx} className="p-3 rounded-lg bg-card border border-border">
                       <p className="font-semibold text-foreground mb-1">{item.title}</p>
                       <p className="text-sm text-muted-foreground">{item.description}</p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-foreground blur-sm select-none">
                   Coverage, Professional Judgment, Evaluator Consistency...
                 </p>
               )}
             </div>
           </div>
         </button>
 
         {/* Good Criterion - Click to Reveal */}
         <button
           onClick={() => toggleReveal('criterion')}
           className={cn(
             "w-full text-left p-5 rounded-xl border-2 transition-all duration-300",
             revealedSections.has('criterion') 
               ? "bg-blue-500/5 border-blue-500/30" 
               : "bg-muted/30 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
           )}
         >
           <div className="flex items-start gap-4">
             <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
               revealedSections.has('criterion') ? "bg-blue-500/20" : "bg-muted"
             )}>
               {revealedSections.has('criterion') ? (
                 <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
               ) : (
                 <Eye className="w-5 h-5 text-muted-foreground" />
               )}
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-muted-foreground mb-1">
                 {revealedSections.has('criterion') ? "A Good Criterion Has..." : "Click to reveal: What makes a good Criterion?"}
               </p>
               {revealedSections.has('criterion') ? (
                 <div className="space-y-3 mt-3">
                   {criterionCharacteristics.map((item, idx) => (
                     <div key={idx} className="p-3 rounded-lg bg-card border border-border">
                       <p className="font-semibold text-foreground mb-1">{item.title}</p>
                       <p className="text-sm text-muted-foreground">{item.description}</p>
                     </div>
                   ))}
                   <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                     <p className="font-semibold text-foreground mb-1">… and more</p>
                     <p className="text-sm text-muted-foreground">There are additional guidelines for writing effective criteria explored throughout this guide.</p>
                   </div>
                 </div>
               ) : (
                 <p className="text-foreground blur-sm select-none">
                   Not Stacked, Programmatically Verifiable, Consistently Evaluable, Self-contained...
                 </p>
               )}
             </div>
           </div>
         </button>
       </div>
     </div>
   );
 };
 
 export default RubricEducationSection;