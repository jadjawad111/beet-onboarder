import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  ExternalLink,
  ChevronDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  category: "Instruction Following" | "Formatting" | "Reasoning" | "Tone and Style" | "Domain Knowledge" | "Practical Application" | "Process" | "Professional Judgment" | "Extraction";
  rationale?: string;
  hasError?: boolean;
  errorType?: ErrorType;
  explanation?: string;
  howToFix?: string;
}

interface Deliverable {
  url: string;
  title: string;
}

interface RubricInteractiveQuizProps {
  exerciseNumber: number;
  prompt: string;
  deliverableUrl?: string;
  deliverableTitle?: string;
  deliverables?: Deliverable[];
  criteria: CriterionData[];
  onComplete?: () => void;
  onGateUnlock?: () => void;
}

const categoryColors: Record<string, string> = {
  "Instruction Following": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Formatting": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Reasoning": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Tone and Style": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Domain Knowledge": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Practical Application": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "Process": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Professional Judgment": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "Extraction": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

const errorTypeLabels: Record<ErrorType, string> = {
  "ambiguous": "Ambiguous",
  "not-self-contained": "Not self-contained",
  "stacked": "Stacked",
  "convoluted-phrasing": "Convoluted phrasing",
  "process-words": "Process words",
};

const RubricInteractiveQuiz = ({
  exerciseNumber,
  prompt,
  deliverableUrl,
  deliverableTitle,
  deliverables,
  criteria,
  onComplete,
  onGateUnlock,
}: RubricInteractiveQuizProps) => {
  // Normalize to array of deliverables
  const allDeliverables: Deliverable[] = useMemo(() => {
    if (deliverables && deliverables.length > 0) {
      return deliverables;
    }
    if (deliverableUrl && deliverableTitle) {
      return [{ url: deliverableUrl, title: deliverableTitle }];
    }
    return [];
  }, [deliverables, deliverableUrl, deliverableTitle]);

  // Track user answers: null = not answered, true = has error, false = no error
  const [answers, setAnswers] = useState<Record<number, boolean | null>>(() => {
    const initial: Record<number, boolean | null> = {};
    criteria.forEach(c => {
      initial[c.id] = null;
    });
    return initial;
  });

  // Track selected error types
  const [selectedErrorTypes, setSelectedErrorTypes] = useState<Record<number, ErrorType | null>>(() => {
    const initial: Record<number, ErrorType | null> = {};
    criteria.forEach(c => {
      initial[c.id] = null;
    });
    return initial;
  });

  // Count answered questions
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(a => a !== null).length;
  }, [answers]);

  const handleAnswerChange = (criterionId: number, hasError: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [criterionId]: hasError,
    }));

    // Clear error type if user selects "No"
    if (!hasError) {
      setSelectedErrorTypes(prev => ({
        ...prev,
        [criterionId]: null,
      }));
    }

    // Check if all answered after this change
    const newAnswers = { ...answers, [criterionId]: hasError };
    const allAnswered = Object.values(newAnswers).every(a => a !== null);
    if (allAnswered && onComplete) {
      onComplete();
    }
    if (allAnswered && onGateUnlock) {
      onGateUnlock();
    }
  };

  const handleErrorTypeChange = (criterionId: number, errorType: ErrorType) => {
    setSelectedErrorTypes(prev => ({
      ...prev,
      [criterionId]: errorType,
    }));
  };

  const getEmbedUrl = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  return (
    <div className="space-y-6 w-full">
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
          <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap border max-h-[500px] overflow-y-auto">
            {prompt}
          </div>
        </CardContent>
      </Card>

      {/* Deliverables */}
      {allDeliverables.map((deliverable, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm">
                  {allDeliverables.length > 1 ? `Deliverable ${index + 1}: ${deliverable.title}` : "Deliverable"}
                </span>
              </div>
              <a
                href={deliverable.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Open in new tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="rounded-lg overflow-hidden border bg-white">
              <iframe
                src={getEmbedUrl(deliverable.url)}
                className="w-full h-[875px]"
                allow="autoplay"
                title={deliverable.title}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Progress */}
      <div className="text-sm text-muted-foreground">
        Progress: <span className="font-bold text-foreground">{answeredCount}</span> / {criteria.length} answered
      </div>

      {/* Rubric Criteria Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rubric Criteria</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="min-w-[250px]">Criterion</TableHead>
                <TableHead className="w-20 text-center">Weight</TableHead>
                <TableHead className="w-40">Category</TableHead>
                <TableHead className="w-28 text-center">Error?</TableHead>
                <TableHead className="min-w-[180px]">Error Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion) => (
                <TableRow key={criterion.id}>
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
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleAnswerChange(criterion.id, false)}
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-l-md border transition-colors",
                          answers[criterion.id] === false
                            ? "bg-muted text-foreground border-border"
                            : "bg-background text-muted-foreground border-border hover:bg-muted/50"
                        )}
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleAnswerChange(criterion.id, true)}
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-r-md border-t border-r border-b transition-colors",
                          answers[criterion.id] === true
                            ? "bg-muted text-foreground border-border"
                            : "bg-background text-muted-foreground border-border hover:bg-muted/50"
                        )}
                      >
                        Yes
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {answers[criterion.id] === true ? (
                      <Select
                        value={selectedErrorTypes[criterion.id] || ""}
                        onValueChange={(value) => handleErrorTypeChange(criterion.id, value as ErrorType)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Select error type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(errorTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value} className="text-xs">
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RubricInteractiveQuiz;
