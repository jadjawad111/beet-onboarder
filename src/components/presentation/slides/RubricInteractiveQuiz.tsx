import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  ExternalLink,
  StickyNote
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

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
  category: "Instruction Following" | "Formatting" | "Reasoning" | "Tone and Style" | "Domain Knowledge" | "Practical Application" | "Process" | "Professional Judgment";
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
};

const RubricInteractiveQuiz = ({
  exerciseNumber,
  prompt,
  deliverableUrl,
  deliverableTitle,
  deliverables,
  criteria,
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

  // Local notes state (not saved)
  const [notes, setNotes] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    criteria.forEach(c => {
      initial[c.id] = "";
    });
    return initial;
  });

  const handleNoteChange = (criterionId: number, value: string) => {
    setNotes(prev => ({
      ...prev,
      [criterionId]: value,
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

      {/* Notes disclaimer */}
      <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Use the <strong>Notes</strong> column to jot down observations as you review this rubric. 
          <span className="text-amber-600 dark:text-amber-400 font-medium"> Notes are NOT saved</span> and will be lost when you leave this page.
        </p>
      </div>

      {/* Rubric Criteria Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rubric Criteria</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="w-20 text-center">Weight</TableHead>
                <TableHead className="min-w-[250px]">Criterion</TableHead>
                <TableHead className="w-40">Category</TableHead>
                <TableHead className="min-w-[200px]">Rationale</TableHead>
                <TableHead className="min-w-[180px]">Notes (NOT SAVED)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion) => (
                <TableRow key={criterion.id}>
                  <TableCell className="text-center font-medium text-muted-foreground">
                    {criterion.id}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{criterion.weight}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{criterion.text}</span>
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
                    <span className="text-sm text-muted-foreground">
                      {criterion.rationale || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={notes[criterion.id] || ""}
                      onChange={(e) => handleNoteChange(criterion.id, e.target.value)}
                      placeholder="Add notes..."
                      className="min-h-[60px] text-xs resize-none"
                    />
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
