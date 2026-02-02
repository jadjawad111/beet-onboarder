import { Target, CheckCircle2, XCircle, Lightbulb, AlertTriangle } from "lucide-react";

const SpecificitySection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">General vs Specific Criteria</h3>
            <p className="text-base text-foreground leading-relaxed">
              Every truly ideal response should score 100% on your rubric. Any non-ideal response should score below 100%.
            </p>
          </div>
        </div>
      </div>

      {/* Principle */}
      <div className="p-5 rounded-xl bg-muted/30 border border-border">
        <p className="text-foreground leading-relaxed">
          Every request is to some extent verifiable, and this extent varies from request to request. You should attempt to <strong className="text-primary">rightsize the specificity</strong> of your rubric items to the request.
        </p>
      </div>

      {/* Verifiability Levels */}
      <div className="space-y-5">
        {/* Highly Verifiable */}
        <div className="rounded-xl border-2 border-green-500/30 bg-green-50/30 dark:bg-green-950/20 overflow-hidden">
          <div className="px-5 py-4 bg-green-500/10 border-b border-green-500/20">
            <span className="font-bold text-foreground">Highly Verifiable – One Objective Answer</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              In cases where one true answer exists, it is important that we explicitly describe that one true answer in our criteria.
            </p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prompt</p>
              <p className="text-sm text-foreground italic mb-4">
                "What are the 5 highest grossing (adjusted for inflation as of June 2020) American films made before 1980? How much did they each gross at the time of their production? Calculate their gross adjusted for inflation based on the price of tickets in 2020 and the total number of tickets each movie has sold."
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Good</span>
                  </div>
                  <p className="text-sm text-foreground">"States that Gone with The Wind is the highest grossing American film made before 1980."</p>
                  <p className="text-xs text-muted-foreground mt-2">Category: Reasoning (or potentially Extraction)</p>
                </div>
                
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-semibold text-destructive">Bad</span>
                  </div>
                  <p className="text-sm text-foreground">"Includes the highest grossing American film made before 1980."</p>
                  <p className="text-xs text-muted-foreground mt-2">Category: Instruction Following (too vague!)</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-foreground">
                <strong>Note for finance and quantitative sciences:</strong> always include a ± to account for differences in rounding.
              </p>
            </div>
          </div>
        </div>

        {/* Verifiable but Too Many Items */}
        <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/30 dark:bg-yellow-950/20 overflow-hidden">
          <div className="px-5 py-4 bg-yellow-500/10 border-b border-yellow-500/20">
            <span className="font-bold text-foreground">Verifiable, But Too Many Items</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              In cases where the range grows to an inordinate number (greater than 20), we need to generalize our criteria. There are multiple ways to do this, and we should attempt to specify the traits that characterize the set of correct answers.
            </p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prompt</p>
              <p className="text-sm text-foreground italic mb-4">
                "Attached are the prices and earnings of every stock in the S&P 500. Please return a new spreadsheet with the P/E ratio for each one."
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Good</span>
                  </div>
                  <p className="text-sm text-foreground">"Calculates price to earnings ratio for each stock listed with '=price/earnings'"</p>
                  <p className="text-xs text-muted-foreground mt-2">Uses a formula to describe the pattern</p>
                </div>
                
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-semibold text-destructive">Bad</span>
                  </div>
                  <div className="text-sm text-foreground space-y-1">
                    <p>"Criterion 1: Calculates P/E ratio of AAPL as 37.2."</p>
                    <p>"Criterion 2: Calculates P/E ratio of AMZN as 32.1."</p>
                    <p className="text-muted-foreground">…500 more criteria…</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Semi-Verifiable */}
        <div className="rounded-xl border-2 border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/20 overflow-hidden">
          <div className="px-5 py-4 bg-purple-500/10 border-b border-purple-500/20">
            <span className="font-bold text-foreground">Semi-Verifiable – An Allowable Range</span>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              In cases where a range of allowable answers exist, we should provide the range.
            </p>
            
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
              <p className="text-sm text-foreground italic mb-4">
                "I used to run in my free time during college but I haven't done any cardiovascular training in five years. I want to run a 5k but find it hard to fit training into my schedule..."
              </p>
              
              <div className="space-y-3">
                <p className="text-sm text-foreground">
                  If there are two possible answers for where the exercises may occur, we must provide both as concrete rubric items:
                </p>
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <p className="text-sm text-foreground"><strong>Criterion 1:</strong> "The exercise program suggests Fort Green park as one potential location for exercising."</p>
                  <p className="text-xs text-muted-foreground mt-1">Rationale: There are only two large parks near downtown Brooklyn. The user specifically requested to work out in parks. Fort Green is one of the two.</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <p className="text-sm text-foreground"><strong>Criterion 2:</strong> "The exercise program suggests Prospect Park as one potential location for exercising."</p>
                </div>
                <p className="text-sm text-muted-foreground">OR, alternatively:</p>
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <p className="text-sm text-foreground"><strong>Criterion 1:</strong> "The exercise program suggests parks in south Brooklyn as locations."</p>
                  <p className="text-xs text-muted-foreground mt-1">Category: Instruction Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning about restrictiveness */}
      <div className="p-5 rounded-xl bg-warning/10 border-2 border-warning/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-warning/15 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Avoid Being Too Restrictive</h4>
            <p className="text-sm text-foreground leading-relaxed">
              We must be careful to not word criteria in restrictive ways, for example by prescribing that only one single park is allowable when multiple parks are adequate or by prescribing one single way to word a document.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-xs font-semibold text-destructive">Too Restrictive</span>
                </div>
                <p className="text-xs text-foreground">"Creates document titled 'Change Control Standard Operating Procedure (SOP) v_1.00.docx'"</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">Appropriately Flexible</span>
                </div>
                <p className="text-xs text-foreground">"Creates a document with a title that indicates it is an SOP for Change Management"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Takeaway</h4>
            <p className="text-sm text-foreground leading-relaxed">
              Rightsize the specificity of your rubric items to the request. Be specific enough to validate correct answers, but not so specific that you reject valid alternatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificitySection;
