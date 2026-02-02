import { FileSpreadsheet, FileText, Lightbulb } from "lucide-react";

const FormattingExamplesSection = () => {
  const spreadsheetCriteria = [
    "Creates a [Type of Deliverable] in a spreadsheet format (.xslx).",
    "Titles the spreadsheet [Name mentioned in the prompt (if any)].",
    "The first letter of each noun and verb is capitalized in spreadsheet titles.",
    "The first letter of the first word is capitalized in spreadsheet titles.",
    "The first letter of each noun and verb is capitalized for each tab name in the spreadsheet.",
    "The first letter of the first word is capitalized for each tab name in the spreadsheet.",
    "Each title in the spreadsheet is bold.",
    "All text in the spreadsheet is in the same font or font style.",
    "[XYZ important data] is highlighted in the spreadsheet.",
    "All text is fully displayed in the spreadsheet.",
    "The spreadsheet uses text wrapping in each cell.",
    "Text does not overflow cells in the spreadsheet.",
    "Text is not clipped in the spreadsheet.",
    "The spreadsheet contains no Error fields.",
    "In the spreadsheet, Row 1 contains at least one of the following: Titles, groupings, OR categories.",
    "In the spreadsheet, Column A contains at least one of the following: Titles, groupings, OR categories.",
    "Every other row or column in the spreadsheet has one color of shading.",
    "Column A and Row 1 have the darkest shading in the spreadsheet.",
    "Uses consistent formatting across all tabs in the spreadsheet.",
    "All numbers are rounded to [X.XX] in the spreadsheet.",
    "All columns [with the exception of the first] in the spreadsheet have the same width.",
    "Text in columns [B-X] are right aligned in the spreadsheet.",
    "Text in column [A] is left aligned in the spreadsheet."
  ];

  const wordDocCriteria = [
    "Creates a [Type of Deliverable] in a Word Document.",
    "The Word document has [X] Sections.",
    "The Word document is titled [XYZ].",
    "The first letter of each noun and verb is capitalized in the title and each section of the Word document.",
    "The first letter of the first word is capitalized in the title and each section of the Word document.",
    "Each title in the document is bolded.",
    "Uses consistent formatting throughout the Word document.",
    "Uses consistent bulleting and bullet formatting throughout the Word document.",
    "Uses consistent spacing between sections throughout the Word document.",
    "Section headers in the Word document are at least 1 font size bigger than the paragraph fonts.",
    "All text in the Word document is in the same font or font style.",
    "All text in the Word document is colored [black]."
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <FileSpreadsheet className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Formatting Criteria Examples</h3>
            <p className="text-base text-foreground leading-relaxed">
              Please feel free to use all of the criteria that apply to your task!
            </p>
          </div>
        </div>
      </div>

      {/* Excel/Spreadsheet */}
      <div className="rounded-xl border-2 border-green-500/30 bg-card overflow-hidden">
        <div className="px-5 py-4 bg-green-500/10 border-b border-green-500/20 flex items-center gap-3">
          <FileSpreadsheet className="w-5 h-5 text-green-600" />
          <span className="font-bold text-foreground">Excel / Spreadsheet Criteria</span>
        </div>
        <div className="p-5">
          <ol className="space-y-2 text-sm">
            {spreadsheetCriteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-mono flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground">{criterion}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Word Document */}
      <div className="rounded-xl border-2 border-blue-500/30 bg-card overflow-hidden">
        <div className="px-5 py-4 bg-blue-500/10 border-b border-blue-500/20 flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-foreground">Word Document Criteria</span>
        </div>
        <div className="p-5">
          <ol className="space-y-2 text-sm">
            {wordDocCriteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-mono flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground">{criterion}</span>
              </li>
            ))}
          </ol>
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
              These are template criteria you can adapt to your specific task. Replace the bracketed placeholders with the specific values relevant to your rubric.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormattingExamplesSection;
