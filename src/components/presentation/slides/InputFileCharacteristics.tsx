import { CheckCircle2, FileText, Database, Link2, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const characteristics = [
  {
    icon: FileText,
    title: "Explicitly Acknowledged",
    description: "The prompt signals that files exist and are part of the task.",
    examples: ['"the attached spreadsheet…"', '"refer to the attached files…"'],
  },
  {
    icon: Database,
    title: "Authoritative Source of Truth",
    description: "Files are positioned as THE data to use, not optional references.",
    examples: ['"Using the data in the spreadsheet, complete…"'],
  },
  {
    icon: Link2,
    title: "Referenced Before Tasks Begin",
    description: "File references appear before numbered instructions, not mid-execution.",
    examples: ["Input introduced in context, then tasks reference it"],
  },
  {
    icon: Target,
    title: "Tied to Concrete Actions",
    description: "Files are bound to specific work, not just mentioned decoratively.",
    examples: ['"Use column H and I…"', '"Pull totals from the detailed schedules…"'],
  },
];

const referencePatterns = [
  {
    level: "Gold Standard",
    label: "Enumerated lists",
    example: '"You\'ll find everything you need in the attached files: COA.xlsx, Insurance.pdf…"',
    color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
  },
  {
    level: "Strong",
    label: "Named explicitly",
    example: '"The attached spreadsheet titled \'Population\'…"',
    color: "text-green-600 bg-green-500/10 border-green-500/30",
  },
  {
    level: "Acceptable",
    label: "Grouped but scoped",
    example: '"Use the attached reference files…"',
    color: "text-blue-600 bg-blue-500/10 border-blue-500/30",
  },
];

const InputFileCharacteristics = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Input File Best Practices
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          How Input Files Should Appear in Prompts
        </h2>
      </div>

      {/* Characteristics Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {characteristics.map((char, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <char.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{char.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{char.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {char.examples.map((ex, exIdx) => (
                      <span key={exIdx} className="text-xs bg-muted px-2 py-0.5 rounded italic">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reference Patterns */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4 text-center">
            Three Valid Ways to Reference Input Files
          </h3>
          <div className="space-y-3">
            {referencePatterns.map((pattern, idx) => (
              <div key={idx} className={`rounded-lg border p-3 ${pattern.color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase">{pattern.level}</span>
                  <span className="text-sm font-medium">{pattern.label}</span>
                </div>
                <p className="text-sm italic opacity-80">{pattern.example}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Key principle:</strong> The source of truth is always clear. 
              No prompt requires external discovery or assumes undocumented data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputFileCharacteristics;
