 import { useState } from "react";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertOctagon, AlertTriangle, Check, Sparkles, ChevronDown } from "lucide-react";
 import CriterionIssuesGrid from "@/components/presentation/slides/CriterionIssuesGrid";
 import RubricIssuesGrid from "@/components/presentation/slides/RubricIssuesGrid";
 
 const majorErrors = [
   {
     name: "Criterion Stacked",
     description: "There are two or more criteria in one line-item that should be broken up into multiple criteria line-items."
   },
   {
     name: "Criterion Redundant",
     description: "Multiple criteria are objectively overlapping – one cannot be satisfied without the other and vice versa."
   },
   {
     name: "Missing Criterion",
     description: "A criterion that would be weighted as 5 or a 3 is missing from the rubric."
   },
   {
     name: "Criterion Inaccurate",
     description: "A criterion contains an inaccuracy in the criterion description, or there are multiple inaccuracies across the rationale, quote, or source."
   },
   {
     name: "Criterion Not Self-Contained",
     description: "A criterion doesn't contain all the necessary info to grade a response and/or isn't able to be evaluated without access to the prompt or internet access."
   },
   {
     name: "Criterion Ambiguous",
     description: "The criterion is objectively ambiguous and can't be accurately evaluated."
   },
   {
     name: "Criterion Restrictive",
     description: "The criterion is too limiting, and may fail some good responses (e.g. if the prompt asks for a list of doctors often quoted in the media, a criterion states the list must include Dr. XYZ when many lists that answer the prompt might not)."
   },
   {
     name: "Criterion Weight Incorrect",
     description: "A criterion is weighted incorrectly."
   }
 ];
 
 const minorErrors = [
   {
     name: "Missing Citation",
     description: "A rubric item that is missing a citation. Not all rubric items require citations. However, if a reviewer is unsure of, skeptical of, or confused by a criterion and there is no supporting citation, this error tag may be applied at the reviewer's discretion."
   },
   {
     name: "Rationale Error",
     description: "A rubric item where the rationale is underdeveloped or unclear. If a reviewer is unsure of, skeptical of, or confused by a criterion and there is not proper justification in the rationale field, this error tag may be applied at the reviewer's discretion."
   },
   {
     name: "Wording Error",
     description: "A rubric item with errors in wording or language. For example, if a criterion does not start with a verb or a reference to the response making a statement or claim, the rubric item should be tagged for wording."
   },
   {
     name: "Improper Categorization",
     description: "A criterion's label is incorrect. For example, an explicit instruction from the prompt is tagged as \"Formatting\" instead of \"Instruction Following\"."
   }
 ];
 
 const CommonIssuesSection = () => {
   const [activeTab, setActiveTab] = useState("criterion");
 
   return (
     <div className="space-y-6">
       <div>
         <h2 className="text-2xl font-bold text-foreground mb-2">Common Issues</h2>
         <p className="text-muted-foreground">
           Learn to identify and avoid common problems that make rubrics unreliable or unfair. 
           These issues fall into two categories: problems with individual criteria, and problems 
           with the rubric as a whole.
         </p>
       </div>
 
       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
           <TabsTrigger value="criterion" className="text-sm">
             Criterion-Level Issues
           </TabsTrigger>
           <TabsTrigger value="rubric" className="text-sm">
             Rubric-Level Issues
           </TabsTrigger>
           <TabsTrigger value="major-minor" className="text-sm">
             Major vs. Minor
           </TabsTrigger>
            <TabsTrigger value="all-complete" className="text-sm">
              All Components Complete
            </TabsTrigger>
            <TabsTrigger value="complete" className="text-sm">
              Complete!
            </TabsTrigger>
         </TabsList>
 
         <TabsContent value="criterion" className="mt-0">
           <div className="space-y-4">
             <div className="p-4 rounded-lg bg-muted/30 border border-border">
               <h3 className="font-semibold text-foreground mb-1">Criterion-Level Issues</h3>
               <p className="text-sm text-muted-foreground">
                 These are problems with individual rubric items. Each criterion you write must avoid 
                 these eight common errors to ensure consistent and reliable evaluations.
               </p>
             </div>
             <CriterionIssuesGrid />
           </div>
         </TabsContent>
 
         <TabsContent value="rubric" className="mt-0">
           <div className="space-y-4">
             <div className="p-4 rounded-lg bg-muted/30 border border-border">
               <h3 className="font-semibold text-foreground mb-1">Rubric-Level Issues</h3>
               <p className="text-sm text-muted-foreground">
                 These are problems that affect the rubric as a whole, even when individual criteria 
                 are well-written. Check for these issues after drafting your complete rubric.
               </p>
             </div>
             <RubricIssuesGrid />
           </div>
         </TabsContent>
 
         <TabsContent value="major-minor" className="mt-0">
           <div className="space-y-6">
             <div className="p-4 rounded-lg bg-muted/30 border border-border">
               <h3 className="font-semibold text-foreground mb-1">Major vs. Minor Issues</h3>
               <p className="text-sm text-muted-foreground">
                 <strong>Major Issues</strong> are critical errors that materially affect the quality of the task. <strong>Minor Issues</strong> are less significant errors that still need to be fixed. When either Major or Minor Issues are identified, the issues can either be fixed by the reviewer or the task can be sent back for fixing.
               </p>
             </div>
 
             {/* Major Errors */}
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <AlertOctagon className="w-5 h-5 text-destructive" />
                 <h4 className="text-base font-bold text-foreground">Major Errors</h4>
               </div>
               
               <div className="rounded-xl border-2 border-destructive/30 overflow-hidden">
                 <div className="divide-y divide-destructive/20">
                   {majorErrors.map((error, index) => (
                     <div key={index} className="p-4 bg-destructive/5 hover:bg-destructive/10 transition-colors">
                       <div className="flex items-start gap-3">
                         <span className="px-2 py-1 rounded bg-destructive/20 text-destructive text-xs font-bold flex-shrink-0">MAJOR</span>
                         <div>
                           <h5 className="font-semibold text-foreground mb-1">{error.name}</h5>
                           <p className="text-sm text-foreground/80">{error.description}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
 
             {/* Minor Errors */}
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <AlertTriangle className="w-5 h-5 text-warning" />
                 <h4 className="text-base font-bold text-foreground">Minor Errors</h4>
               </div>
               
               <div className="rounded-xl border-2 border-warning/30 overflow-hidden">
                 <div className="divide-y divide-warning/20">
                   {minorErrors.map((error, index) => (
                     <div key={index} className="p-4 bg-warning/5 hover:bg-warning/10 transition-colors">
                       <div className="flex items-start gap-3">
                         <span className="px-2 py-1 rounded bg-warning/20 text-warning text-xs font-bold flex-shrink-0">MINOR</span>
                         <div>
                           <h5 className="font-semibold text-foreground mb-1">{error.name}</h5>
                           <p className="text-sm text-foreground/80">{error.description}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </TabsContent>

          <TabsContent value="all-complete" className="mt-0">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">The Task Process</h3>
                <p className="text-muted-foreground">Components that matter in doing this well</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                {/* Prompt */}
                <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center flex-1">
                      <h4 className="text-lg font-bold text-primary">Prompt</h4>
                      <p className="text-sm text-muted-foreground">The instruction that defines what the model should do</p>
                    </div>
                  </div>
                </div>

                {/* Input Files - nested */}
                <div className="ml-8 p-4 rounded-xl border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="text-center flex-1">
                      <h4 className="text-base font-bold text-primary">+ Input Files</h4>
                      <p className="text-sm text-muted-foreground">Supporting documents and data</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-2">
                  <ChevronDown className="w-6 h-6 text-warning" />
                </div>

                {/* Golden Example Deliverable */}
                <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center flex-1">
                      <h4 className="text-lg font-bold text-primary">Golden Example Deliverable</h4>
                      <p className="text-sm text-muted-foreground">Your attempt at the actual output</p>
                      <p className="text-xs text-muted-foreground/70 italic">Use the deliverable to help inform the rubric</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-2">
                  <ChevronDown className="w-6 h-6 text-primary" />
                </div>

                {/* Rubric */}
                <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center flex-1">
                      <h4 className="text-lg font-bold text-primary">Rubric</h4>
                      <p className="text-sm text-muted-foreground">Criteria that define what makes a good response</p>
                    </div>
                  </div>
                </div>

                {/* All Complete Banner */}
                <div className="p-6 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-warning/10">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold text-foreground">All Components Complete!</h4>
                      <Sparkles className="w-5 h-5 text-warning" />
                    </div>
                    <p className="text-muted-foreground">
                      You now understand all the key parts of creating high-quality training data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="complete" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">You're Ready!</h3>
              <p className="text-lg text-muted-foreground max-w-xl mb-8">
                You now have the foundation to write prompts and create rubrics that challenge AI and contribute to meaningful model improvements.
              </p>
              
              <div className="space-y-4 mt-4">
                <p className="text-sm uppercase tracking-wider text-muted-foreground">Course Completion Code</p>
                <p className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-black tracking-widest text-primary leading-none">
                  HX9Q-7M3K-P2VD
                </p>
                <p className="text-muted-foreground mt-4">
                  Save this code as proof of completion.
                </p>
                <p className="text-primary font-semibold text-lg mt-6">
                  Go create something that matters.
                </p>
              </div>
            </div>
          </TabsContent>
       </Tabs>
     </div>
   );
 };
 
 export default CommonIssuesSection;