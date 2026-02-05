 import { Check, Sparkles, ChevronDown } from "lucide-react";
 
 const AllComponentsCompleteSection = () => {
   return (
     <div className="space-y-6">
       <div className="text-center mb-8">
         <h2 className="text-2xl font-bold text-foreground mb-2">The Task Process</h2>
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
   );
 };
 
 export default AllComponentsCompleteSection;