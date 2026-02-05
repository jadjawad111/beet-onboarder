 import { useState } from "react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import RubricLevelQuiz from "./RubricLevelQuiz";
 
 // Data for all 3 rubric-level issues
 const RUBRIC_ISSUES = [
   {
     num: 1,
     id: "redundancy",
     name: "Redundancy",
     desc: "Criteria overlap with each other or check the same thing",
     definition: "Redundancy is a rubric-level error where criteria overlap with each other or check the same underlying requirement multiple times. This inflates the importance of certain aspects and creates unfair scoring when the same thing is evaluated twice.",
     examplePrompt: "Write a one-page executive summary. Include: company overview, key metrics, and next steps. Use professional tone throughout.",
     whatsWrong: "",
     badCriteria: [
       {
         text: "The summary includes a company overview section.",
         explanation: "Overlaps with the next criterion.",
       },
       {
         text: "The summary contains a paragraph describing the company.",
         explanation: "Checks the same requirement as 'company overview'—double-counting.",
       },
     ],
     goodCriteria: [
       {
         text: "The summary includes a company overview section.",
         explanation: "Single, clear criterion for this requirement.",
       },
     ],
     detectHeuristics: [
       "Overlap test: Would satisfying criterion A automatically satisfy criterion B (or vice versa)? If yes → redundant.",
       "Double-counting test: If a deliverable fails one criterion, would it likely also fail another? If yes → likely redundant.",
       "Semantic similarity test: Do two criteria use different words but check the same observable outcome?",
     ],
     howToFix: "Consolidate overlapping criteria into a single, clear criterion. Ensure each criterion measures a distinct aspect of the deliverable.",
   },
   {
     num: 2,
     id: "missing-criteria",
     name: "Missing Criteria",
     desc: "Fails to include criteria for essential requirements",
     definition: "Missing Criteria is a rubric-level error: the rubric fails to include criteria for one or more essential requirements (core prompt asks, critical failure modes, or key quality dimensions). This allows clearly bad or incomplete deliverables to score well.",
     examplePrompt: "You are a luxury travel advisor. Create a ≤3-page PDF with a numbered list of Forbes 5-star NYC hotels. For each hotel: header, polished description, full address, amenities. Bold pet-friendly and swimming-related amenities.",
     whatsWrong: "Since the prompt explicitly requests a PDF, omitting a criterion that verifies the deliverable is a PDF would leave a critical gap in the rubric.",
     badCriteria: [],
     goodCriteria: [],
     detectHeuristics: [
       "Do a prompt decomposition and make a checklist of explicit must-haves. Verify each has at least one criterion.",
       "Run a 'bad-but-polished' thought experiment: Could a deliverable omit a core requirement and still score high? If yes → missing criteria.",
       "Check category coverage: Are Instruction Following + Reasoning + Formatting represented appropriately? (and Extraction when required)",
       "Check failure-mode coverage: Are common wrong responses penalized (negative criteria), especially for high-impact errors?",
     ],
     howToFix: "Start from a mock deliverable outline and ensure each major section/requirement is represented by at least one criterion. Add a small set of high-impact negative criteria for common catastrophic mistakes.",
   },
   {
     num: 3,
     id: "relative-weighting",
     name: "Relative Weighting",
     desc: "Relative weights across criteria don't reflect comparative importance",
     definition: "Relative weighting is a rubric-level error where the weights across criteria don't reflect their comparative importance. Even if individual weights seem reasonable in isolation, the relative balance between criteria may be off—causing minor items to collectively outweigh core requirements, or making similarly important criteria have vastly different weights.",
     examplePrompt: "Draft a one-page safety incident report template. Must include: incident date, location, what happened, and any injuries. Use clear headings. The report should be modifiable in a Word Document.",
     whatsWrong: "",
     badCriteria: [
       {
         text: "The report includes a placeholder for the incident date.",
         weight: 90,
         explanation: "Fine in isolation, but see the balance below...",
       },
       {
         text: "The report includes a placeholder for the location.",
         weight: 30,
         explanation: "Both are core requirements—why is location weighted so much lower than date?",
       },
       {
         text: "All headings in the report template are bolded.",
         weight: 90,
         explanation: "Minor formatting shouldn't equal core requirement weight.",
       },
     ],
     goodCriteria: [
       {
         text: "The report includes a placeholder for the incident date.",
         weight: 90,
         explanation: "Core requirement, appropriately weighted.",
       },
       {
         text: "The report includes a placeholder for the location.",
         weight: 90,
         explanation: "Core requirement, weighted consistently with similar items.",
       },
       {
         text: "All headings in the report template are bolded.",
         weight: 20,
         explanation: "Formatting is minor polish, weighted lower than core requirements.",
       },
     ],
     detectHeuristics: [
       "Pairwise comparison: Compare weights of similar-importance criteria—are they consistent?",
       "Category balance: Do 'polish' criteria collectively outweigh 'core' criteria?",
       "Proportionality test: Does a 90-weight criterion really matter 9× more than a 10-weight criterion?",
     ],
     howToFix: "Review weights in relation to each other, not just individually. Ensure core requirements have consistently high weights, and polish items are collectively less impactful than core correctness.",
   },
 ];
 
 interface RubricIssuesGridProps {
   onGateUnlock?: () => void;
 }
 
 const RubricIssuesGrid = ({ onGateUnlock }: RubricIssuesGridProps) => {
   const [selectedIssue, setSelectedIssue] = useState<typeof RUBRIC_ISSUES[0] | null>(null);
   const [viewedIssues, setViewedIssues] = useState<Set<string>>(new Set());
 
   const handleOpenIssue = (issue: typeof RUBRIC_ISSUES[0]) => {
     setSelectedIssue(issue);
     setViewedIssues(prev => {
       const next = new Set(prev);
       next.add(issue.id);
       // If all 3 are viewed, unlock the gate
       if (next.size === 3) {
         onGateUnlock?.();
       }
       return next;
     });
   };
 
   return (
     <>
       <div className="space-y-6">
         <p className="text-muted-foreground">
           These are rubric-level issues that affect overall quality. Unlike criterion-level errors, these problems span across the rubric as a whole.
         </p>
         <p className="text-sm text-muted-foreground">
           Click any issue to learn more.
         </p>
         <div className="grid gap-3">
           {RUBRIC_ISSUES.map((item) => {
             const isViewed = viewedIssues.has(item.id);
             return (
               <button
                 key={item.num}
                 onClick={() => handleOpenIssue(item)}
                 className="p-4 rounded-lg border-2 border-border bg-card hover:border-primary/40 hover:bg-muted/50 transition-all text-left group"
               >
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                     isViewed 
                       ? "bg-green-500/20 text-green-600" 
                       : "bg-amber-500/10 text-amber-600"
                   }`}>
                     {isViewed ? "✓" : item.num}
                   </div>
                   <div className="flex-1">
                     <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                     <p className="text-sm text-muted-foreground">{item.desc}</p>
                   </div>
                   <div className="text-muted-foreground group-hover:text-primary transition-colors">
                     →
                   </div>
                 </div>
               </button>
             );
           })}
         </div>
         
         {viewedIssues.size > 0 && (
           <div className="text-center text-sm text-muted-foreground">
             {viewedIssues.size} of 3 issues reviewed
           </div>
         )}
       </div>
 
       {/* Modal Dialog */}
       <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
         <DialogContent 
           className="max-w-4xl max-h-[90vh] overflow-y-auto"
           onPointerDownOutside={() => setSelectedIssue(null)}
           onEscapeKeyDown={() => setSelectedIssue(null)}
         >
           <DialogHeader>
             <DialogTitle className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-amber-600 text-sm">
                 {selectedIssue?.num}
               </div>
               {selectedIssue?.name}
             </DialogTitle>
           </DialogHeader>
           
           {selectedIssue && (
             <div className="mt-4">
               <RubricLevelQuiz
                 elementNumber={selectedIssue.num}
                 elementName={selectedIssue.name}
                 definition={selectedIssue.definition}
                 examplePrompt={selectedIssue.examplePrompt}
                 whatsWrong={selectedIssue.whatsWrong}
                 badCriteria={selectedIssue.badCriteria}
                 goodCriteria={selectedIssue.goodCriteria}
                 detectHeuristics={selectedIssue.detectHeuristics}
                 howToFix={selectedIssue.howToFix}
               />
             </div>
           )}
           
           <div className="mt-6 pt-4 border-t border-border text-center">
             <button
               onClick={() => setSelectedIssue(null)}
               className="text-sm text-muted-foreground hover:text-foreground transition-colors"
             >
               Click anywhere outside or press Escape to close
             </button>
           </div>
         </DialogContent>
       </Dialog>
     </>
   );
 };
 
 export default RubricIssuesGrid;