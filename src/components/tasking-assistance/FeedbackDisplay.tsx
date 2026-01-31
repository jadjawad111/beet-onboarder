import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, CheckCircle2 } from "lucide-react";

interface FeedbackDisplayProps {
  submissionId: string;
  onClose: () => void;
}

const FeedbackDisplay = ({ submissionId, onClose }: FeedbackDisplayProps) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    // Fetch initial state
    const fetchSubmission = async () => {
      const { data } = await supabase
        .from("prompt_submissions")
        .select("feedback, status")
        .eq("id", submissionId)
        .single();
      
      if (data) {
        setFeedback(data.feedback);
        setStatus(data.status);
      }
    };

    fetchSubmission();

    // Subscribe to realtime updates
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
          const newData = payload.new as { feedback: string | null; status: string };
          setFeedback(newData.feedback);
          setStatus(newData.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [submissionId]);

  return (
    <Card className="border bg-card/50 mt-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          {status === "completed" ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <MessageSquare className="h-5 w-5 text-primary" />
          )}
          <span className="text-sm font-medium text-foreground">
            {status === "completed" ? "Feedback Received" : "Awaiting Feedback"}
          </span>
        </div>

        {status === "pending" ? (
          <div className="flex items-center gap-3 text-muted-foreground py-4">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p className="text-sm">
              Processing your submission... Feedback will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <div className="bg-muted/30 rounded-lg p-4 whitespace-pre-wrap text-sm">
              {feedback || "No feedback provided."}
            </div>
          </div>
        )}

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
