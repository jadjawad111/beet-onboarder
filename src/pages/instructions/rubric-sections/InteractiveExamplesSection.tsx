 import { useState } from "react";
 import { ClipboardCheck, ChevronDown, ChevronUp } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
 import RubricInteractiveQuiz from "@/components/presentation/slides/RubricInteractiveQuiz";
 import { exercise1Prompt, exercise1DeliverableUrl, exercise1Criteria } from "@/data/rubricQuizExercise1";
 import { exercise2Prompt, exercise2DeliverableUrl, exercise2Criteria } from "@/data/rubricQuizExercise2";
 import { cn } from "@/lib/utils";
 
 const InteractiveExamplesSection = () => {
   const [exercise1Open, setExercise1Open] = useState(false);
   const [exercise2Open, setExercise2Open] = useState(false);
   const [exercise1Complete, setExercise1Complete] = useState(false);
   const [exercise2Complete, setExercise2Complete] = useState(false);
 
   return (
     <div className="space-y-6">
       <div>
         <h2 className="text-2xl font-bold text-foreground mb-2">Interactive Examples</h2>
         <p className="text-muted-foreground">
           Practice identifying rubric errors with these hands-on exercises. Review real rubric criteria 
           and determine whether each one contains an error—and if so, what type.
         </p>
       </div>
 
       {/* Instructions */}
       <Card className="bg-primary/5 border-primary/20">
         <CardContent className="p-4">
           <div className="flex items-start gap-3">
             <ClipboardCheck className="w-5 h-5 text-primary mt-0.5" />
             <div>
               <h4 className="font-medium mb-1 text-foreground">How It Works</h4>
               <p className="text-sm text-muted-foreground">
                 Each exercise presents a prompt, deliverable, and rubric criteria. For each criterion, 
                 decide if it has an error and identify the error type. You can check individual answers 
                 or submit all at once to see your results.
               </p>
             </div>
           </div>
         </CardContent>
       </Card>
 
       {/* Exercise #1 */}
       <Collapsible open={exercise1Open} onOpenChange={setExercise1Open}>
         <Card className={cn(
           "transition-colors border-2",
           exercise1Complete ? "border-green-500/30 bg-green-500/5" : "border-border"
         )}>
           <CollapsibleTrigger asChild>
             <button className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors rounded-t-lg">
               <div className="flex items-center gap-3">
                 <div className={cn(
                   "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
                   exercise1Complete 
                     ? "bg-green-500 text-white" 
                     : "bg-primary/15 text-primary"
                 )}>
                   {exercise1Complete ? "✓" : "1"}
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground">Exercise #1</h3>
                   <p className="text-sm text-muted-foreground">Real Estate Brochure Rubric (25 criteria)</p>
                 </div>
               </div>
               {exercise1Open ? (
                 <ChevronUp className="w-5 h-5 text-muted-foreground" />
               ) : (
                 <ChevronDown className="w-5 h-5 text-muted-foreground" />
               )}
             </button>
           </CollapsibleTrigger>
           <CollapsibleContent>
             <CardContent className="pt-0 pb-6 px-4">
               <RubricInteractiveQuiz
                 exerciseNumber={1}
                 prompt={exercise1Prompt}
                 deliverableUrl={exercise1DeliverableUrl}
                 deliverableTitle="Real Estate Brochure"
                 criteria={exercise1Criteria}
                 onComplete={() => setExercise1Complete(true)}
               />
             </CardContent>
           </CollapsibleContent>
         </Card>
       </Collapsible>
 
       {/* Exercise #2 */}
       <Collapsible open={exercise2Open} onOpenChange={setExercise2Open}>
         <Card className={cn(
           "transition-colors border-2",
           exercise2Complete ? "border-green-500/30 bg-green-500/5" : "border-border"
         )}>
           <CollapsibleTrigger asChild>
             <button className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors rounded-t-lg">
               <div className="flex items-center gap-3">
                 <div className={cn(
                   "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
                   exercise2Complete 
                     ? "bg-green-500 text-white" 
                     : "bg-primary/15 text-primary"
                 )}>
                   {exercise2Complete ? "✓" : "2"}
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground">Exercise #2</h3>
                   <p className="text-sm text-muted-foreground">School & Real Estate Report Rubric (25 criteria)</p>
                 </div>
               </div>
               {exercise2Open ? (
                 <ChevronUp className="w-5 h-5 text-muted-foreground" />
               ) : (
                 <ChevronDown className="w-5 h-5 text-muted-foreground" />
               )}
             </button>
           </CollapsibleTrigger>
           <CollapsibleContent>
             <CardContent className="pt-0 pb-6 px-4">
               <RubricInteractiveQuiz
                 exerciseNumber={2}
                 prompt={exercise2Prompt}
                 deliverableUrl={exercise2DeliverableUrl}
                 deliverableTitle="School & Real Estate Report"
                 criteria={exercise2Criteria}
                 onComplete={() => setExercise2Complete(true)}
               />
             </CardContent>
           </CollapsibleContent>
         </Card>
       </Collapsible>
     </div>
   );
 };
 
 export default InteractiveExamplesSection;