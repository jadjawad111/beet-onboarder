import { AlertTriangle, Lightbulb, Search, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface InsightBox {
  title: string;
  paragraphs: string[];
}

interface RubricLevelQuizProps {
  elementNumber: number;
  elementName: string;
  definition: string;
  examplePrompt: string;
  whatsWrong: string;
  badCriteria: Array<{
    text: string;
    weight?: number;
    label?: string;
    explanation: string;
  }>;
  goodCriteria: Array<{
    text: string;
    weight?: number;
    label?: string;
    explanation: string;
  }>;
  detectHeuristics: string[];
  howToFix: string;
  insightBox?: InsightBox;
}

const RubricLevelQuiz = ({
  definition,
  examplePrompt,
  whatsWrong,
  badCriteria,
  goodCriteria,
  detectHeuristics,
  howToFix,
  insightBox,
}: RubricLevelQuizProps) => {
  return (
    <div className="space-y-8">
      {/* Definition Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">What is this error?</p>
              <p className="text-base text-foreground leading-relaxed">{definition}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Prompt */}
      <Card>
        <CardContent className="p-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Example Prompt</p>
          <p className="text-base text-foreground leading-relaxed">"{examplePrompt}"</p>
        </CardContent>
      </Card>

      {/* What's Wrong / Missing */}
      {whatsWrong && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wide text-amber-600 font-medium mb-2">What's Wrong?</p>
            <p className="text-base text-muted-foreground leading-relaxed">{whatsWrong}</p>
          </CardContent>
        </Card>
      )}

      {/* Bad Criteria Table */}
      {badCriteria.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-destructive font-semibold">
            Bad {badCriteria.length > 1 ? "Criteria" : "Criterion"}
          </p>
          <div className="border border-destructive/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-destructive/5 border-b border-destructive/20">
                  <th className="text-left p-4 text-sm font-medium text-foreground w-1/2">Criterion</th>
                  <th className="text-left p-4 text-sm font-medium text-foreground w-1/2">Why It's Wrong</th>
                </tr>
              </thead>
              <tbody>
                {badCriteria.map((criterion, index) => (
                  <tr key={index} className={index !== badCriteria.length - 1 ? "border-b border-destructive/10" : ""}>
                    <td className="p-4 align-top">
                      <p className="text-base text-foreground">"{criterion.text}"</p>
                      <div className="flex gap-2 mt-2">
                        {criterion.weight !== undefined && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                            Weight: {criterion.weight}
                          </span>
                        )}
                        {criterion.label && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                            {criterion.label}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-base text-muted-foreground">{criterion.explanation}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Insight Box - displayed after Bad Criteria */}
      {insightBox && (
        <Card className="border-amber-400/40 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-amber-400/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{insightBox.title}</p>
                {insightBox.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base text-foreground/90 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Good Criteria Table */}
      {goodCriteria.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-green-600 font-semibold">
            Good {goodCriteria.length > 1 ? "Criteria" : "Criterion"} (Fixed)
          </p>
          <div className="border border-green-500/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-green-500/5 border-b border-green-500/20">
                  <th className="text-left p-4 text-sm font-medium text-foreground w-1/2">Criterion</th>
                  <th className="text-left p-4 text-sm font-medium text-foreground w-1/2">Why It Works</th>
                </tr>
              </thead>
              <tbody>
                {goodCriteria.map((criterion, index) => (
                  <tr key={index} className={index !== goodCriteria.length - 1 ? "border-b border-green-500/10" : ""}>
                    <td className="p-4 align-top">
                      <p className="text-base text-foreground">"{criterion.text}"</p>
                      <div className="flex gap-2 mt-2">
                        {criterion.weight !== undefined && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600">
                            Weight: {criterion.weight}
                          </span>
                        )}
                        {criterion.label && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600">
                            {criterion.label}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-base text-muted-foreground">{criterion.explanation}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detection Tips & How to Fix - Always Visible */}
      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
        {/* How to Detect */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">How to Detect</p>
            </div>
            <ul className="space-y-3">
              {detectHeuristics.map((heuristic, index) => (
                <li key={index} className="text-base text-muted-foreground flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{heuristic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* How to Fix */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">How to Fix</p>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">{howToFix}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RubricLevelQuiz;
