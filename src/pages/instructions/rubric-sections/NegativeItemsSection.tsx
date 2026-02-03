import { MinusCircle } from "lucide-react";

const NegativeItemsSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <MinusCircle className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Negative Items</h3>
            <p className="text-base text-foreground leading-relaxed">
              Guidelines for writing rubric items that identify what the model should NOT do.
            </p>
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-muted-foreground text-sm">
          Content for Negative Items section coming soon.
        </p>
      </div>
    </div>
  );
};

export default NegativeItemsSection;
