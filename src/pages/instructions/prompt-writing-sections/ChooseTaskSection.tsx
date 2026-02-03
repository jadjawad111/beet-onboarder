import { Briefcase, CheckCircle } from "lucide-react";

const ChooseTaskSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 1: Choose a Role-Anchored Task</h3>
            <p className="text-base text-foreground leading-relaxed">
              From the available tasks, select one that is tied to a specific occupation and sector.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">Selection Criteria</h4>
        <div className="p-5 rounded-xl bg-card border border-border">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">Is tied to a <strong>specific occupation + sector</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">Matches your <strong>credible expertise</strong>, so you can add realistic nuance and constraints</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Example */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Example</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Occupation</p>
              <p className="text-foreground font-medium">Administrative Services Manager</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sector</p>
              <p className="text-foreground font-medium">Government</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTaskSection;
