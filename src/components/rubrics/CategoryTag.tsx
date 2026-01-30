import { cn } from "@/lib/utils";
import { ClipboardCheck, Brain, FileSearch, Layout } from "lucide-react";

type CategoryType = "instruction-following" | "reasoning" | "extraction" | "formatting";

interface CategoryTagProps {
  category: CategoryType;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const categoryConfig: Record<CategoryType, { label: string; icon: typeof ClipboardCheck; color: string }> = {
  "instruction-following": {
    label: "Instruction Following",
    icon: ClipboardCheck,
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  },
  "reasoning": {
    label: "Reasoning",
    icon: Brain,
    color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  },
  "extraction": {
    label: "Extraction",
    icon: FileSearch,
    color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  },
  "formatting": {
    label: "Formatting",
    icon: Layout,
    color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  },
};

const CategoryTag = ({ category, size = "md", showIcon = true }: CategoryTagProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        config.color,
        sizeClasses[size]
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
};

export default CategoryTag;
