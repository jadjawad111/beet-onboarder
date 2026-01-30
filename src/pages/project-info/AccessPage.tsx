const AccessPage = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Get your accounts and tools configured to start working on the project.
      </p>
      
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-medium text-foreground mb-2">1. Platform Access</h3>
          <p className="text-sm text-muted-foreground">
            You should have received login credentials for the annotation platform. 
            If not, contact support.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-medium text-foreground mb-2">2. Communication Channels</h3>
          <p className="text-sm text-muted-foreground">
            Join the project Slack workspace using your invited email address.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-medium text-foreground mb-2">3. Required Software</h3>
          <p className="text-sm text-muted-foreground">
            Ensure you have a modern web browser (Chrome, Firefox, or Edge recommended).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
