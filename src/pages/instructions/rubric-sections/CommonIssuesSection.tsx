 import { useState } from "react";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertOctagon, AlertTriangle } from "lucide-react";
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
          <TabsList className="grid w-full grid-cols-3 mb-6">
           <TabsTrigger value="criterion" className="text-sm">
             Criterion-Level Issues
           </TabsTrigger>
           <TabsTrigger value="rubric" className="text-sm">
             Rubric-Level Issues
           </TabsTrigger>
           <TabsTrigger value="major-minor" className="text-sm">
             Major vs. Minor
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
       </Tabs>
     </div>
   );
 };
 
 export default CommonIssuesSection;