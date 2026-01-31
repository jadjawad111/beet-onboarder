import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FeedbackDisplayProps {
  submissionId: string;
  onClose: () => void;
}

interface PromptLength {
  sentence_count_estimate: number;
  prompt_length_pass: boolean;
  notes: string;
}

interface CheckResult {
  result: "Pass" | "Fail";
  justification?: string;
  why?: string;
}

interface ChallengeLevel {
  score: number;
  justification: string;
}

interface ProjectBeetChecks {
  timelessness: CheckResult;
  input_files_ready: CheckResult;
  challenge_level: ChallengeLevel;
}

interface Ambiguity {
  issue: string;
  why_it_matters: string;
  evidence_quote: string;
}

interface Conflict {
  conflict_summary: string;
  evidence_quote_1: string;
  evidence_quote_2: string;
  why_conflict: string;
}

interface WorkflowCheck {
  result: "Pass" | "Fail";
  justification: string;
  implied_deliverables: string[];
  core_execution_work: string[];
}

interface AreasForImprovement {
  minimum_fixes: string[];
  biggest_single_fix: string;
  make_it_more_challenging: string;
}

interface StructuredFeedback {
  ambiguity_score: number;
  ambiguity_verdict: "Pass" | "Needs Revision";
  prompt_length: PromptLength;
  fifty_worker_test: CheckResult;
  project_beet_checks: ProjectBeetChecks;
  requirements_extracted: {
    objective_audience: string[];
    deliverables: string[];
    calculations_analysis: string[];
    data_sources_inputs: string[];
    formatting_presentation_acceptance: string[];
    constraints_exclusions: string[];
    validation_checks: string[];
  };
  top_ambiguities: Ambiguity[];
  conflicts: Conflict[];
  workflow_over_1hr: WorkflowCheck;
  overall_score: number;
  overall_verdict: "Pass" | "Needs Revision";
  areas_for_improvement: AreasForImprovement;
}

