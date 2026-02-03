import { CheckCircle, FileSpreadsheet, Image, FileText, Mail, ClipboardList, Users } from "lucide-react";

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
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Example Input Files for <span className="text-primary">Administrative Services Manager</span>
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
