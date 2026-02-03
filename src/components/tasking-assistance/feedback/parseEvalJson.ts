import { EvalResult, ParsedFeedback, CATEGORY_CONFIG } from "./types";

/**
 * Parses a single category's JSON string into a structured EvalResult
 */
export function parseEvalCategory(jsonString: string, categoryKey: string): EvalResult | null {
  try {
    const parsed = JSON.parse(jsonString);
    const config = CATEGORY_CONFIG[categoryKey];
    
    if (!config) return null;

    // Find the error key dynamically
    const errorKey = config.errorKey;
    const hasError = parsed[errorKey] === true;
    const extremity = parsed["Extremity"] || "unknown";
    const editInstructions = parsed["Edit instructions"] || [];

    return {
      error: hasError,
      extremity,
      editInstructions,
    };
  } catch (e) {
    console.error(`Failed to parse ${categoryKey}:`, e);
    return null;
  }
}

/**
 * Parses the full feedback JSON from the database into structured format
 */
export function parseFeedbackJson(feedbackString: string | null): ParsedFeedback | null {
  if (!feedbackString) return null;

  try {
    const rawFeedback = JSON.parse(feedbackString);
    const parsed: ParsedFeedback = {};

    const categoryKeys = ["ambiguity", "not_timeless", "too_easy", "inconsistency", "contrived", "llm_check"];

    for (const key of categoryKeys) {
      const categoryData = rawFeedback[key];
      if (categoryData && typeof categoryData === "string") {
        const result = parseEvalCategory(categoryData, key);
        if (result) {
          parsed[key as keyof ParsedFeedback] = result;
        }
      }
    }

    return parsed;
  } catch (e) {
    console.error("Failed to parse feedback JSON:", e);
    return null;
  }
}

/**
 * Counts how many categories have errors
 */
export function countErrors(feedback: ParsedFeedback): { errors: number; total: number } {
  const categoryKeys = ["ambiguity", "not_timeless", "too_easy", "inconsistency", "contrived", "llm_check"] as const;
  let errors = 0;
  let total = 0;

  for (const key of categoryKeys) {
    const result = feedback[key];
    if (result) {
      total++;
      if (result.error) errors++;
    }
  }

  return { errors, total };
}

/**
 * Gets extremity badge color
 */
export function getExtremityColor(extremity: string): string {
  switch (extremity.toLowerCase()) {
    case "extreme":
      return "bg-destructive/20 text-destructive border-destructive/30";
    case "moderate":
      return "bg-warning/20 text-warning border-warning/30";
    case "subtle":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-muted text-muted-foreground border-muted";
  }
}
