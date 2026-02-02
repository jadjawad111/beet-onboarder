import { BookOpen, Target, ListChecks } from "lucide-react";

const IntroductionSection = () => {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Welcome to Project Beet</h3>
            <p className="text-base text-foreground leading-relaxed">
              In this half of the project, we will write and edit rubrics that will be used to train and evaluate large language models.
            </p>
          </div>
        </div>
      </div>

      {/* What is a rubric? */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          What is a rubric?
        </h3>
        <div className="p-5 rounded-xl bg-card border border-border">
          <p className="text-foreground leading-relaxed mb-4">
            A rubric is a collection of criteria that collectively define a good response to a specific prompt. The goal of the rubric is to grade the quality of any current or future response to a specific prompt.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Your rubric will be a generally-applicable list of specific criteria that, when taken as a whole, can evaluate any possible response to your prompt. Each criterion will be a simple, declarative statement that can be evaluated as true or false for any given response. Each criterion will also have an associated point value that will be awarded to a given response if that statement is true.
          </p>
          <p className="text-foreground leading-relaxed">
            Together, the rubric "paints a picture" of a good response, and allows us to enumerate or rank responses.
          </p>
        </div>
      </div>

      {/* Example */}
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

export default IntroductionSection;
