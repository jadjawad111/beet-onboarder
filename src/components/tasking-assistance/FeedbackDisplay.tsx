import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FeedbackDisplayProps {
  submissionId: string;
  onClose: () => void;
}

interface CategoryFeedback {
  [key: string]: string | boolean | string[];
}

interface StructuredFeedback {
  ambiguity?: CategoryFeedback;
  not_timeless?: CategoryFeedback;
  too_easy?: CategoryFeedback;
  inconsistency?: CategoryFeedback;
  contrived?: CategoryFeedback;
  llm_check?: CategoryFeedback;
  [key: string]: CategoryFeedback | undefined;
}

const categoryLabels: Record<string, { label: string; icon: string; color: string }> = {
  ambiguity: { label: "Ambiguity", icon: "🔍", color: "border-yellow-500" },
  not_timeless: { label: "Timelessness", icon: "⏰", color: "border-blue-500" },
  too_easy: { label: "Complexity", icon: "📊", color: "border-purple-500" },
  inconsistency: { label: "Consistency", icon: "⚖️", color: "border-orange-500" },
  contrived: { label: "Realism", icon: "🎯", color: "border-green-500" },
  llm_check: { label: "LLM Usage", icon: "🤖", color: "border-red-500" },
};

const CategorySection = ({ 
  categoryKey, 
  data, 
  defaultOpen = false 
}: { 
  categoryKey: string; 
  data: CategoryFeedback; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = categoryLabels[categoryKey] || { 
    label: categoryKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
    icon: "📋", 
    color: "border-muted" 
  };

  // Determine if this category has issues
  const hasIssues = Object.entries(data).some(([key, value]) => {
    if (key.toLowerCase().includes('error') && value === true) return true;
    if (key.toLowerCase().includes('pass') && value === false) return true;
    if (Array.isArray(value) && value.length > 0) return true;
    return false;
  });

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={`border rounded-lg ${hasIssues ? config.color : ''} border-l-4`}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-xl">{config.icon}</span>
          <span className="text-sm font-medium">{config.label}</span>
          {hasIssues && (
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Needs Review
            </Badge>
          )}
          {!hasIssues && (
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Pass
            </Badge>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 border-t">
        <div className="pt-3 space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="text-sm">
              <p className="text-xs text-muted-foreground mb-1 capitalize font-medium">
                {key.replace(/_/g, ' ')}:
              </p>
              {typeof value === 'boolean' ? (
                <Badge variant="outline" className={value ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                  {value ? "Yes" : "No"}
                </Badge>
              ) : Array.isArray(value) ? (
                value.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {value.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">None</p>
                )
              ) : (
                <p className="text-foreground">{String(value)}</p>
              )}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const FeedbackDisplay = ({ submissionId, onClose }: FeedbackDisplayProps) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const [parsedFeedback, setParsedFeedback] = useState<StructuredFeedback | null>(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      const { data } = await supabase
        .from("prompt_submissions")
        .select("feedback, status")
        .eq("id", submissionId)
        .single();
      
      if (data) {
        setFeedback(data.feedback);
        setStatus(data.status);
        if (data.feedback) {
          try {
            setParsedFeedback(JSON.parse(data.feedback));
          } catch {
            setParsedFeedback(null);
          }
        }
      }
    };

    fetchSubmission();

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
          if (newData.feedback) {
            try {
              setParsedFeedback(JSON.parse(newData.feedback));
            } catch {
              setParsedFeedback(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [submissionId]);

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

  if (!parsedFeedback) {
    return (
      <Card className="border bg-card/50 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Feedback Received</span>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 whitespace-pre-wrap text-sm">
            {feedback || "No feedback provided."}
          </div>
          <button onClick={onClose} className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Submit another prompt
          </button>
        </CardContent>
      </Card>
    );
  }

  // Count issues across all categories
  const categoryKeys = ['ambiguity', 'not_timeless', 'too_easy', 'inconsistency', 'contrived', 'llm_check'];
  const categoriesWithIssues = categoryKeys.filter(key => {
    const data = parsedFeedback[key];
    if (!data) return false;
    return Object.entries(data).some(([k, v]) => {
      if (k.toLowerCase().includes('error') && v === true) return true;
      if (k.toLowerCase().includes('pass') && v === false) return true;
      if (Array.isArray(v) && v.length > 0) return true;
      return false;
    });
  });

  return (
    <Card className="border bg-card/50 mt-6">
      <CardContent className="pt-6 space-y-4">
        {/* Summary Header */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
          <div className="flex items-center gap-3">
            {categoriesWithIssues.length === 0 ? (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            )}
            <div>
              <h3 className="font-semibold text-lg">Feedback Analysis</h3>
              <p className="text-sm text-muted-foreground">
                {categoriesWithIssues.length === 0 
                  ? "All checks passed!" 
                  : `${categoriesWithIssues.length} area${categoriesWithIssues.length > 1 ? 's' : ''} need${categoriesWithIssues.length === 1 ? 's' : ''} review`
                }
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={categoriesWithIssues.length === 0 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            }
          >
            {categoryKeys.length - categoriesWithIssues.length}/{categoryKeys.length} Passed
          </Badge>
        </div>

        {/* Category Sections */}
        <div className="space-y-3">
          {categoryKeys.map(key => {
            const data = parsedFeedback[key];
            if (!data) return null;
            return (
              <CategorySection 
                key={key} 
                categoryKey={key} 
                data={data} 
                defaultOpen={categoriesWithIssues.includes(key)}
              />
            );
          })}
        </div>

        {/* Any other fields not in the standard categories */}
        {Object.entries(parsedFeedback)
          .filter(([key]) => !categoryKeys.includes(key))
          .map(([key, value]) => {
            if (!value || typeof value !== 'object') return null;
            return (
              <CategorySection 
                key={key} 
                categoryKey={key} 
                data={value as CategoryFeedback} 
              />
            );
          })}

        <button onClick={onClose} className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Submit another prompt
        </button>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;
