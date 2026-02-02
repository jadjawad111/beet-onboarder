import { Table, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const SpreadsheetRubricsSection = () => {
  const alwaysConsider = [
    {
      concept: "Table names/concepts",
      notes: "Most rubrics should include one or more items on the names of the critical tables contained in the spreadsheet",
      example: "Spreadsheet includes a table describing the allocation of assets in the investment portfolio"
    },
    {
      concept: "Column, row names/concepts",
      notes: "Rubrics must describe the columns and rows of each critical table. If columns or rows have specific names, include a rubric item for each individual name. If columns or rows are series (such as years or quarters) then include one rubric item that describes the series. Be careful: if the table could be transposed (rows and columns flip-flop) then we should not overly prescribe column vs row distinctions.",
      example: "In the spreadsheet, the table describing the allocation of assets in the investment portfolio has one column for \"non-qualified stock options\"\n\nIn the spreadsheet, the table describing the allocation of assets in the investment portfolio has rows that represent years 2020 through 2025"
    },
    {
      concept: "Key values",
      notes: "Throughout the critical tables within the spreadsheet, each key value should have an individual criterion associated. Be careful: numeric key values will frequently be rounded. Include '±' bounds to protect against restrictiveness.",
      example: "In the spreadsheet, the table describing the allocation of assets in the investment portfolio states that in 2025 50% (± 1%) of assets were non-qualified stock options"
    }
  ];

  const sometimesConsider = [
    {
      concept: "Spreadsheet file name",
      notes: "It can be helpful to consider how the deliverable file should be named",
      example: "The spreadsheet's file name communicates that it contains a cash flow analysis"
    },
    {
      concept: "Tab names",
      notes: "If there are multiple tabs in the spreadsheet and it is relevant to the prompt, you should include rubric items that describe what each tab contains",
      example: "The spreadsheet contains one tab for FY25 revenue"
    },
    {
      concept: "Important formulas",
      notes: "It is fair to assert that certain formulas be present in the spreadsheet. This is most relevant when the prompt specifies that the spreadsheet use a specific formula or where the user is requesting a spreadsheet where the input values will change but the logic will remain the same. Be careful: There can be multiple valid formulas that arrive at the same answer – it is difficult to write rubric items on formulas without being restrictive.",
      example: "In the spreadsheet, the table dedicated to cash flow analysis uses 'Revenue-Costs' to calculate margin"
    },
    {
      concept: "Specific formatting",
      notes: "Rubric items on spreadsheet formatting are allowed. They should only be included if there are strong industry conventions.",
      example: "The spreadsheet includes all losses as red colored text\n\nThe spreadsheet includes all profits as black colored text"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Table className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Writing Rubrics for Spreadsheets</h3>
            <p className="text-base text-foreground leading-relaxed">
              Specific guidance for creating rubric criteria for spreadsheet deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* Always Consider */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-bold text-foreground">Always Consider Adding Rubric Items For:</h4>
        </div>
        
        <div className="rounded-xl border-2 border-green-500/30 overflow-hidden">
          <div className="divide-y divide-green-500/20">
            {alwaysConsider.map((item, index) => (
              <div key={index} className="p-5 bg-green-50/30 dark:bg-green-950/20">
                <h5 className="font-semibold text-foreground mb-2">{item.concept}</h5>
                <p className="text-sm text-foreground/80 mb-3">{item.notes}</p>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Example</p>
                  <p className="text-sm text-foreground whitespace-pre-line">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sometimes Consider */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-bold text-foreground">Consider Adding If Specified in Prompt or Strong Industry Conventions:</h4>
        </div>
        
        <div className="rounded-xl border-2 border-yellow-500/30 overflow-hidden">
          <div className="divide-y divide-yellow-500/20">
            {sometimesConsider.map((item, index) => (
              <div key={index} className="p-5 bg-yellow-50/30 dark:bg-yellow-950/20">
                <h5 className="font-semibold text-foreground mb-2">{item.concept}</h5>
                <p className="text-sm text-foreground/80 mb-3">{item.notes}</p>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Example</p>
                  <p className="text-sm text-foreground whitespace-pre-line">{item.example}</p>
                </div>
              </div>
            ))}
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
              For spreadsheet rubrics, focus on table structure, column/row names, and key values. Always include ± bounds for numeric values to account for rounding differences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetRubricsSection;
