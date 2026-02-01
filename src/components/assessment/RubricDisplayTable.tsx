import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="w-20 text-center">Weight</TableHead>
              <TableHead className="min-w-[300px]">Criterion</TableHead>
              <TableHead className="w-36">Category</TableHead>
              <TableHead className="min-w-[200px]">Rationale</TableHead>
              <TableHead className="w-32">Citation</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RubricDisplayTable;
