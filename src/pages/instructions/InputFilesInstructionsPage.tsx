import { Files } from "lucide-react";
import CreateInputFilesSection from "./prompt-writing-sections/CreateInputFilesSection";

const InputFilesInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <Files className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Part 2: Input Files</h1>
              <p className="text-muted-foreground">Create input files to support your prompt with professional realism.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6 md:p-8 lg:p-10">
          <CreateInputFilesSection />
        </main>
      </div>
    </div>
  );
};

export default InputFilesInstructionsPage;
