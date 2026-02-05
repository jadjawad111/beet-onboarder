 import { useState } from "react";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import CriterionIssuesGrid from "@/components/presentation/slides/CriterionIssuesGrid";
 import RubricIssuesGrid from "@/components/presentation/slides/RubricIssuesGrid";
 
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
         <TabsList className="grid w-full grid-cols-2 mb-6">
           <TabsTrigger value="criterion" className="text-sm">
             Criterion-Level Issues
           </TabsTrigger>
           <TabsTrigger value="rubric" className="text-sm">
             Rubric-Level Issues
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
       </Tabs>
     </div>
   );
 };
 
 export default CommonIssuesSection;