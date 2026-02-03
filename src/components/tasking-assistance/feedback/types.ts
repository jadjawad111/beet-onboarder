// Types for the feedback evaluation categories

export interface EvalResult {
  error: boolean;
  extremity: string;
  editInstructions: string[];
}

export interface ParsedFeedback {
  ambiguity?: EvalResult;
  not_timeless?: EvalResult;
  too_easy?: EvalResult;
  inconsistency?: EvalResult;
  contrived?: EvalResult;
  llm_check?: EvalResult;
}

export interface CategoryConfig {
  label: string;
  icon: string;
  errorKey: string;
  description: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  ambiguity: {
    label: "Ambiguity",
    icon: "🔍",
    errorKey: "Ambiguity error",
    description: "Checks if the prompt is clear and unambiguous",
  },
  not_timeless: {
    label: "Timelessness",
    icon: "⏰",
    errorKey: "Timelessness error",
    description: "Checks if the prompt avoids time-sensitive references",
  },
  too_easy: {
    label: "Complexity",
    icon: "📊",
    errorKey: "Complexity error",
    description: "Checks if the task has appropriate difficulty",
  },
  inconsistency: {
    label: "Consistency",
    icon: "⚖️",
    errorKey: "Input file consistency error",
    description: "Checks if inputs match the task requirements",
  },
  contrived: {
    label: "Realism",
    icon: "🎯",
    errorKey: "Realism error",
    description: "Checks if the scenario is realistic and practical",
  },
  llm_check: {
    label: "LLM Compatibility",
    icon: "🤖",
    errorKey: "LLM usage error",
    description: "Checks for LLM-friendly formatting",
  },
};
