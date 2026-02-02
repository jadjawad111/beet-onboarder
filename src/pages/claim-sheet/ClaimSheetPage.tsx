const SPREADSHEET_ID = "1wwF_4JZlqacoNIc4kSxdonjEY53RtVeanGfsp_CoDPw";
const GID = "91336110";

const ClaimSheetPage = () => {
  const embedUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/preview?gid=${GID}`;

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Claim Sheet</h1>
          <p className="text-muted-foreground text-sm">
            View and track claims in the embedded spreadsheet below.
          </p>
        </div>
        
        {/* Embedded Google Sheet */}
        <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden min-h-[600px]">
          <iframe
            key={embedUrl}
            src={embedUrl}
            className="w-full h-full min-h-[600px]"
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
