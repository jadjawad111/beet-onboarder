const ToolsPage = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Software, links, and reference materials for your work.
      </p>
      
      <div className="grid gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-medium text-foreground mb-2">Annotation Platform</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Main platform for completing annotation tasks.
          </p>
          <a href="#" className="text-sm text-primary hover:underline">
            Open Platform →
          </a>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-medium text-foreground mb-2">Style Guide</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Reference document for formatting and style requirements.
          </p>
          <a href="#" className="text-sm text-primary hover:underline">
            View Guide →
          </a>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-medium text-foreground mb-2">Slack Workspace</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Team communication and support channel.
          </p>
          <a href="#" className="text-sm text-primary hover:underline">
            Open Slack →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
