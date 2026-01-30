import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Trophy,
  Target
} from "lucide-react";

export type ErrorType = 
  | "ambiguous" 
  | "not-self-contained" 
  | "stacked" 
  | "convoluted-phrasing" 
  | "process-words";

export interface CriterionData {
  id: number;
  text: string;
  weight: number;
  category: "Instruction Following" | "Formatting" | "Reasoning";
  hasError: boolean;
  errorType?: ErrorType;
  explanation?: string;
  howToFix?: string;
}

interface RubricInteractiveQuizProps {
  exerciseNumber: number;
  prompt: string;
  deliverableUrl: string;
  deliverableTitle: string;
  criteria: CriterionData[];
}

const errorTypeLabels: Record<ErrorType, string> = {
  "ambiguous": "Ambiguous",
  "not-self-contained": "Not self-contained",
  "stacked": "Stacked",
  "convoluted-phrasing": "Convoluted phrasing",
  "process-words": "Process words",
};

const errorTypeOptions: ErrorType[] = [
  "ambiguous",
  "not-self-contained",
  "stacked",
  "convoluted-phrasing",
  "process-words",
];

const categoryColors: Record<string, string> = {
  "Instruction Following": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Formatting": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Reasoning": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

interface CriterionAnswer {
  hasError: "yes" | "no" | null;
  errorType: ErrorType | null;
}

const RubricInteractiveQuiz = ({
  exerciseNumber,
  prompt,
  deliverableUrl,
  deliverableTitle,
  criteria,
}: RubricInteractiveQuizProps) => {
  const [answers, setAnswers] = useState<Record<number, CriterionAnswer>>(() => {
    const initial: Record<number, CriterionAnswer> = {};
    criteria.forEach(c => {
      initial[c.id] = { hasError: null, errorType: null };
    });
    return initial;
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showDeliverable, setShowDeliverable] = useState(false);

  const handleHasErrorChange = (criterionId: number, value: "yes" | "no") => {
    if (submitted) return;
    setAnswers(prev => ({
      ...prev,
      [criterionId]: {
        hasError: value,
        errorType: value === "no" ? null : prev[criterionId].errorType,
      },
    }));
  };

  const handleErrorTypeChange = (criterionId: number, value: ErrorType) => {
    if (submitted) return;
    setAnswers(prev => ({
      ...prev,
      [criterionId]: {
        ...prev[criterionId],
        errorType: value,
      },
    }));
  };

  const allAnswered = useMemo(() => {
    return criteria.every(c => {
      const answer = answers[c.id];
      if (answer.hasError === null) return false;
      if (answer.hasError === "yes" && answer.errorType === null) return false;
      return true;
    });
  }, [answers, criteria]);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const getScore = (criterion: CriterionData, answer: CriterionAnswer): "full" | "partial" | "none" => {
    const userSaysError = answer.hasError === "yes";
    const actuallyHasError = criterion.hasError;

    if (userSaysError === actuallyHasError) {
      if (!actuallyHasError) {
        // Correctly identified no error
        return "full";
      } else {
        // Has error - check if type is correct
        if (answer.errorType === criterion.errorType) {
          return "full";
        } else {
          return "partial";
        }
      }
    }
    return "none";
  };

  const results = useMemo(() => {
    if (!submitted) return null;
    
    let fullCredit = 0;
    let partialCredit = 0;
    let noCredit = 0;
    const missedErrorTypes: Record<ErrorType, number> = {
      "ambiguous": 0,
      "not-self-contained": 0,
      "stacked": 0,
      "convoluted-phrasing": 0,
      "process-words": 0,
    };

    criteria.forEach(c => {
      const score = getScore(c, answers[c.id]);
      if (score === "full") fullCredit++;
      else if (score === "partial") partialCredit++;
      else noCredit++;

      // Track missed error types
      if (c.hasError && answers[c.id].hasError === "no") {
        missedErrorTypes[c.errorType!]++;
      } else if (c.hasError && answers[c.id].errorType !== c.errorType) {
        missedErrorTypes[c.errorType!]++;
      }
    });

    const mostMissed = Object.entries(missedErrorTypes)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])[0];

    return {
      total: criteria.length,
      fullCredit,
      partialCredit,
      noCredit,
      criteriaWithErrors: criteria.filter(c => c.hasError).length,
      mostMissedType: mostMissed ? mostMissed[0] as ErrorType : null,
      mostMissedCount: mostMissed ? mostMissed[1] : 0,
    };
  }, [submitted, criteria, answers]);

  // Convert Google Drive view link to embed link
  const embedUrl = useMemo(() => {
    const match = deliverableUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return deliverableUrl;
  }, [deliverableUrl]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Exercise #{exerciseNumber}</h2>
        <p className="text-muted-foreground text-lg">
          Review each rubric criterion and identify any errors.
        </p>
      </div>

      {/* Instructions Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <Target className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Learner Instructions</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• For each criterion, decide whether there are any errors</li>
                <li>• If yes, select the single best error type</li>
                <li>• Only these error types are in scope: <strong>Ambiguous</strong>, <strong>Not self-contained</strong>, <strong>Stacked</strong>, <strong>Convoluted phrasing</strong>, <strong>Process words</strong></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Prompt */}
      <Card>
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Canonical Prompt</span>
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">READ-ONLY</span>
          </div>
          {showPrompt ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {showPrompt && (
          <CardContent className="pt-0 pb-5 px-5">
            <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap border">
              {prompt}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Collapsible Deliverable */}
      <Card>
        <button
          onClick={() => setShowDeliverable(!showDeliverable)}
          className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Golden Deliverable</span>
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">READ-ONLY</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={deliverableUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink className="w-3 h-3" />
            </a>
            {showDeliverable ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>
        {showDeliverable && (
          <CardContent className="pt-0 pb-5 px-5">
            <div className="rounded-lg overflow-hidden border bg-white">
              <iframe
                src={embedUrl}
                className="w-full h-[500px]"
                allow="autoplay"
                title={deliverableTitle}
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Criteria List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rubric Criteria ({criteria.length})</h3>
        
        {criteria.map((criterion) => {
          const answer = answers[criterion.id];
          const score = submitted ? getScore(criterion, answer) : null;
          
          return (
            <Card 
              key={criterion.id}
              className={cn(
                "transition-all",
                submitted && score === "full" && "border-green-500/50 bg-green-500/5",
                submitted && score === "partial" && "border-amber-500/50 bg-amber-500/5",
                submitted && score === "none" && "border-destructive/50 bg-destructive/5"
              )}
            >
              <CardContent className="p-5">
                {/* Criterion Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-muted-foreground">#{criterion.id}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded", categoryColors[criterion.category])}>
                        {criterion.category}
                      </span>
                      <span className="text-xs text-muted-foreground">Weight: {criterion.weight}</span>
                      {submitted && (
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded",
                          score === "full" && "bg-green-500/20 text-green-600",
                          score === "partial" && "bg-amber-500/20 text-amber-600",
                          score === "none" && "bg-destructive/20 text-destructive"
                        )}>
                          {score === "full" && "Full Credit"}
                          {score === "partial" && "Partial Credit"}
                          {score === "none" && "No Credit"}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-medium text-foreground">{criterion.text}</p>
                  </div>
                </div>

                {/* Question: Any errors? */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Any errors here?</p>
                  <RadioGroup
                    value={answer.hasError ?? ""}
                    onValueChange={(value) => handleHasErrorChange(criterion.id, value as "yes" | "no")}
                    disabled={submitted}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${criterion.id}-no`} />
                      <Label htmlFor={`${criterion.id}-no`} className="cursor-pointer">
                        No, this criterion is correct
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${criterion.id}-yes`} />
                      <Label htmlFor={`${criterion.id}-yes`} className="cursor-pointer">
                        Yes, this criterion has an error
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Error Type Selection (if yes) */}
                  {answer.hasError === "yes" && (
                    <div className="mt-4 pl-4 border-l-2 border-muted">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        What type of error does this criterion have?
                      </p>
                      <RadioGroup
                        value={answer.errorType ?? ""}
                        onValueChange={(value) => handleErrorTypeChange(criterion.id, value as ErrorType)}
                        disabled={submitted}
                        className="grid grid-cols-2 gap-2"
                      >
                        {errorTypeOptions.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <RadioGroupItem value={type} id={`${criterion.id}-${type}`} />
                            <Label htmlFor={`${criterion.id}-${type}`} className="cursor-pointer text-sm">
                              {errorTypeLabels[type]}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {/* Feedback (after submission) */}
                  {submitted && (
                    <div className={cn(
                      "mt-4 p-4 rounded-lg border",
                      score === "full" && "bg-green-500/10 border-green-500/30",
                      score === "partial" && "bg-amber-500/10 border-amber-500/30",
                      score === "none" && "bg-destructive/10 border-destructive/30"
                    )}>
                      <div className="flex items-start gap-3">
                        {score === "full" && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                        {score === "partial" && <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />}
                        {score === "none" && <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />}
                        <div className="space-y-2">
                          {/* Correct Answer */}
                          <p className="font-semibold text-sm">
                            {criterion.hasError ? (
                              <>Error Type: <span className="text-destructive">{errorTypeLabels[criterion.errorType!]}</span></>
                            ) : (
                              <span className="text-green-600">No error — this criterion is correct</span>
                            )}
                          </p>
                          
                          {/* Explanation */}
                          {criterion.explanation && (
                            <p className="text-sm text-muted-foreground">
                              <strong>Why:</strong> {criterion.explanation}
                            </p>
                          )}
                          
                          {/* How to Fix */}
                          {criterion.howToFix && (
                            <p className="text-sm text-muted-foreground">
                              <strong>How to fix:</strong> {criterion.howToFix}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="sticky bottom-4 bg-background/95 backdrop-blur p-4 rounded-lg border shadow-lg">
          <Button 
            onClick={handleSubmit} 
            size="lg" 
            className="w-full text-lg py-6"
            disabled={!allAnswered}
          >
            {allAnswered ? "Submit All Answers" : `Answer all criteria to submit (${Object.values(answers).filter(a => a.hasError !== null && (a.hasError === "no" || a.errorType !== null)).length}/${criteria.length})`}
          </Button>
        </div>
      )}

      {/* Summary Screen */}
      {submitted && results && (
        <Card className="border-2 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Exercise Complete</h3>
                <p className="text-muted-foreground">Here's how you did</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                <p className="text-3xl font-bold text-green-600">{results.fullCredit}</p>
                <p className="text-sm text-muted-foreground">Full Credit</p>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center">
                <p className="text-3xl font-bold text-amber-600">{results.partialCredit}</p>
                <p className="text-sm text-muted-foreground">Partial Credit</p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                <p className="text-3xl font-bold text-destructive">{results.noCredit}</p>
                <p className="text-sm text-muted-foreground">No Credit</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Total criteria reviewed</span>
                <span className="font-medium">{results.total}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Criteria with errors</span>
                <span className="font-medium">{results.criteriaWithErrors}</span>
              </div>
              {results.mostMissedType && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Most frequently missed error type</span>
                  <span className="font-medium text-destructive">
                    {errorTypeLabels[results.mostMissedType]} ({results.mostMissedCount})
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RubricInteractiveQuiz;
