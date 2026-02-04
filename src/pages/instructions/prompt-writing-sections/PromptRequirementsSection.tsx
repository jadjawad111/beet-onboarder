import { ClipboardList, FileInput, FileType, CheckCircle, FileSpreadsheet, Image, FileText, Mail, ClipboardList as ClipboardListIcon, Users } from "lucide-react";

const PromptRequirementsSection = () => {
  const allowedFileTypes = ["csv", "docx", "jpg", "pdf", "png", "pptx", "txt", "xlsx"];

  const inputFileGuidelines = [
    "Include only information a real professional would plausibly have",
    "Keep it consistent with the scenario and constraints",
    "Ensure the content enables the deliverables (not just background)",
  ];

  const exampleInputFiles = [
    { label: "Spreadsheets/data extracts", icon: FileSpreadsheet },
    { label: "Images", icon: Image },
    { label: "Documents/PDFs", icon: FileText },
    { label: "Emails", icon: Mail },
    { label: "Meeting notes", icon: ClipboardListIcon },
    { label: "Inventory lists", icon: ClipboardListIcon },
    { label: "Staffing rosters", icon: Users },
    { label: "Prior templates", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 4: Understand the Prompt Requirements</h3>
            <p className="text-base text-foreground leading-relaxed">
              Before writing, define the boundaries of what the model will use and what it must produce.
            </p>
          </div>
        </div>
      </div>

      {/* Input Files Card */}
      <div className="p-5 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <FileInput className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-semibold text-foreground">Input Files</h4>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Files you will create to support the prompt
        </p>

        {/* Guidelines */}
        <div className="space-y-4 mb-6">
          <h5 className="text-sm font-bold text-foreground">For Each Input File You Create</h5>
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <ul className="space-y-2">
              {inputFileGuidelines.map((guideline, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example Input Files */}
        <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
          <div className="p-3 bg-muted/50 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Example Input Files for <span className="text-primary">Administrative Services Manager</span>
            </p>
          </div>
          <div className="p-4">
            <div className="grid gap-2 sm:grid-cols-2">
              {exampleInputFiles.map((input) => {
                const Icon = input.icon;
                return (
                  <div
                    key={input.label}
                    className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border"
                  >
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">{input.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Allowed File Types */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-2">
          <FileType className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Allowed File Types for <span className="text-primary">Administrative Services Manager</span> Prompts
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {allowedFileTypes.map((type) => (
              <code
                key={type}
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-mono"
              >
                .{type}
              </code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptRequirementsSection;
