import { FileText, Eye } from "lucide-react";

const ReviewJobSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 2: Review the Job Description</h3>
            <p className="text-base text-foreground leading-relaxed">
              Ensure you understand the role and the core responsibility before proceeding.
            </p>
          </div>
        </div>
      </div>

      {/* What to Confirm */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          What to Confirm
        </h4>
        <div className="p-5 rounded-xl bg-card border border-border">
          <p className="text-foreground leading-relaxed mb-4">
            Review the listed job description and confirm you understand:
          </p>
          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span className="text-foreground">The <strong>core responsibilities</strong> (what "success" looks like)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span className="text-foreground">The <strong>general scope of work</strong> and typical outputs</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Example */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
        <div className="p-4 bg-muted/50 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Example Description</p>
        </div>
        <div className="p-6">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-foreground italic leading-relaxed">
              "Plan, direct, or coordinate one or more administrative services of an organization, such as records and information management, mail distribution, and other office support services."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewJobSection;
