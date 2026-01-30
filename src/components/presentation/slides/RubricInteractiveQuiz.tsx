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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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

  const toggleRowExpanded = (id: number) => {
    if (submitted) return;
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
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
    // Expand all rows to show feedback
    setExpandedRows(new Set(criteria.map(c => c.id)));
  };

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

  const answeredCount = Object.values(answers).filter(a => 
    a.hasError !== null && (a.hasError === "no" || a.errorType !== null)
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Exercise #{exerciseNumber}</h2>
        <p className="text-muted-foreground">
          Review each rubric criterion and identify any errors.
        </p>
      </div>

      {/* Instructions Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">Instructions</p>
              <p className="text-muted-foreground">
                For each criterion: select <strong>No Error</strong> or <strong>Has Error</strong>. 
                If error, choose the type: Ambiguous, Not self-contained, Stacked, Convoluted phrasing, or Process words.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Prompt */}
      <Card>
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">Prompt</span>
          </div>
          {showPrompt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showPrompt && (
          <CardContent className="pt-0 pb-4 px-4">
            <div className="bg-muted/50 rounded-lg p-3 text-sm leading-relaxed whitespace-pre-wrap border">
              {prompt}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Collapsible Deliverable */}
      <Card>
        <button
          onClick={() => setShowDeliverable(!showDeliverable)}
          className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">Deliverable</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={deliverableUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Open <ExternalLink className="w-3 h-3" />
            </a>
            {showDeliverable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        {showDeliverable && (
          <CardContent className="pt-0 pb-4 px-4">
            <div className="rounded-lg overflow-hidden border bg-white">
              <iframe
                src={embedUrl}
                className="w-full h-[400px]"
                allow="autoplay"
                title={deliverableTitle}
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Rubric Criteria Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rubric Criteria</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="min-w-[300px]">Criterion</TableHead>
                <TableHead className="w-20 text-center">Weight</TableHead>
                <TableHead className="w-40">Category</TableHead>
                <TableHead className="w-32 text-center">Any Error?</TableHead>
                <TableHead className="w-44">Error Type</TableHead>
                {submitted && <TableHead className="w-24 text-center">Result</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion) => {
                const answer = answers[criterion.id];
                const score = submitted ? getScore(criterion, answer) : null;
                const isExpanded = expandedRows.has(criterion.id);
                
                return (
                  <>
                    <TableRow 
                      key={criterion.id}
                      className={cn(
                        "transition-colors",
                        submitted && score === "full" && "bg-green-500/5",
                        submitted && score === "partial" && "bg-amber-500/5",
                        submitted && score === "none" && "bg-destructive/5"
                      )}
                    >
                      <TableCell className="text-center font-medium text-muted-foreground">
                        {criterion.id}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => toggleRowExpanded(criterion.id)}
                          className="text-left hover:text-primary transition-colors w-full"
                          disabled={!submitted}
                        >
                          <span className="text-sm">{criterion.text}</span>
                        </button>
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
                            disabled={submitted}
                            className={cn(
                              "px-2 py-1 text-xs rounded transition-all",
                              answer.hasError === "no" 
                                ? "bg-green-500 text-white" 
                                : "bg-muted hover:bg-muted/80 text-muted-foreground",
                              submitted && "cursor-default"
                            )}
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleHasErrorChange(criterion.id, "yes")}
                            disabled={submitted}
                            className={cn(
                              "px-2 py-1 text-xs rounded transition-all",
                              answer.hasError === "yes" 
                                ? "bg-destructive text-white" 
                                : "bg-muted hover:bg-muted/80 text-muted-foreground",
                              submitted && "cursor-default"
                            )}
                          >
                            Yes
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {answer.hasError === "yes" && (
                          <select
                            value={answer.errorType ?? ""}
                            onChange={(e) => handleErrorTypeChange(criterion.id, e.target.value as ErrorType)}
                            disabled={submitted}
                            className={cn(
                              "w-full text-xs p-1.5 rounded border bg-background",
                              !answer.errorType && "text-muted-foreground"
                            )}
                          >
                            <option value="">Select type...</option>
                            {errorTypeOptions.map((type) => (
                              <option key={type} value={type}>
                                {errorTypeLabels[type]}
                              </option>
                            ))}
                          </select>
                        )}
                        {answer.hasError === "no" && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      {submitted && (
                        <TableCell className="text-center">
                          {score === "full" && (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                            </span>
                          )}
                          {score === "partial" && (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                              <AlertTriangle className="w-4 h-4" />
                            </span>
                          )}
                          {score === "none" && (
                            <span className="inline-flex items-center gap-1 text-xs text-destructive">
                              <XCircle className="w-4 h-4" />
                            </span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                    
                    {/* Expanded feedback row */}
                    {submitted && isExpanded && (
                      <TableRow key={`${criterion.id}-feedback`}>
                        <TableCell colSpan={7} className="bg-muted/30 p-0">
                          <div className={cn(
                            "p-4 border-l-4",
                            score === "full" && "border-l-green-500",
                            score === "partial" && "border-l-amber-500",
                            score === "none" && "border-l-destructive"
                          )}>
                            <div className="space-y-2 text-sm">
                              <p className="font-medium">
                                {criterion.hasError ? (
                                  <>Correct Answer: <span className="text-destructive">{errorTypeLabels[criterion.errorType!]}</span></>
                                ) : (
                                  <span className="text-green-600">No error — this criterion is correct</span>
                                )}
                              </p>
                              {criterion.explanation && (
                                <p className="text-muted-foreground">
                                  <strong>Why:</strong> {criterion.explanation}
                                </p>
                              )}
                              {criterion.howToFix && (
                                <p className="text-muted-foreground">
                                  <strong>Fix:</strong> {criterion.howToFix}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
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
                <p className="text-muted-foreground">Click any row to see detailed feedback</p>
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
                <span className="text-muted-foreground">Total criteria reviewed</span>
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
