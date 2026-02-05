 import { useState } from "react";
 import { BookOpen, HelpCircle, ListChecks, Eye, Lightbulb } from "lucide-react";
 import { cn } from "@/lib/utils";

const IntroductionSection = () => {
   const [revealed, setRevealed] = useState(false);
 
  return (
    <div className="space-y-8">
      {/* What is a rubric? */}
       <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent p-6 shadow-lg">
         <div className="flex items-start gap-4">
           <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
             <ListChecks className="w-7 h-7 text-primary" />
           </div>
           <div className="space-y-3">
             <h3 className="text-xl font-bold text-foreground">What is a Rubric?</h3>
             <p className="text-base text-foreground leading-relaxed">
               A rubric is a collection of specific criteria that, together, define what makes a good response to your prompt.
             </p>
             <p className="text-base text-foreground leading-relaxed">
               Each criterion is a simple, declarative statement that can be evaluated as true or false for any given response. Each also has an associated point value awarded when the criterion is met.
             </p>
             <p className="text-base text-foreground leading-relaxed">
               The goal is to create a rubric where no good output would fail, but no bad output would pass. Your rubric should apply to any possible response to your prompt, allowing you to evaluate and rank them systematically.
             </p>
           </div>
        </div>
      </div>

       {/* Analogy */}
       <div className="p-5 rounded-xl bg-muted/30 border border-border">
         <div className="flex items-start gap-3">
           <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
             <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
           </div>
           <div className="space-y-2">
             <p className="text-foreground leading-relaxed">
               Think of a time when a teacher used a grade book to evaluate different assignments. A rubric works the same way: it's a systematic tool for grading responses to your task.
             </p>
             <p className="text-foreground leading-relaxed">
               These rubrics are more detailed than typical classroom rubrics. They're closer to a weighted checklist or an open-ended mark scheme for high school essays. The key difference from a simple checklist is that criteria are weighted to reflect what matters most.
             </p>
           </div>
        </div>
       </div>

       {/* Why do we need a rubric? */}
       <div className="space-y-4">
         <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
           <HelpCircle className="w-5 h-5 text-primary" />
           Why do we need a rubric?
         </h3>
         <div className="p-5 rounded-xl bg-card border border-border space-y-4">
           <p className="text-foreground leading-relaxed">
             As AI models move beyond verifiable, discrete tasks and into real-world reasoning tasks, evaluation becomes more complex. For many professional tasks, a response cannot be graded with a simple right or wrong check.
           </p>
           <p className="text-foreground leading-relaxed">
             In expert domains, quality depends on multiple dimensions. A response might be factually correct but incomplete, well-written but unsafe, or persuasive but poorly reasoned. That is why evaluation requires nuanced, multi-criteria judgment, similar to how people assess work in real jobs.
           </p>
           <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
             <p className="text-foreground leading-relaxed font-medium">
               In these contexts, "good enough" is rarely binary. It is a combination of accuracy, completeness, reasoning, clarity, tone, safety, and task fit.
            </p>
          </div>
        </div>
      </div>
 
       {/* Why good rubrics matter */}
       <div className="space-y-4">
         <h3 className="text-2xl font-bold text-foreground">Why good rubrics matter</h3>
         
         <p className="text-foreground leading-relaxed">
           Rubrics are necessary to evaluate tasks where there is <strong>not one black-and-white correct answer</strong>.
         </p>
         
         <p className="text-foreground leading-relaxed">
           In professional work, there is often more than one good way to produce an output. While in math there is often one right answer, in the real world there are multiple ways to build an LBO model, create a holiday itinerary, or design a farming schedule.
         </p>
         
         <p className="text-foreground leading-relaxed">
           In order to evaluate a model doing that work well, <strong>you need a rubric</strong>.
         </p>
 
         {/* Click to reveal */}
         <button
           onClick={() => setRevealed(true)}
           className={cn(
             "w-full text-left p-5 rounded-xl border-2 transition-all duration-300",
             revealed 
               ? "bg-primary/5 border-primary/30" 
               : "bg-muted/30 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
           )}
         >
           <div className="flex items-start gap-4">
             <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
               revealed ? "bg-primary/20" : "bg-muted"
             )}>
               {revealed ? (
                 <Lightbulb className="w-5 h-5 text-primary" />
               ) : (
                 <Eye className="w-5 h-5 text-muted-foreground" />
               )}
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-muted-foreground mb-1">
                 {revealed ? "Key Insight" : "Click to reveal"}
               </p>
               <p className={cn(
                 "text-foreground transition-all duration-300",
                 !revealed && "blur-sm select-none"
               )}>
                 {revealed 
                   ? "Without a good rubric, AI models cannot learn what 'good' means for complex professional tasks. The rubric is how we teach machines to recognize quality work — and poor rubrics lead to poor AI training." 
                   : "Why models cannot improve without good rubrics..."}
               </p>
             </div>
           </div>
         </button>
       </div>
    </div>
  );
};

export default IntroductionSection;
