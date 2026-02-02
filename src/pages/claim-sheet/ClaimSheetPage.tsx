import { ClipboardList, ExternalLink, PenLine, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SPREADSHEET_ID = "1wwF_4JZlqacoNIc4kSxdonjEY53RtVeanGfsp_CoDPw";
const GID = "91336110";

const ClaimSheetPage = () => {
  const embedUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/preview?gid=${GID}`;
  const fullUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?gid=${GID}#gid=${GID}`;
  
  const [promptOpen, setPromptOpen] = useState(false);
  const [rubricOpen, setRubricOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col p-4 md:p-6">
      <div className="w-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Claim Sheet</h1>
              <p className="text-muted-foreground text-sm">
                View and track claims in the spreadsheet below
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 flex-shrink-0"
            onClick={() => window.open(fullUrl, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Open Full Sheet</span>
          </Button>
        </div>

        {/* Instruction Sections */}
        <div className="grid gap-3 md:grid-cols-2">
          {/* Prompt Writing Instructions */}
          <Collapsible open={promptOpen} onOpenChange={setPromptOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 p-4 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <PenLine className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Prompt Writing Instructions</h2>
                    <p className="text-xs text-muted-foreground">Guidelines for writing effective prompts</p>
                  </div>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  promptOpen && "rotate-180"
                )} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 p-4 bg-card border border-border rounded-xl space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">When writing prompts, follow these guidelines:</p>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Be clear and specific about the task requirements</li>
                    <li>Include all necessary context and constraints</li>
                    <li>Specify the expected output format</li>
                    <li>Use examples when helpful to illustrate expectations</li>
                    <li>Break complex tasks into smaller, manageable steps</li>
                    <li>Define any domain-specific terms or concepts</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Rubric Writing Instructions */}
          <Collapsible open={rubricOpen} onOpenChange={setRubricOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 p-4 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Rubric Writing Instructions</h2>
                    <p className="text-xs text-muted-foreground">Guidelines for creating evaluation rubrics</p>
                  </div>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  rubricOpen && "rotate-180"
                )} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 p-4 bg-card border border-border rounded-xl space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">When writing rubrics, follow these guidelines:</p>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Define clear, measurable criteria for each scoring level</li>
                    <li>Use specific language that avoids ambiguity</li>
                    <li>Ensure scoring levels are mutually exclusive</li>
                    <li>Include examples of what meets each criterion</li>
                    <li>Weight criteria appropriately based on importance</li>
                    <li>Test rubrics for consistency across different evaluators</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Embedded Google Sheet */}
        <div className="flex-1 min-h-[500px] bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <iframe
            key={embedUrl}
            src={embedUrl}
            className="w-full h-full min-h-[500px]"
            style={{ border: "none" }}
            title="Claim Sheet Spreadsheet"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimSheetPage;
