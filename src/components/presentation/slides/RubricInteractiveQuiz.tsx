import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  ExternalLink,
  Trophy,
  Target
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  onComplete?: () => void;
  onGateUnlock?: () => void;
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
  onComplete,
  onGateUnlock,
}: RubricInteractiveQuizProps) => {
  const [answers, setAnswers] = useState<Record<number, CriterionAnswer>>(() => {
    const initial: Record<number, CriterionAnswer> = {};
    criteria.forEach(c => {
      initial[c.id] = { hasError: null, errorType: null };
    });
    return initial;
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [submittedCriteria, setSubmittedCriteria] = useState<Set<number>>(new Set());

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

  const isCriterionAnswered = (criterionId: number): boolean => {
    const answer = answers[criterionId];
    if (answer.hasError === null) return false;
    if (answer.hasError === "yes" && answer.errorType === null) return false;
    return true;
  };

  const allAnswered = useMemo(() => {
    return criteria.every(c => isCriterionAnswered(c.id));
  }, [answers, criteria]);

  const handleSubmitAll = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    // Mark all criteria as submitted
    setSubmittedCriteria(new Set(criteria.map(c => c.id)));
  };

  const handleSubmitCriterion = (criterionId: number) => {
    if (!isCriterionAnswered(criterionId)) return;
    setSubmittedCriteria(prev => new Set(prev).add(criterionId));
  };

  const isCriterionSubmitted = (criterionId: number): boolean => {
    return submitted || submittedCriteria.has(criterionId);
  };

  // Trigger onComplete/onGateUnlock when submitted or all criteria submitted individually
  useEffect(() => {
    const allSubmittedIndividually = criteria.every(c => submittedCriteria.has(c.id));
    if (submitted || allSubmittedIndividually) {
      onComplete?.();
      onGateUnlock?.();
    }
  }, [submitted, submittedCriteria, criteria, onComplete, onGateUnlock]);

  const getScore = (criterion: CriterionData, answer: CriterionAnswer): "full" | "partial" | "none" => {
    const userSaysError = answer.hasError === "yes";
    const actuallyHasError = criterion.hasError;

    if (userSaysError === actuallyHasError) {
      if (!actuallyHasError) {
        return "full";
      } else {
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

  const embedUrl = useMemo(() => {
    const match = deliverableUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return deliverableUrl;
  }, [deliverableUrl]);

  const answeredCount = criteria.filter(c => isCriterionAnswered(c.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Exercise #{exerciseNumber}</h2>
      </div>

      {/* Prompt */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">Prompt</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-sm leading-relaxed whitespace-pre-wrap border max-h-[200px] overflow-y-auto">
            {prompt}
          </div>
        </CardContent>
      </Card>

      {/* Deliverable */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">Deliverable</span>
            </div>
            <a
              href={deliverableUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="rounded-lg overflow-hidden border bg-white">
            <iframe
              src={embedUrl}
              className="w-full h-[350px]"
              allow="autoplay"
              title={deliverableTitle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Progress: <strong>{answeredCount}</strong> / {criteria.length} answered
        </span>
        {!submitted && answeredCount === criteria.length && (
          <span className="text-green-600 font-medium">Ready to submit!</span>
        )}
      </div>

      {/* Rubric Criteria Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rubric Criteria</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="min-w-[300px]">Criterion</TableHead>
                <TableHead className="w-16 text-center">Weight</TableHead>
                <TableHead className="w-36">Category</TableHead>
                <TableHead className="w-28 text-center">Error?</TableHead>
                <TableHead className="min-w-[180px]">Error Type</TableHead>
                <TableHead className="w-24 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion) => {
                const answer = answers[criterion.id];
                const isThisSubmitted = isCriterionSubmitted(criterion.id);
                const score = isThisSubmitted ? getScore(criterion, answer) : null;
                const canSubmitThis = isCriterionAnswered(criterion.id) && !isThisSubmitted;
                
                return (
                  <React.Fragment key={criterion.id}>
                    <TableRow
                      className={cn(
                        "transition-colors",
                        isThisSubmitted && score === "full" && "bg-green-500/5",
                        isThisSubmitted && score === "partial" && "bg-amber-500/5",
                        isThisSubmitted && score === "none" && "bg-destructive/5"
                      )}
                    >
                      <TableCell className="text-center font-medium text-muted-foreground">
                        {criterion.id}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{criterion.text}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium">{criterion.weight}</span>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full whitespace-nowrap",
                          categoryColors[criterion.category]
                        )}>
                          {criterion.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => handleHasErrorChange(criterion.id, "no")}
                            disabled={isThisSubmitted}
                            className={cn(
                              "px-2 py-1 text-xs rounded transition-all",
                              answer.hasError === "no" 
                                ? "bg-green-500 text-white" 
                                : "bg-muted hover:bg-muted/80 text-muted-foreground",
                              isThisSubmitted && "cursor-default opacity-70"
                            )}
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleHasErrorChange(criterion.id, "yes")}
                            disabled={isThisSubmitted}
                            className={cn(
                              "px-2 py-1 text-xs rounded transition-all",
                              answer.hasError === "yes" 
                                ? "bg-destructive text-white" 
                                : "bg-muted hover:bg-muted/80 text-muted-foreground",
                              isThisSubmitted && "cursor-default opacity-70"
                            )}
                          >
                            Yes
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {answer.hasError === "yes" && !isThisSubmitted && (
                          <select
                            value={answer.errorType ?? ""}
                            onChange={(e) => handleErrorTypeChange(criterion.id, e.target.value as ErrorType)}
                            className={cn(
                              "w-full text-xs p-1.5 rounded border bg-background",
                              !answer.errorType && "text-muted-foreground"
                            )}
                          >
                            <option value="">Select...</option>
                            {errorTypeOptions.map((type) => (
                              <option key={type} value={type}>
                                {errorTypeLabels[type]}
                              </option>
                            ))}
                          </select>
                        )}
                        {answer.hasError === "yes" && isThisSubmitted && (
                          <span className="text-xs">{answer.errorType ? errorTypeLabels[answer.errorType] : "—"}</span>
                        )}
                        {answer.hasError === "no" && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                        {answer.hasError === null && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {isThisSubmitted ? (
                          <div className="flex justify-center">
                            {score === "full" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                            {score === "partial" && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                            {score === "none" && <XCircle className="w-5 h-5 text-destructive" />}
                          </div>
                        ) : canSubmitThis ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSubmitCriterion(criterion.id)}
                            className="text-xs h-7 px-2"
                          >
                            Check
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                    
                    {/* Feedback row (shown after criterion is submitted) */}
                    {isThisSubmitted && (
                      <TableRow key={`${criterion.id}-feedback`}>
                        <TableCell colSpan={7} className="bg-muted/30 p-0">
                          <div className={cn(
                            "p-3 border-l-4",
                            score === "full" && "border-l-green-500",
                            score === "partial" && "border-l-amber-500",
                            score === "none" && "border-l-destructive"
                          )}>
                            <div className="space-y-1.5 text-sm">
                              <p className="font-medium">
                                {criterion.hasError ? (
                                  <>Correct: <span className="text-destructive">{errorTypeLabels[criterion.errorType!]}</span></>
                                ) : (
                                  <span className="text-green-600">No error — criterion is correct</span>
                                )}
                              </p>
                              {criterion.explanation && (
                                <p className="text-muted-foreground text-xs">
                                  <strong>Why:</strong> {criterion.explanation}
                                </p>
                              )}
                              {criterion.howToFix && (
                                <p className="text-muted-foreground text-xs">
                                  <strong>Fix:</strong> {criterion.howToFix}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Submit All Button */}
      {!submitted && (
        <div className="mt-6">
          <Button 
            onClick={handleSubmitAll} 
            size="lg" 
            className="w-full text-lg py-6"
            disabled={!allAnswered}
          >
            {allAnswered 
              ? "Submit All Answers" 
              : `Complete all criteria to submit (${answeredCount}/${criteria.length})`
            }
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
                <p className="text-muted-foreground">Final Results</p>
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

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Total criteria</span>
                <span className="font-medium">{results.total}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Criteria with errors</span>
                <span className="font-medium">{results.criteriaWithErrors}</span>
              </div>
              {results.mostMissedType && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Most frequently missed</span>
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