const ScoreBadge = ({ score, max = 5 }: { score: number; max?: number }) => {
  const getColor = () => {
    const ratio = score / max;
    if (ratio >= 0.8) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (ratio >= 0.6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };
  return <Badge variant="outline" className={getColor()}>{score}/{max}</Badge>;
};

const VerdictBadge = ({ verdict }: { verdict: "Pass" | "Needs Revision" | "Fail" }) => {
  const isPass = verdict === "Pass";
  return (
    <Badge variant="outline" className={isPass ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
      {isPass ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
      {verdict}
    </Badge>
  );
};

const PassFailBadge = ({ result }: { result: "Pass" | "Fail" }) => (
  <Badge variant="outline" className={result === "Pass" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
    {result === "Pass" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
    {result}
  </Badge>
);

const Section = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors">
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 pt-0 border-t">
        {children}
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

  const fb = parsedFeedback;

  return (
    <Card className="border bg-card/50 mt-6">
      <CardContent className="pt-6 space-y-4">
        {/* Overall Score Header */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
          <div className="flex items-center gap-3">
            {fb.overall_verdict === "Pass" ? (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            )}
            <div>
              <h3 className="font-semibold text-lg">Overall Assessment</h3>
              <p className="text-sm text-muted-foreground">Prompt Quality Score</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ScoreBadge score={fb.overall_score} />
            <VerdictBadge verdict={fb.overall_verdict} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-muted/20 border text-center">
            <p className="text-xs text-muted-foreground mb-1">Ambiguity</p>
            <div className="flex items-center justify-center gap-2">
              <ScoreBadge score={fb.ambiguity_score} />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20 border text-center">
            <p className="text-xs text-muted-foreground mb-1">50 Worker Test</p>
            <PassFailBadge result={fb.fifty_worker_test.result} />
          </div>
          <div className="p-3 rounded-lg bg-muted/20 border text-center">
            <p className="text-xs text-muted-foreground mb-1">Prompt Length</p>
            <PassFailBadge result={fb.prompt_length.prompt_length_pass ? "Pass" : "Fail"} />
          </div>
          <div className="p-3 rounded-lg bg-muted/20 border text-center">
            <p className="text-xs text-muted-foreground mb-1">Challenge Level</p>
            <ScoreBadge score={fb.project_beet_checks.challenge_level.score} />
          </div>
        </div>

        {/* Areas for Improvement - Always Visible */}
        {fb.areas_for_improvement && (
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <h4 className="font-medium text-yellow-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Areas for Improvement
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Biggest Single Fix:</p>
                <p>{fb.areas_for_improvement.biggest_single_fix}</p>
              </div>
              {fb.areas_for_improvement.minimum_fixes.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Minimum Fixes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {fb.areas_for_improvement.minimum_fixes.map((fix, i) => (
                      <li key={i}>{fix}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-muted-foreground text-xs mb-1">Make it More Challenging:</p>
                <p>{fb.areas_for_improvement.make_it_more_challenging}</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Sections */}
        <Section title="Top Ambiguities" defaultOpen={fb.top_ambiguities.length > 0}>
          {fb.top_ambiguities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No ambiguities found.</p>
          ) : (
            <div className="space-y-3">
              {fb.top_ambiguities.map((amb, i) => (
                <div key={i} className="p-3 rounded bg-muted/20 border-l-2 border-yellow-500">
                  <p className="font-medium text-sm">{amb.issue}</p>
                  <p className="text-xs text-muted-foreground mt-1">{amb.why_it_matters}</p>
                  <p className="text-xs italic mt-2 text-muted-foreground">"{amb.evidence_quote}"</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Conflicts" defaultOpen={fb.conflicts.length > 0}>
          {fb.conflicts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No conflicts found.</p>
          ) : (
            <div className="space-y-3">
              {fb.conflicts.map((conflict, i) => (
                <div key={i} className="p-3 rounded bg-muted/20 border-l-2 border-red-500">
                  <p className="font-medium text-sm">{conflict.conflict_summary}</p>
                  <p className="text-xs text-muted-foreground mt-1">{conflict.why_conflict}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs italic text-muted-foreground">"{conflict.evidence_quote_1}"</p>
                    <p className="text-xs italic text-muted-foreground">"{conflict.evidence_quote_2}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Project Beet Checks">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Timelessness</span>
              <PassFailBadge result={fb.project_beet_checks.timelessness.result} />
            </div>
            {fb.project_beet_checks.timelessness.justification && (
              <p className="text-xs text-muted-foreground -mt-2">{fb.project_beet_checks.timelessness.justification}</p>
            )}
            <div className="flex items-center justify-between">
              <span>Input Files Ready</span>
              <PassFailBadge result={fb.project_beet_checks.input_files_ready.result} />
            </div>
            {fb.project_beet_checks.input_files_ready.justification && (
              <p className="text-xs text-muted-foreground -mt-2">{fb.project_beet_checks.input_files_ready.justification}</p>
            )}
            <div className="flex items-center justify-between">
              <span>Challenge Level</span>
              <ScoreBadge score={fb.project_beet_checks.challenge_level.score} />
            </div>
            {fb.project_beet_checks.challenge_level.justification && (
              <p className="text-xs text-muted-foreground -mt-2">{fb.project_beet_checks.challenge_level.justification}</p>
            )}
          </div>
        </Section>

        <Section title="Workflow Analysis">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Over 1 Hour Workflow</span>
              <PassFailBadge result={fb.workflow_over_1hr.result} />
            </div>
            <p className="text-xs text-muted-foreground">{fb.workflow_over_1hr.justification}</p>
            {fb.workflow_over_1hr.implied_deliverables.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Implied Deliverables:</p>
                <ul className="list-disc list-inside text-xs">
                  {fb.workflow_over_1hr.implied_deliverables.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            )}
            {fb.workflow_over_1hr.core_execution_work.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Core Execution Work:</p>
                <ul className="list-disc list-inside text-xs">
                  {fb.workflow_over_1hr.core_execution_work.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
          </div>
        </Section>

        <Section title="Requirements Extracted">
          <div className="space-y-3 text-sm">
            {Object.entries(fb.requirements_extracted).map(([key, values]) => (
              values.length > 0 && (
                <div key={key}>
                  <p className="text-xs text-muted-foreground mb-1 capitalize">{key.replace(/_/g, ' ')}:</p>
                  <ul className="list-disc list-inside text-xs">
                    {values.map((v, i) => <li key={i}>{v}</li>)}
                  </ul>
                </div>
              )
            ))}
          </div>
        </Section>

        <Section title="Prompt Length Details">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Sentence Count (Est.)</span>
              <Badge variant="outline">{fb.prompt_length.sentence_count_estimate}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{fb.prompt_length.notes}</p>
          </div>
        </Section>

        <button onClick={onClose} className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Submit another prompt
        </button>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;
