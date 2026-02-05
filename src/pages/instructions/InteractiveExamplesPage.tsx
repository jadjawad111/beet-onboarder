 import { ClipboardCheck } from "lucide-react";
 import { InteractiveExamplesSection } from "./rubric-sections";
 
 const InteractiveExamplesPage = () => {
   return (
     <div className="min-h-screen bg-background">
       <div className="max-w-5xl mx-auto">
         {/* Header */}
         <div className="p-6 md:p-8 border-b border-border">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
               <ClipboardCheck className="h-6 w-6 text-primary" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-foreground">Interactive Examples</h1>
               <p className="text-muted-foreground">Practice with real rubric exercises</p>
             </div>
           </div>
         </div>
 
         {/* Main Content */}
         <main className="p-6 md:p-8 lg:p-10">
           <InteractiveExamplesSection />
         </main>
       </div>
     </div>
   );
 };
 
 export default InteractiveExamplesPage;