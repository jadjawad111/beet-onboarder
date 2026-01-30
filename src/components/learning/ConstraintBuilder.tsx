import { useState } from "react";
import { Copy, Check, Plus, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ConstraintType = "must" | "must-not" | "resource" | "style";

interface Constraint {
  id: string;
  type: ConstraintType;
  text: string;
}

const typeLabels: Record<ConstraintType, { label: string; color: string; prefix: string }> = {
  must: { label: "Must", color: "bg-success/20 text-success border-success/30", prefix: "MUST:" },
  "must-not": { label: "Must Not", color: "bg-destructive/20 text-destructive border-destructive/30", prefix: "MUST NOT:" },
  resource: { label: "Resource Limit", color: "bg-warning/20 text-warning border-warning/30", prefix: "LIMIT:" },
  style: { label: "Style Rule", color: "bg-info/20 text-info border-info/30", prefix: "STYLE:" },
};

const ConstraintBuilder = () => {
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [currentType, setCurrentType] = useState<ConstraintType>("must");
  const [currentText, setCurrentText] = useState("");
  const [copied, setCopied] = useState(false);

  const addConstraint = () => {
    if (!currentText.trim()) return;
    setConstraints([
      ...constraints,
      { id: Date.now().toString(), type: currentType, text: currentText.trim() },
    ]);
    setCurrentText("");
  };

  const removeConstraint = (id: string) => {
    setConstraints(constraints.filter((c) => c.id !== id));
  };

  const generateOutput = () => {
    return constraints
      .map((c) => `${typeLabels[c.type].prefix} ${c.text}`)
      .join("\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border-2 border-accent bg-accent/10 p-6 my-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <Lightbulb className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h4 className="font-semibold">Constraint Builder</h4>
          <p className="text-sm text-muted-foreground">
            Build a constraint block for your prompt. Add different types of constraints and copy the result.
          </p>
        </div>
      </div>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(typeLabels) as ConstraintType[]).map((type) => (
          <button
            key={type}
            onClick={() => setCurrentType(type)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all",
              currentType === type
                ? typeLabels[type].color
                : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
            )}
          >
            {typeLabels[type].label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <Input
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder={`Enter a ${typeLabels[currentType].label.toLowerCase()} constraint...`}
          onKeyDown={(e) => e.key === "Enter" && addConstraint()}
          className="flex-1"
        />
        <Button onClick={addConstraint} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Constraint list */}
      {constraints.length > 0 && (
        <div className="space-y-2 mb-4">
          {constraints.map((constraint) => (
            <div
              key={constraint.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg border-2",
                typeLabels[constraint.type].color
              )}
            >
              <span className="text-xs font-bold uppercase">
                {typeLabels[constraint.type].prefix}
              </span>
              <span className="flex-1 text-sm">{constraint.text}</span>
              <button
                onClick={() => removeConstraint(constraint.id)}
                className="p-1 hover:bg-background/50 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Output */}
      {constraints.length > 0 && (
        <div className="rounded-lg border bg-muted/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Generated Constraint Block
            </span>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 gap-1.5 text-xs">
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="p-4">
            <pre className="text-sm whitespace-pre-wrap font-mono">{generateOutput()}</pre>
          </div>
        </div>
      )}

      {constraints.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Add constraints above to build your constraint block
        </p>
      )}
    </div>
  );
};

export default ConstraintBuilder;
