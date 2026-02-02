import { Tag, BookOpen, Brain, FileSearch, Layout } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Instruction Following",
      icon: BookOpen,
      color: "blue",
      description: "These are rubric items that assert broad instruction following as opposed to concrete factual correctness. Any time you are asserting a very similar thing to what the prompt has stated it will likely be instruction following. The rationales for these items will typically read as \"The user explicitly requested SOMETHING in the prompt\"",
      example: {
        prompt: "Please provide me with an exercise program to help me run a 5k! Plan around my calendar which is attached as a spreadsheet.",
        criterion: "States an itemized list of exercises.",
        rationale: "The prompt explicitly asks for an exercise program."
      }
    },
    {
      name: "Reasoning",
      icon: Brain,
      color: "purple",
      description: "Logic, calculation steps, or justification (e.g., mathematical reasoning). These criteria contain concrete answers to requests that require reasoning (inference, deduction, research, etc.)",
      example: {
        criterion: "Includes twice or three times weekly runs in the exercise program.",
        rationale: "Because the user wants to run a 5k, the exercise program should include frequent running."
      }
    },
    {
      name: "Extraction",
      icon: FileSearch,
      color: "green",
      description: "Pulls relevant information from a data source - this includes information from any input files from the relevant BeetID Input folder (e.g. information from a url, spreadsheet, PDF, video, etc.)",
      example: {
        criterion: "Identifies that the user is very busy on saturdays.",
        rationale: "Per the attached calendar, the user does not have time to work out on saturdays."
      }
    },
    {
      name: "Formatting",
      icon: Layout,
      color: "orange",
      description: "Response structure (e.g. calculation formatting, heading, lists, JSON structure)",
      example: {
        criterion: "Tabulates exercise dates, times, and locations.",
        rationale: "The user would be benefited from a highly readable format such as a table."
      }
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          border: "border-blue-500/30",
          bg: "bg-blue-50/30 dark:bg-blue-950/20",
          headerBg: "bg-blue-500/10",
          headerBorder: "border-blue-500/20",
          iconBg: "bg-blue-500/20",
          iconText: "text-blue-600 dark:text-blue-400",
          badge: "bg-blue-500/20 text-blue-700 dark:text-blue-300"
        };
      case "purple":
        return {
          border: "border-purple-500/30",
          bg: "bg-purple-50/30 dark:bg-purple-950/20",
          headerBg: "bg-purple-500/10",
          headerBorder: "border-purple-500/20",
          iconBg: "bg-purple-500/20",
          iconText: "text-purple-600 dark:text-purple-400",
          badge: "bg-purple-500/20 text-purple-700 dark:text-purple-300"
        };
      case "green":
        return {
          border: "border-green-500/30",
          bg: "bg-green-50/30 dark:bg-green-950/20",
          headerBg: "bg-green-500/10",
          headerBorder: "border-green-500/20",
          iconBg: "bg-green-500/20",
          iconText: "text-green-600 dark:text-green-400",
          badge: "bg-green-500/20 text-green-700 dark:text-green-300"
        };
      case "orange":
        return {
          border: "border-orange-500/30",
          bg: "bg-orange-50/30 dark:bg-orange-950/20",
          headerBg: "bg-orange-500/10",
          headerBorder: "border-orange-500/20",
          iconBg: "bg-orange-500/20",
          iconText: "text-orange-600 dark:text-orange-400",
          badge: "bg-orange-500/20 text-orange-700 dark:text-orange-300"
        };
      default:
        return {
          border: "border-border",
          bg: "bg-card",
          headerBg: "bg-muted/50",
          headerBorder: "border-border",
          iconBg: "bg-primary/20",
          iconText: "text-primary",
          badge: "bg-primary/20 text-primary"
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Tag className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Category Guidelines</h3>
            <p className="text-base text-foreground leading-relaxed">
              Each criterion must fall under one of the following categories.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-5">
        {categories.map((category, index) => {
          const colors = getColorClasses(category.color);
          const Icon = category.icon;
          
          return (
            <div key={index} className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden`}>
              <div className={`px-5 py-4 ${colors.headerBg} border-b ${colors.headerBorder} flex items-center gap-4`}>
                <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.iconText}`} />
                </div>
                <span className="font-bold text-lg text-foreground">{category.name}</span>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-foreground leading-relaxed">{category.description}</p>
                
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Example</p>
                  <div className="space-y-2 text-sm">
                    {category.example.prompt && (
                      <p><strong className="text-muted-foreground">Prompt:</strong> {category.example.prompt}</p>
                    )}
                    <p><strong className="text-foreground">Criterion:</strong> {category.example.criterion}</p>
                    <p><strong className="text-muted-foreground">Rationale:</strong> {category.example.rationale}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSection;
