import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

export interface RubricCriterion {
  id: number;
  weight: number;
  text: string;
  category: string;
  rationale: string;
  citation?: string;
}

interface RubricDisplayTableProps {
  criteria: RubricCriterion[];
  title?: string;
}

const categoryColors: Record<string, string> = {
  "Instruction Following": "bg-blue-100 text-blue-800",
  "Formatting": "bg-purple-100 text-purple-800",
  "Reasoning": "bg-amber-100 text-amber-800",
  "Domain Knowledge": "bg-green-100 text-green-800",
  "Practical Application": "bg-teal-100 text-teal-800",
  "Process": "bg-gray-100 text-gray-800",
  "Professional Judgment": "bg-indigo-100 text-indigo-800",
  "Tone and Style": "bg-pink-100 text-pink-800",
  "Extraction": "bg-orange-100 text-orange-800",
};

const RubricDisplayTable: React.FC<RubricDisplayTableProps> = ({
  criteria,
  title = "Rubric Criteria",
}) => {
  const [notes, setNotes] = useState<Record<number, string>>({});

  const handleNoteChange = (id: number, value: string) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full">
      {/* Warning Banner */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-4">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">
          This rubric does NOT save. Any notes you enter will be lost when you leave or refresh this page.
        </span>
      </div>

      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <div className="border rounded-lg overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="w-20 text-center">Weight</TableHead>
              <TableHead className="min-w-[300px]">Criterion</TableHead>
              <TableHead className="w-36">Category</TableHead>
              <TableHead className="min-w-[200px]">Rationale</TableHead>
              <TableHead className="w-32">Citation</TableHead>
              <TableHead className="min-w-[180px]">Notes</TableHead>
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
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full whitespace-nowrap",
                      categoryColors[criterion.category] || "bg-gray-100 text-gray-800"
                    )}
                  >
                    {criterion.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {criterion.rationale}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {criterion.citation || "—"}
                  </span>
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex items-center justify-center h-full min-h-[80px]">
                    <textarea
                      value={notes[criterion.id] || ""}
                      onChange={(e) => handleNoteChange(criterion.id, e.target.value)}
                      placeholder="Add note..."
                      className="w-full h-[90%] min-h-[70px] text-sm px-2 py-2 border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RubricDisplayTable;
