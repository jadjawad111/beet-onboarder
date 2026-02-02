import { ClipboardList, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPREADSHEET_ID = "1wwF_4JZlqacoNIc4kSxdonjEY53RtVeanGfsp_CoDPw";
const GID = "91336110";

const ClaimSheetPage = () => {
  const embedUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/preview?gid=${GID}`;
  const fullUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?gid=${GID}#gid=${GID}`;

  return (
    <div className="h-[calc(100vh-4rem)] bg-background flex flex-col p-4 md:p-6">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="mb-4 flex-shrink-0 flex items-start justify-between gap-4">
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
        
        {/* Embedded Google Sheet */}
        <div className="flex-1 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <iframe
            key={embedUrl}
            src={embedUrl}
            className="w-full h-full"
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
