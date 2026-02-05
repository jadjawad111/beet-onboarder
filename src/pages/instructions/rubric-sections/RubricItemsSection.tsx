 import { ListChecks, MessageSquareQuote, Scale, Tag, Link, Hash, AlertCircle, ExternalLink } from "lucide-react";
 import { cn } from "@/lib/utils";

 interface RubricItemsSectionProps {
   onNavigate?: (sectionId: string) => void;
 }
 
 const RubricItemsSection = ({ onNavigate }: RubricItemsSectionProps) => {
  const principles = [
    {
      name: "Atomicity",
      description: "Each criterion evaluates exactly one concept"
    },
    {
      name: "Self-Containment",
      description: "A criterion can be evaluated using only the information it contains (plus the response being graded)."
    },
    {
      name: "Objectivity",
      description: "Criteria use specific, measurable language—not vague qualifiers"
    },
    {
      name: "Independence",
      description: "Criteria do not reference or depend on other criteria"
    },
    {
      name: "Binary Evaluation",
      description: "Each criterion is clearly satisfied or not satisfied—no partial credit"
    },
    {
      name: "Weight Calibration",
      description: "Weights reflect relative importance to task success"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <ListChecks className="w-7 h-7 text-primary" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-foreground mb-2">Rubric Components</h3>
            <p className="text-base text-foreground leading-relaxed">
              For this project, each criterion requires the following 6 pieces of supporting information.
            </p>
          </div>
        </div>
      </div>

      {/* The 6 Components */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Criterion */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">1. Criterion</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A statement that asserts what a model response would do to earn points. It should be clear, concise, readable, and atomic. It should be evaluable (there should never be ambiguity in whether or not a model response has fulfilled the criteria). These statements should be binary – they can only be true or false, with no shades of grey.
          </p>
        </div>

        {/* Rationale */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquareQuote className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">2. Rationale</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A brief explanation of why this criterion is included.
          </p>
        </div>

        {/* Weight */}
         <button
           onClick={() => onNavigate?.("weighting")}
           className={cn(
             "rounded-xl border-2 border-border bg-card p-5 transition-colors text-left",
             onNavigate ? "hover:border-primary/50 hover:bg-primary/5 cursor-pointer group" : "hover:border-primary/30"
           )}
         >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
             <h4 className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
               3. Weight
               {onNavigate && <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
             </h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A score representing its relative importance compared to all other points in the rubric.
          </p>
         </button>

        {/* Category */}
         <button
           onClick={() => onNavigate?.("categories")}
           className={cn(
             "rounded-xl border-2 border-border bg-card p-5 transition-colors text-left",
             onNavigate ? "hover:border-primary/50 hover:bg-primary/5 cursor-pointer group" : "hover:border-primary/30"
           )}
         >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary" />
            </div>
             <h4 className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
               4. Category
               {onNavigate && <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
             </h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Each criterion must fall under one of the designated categories: Instruction Following, Reasoning, Extraction, or Formatting.
          </p>
         </button>

        {/* Citation */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Link className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">5. Citation</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            A publicly accessible web URL that supports the decision for including the criterion. Citations are optional, but they are required when the criterion depends on factual information.
          </p>
        </div>

        {/* Implicit/Explicit */}
        <div className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Hash className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-foreground">6. Implicit/Explicit</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Tag each criterion as Implicit or Explicit to clarify where the requirement comes from.
          </p>
        </div>
      </div>

      {/* Principles Table */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Key Principles for Writing Criteria</p>
        </div>
        <div className="divide-y divide-border">
          {principles.map((principle, index) => (
            <div key={index} className="p-4 flex items-start gap-4">
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold min-w-fit">
                {principle.name}
              </span>
              <p className="text-sm text-foreground">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Minimum and Max Criteria */}
      <div className="p-5 rounded-xl bg-warning/10 border-2 border-warning/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-warning/15 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Criteria Count Requirements</h4>
            <div className="space-y-2 text-sm text-foreground">
              <p><strong className="text-warning">Minimum 20 criteria:</strong> A rubric with less than 20 criteria is insufficient to capture all of the elements of the response we need to evaluate.</p>
              <p><strong className="text-warning">Maximum 250 criteria:</strong> So many items makes evaluating an accurate response difficult. Too many criteria diminishes the importance of each criteria.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Vocab */}
      <div className="rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="font-semibold text-foreground mb-3">Common Vocab / Acronyms</h4>
        <ul className="space-y-2 text-sm text-foreground">
          <li><strong>C1, C2, C3…</strong> = Short-hand for rubric 'Criterion 1', 'Criterion 2', etc. You may see these abbreviations in feedback from reviewers (e.g. C1 has issues with stacking because…)</li>
          <li><strong>R1, R2</strong> = 'Review 1', 'Review 2'. These are the review tiers for the project. Tasks are usually reviewed at R1 and potentially again at R2.</li>
        </ul>
      </div>
 
       {/* Example Section */}
       <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
         <div className="p-4 bg-muted/50 border-b border-border">
           <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Example</p>
         </div>
         
         <div className="p-6 space-y-6">
           {/* Prompt */}
           <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
             <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Task Prompt</p>
             <p className="text-foreground italic">What's a convenient restaurant that I can walk to from 123 Main Street?</p>
           </div>
 
           {/* Rubric */}
           <div>
             <p className="text-sm font-semibold text-muted-foreground mb-3">Rubric:</p>
             <div className="space-y-2">
               <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                 <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold">55 pts</span>
                 <span className="text-foreground">Mentions that Jane's Tavern is at 482 Main Street</span>
               </div>
               <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                 <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold">35 pts</span>
                 <span className="text-foreground">Mentions that Jane's Tavern is about a 20 minute walk from 123 Main Street</span>
               </div>
               <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                 <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold">15 pts</span>
                 <span className="text-foreground">Mentions that 482 Main Street is 1 mile from 123 Main Street</span>
               </div>
             </div>
             <p className="text-sm text-muted-foreground mt-3 italic">
               Note: Item 3 is "extra credit" – it's not strictly necessary to answer the prompt, but it helps provide good context for a quality answer.
             </p>
           </div>
 
           {/* Explanation */}
           <div className="p-4 rounded-xl bg-muted/30 border border-border">
             <p className="text-sm text-foreground leading-relaxed">
               Each criterion touches upon one element of a good response: <strong>1</strong> requires that a specific valid answer to the question is provided, <strong>2</strong> proves that the answer is valid, and <strong>3</strong> provides validation. Multiple answers could be various levels of correct; this rubric helps us enumerate which answers are better than others!
             </p>
           </div>
         </div>
       </div>
 
       {/* Scored Response Examples */}
       <div className="space-y-4">
         <h4 className="text-base font-semibold text-foreground">How Responses Get Scored</h4>
         
         <div className="grid gap-4">
           {/* Response 1 */}
           <div className="rounded-xl border-2 border-orange-500/30 bg-orange-50/30 dark:bg-orange-950/20 overflow-hidden">
             <div className="px-4 py-3 bg-orange-500/10 border-b border-orange-500/20 flex items-center justify-between">
               <span className="font-semibold text-foreground">Response 1</span>
               <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-700 dark:text-orange-300 text-sm font-bold">55/105 pts</span>
             </div>
             <div className="p-4">
               <p className="text-foreground mb-3 italic">"One restaurant that fits the bill is Jane's Tavern at 482 Main Street."</p>
               <p className="text-sm text-muted-foreground">This response is good – it answers the question – but it doesn't provide any information about why it is convenient.</p>
             </div>
           </div>
 
           {/* Response 2 */}
           <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/30 dark:bg-yellow-950/20 overflow-hidden">
             <div className="px-4 py-3 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-between">
               <span className="font-semibold text-foreground">Response 2</span>
               <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-sm font-bold">70/105 pts</span>
             </div>
             <div className="p-4">
               <p className="text-foreground mb-3 italic">"Jane's Tavern at 482 Main Street is 1 mile from 123 Main Street, which is highly walkable!"</p>
               <p className="text-sm text-muted-foreground">This response is better, but could be improved by including information about what a 1 mile walk looks like.</p>
             </div>
           </div>
 
           {/* Response 3 */}
           <div className="rounded-xl border-2 border-green-500/30 bg-green-50/30 dark:bg-green-950/20 overflow-hidden">
             <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20 flex items-center justify-between">
               <span className="font-semibold text-foreground">Response 3</span>
               <span className="px-2 py-1 rounded bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-bold">105/105 pts</span>
             </div>
             <div className="p-4">
               <p className="text-foreground mb-3 italic">"Jane's Tavern at 482 Main Street is 1 mile away, or about a 20 minute walk. If you're a fast walker, you might get there sooner!"</p>
               <p className="text-sm text-muted-foreground">This is the best response of all – the total score here is 105 points!</p>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default RubricItemsSection;
