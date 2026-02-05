 import { Scale, Lightbulb, AlertTriangle, MinusCircle, PenTool, CheckCircle, FileText } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 const whenToUseNegative = [
   "The mistake is severe (misleading, unusable, or professionally unacceptable).",
   "The mistake is common.",
   "You want to prevent \"polished but wrong\" outputs from scoring well.",
 ];
 
 const howToWriteNegative = [
   "Make it specific and observable, so a reviewer can mark it true/false quickly.",
   "Focus on high-impact failures, not minor style preferences.",
   "Avoid overlap with your positive criteria so you don't punish the same issue twice.",
 ];
 
 const howToChooseNegativeWeights = [
   {
     weight: "Large negative weights",
     when: "when the mistake breaks core instructions or makes the deliverable misleading.",
   },
   {
     weight: "Smaller negative weights",
     when: "when the mistake is still wrong, but not catastrophic.",
   },
 ];
 
 const negativeExamples = [
   {
     promptRequirement: "In the argument brief, do not include any arguments that rely on the legal doctrine of 'assumption of risk.'",
     criterion: "The argument brief contains the exact phrase 'assumption of risk' at least once.",
     weight: -100,
     why: "The response includes a forbidden legal concept explicitly banned by the prompt.",
   },
   {
     promptRequirement: "Anonymize the name '[REDACTED]' by replacing it with '[REDACTED]' everywhere it appears in all output documents.",
     criterion: "The subject review document refers to the patient by their name '[REDACTED]'.",
     weight: -100,
     why: "A prohibited identifier appears in the outputs, directly violating the anonymization requirement.",
   },
   {
     promptRequirement: "Using only the listed symptoms, draft a treatment chart.",
     criterion: "The treatment chart states that Acute Stress Disorder is the confirmed diagnosis.",
     weight: -40,
     why: "Expert judgement is required here — it asserts diagnostic certainty when most medical professionals would not do this.",
   },
 ];

const WeightingSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Criterion Weighting Guidelines</h3>
            <p className="text-base text-foreground leading-relaxed">
              <strong className="text-primary">Remember:</strong> weighting is relative – similar criteria should receive similar or the same weights.
            </p>
          </div>
        </div>
      </div>

      {/* Weight Ranges */}
      <div className="space-y-4">
        {/* 50-100 */}
        <div className="rounded-xl border-2 border-green-500/30 bg-green-50/30 dark:bg-green-950/20 overflow-hidden">
          <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20 flex items-center justify-between">
            <span className="font-bold text-foreground">High Weight: 50 - 100</span>
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-bold">Critical</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-foreground font-medium">Highly relevant to prompt. A key answer to an explicitly asked question.</p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Prompt:</strong> What phase of tides is the northeastern US experiencing right now?</p>
              <p className="text-sm text-foreground"><strong>Criterion:</strong> Response states that the Northeastern US is experiencing high tide at midnight on December 6th.</p>
              <p className="text-sm text-primary mt-2"><strong>Weight: 100</strong></p>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>NOTE:</strong> The main concept and deliverable should likely be weighted 100. Key details that are necessary to answer the prompt should likely be in the 70-90 range. Other important aspects of answers to explicitly asked questions should be 50-70.
              </p>
            </div>
          </div>
        </div>

        {/* 20-50 */}
        <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/30 dark:bg-yellow-950/20 overflow-hidden">
          <div className="px-4 py-3 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-between">
            <span className="font-bold text-foreground">Medium Weight: 20 - 50</span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-sm font-bold">Important</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-foreground font-medium">An important explanation, an implicit ask, or a common incorrect answer.</p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Examples</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-foreground"><strong>Criterion:</strong> Response explains that the northeastern US is experiencing high tide because *CONCISE EXPLANATION*</p>
                  <p className="text-sm text-primary"><strong>Weight: 25</strong></p>
                </div>
                <div>
                  <p className="text-sm text-foreground"><strong>Criterion:</strong> Response does not state that the Northeastern US is experiencing low tide at midnight December 6th.</p>
                  <p className="text-sm text-primary"><strong>Weight: 25</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-20 */}
        <div className="rounded-xl border-2 border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20 overflow-hidden">
          <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between">
            <span className="font-bold text-foreground">Low Weight: 1 - 20</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-bold">Nice to Have</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-foreground font-medium">Something that is nice to have but is ultimately not critical. A fringe inclusion in the rubric.</p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Prompt:</strong> What phase of tides is the northeastern US experiencing right now?</p>
              <p className="text-sm text-foreground"><strong>Criterion:</strong> Response explains that the Northeastern US experiences a semidiurnal tidal period.</p>
              <p className="text-sm text-primary mt-2"><strong>Weight: 1</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Example */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">How Weights Affect Scoring</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid gap-3">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm"><strong>Response A:</strong> "The NE US is in low tide." → <strong className="text-destructive">0/125 points</strong></p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm"><strong>Response B:</strong> "Hey, unfortunately I don't know the tide right now." → <strong className="text-yellow-700 dark:text-yellow-300">25/125 points</strong></p>
              <p className="text-xs text-muted-foreground mt-1">Gets points for not stating incorrect information (low tide)</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm"><strong>Response C:</strong> "The NE US is in high tide." → <strong className="text-green-700 dark:text-green-300">125/125 points</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Takeaway</h4>
            <p className="text-sm text-foreground leading-relaxed">
              You should not be afraid to give something a lower weight. <strong className="text-primary">The most important thing is that the weights reflect relative importance.</strong>
            </p>
          </div>
        </div>
      </div>
 
       {/* Negative Weights Section */}
       <div className="pt-4 border-t border-border">
         <div className="rounded-2xl border-2 border-destructive/30 bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent p-6 shadow-lg">
           <div className="flex items-start gap-4">
             <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
               <MinusCircle className="w-7 h-7 text-destructive" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-foreground mb-2">
                 Negatively Weighted Criteria
               </h3>
               <p className="text-base text-foreground leading-relaxed">
                 A negatively weighted criterion is a clear, yes/no check for a serious mistake. It is written as a positive statement (something that could be true). If it is true, you apply a negative weight and reduce the score.
               </p>
             </div>
           </div>
         </div>
       </div>
 
       {/* When to Use Negative */}
       <div className="rounded-xl border border-border bg-card overflow-hidden">
         <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
           <AlertTriangle className="w-5 h-5 text-primary" />
           <h4 className="font-semibold text-foreground">Use Negatively Weighted Criteria When</h4>
         </div>
         <div className="p-5">
           <ul className="space-y-3">
             {whenToUseNegative.map((item, idx) => (
               <li key={idx} className="flex items-start gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                 <span className="text-foreground">{item}</span>
               </li>
             ))}
           </ul>
         </div>
       </div>
 
       {/* How to Write Negative */}
       <div className="rounded-xl border border-border bg-card overflow-hidden">
         <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
           <PenTool className="w-5 h-5 text-primary" />
           <h4 className="font-semibold text-foreground">How to Write Strong Negative Criteria</h4>
         </div>
         <div className="p-5">
           <ul className="space-y-3">
             {howToWriteNegative.map((item, idx) => (
               <li key={idx} className="flex items-start gap-3">
                 <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                 <span className="text-foreground">{item}</span>
               </li>
             ))}
           </ul>
         </div>
       </div>
 
       {/* How to Choose Negative Weights */}
       <div className="rounded-xl border border-border bg-card overflow-hidden">
         <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
           <Scale className="w-5 h-5 text-primary" />
           <h4 className="font-semibold text-foreground">How to Choose Negative Weights</h4>
         </div>
         <div className="p-5 space-y-4">
           {howToChooseNegativeWeights.map((item, idx) => (
             <div
               key={idx}
               className={cn(
                 "p-4 rounded-lg border",
                 idx === 0
                   ? "bg-destructive/5 border-destructive/30"
                   : "bg-orange-500/5 border-orange-500/30"
               )}
             >
               <p className="text-foreground">
                 <span className={cn(
                   "font-semibold",
                   idx === 0 ? "text-destructive" : "text-orange-600 dark:text-orange-400"
                 )}>
                   {item.weight}
                 </span>{" "}
                 {item.when}
               </p>
             </div>
           ))}
         </div>
       </div>
 
       {/* Negative Examples */}
       <div className="rounded-xl border border-border bg-card overflow-hidden">
         <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
           <FileText className="w-5 h-5 text-primary" />
           <h4 className="font-semibold text-foreground">Examples of Negative Criteria</h4>
         </div>
         <div className="p-5 space-y-6">
           {negativeExamples.map((example, idx) => (
             <div
               key={idx}
               className="rounded-lg border border-border bg-muted/30 overflow-hidden"
             >
               {/* Prompt Requirement */}
               <div className="p-4 border-b border-border bg-card">
                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                   Prompt Requirement
                 </p>
                 <p className="text-foreground italic">"{example.promptRequirement}"</p>
               </div>
               
               {/* Criterion and Weight */}
               <div className="p-4 border-b border-border">
                 <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                   <div className="flex-1">
                     <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                       Negative Criterion
                     </p>
                     <p className="text-foreground font-medium">"{example.criterion}"</p>
                   </div>
                   <div className="flex-shrink-0">
                     <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                       Weight
                     </p>
                     <span className={cn(
                       "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold",
                       example.weight <= -100 
                         ? "bg-destructive/20 text-destructive" 
                         : "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                     )}>
                       {example.weight}
                     </span>
                   </div>
                 </div>
               </div>
 
               {/* Why */}
               <div className="p-4 bg-destructive/5">
                 <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">
                   Why This Penalty?
                 </p>
                 <p className="text-foreground">{example.why}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
 
       {/* Guideline Callout for Negative */}
       <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/10 p-6">
         <div className="flex items-start gap-4">
           <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
             <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
           </div>
           <div>
             <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
               Guideline
             </p>
             <p className="text-foreground leading-relaxed">
               Include at least <span className="font-bold text-amber-700 dark:text-amber-300">five negatively weighted criteria</span> in your rubric to catch major failures and penalize outputs that look good but fail in important ways.
             </p>
           </div>
         </div>
       </div>
    </div>
  );
};

export default WeightingSection;
