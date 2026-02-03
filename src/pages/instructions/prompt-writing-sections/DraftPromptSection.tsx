import { PenTool, User, MapPin, AlertTriangle, FileCheck } from "lucide-react";

const DraftPromptSection = () => {
  const elements = [
    {
      id: "A",
      title: "Role + Audience + Stakes",
      icon: User,
      color: "blue",
      items: [
        "Who is the subject in the prompt (professional persona)?",
        "Who is the audience / requestor?",
        "What are the stakes if the work is late, wrong, or incomplete?",
      ],
    },
    {
      id: "B",
      title: "Scenario + Domain Specifics",
      icon: MapPin,
      color: "purple",
      items: [
        "Operational setting and relevant domain context",
        "What is in scope vs. out of scope",
        "The situational details that drive judgment and priorities",
      ],
    },
    {
      id: "C",
      title: "Constraints + Challenges",
      icon: AlertTriangle,
      color: "orange",
      items: [
        "Time, staffing, policies, approvals",
        "Compliance requirements, limited/partial data",
        "Competing priorities, dependencies, etc.",
      ],
      note: "Design realistic, non-contrived constraints that make the task meaningfully harder (and more professional).",
    },
    {
      id: "D",
      title: "Deliverables (Exact)",
      icon: FileCheck,
      color: "green",
      items: [
        "What files to produce (formats)",
        "What each file must contain",
        "Quality bar (tone, length, level of detail)",
        "Required structure (tables, headings, required fields)",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
      blue: {
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        text: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-500/10",
      },
      purple: {
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
        text: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-500/10",
      },
      orange: {
        bg: "bg-orange-500/5",
        border: "border-orange-500/20",
        text: "text-orange-600 dark:text-orange-400",
        iconBg: "bg-orange-500/10",
      },
      green: {
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        text: "text-green-600 dark:text-green-400",
        iconBg: "bg-green-500/10",
      },
    };
    return colors[color];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <PenTool className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Step 5: Draft the Prompt</h3>
            <p className="text-base text-foreground leading-relaxed">
              Most prompts follow a guiding structure. Be creative in how you apply it, but include these four core elements.
            </p>
          </div>
        </div>
      </div>

      {/* Core Elements */}
      <div className="space-y-4">
        {elements.map((element) => {
          const Icon = element.icon;
          const colors = getColorClasses(element.color);

          return (
            <div
              key={element.id}
              className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden`}
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${colors.text} ${colors.iconBg}`}>
                      {element.id}
                    </span>
                    <h4 className="font-semibold text-foreground">{element.title}</h4>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-13">
                  {element.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0 mt-2" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {element.note && (
                  <p className="mt-4 text-sm text-muted-foreground italic ml-13">
                    {element.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DraftPromptSection;
