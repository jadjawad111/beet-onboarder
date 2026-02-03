import { ClipboardList, FileInput, FileOutput, FileType } from "lucide-react";

const PromptRequirementsSection = () => {
  const allowedFileTypes = ["csv", "docx", "jpg", "pdf", "png", "pptx", "txt", "xlsx"];

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

      {/* Requirements Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-5 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FileInput className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-foreground">Input Files</h4>
          </div>
          <p className="text-muted-foreground text-sm">
            Files you will provide (what the model will read)
          </p>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <FileOutput className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold text-foreground">Output Files</h4>
          </div>
          <p className="text-muted-foreground text-sm">
            Files the model must create (what the model will produce)
          </p>
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

export default PromptRequirementsSection;
