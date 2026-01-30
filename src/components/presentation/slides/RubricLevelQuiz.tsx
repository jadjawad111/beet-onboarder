import { useState, useMemo } from "react";
import { AlertTriangle, Search, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
}

const RubricLevelQuiz = ({
  elementNumber,
  elementName,
  definition,
  examplePrompt,
  whatsWrong,
  badCriteria,
  goodCriteria,
  detectHeuristics,
  howToFix,
}: RubricLevelQuizProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Randomize order based on element number (seeded for consistency per slide)
  const showGoodFirst = useMemo(() => {
    return elementNumber % 2 === 0;
  }, [elementNumber]);

  return (
    <div className="space-y-6">
      {/* Definition Card */}
      <Card>
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">What is this error?</p>
              <p className="text-foreground">{definition}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Prompt */}
      <Card>
        <CardContent className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Example Prompt</p>
          <p className="text-foreground leading-relaxed">"{examplePrompt}"</p>
        </CardContent>
      </Card>

      {/* What's Wrong / Missing */}
      {whatsWrong && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-amber-600 font-medium mb-2">Example: What's Wrong?</p>
            <p className="text-sm text-muted-foreground">{whatsWrong}</p>
          </CardContent>
        </Card>
      )}

      {/* Bad vs Good Criteria Comparison (order randomized) */}
      {badCriteria.length > 0 && (
        <div className="space-y-4">
          {showGoodFirst ? (
            <>
              {/* Good Criteria First */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-green-600 font-medium">
                  Criterion A {goodCriteria.length > 1 ? "(examples)" : ""}
                </p>
                {goodCriteria.map((criterion, index) => (
                  <Card key={index} className="border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-foreground">"{criterion.text}"</p>
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
                          <p className="text-xs text-muted-foreground">→ {criterion.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bad Criteria Second */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-destructive font-medium">
                  Criterion B {badCriteria.length > 1 ? "(examples)" : ""}
                </p>
                {badCriteria.map((criterion, index) => (
                  <Card key={index} className="border-destructive/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-foreground">"{criterion.text}"</p>
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
                          <p className="text-xs text-muted-foreground">→ {criterion.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Bad Criteria First */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-destructive font-medium">
                  Criterion A {badCriteria.length > 1 ? "(examples)" : ""}
                </p>
                {badCriteria.map((criterion, index) => (
                  <Card key={index} className="border-destructive/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-foreground">"{criterion.text}"</p>
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
                          <p className="text-xs text-muted-foreground">→ {criterion.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Good Criteria Second */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-green-600 font-medium">
                  Criterion B {goodCriteria.length > 1 ? "(examples)" : ""}
                </p>
                {goodCriteria.map((criterion, index) => (
                  <Card key={index} className="border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-foreground">"{criterion.text}"</p>
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
                          <p className="text-xs text-muted-foreground">→ {criterion.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Reveal Button */}
      {!isRevealed && (
        <button
          onClick={() => setIsRevealed(true)}
          className="w-full py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-sm font-medium text-foreground"
        >
          Show Detection Tips & How to Fix
        </button>
      )}

      {/* Revealed Content */}
      {isRevealed && (
        <div className="space-y-4 animate-in fade-in duration-300 pt-4 border-t border-border">
          {/* How to Detect */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">How to Detect</p>
              </div>
              <ul className="space-y-2">
                {detectHeuristics.map((heuristic, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{heuristic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* How to Fix */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">How to Fix</p>
              </div>
              <p className="text-sm text-muted-foreground">{howToFix}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RubricLevelQuiz;
