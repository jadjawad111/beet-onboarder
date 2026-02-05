import { useEffect } from "react";
import { Award, Lightbulb, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCourseProgress } from "@/hooks/useCourseProgress";

const GoldenResponseInstructionsPage = () => {
  const { markPart2Complete, isPart2Unlocked } = useCourseProgress();

  // Mark Part 2 as complete when user views this page
  useEffect(() => {
    if (isPart2Unlocked) {
      markPart2Complete();
    }
  }, [markPart2Complete, isPart2Unlocked]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Part 2: Deliverable</h1>
            <p className="text-muted-foreground">Create your reference point for what "good" looks like</p>
          </div>
        </div>

        {/* What Is Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">What Is a Golden Example Deliverable?</h2>
          </div>

          {/* Main Explanation */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              A <span className="text-foreground font-medium">Golden Example Deliverable</span> is your own attempt at completing the task. Although the model will not train directly on your work, creating one helps you clarify what a strong response looks like, what truly matters in the task, and which elements should be reflected in the rubric.
            </p>
          </div>

          {/* Intern Analogy Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    You can think of this process as reviewing work submitted by an intern. If you have done this before, you already know that you can clearly identify high-quality output, even when the work is not perfect. Later, the Golden Example Deliverable will be used and is critical for informing the rubrics or grading criteria you use to evaluate your intern's work 🙂
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Insight Card */}
          <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-foreground font-medium">Based on our review of thousands of tasks:</p>
                  <p className="text-muted-foreground">
                    Fellows who produce thoughtful Golden Example Deliverables consistently create <span className="text-foreground font-medium">stronger prompts and more accurate rubrics</span>. When this step is skipped or rushed, important evaluation criteria are often missed, which makes it harder to assess model responses effectively.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quality Standard */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Quality Standard</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-muted-foreground leading-relaxed">
                The Golden Example Deliverable does not need to be perfect, but it must be <span className="text-foreground font-medium">detailed and well considered enough</span> to give you a complete understanding of what a strong response should include. The goal is <span className="text-foreground font-medium">comprehension and evaluation</span>, not perfection.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GoldenResponseInstructionsPage;
