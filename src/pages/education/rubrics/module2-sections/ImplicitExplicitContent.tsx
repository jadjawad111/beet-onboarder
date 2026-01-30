import { Eye, EyeOff, Lightbulb, Tag, FileText } from "lucide-react";

const ImplicitExplicitContent = () => {
  return (
    <div className="space-y-10">
      {/* Definition Hero */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Tag className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Implicit vs Explicit</h3>
            <p className="text-base text-foreground leading-relaxed">
              Tag each criterion as <strong className="text-primary">Implicit</strong> or <strong className="text-primary">Explicit</strong> to clarify where the requirement comes from.
            </p>
          </div>
        </div>
      </div>

      {/* The Two Types */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Explicit */}
        <div className="rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-bold">
              Explicit
            </span>
          </div>
          <p className="text-base text-foreground leading-relaxed">
            The criterion measures something <strong>specifically asked for</strong> in the prompt.
          </p>
        </div>

        {/* Implicit */}
        <div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <EyeOff className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 text-sm font-bold">
              Implicit
            </span>
          </div>
          <p className="text-base text-foreground leading-relaxed">
            The criterion measures elements that are <strong>not explicitly stated</strong> in the prompt, require <strong>domain-specific judgment</strong>, or function as <strong>intermediate steps</strong> toward satisfying an explicit request.
          </p>
        </div>
      </div>

      {/* Example Section */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        {/* Header with Example Prompt */}
        <div className="p-6 bg-gradient-to-r from-muted/80 to-muted/40 border-b-2 border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example Prompt</span>
          </div>
          <p className="text-base text-foreground leading-relaxed italic">
            "Using the files sent in by the client, prepare a 1040 tax return with all the appropriate schedules in PDF format."
          </p>
        </div>

        {/* Side-by-side Examples */}
        <div className="p-6">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Compare the Criteria</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Explicit Example */}
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20 overflow-hidden">
              <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between">
                <span className="font-semibold text-foreground">Criterion</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Explicit
                </span>
              </div>
              <div className="p-4">
                <div className="p-4 rounded-lg bg-card border border-border mb-4">
                  <p className="text-base text-foreground font-medium">
                    "The 1040 tax return package is in PDF format."
                  </p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <Eye className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    <strong className="text-blue-700 dark:text-blue-400">Why Explicit:</strong> The prompt specifically says "in PDF format."
                  </p>
                </div>
              </div>
            </div>

            {/* Implicit Example */}
            <div className="rounded-xl border-2 border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/20 overflow-hidden">
              <div className="px-4 py-3 bg-purple-500/10 border-b border-purple-500/20 flex items-center justify-between">
                <span className="font-semibold text-foreground">Criterion</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1">
                  <EyeOff className="w-3 h-3" />
                  Implicit
                </span>
              </div>
              <div className="p-4">
                <div className="p-4 rounded-lg bg-card border border-border mb-4">
                  <p className="text-base text-foreground font-medium">
                    "The 1040 tax return package includes Schedule A."
                  </p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <EyeOff className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    <strong className="text-purple-700 dark:text-purple-400">Why Implicit:</strong> Although schedules are asked for in the prompt, including Schedule A specifically depends on interpreting the client's input files, and making an expert judgement.
                  </p>
                </div>
              </div>
            </div>
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
              <strong className="text-primary">Explicit</strong> criteria come directly from the prompt text. <strong className="text-primary">Implicit</strong> criteria require professional judgment or interpretation of additional materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplicitExplicitContent;
