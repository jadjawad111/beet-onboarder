 import { useState } from "react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import { X } from "lucide-react";
 import CriterionErrorQuiz from "./CriterionErrorQuiz";
 
 // Data for all 8 criterion-level issues
 const CRITERION_ISSUES = [
   {
     num: 1,
     id: "ambiguous",
     name: "Ambiguous",
     desc: "Uses subjective language or undefined standards",
     definition: "A criterion is ambiguous when a judge model cannot reliably mark it true or false because it uses subjective language, undefined standards, or fuzzy thresholds. Ambiguity leads to inconsistent scoring across evaluators and future responses.",
     examplePrompt: "You are a consultant. Create a 6-slide proposal deck (PDF) that includes: Problem Summary, Proposed Approach, Timeline, Risks & Mitigations.",
     optionA: "The proposal deck is well-organized.",
     optionB: "The proposal deck includes a slide titled 'Risks and Mitigations'.",
     correctOption: "B" as const,
     whyBadExplanation: '"Well-organized" is subjective and open to interpretation. Different judges may disagree on whether the criterion is satisfied.',
     whyGoodExplanation: "It checks for a specific, observable artifact that can be evaluated consistently.",
     detectHeuristics: [
       'Look for subjective adjectives like "good," "clear," "professional," or "correct."',
       'Look for undefined standards such as "best practices" or "high quality."',
     ],
     quickTest: "Could two reasonable reviewers disagree while reading the same output?",
     howToFix: "Replace subjective language with observable, concrete requirements such as sections, headings, exact statements, or clearly defined thresholds.",
   },
   {
     num: 2,
     id: "not-self-contained",
     name: "Not Self-contained",
     desc: "Relies on external context the judge can't access",
     definition: "A criterion is not self-contained when it relies on information outside the criterion and the deliverable. The judge model evaluates each criterion in isolation and does not read the prompt, input files, or links.",
     examplePrompt: "Using the data below, write a one-page Q1 sales summary (PDF). Data: January = $310k, February = $420k, March = $510k.",
     optionA: "The summary includes the total Q1 sales from the input data.",
     optionB: "The summary states total Q1 sales are $1,240,000.",
     correctOption: "B" as const,
     whyBadExplanation: 'The judge model does not have access to "the input data" and cannot verify the criterion.',
     whyGoodExplanation: "All required context is included directly in the criterion.",
     detectHeuristics: [
       'Look for references like "from the prompt," "from the input file," or "as described above."',
       "Look for pronouns that require external context.",
     ],
     quickTest: "Could someone judge this criterion using only the criterion text and the deliverable?",
     howToFix: "Include the specific values, names, or statements directly in the criterion so it can be evaluated independently.",
   },
   {
     num: 3,
     id: "stacked",
     name: "Stacked",
     desc: "Bundles multiple independent checks into one",
     definition: "A criterion is stacked when it measures two or more independent checks at once. Because scoring is binary, partial success still results in failure, creating noisy and unfair scoring.",
     examplePrompt: "Write a kickoff email that includes: (1) meeting date, (2) Zoom link, (3) agenda bullets.",
     optionA: "The email includes the meeting date and the Zoom link.",
     optionB: "The email includes the meeting date.",
     correctOption: "B" as const,
     whyBadExplanation: "It bundles two independent requirements into one true or false check.",
     whyGoodExplanation: "It evaluates a single requirement and can be paired with another criterion.",
     detectHeuristics: [
       'Look for "and," "as well as," or multiple nouns in one criterion.',
       "Ask whether partial compliance is possible.",
     ],
     quickTest: "Could a response satisfy part of this criterion but still fail it?",
     howToFix: "Split stacked criteria into multiple atomic criteria, one per requirement.",
   },
   {
     num: 4,
     id: "convoluted",
     name: "Convoluted Phrasing",
     desc: "Longer or more complex than necessary",
     definition: "A criterion has convoluted phrasing when it is longer or more complex than necessary, making it harder to interpret consistently.",
     examplePrompt: "Write a one-page summary report that includes a table summarizing 2026 farm produce totals.",
     optionA: "The summary report has a table in it where the title indicates that it is meant to be a summary of the values for farm produce production for 2026.",
     optionB: "The table in the Summary Report includes a title indicating it summarizes farm produce production for 2026.",
     correctOption: "B" as const,
     whyBadExplanation: "It is wordy, indirect, and harder to parse.",
     whyGoodExplanation: "It is concise, direct, and easy to evaluate.",
     detectHeuristics: [
       "Look for long dependent clauses or repeated phrasing.",
       "Notice if you have to reread the criterion.",
     ],
     quickTest: "Can you rewrite it in one shorter sentence without losing meaning?",
     howToFix: 'Use a consistent, simple template like: "The [deliverable or section] includes [specific, observable detail]."',
   },
   {
     num: 5,
     id: "process-words",
     name: "Process Words",
     desc: "Evaluates how it was made, not what it is",
     definition: "A criterion uses process words when it evaluates how the deliverable was produced rather than what the deliverable contains or is.",
     examplePrompt: "Create a sample track in MP4 format.",
     optionA: "The sample track is converted into an MP4 file.",
     optionB: "The sample track is an MP4 file.",
     correctOption: "B" as const,
     whyBadExplanation: '"Converted" describes a process that is not observable in the final output.',
     whyGoodExplanation: "It evaluates the observable state of the deliverable.",
     detectHeuristics: [
       'Look for verbs like "converted," "validated," "ensured," or "followed."',
       "Look for phrases describing intent or method.",
     ],
     quickTest: "Could the deliverable be correct even if you do not know how it was made?",
     howToFix: "Rewrite process-based criteria to check the observable output state.",
   },
   {
     num: 6,
     id: "incorrect-label",
     name: "Incorrect Label",
     desc: "Implicit/Explicit label doesn't match whether requirement is stated",
     definition: "The Implicit/Explicit label is incorrect when it does not align with whether the requirement is directly stated in the prompt (Explicit) or implied by the task and requires intermediate steps or domain judgment (Implicit).",
     examplePrompt: "Using the client's tax documents, prepare a 1040 return (PDF) with all appropriate schedules.",
     optionA: "The 1040 package includes Schedule A. [Labeled: Explicit]",
     optionB: "The 1040 package is in PDF format. [Labeled: Explicit]",
     correctOption: "B" as const,
     whyBadExplanation: "Whether Schedule A is required depends on interpreting the client's documents → should be Implicit, not Explicit.",
     whyGoodExplanation: "Prompt directly says PDF, so Explicit label is correct.",
     detectHeuristics: [
       "Traceability test: Can you point to a sentence in the prompt that directly states the requirement? Yes → Explicit. No → Implicit, if the criterion measures something that requires intermediate steps to satisfy a prompt requirement or requires professional judgment.",
     ],
     quickTest: "Is this requirement directly stated word-for-word in the prompt?",
     howToFix: "Try to map each criterion to a specific statement or request in the prompt. If it isn't explicitly stated, it is likely implicit.",
   },
   {
     num: 7,
     id: "inaccurate-weighting",
     name: "Inaccurate Weighting",
     desc: "Weight doesn't reflect relative importance",
     definition: "A criterion has inaccurate weighting when its weight doesn't reflect its relative importance for the prompt and deliverable. This can cause minor polish items to outweigh core correctness—or make catastrophic failures barely matter.",
     examplePrompt: "Draft a one-page safety incident report template. Must include: incident date, location, what happened, and any injuries. Use clear headings. The report should be modifiable in a Word Document.",
     optionA: "The report includes a placeholder for the incident date. [Weight: +20]",
     optionB: "The report includes a placeholder for the incident date. [Weight: +90]",
     correctOption: "B" as const,
     whyBadExplanation: "Date is a core requirement; +20 is too low and doesn't reflect its importance.",
     whyGoodExplanation: "Date is a core requirement, weighted appropriately at +90.",
     detectHeuristics: [
       "Pairwise test: If two responses differ only on this criterion, should that decide the winner? If no but weight is high → overweighted. If yes but weight is low → underweighted.",
       "Coverage balance test: Add up weights mentally—do 'nice-to-haves' collectively outweigh core requirements?",
     ],
     quickTest: "Does this weight match how important this criterion really is?",
     howToFix: "Re-anchor: assign 80–100 to true core requirements, 10–30 to polish, and reserve strong negatives for catastrophic failures.",
   },
   {
     num: 8,
     id: "restrictive",
     name: "Restrictive",
     desc: "Overfits to a narrow version of the 'right answer'",
     definition: "A criterion is restrictive when it overfits to a narrow version of the 'right answer,' making the rubric fail the Generalizable Rubric rule. Restrictive criteria often enforce exact wording, arbitrary counts, or specific examples that aren't required—excluding many valid responses.",
     examplePrompt: "Write a short executive summary of a quarterly update. Include: revenue, major risks, and next-quarter priorities. Keep it concise, under 500 words.",
     optionA: "The executive summary is exactly 200 words.",
     optionB: "The executive summary is between 100 - 500 words.",
     correctOption: "B" as const,
     whyBadExplanation: '"Concise" does not mean exactly 200 words; many valid summaries could be 150 or 250. This overfits to one narrow interpretation.',
     whyGoodExplanation: "Allows a reasonable range while still being judgeable—generalizable and flexible.",
     detectHeuristics: [
       "Look for exactness where the prompt allows flexibility: exact word counts, exact number of bullets, exact ordering, exact phrasing.",
       "'Paraphrase test': If the deliverable uses synonyms or a different but equivalent structure, would this criterion incorrectly fail? If yes → restrictive.",
     ],
     quickTest: "Would a valid alternative approach fail this criterion unfairly?",
     howToFix: "Replace exact constraints with checks for the underlying requirement (presence of required elements). Only use quotes when the prompt explicitly demands exact text.",
   },
 ];
 
 interface CriterionIssuesGridProps {
   onGateUnlock?: () => void;
 }
 
 const CriterionIssuesGrid = ({ onGateUnlock }: CriterionIssuesGridProps) => {
   const [selectedIssue, setSelectedIssue] = useState<typeof CRITERION_ISSUES[0] | null>(null);
   const [completedIssues, setCompletedIssues] = useState<Set<string>>(new Set());
 
   const handleIssueComplete = (issueId: string) => {
     setCompletedIssues(prev => {
       const next = new Set(prev);
       next.add(issueId);
       // If all 8 are complete, unlock the gate
       if (next.size === 8) {
         onGateUnlock?.();
       }
       return next;
     });
   };
 
   return (
     <>
       <div className="space-y-6">
         <p className="text-muted-foreground">
           Each criterion you write must avoid these eight common errors. A criterion that violates any of these will cause inconsistent or unreliable evaluations.
         </p>
         <p className="text-sm text-muted-foreground">
           Click any issue to learn more and test your understanding.
         </p>
         <div className="grid gap-3">
           {CRITERION_ISSUES.map((item) => {
             const isComplete = completedIssues.has(item.id);
             return (
               <button
                 key={item.num}
                 onClick={() => setSelectedIssue(item)}
                 className="p-4 rounded-lg border-2 border-border bg-card hover:border-primary/40 hover:bg-muted/50 transition-all text-left group"
               >
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                     isComplete 
                       ? "bg-green-500/20 text-green-600" 
                       : "bg-destructive/10 text-destructive"
                   }`}>
                     {isComplete ? "✓" : item.num}
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
         
         {completedIssues.size > 0 && (
           <div className="text-center text-sm text-muted-foreground">
             {completedIssues.size} of 8 issues reviewed
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
               <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center font-bold text-destructive text-sm">
                 {selectedIssue?.num}
               </div>
               {selectedIssue?.name}
             </DialogTitle>
           </DialogHeader>
           
           {selectedIssue && (
             <div className="mt-4">
               <CriterionErrorQuiz
                 elementNumber={selectedIssue.num}
                 elementName={selectedIssue.name}
                 definition={selectedIssue.definition}
                 examplePrompt={selectedIssue.examplePrompt}
                 optionA={selectedIssue.optionA}
                 optionB={selectedIssue.optionB}
                 correctOption={selectedIssue.correctOption}
                 whyBadExplanation={selectedIssue.whyBadExplanation}
                 whyGoodExplanation={selectedIssue.whyGoodExplanation}
                 detectHeuristics={selectedIssue.detectHeuristics}
                 quickTest={selectedIssue.quickTest}
                 howToFix={selectedIssue.howToFix}
                 onOptionSelected={() => handleIssueComplete(selectedIssue.id)}
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
 
 export default CriterionIssuesGrid;