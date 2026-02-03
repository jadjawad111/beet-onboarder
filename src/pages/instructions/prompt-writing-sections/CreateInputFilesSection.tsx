import { Files, CheckCircle, FileSpreadsheet, Image, FileText, Mail, ClipboardList, Users } from "lucide-react";

const CreateInputFilesSection = () => {
  const guidelines = [
    "Include only information a real professional would plausibly have",
    "Keep it consistent with the scenario and constraints",
    "Ensure the content enables the deliverables (not just background)",
  ];

  const goodInputs = [
    { label: "Spreadsheets/data extracts", icon: FileSpreadsheet },
    { label: "Images", icon: Image },
    { label: "Documents/PDFs", icon: FileText },
    { label: "Emails", icon: Mail },
    { label: "Meeting notes", icon: ClipboardList },
    { label: "Inventory lists", icon: ClipboardList },
    { label: "Staffing rosters", icon: Users },
    { label: "Prior templates", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Files className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 6: Create the Input Files</h3>
            <p className="text-base text-foreground leading-relaxed">
              Create input files to support your prompt with professional realism.
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">For Each Input File You Create</h4>
        <div className="p-5 rounded-xl bg-card border border-border">
          <ul className="space-y-3">
            {guidelines.map((guideline, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Good Inputs */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-green-500/10 border-b border-green-500/20">
          <p className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-wider">
            Good Inputs Often Include
          </p>
        </div>
        <div className="p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {goodInputs.map((input) => {
              const Icon = input.icon;
              return (
                <div
                  key={input.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{input.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInputFilesSection;
