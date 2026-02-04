import { Sparkles, User, MapPin, AlertTriangle, FileCheck, FileInput, FileType, CheckCircle, FileSpreadsheet, Image, FileText, Mail, ClipboardList, Users } from "lucide-react";

const DraftPromptSection = () => {
  const elements = [
    {
      id: "A",
      title: "Role + Audience + Stakes",
      icon: User,
      color: "blue",
      items: [
        "Who is the subject in the prompt? What is their professional persona?",
        "Who is the deliverable for, and how will they use it?",
        "What's the consequence if the work is late, wrong, or incomplete - and who is impacted?",
        "What does this work enable, improve, or unblock?",
      ],
    },
    {
      id: "B",
      title: "Scenario + Domain Specifics",
      icon: MapPin,
      color: "purple",
      items: [
        "Operational setting and relevant domain context",
        "What is in scope vs. out of scope",
        "The situational details that drive judgment and priorities",
      ],
    },
    {
      id: "C",
      title: "Constraints + Challenges",
      icon: AlertTriangle,
      color: "orange",
      items: [
        "Time, staffing, policies, approvals",
        "Compliance requirements, limited/partial data",
        "Competing priorities, dependencies, etc.",
      ],
      note: "Design realistic, non-contrived constraints that make the task meaningfully harder (and more professional).",
    },
    {
      id: "D",
      title: "Deliverables (Exact)",
      icon: FileCheck,
      color: "green",
      items: [
        "What files to produce (formats)",
        "What each file must contain",
        "Quality bar (tone, length, level of detail)",
        "Required structure (tables, headings, required fields)",
      ],
    },
  ];

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
    { label: "Meeting notes", icon: ClipboardList },
    { label: "Inventory lists", icon: ClipboardList },
    { label: "Staffing rosters", icon: Users },
    { label: "Prior templates", icon: FileText },
  ];

  const allowedFileTypes = ["csv", "docx", "jpg", "pdf", "png", "pptx", "txt", "xlsx"];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
      blue: {
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        text: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-500/10",
      },
      purple: {
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
        text: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-500/10",
      },
      orange: {
        bg: "bg-orange-500/5",
        border: "border-orange-500/20",
        text: "text-orange-600 dark:text-orange-400",
        iconBg: "bg-orange-500/10",
      },
      green: {
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        text: "text-green-600 dark:text-green-400",
        iconBg: "bg-green-500/10",
      },
      pink: {
        bg: "bg-pink-500/5",
        border: "border-pink-500/20",
        text: "text-pink-600 dark:text-pink-400",
        iconBg: "bg-pink-500/10",
      },
    };
    return colors[color];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 4: Prompt Requirements</h3>
            <p className="text-base text-foreground leading-relaxed">
              Most prompts follow a guiding structure. Be creative in how you apply it, but include these core elements.
            </p>
          </div>
        </div>
      </div>

      {/* Core Elements A-D */}
      <div className="space-y-4">
        {elements.map((element) => {
          const Icon = element.icon;
          const colors = getColorClasses(element.color);

          return (
            <div
              key={element.id}
              className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden`}
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${colors.text} ${colors.iconBg}`}>
                      {element.id}
                    </span>
                    <h4 className="font-semibold text-foreground">{element.title}</h4>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-13">
                  {element.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0 mt-2" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {element.note && (
                  <p className="mt-4 text-sm text-muted-foreground italic ml-13">
                    {element.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Element E: Input Files */}
        <div className="rounded-xl border-2 border-pink-500/20 bg-pink-500/5 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <FileInput className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-500/10">
                  E
                </span>
                <h4 className="font-semibold text-foreground">Input Files</h4>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4 ml-13">
              Files you will create to support the prompt
            </p>

            {/* Guidelines */}
            <div className="space-y-3 mb-5 ml-13">
              <h5 className="text-sm font-bold text-foreground">For Each Input File You Create</h5>
              <div className="p-4 rounded-xl bg-background/50 border border-pink-500/20">
                <ul className="space-y-2">
                  {inputFileGuidelines.map((guideline, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Example Input Files */}
            <div className="rounded-xl border border-pink-500/20 bg-background/50 overflow-hidden ml-13">
              <div className="p-3 bg-pink-500/10 border-b border-pink-500/20">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Example Input Files for <span className="text-pink-600 dark:text-pink-400">Administrative Services Manager</span>
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
        </div>
      </div>

      {/* Allowed File Types */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-2">
          <FileType className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Allowed File Types
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

export default DraftPromptSection;
