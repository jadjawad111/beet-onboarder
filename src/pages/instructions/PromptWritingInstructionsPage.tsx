import { PenTool } from "lucide-react";

const PromptWritingInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <PenTool className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Prompt Writing Instructions</h1>
            <p className="text-muted-foreground">Guidelines and best practices for writing prompts</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground">
            Content for prompt writing instructions coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptWritingInstructionsPage;
