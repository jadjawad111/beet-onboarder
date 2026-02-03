import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, CheckCircle2 } from "lucide-react";
import { 
  EvalCategoryCard, 
  FeedbackSummary, 
  parseFeedbackJson, 
  countErrors, 
  CATEGORY_CONFIG 
} from "./feedback";
import type { ParsedFeedback } from "./feedback";

interface FeedbackDisplayProps {
  submissionId: string;
  onClose: () => void;
}

const CATEGORY_ORDER = ["ambiguity", "not_timeless", "too_easy", "inconsistency", "contrived", "llm_check"] as const;

const FeedbackDisplay = ({ submissionId, onClose }: FeedbackDisplayProps) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const [parsedFeedback, setParsedFeedback] = useState<ParsedFeedback | null>(null);

  useEffect(() => {
    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;

    const fetchSubmission = async () => {
      const { data, error } = await supabase
        .from("prompt_submissions")
        .select("feedback, status")
        .eq("id", submissionId)
        .single();
      
      if (!isMounted) return;
      
      if (error) {
        console.error("Error fetching submission:", error);
        return;
      }
      
      if (data) {
        console.log("Fetched submission:", data.status, data.feedback ? "has feedback" : "no feedback");
        setFeedback(data.feedback);
        setStatus(data.status);
        if (data.feedback) {
          setParsedFeedback(parseFeedbackJson(data.feedback));
        }
        
        // Stop polling if completed
        if (data.status === "completed" && pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
        }
      }
    };

    // Initial fetch
    fetchSubmission();

    // Poll every 3 seconds as fallback for realtime
    pollInterval = setInterval(() => {
      if (status === "pending") {
        fetchSubmission();
      }
    }, 3000);

    // Realtime subscription
    const channel = supabase
      .channel(`submission-${submissionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "prompt_submissions",
          filter: `id=eq.${submissionId}`,
        },
        (payload) => {
          if (!isMounted) return;
          const newData = payload.new as { feedback: string | null; status: string };
          console.log("Realtime update:", newData.status);
          setFeedback(newData.feedback);
          setStatus(newData.status);
          if (newData.feedback) {
            setParsedFeedback(parseFeedbackJson(newData.feedback));
          }
          // Stop polling on update
          if (newData.status === "completed" && pollInterval) {
            clearInterval(pollInterval);
            pollInterval = null;
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, [submissionId, status]);

  // Loading state
  if (status === "pending") {
    return (
      <Card className="border bg-card/50 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Awaiting Feedback</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground py-4">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p className="text-sm">Processing your submission... Feedback will appear here automatically.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback for unparseable feedback
  if (!parsedFeedback) {
    return (
      <Card className="border bg-card/50 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Feedback Received</span>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
            {feedback || "No feedback provided."}
          </div>
          <button 
            onClick={onClose} 
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Submit another prompt
          </button>
        </CardContent>
      </Card>
    );
  }

  const { errors, total } = countErrors(parsedFeedback);

  // Find categories with errors to auto-expand them
  const categoriesWithErrors = CATEGORY_ORDER.filter(key => parsedFeedback[key]?.error);

  return (
    <Card className="border bg-card/50 mt-6">
      <CardContent className="pt-6 space-y-4">
        {/* Summary Header */}
        <FeedbackSummary errorsCount={errors} totalCount={total} />

        {/* Category Cards */}
        <div className="space-y-3">
          {CATEGORY_ORDER.map(key => {
            const result = parsedFeedback[key];
            const config = CATEGORY_CONFIG[key];
            if (!result || !config) return null;
            
            return (
              <EvalCategoryCard 
                key={key}
                categoryKey={key}
                config={config}
                result={result}
                defaultOpen={categoriesWithErrors.includes(key)}
              />
            );
          })}
        </div>

        <button 
          onClick={onClose} 
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Submit another prompt
        </button>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;
