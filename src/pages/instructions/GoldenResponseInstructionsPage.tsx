import { Award, Lightbulb, Target, TrendingUp, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GoldenResponseInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Part 2: Golden Example Deliverable</h1>
            <p className="text-muted-foreground">Your reference point for what "good" looks like</p>
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
                  <p className="text-foreground font-medium text-lg">
                    Think of this as reviewing work your intern submitted.
                  </p>
                  <p className="text-muted-foreground">
                    If you've done that before, you know exactly what high-quality output looks like, even when the work isn't perfect.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Explanation */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              A <span className="text-foreground font-medium">Golden Example Deliverable</span> is your own attempt at completing the task. While the model won't train directly on your work, creating one forces you to clarify what "good" really means, what matters most, and which elements belong in your rubric.
            </p>
          </div>

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
                  <p className="text-foreground font-medium">Based on thousands of tasks:</p>
                  <p className="text-muted-foreground">
                    Learners who produce thoughtful Golden Example Deliverables create <span className="text-foreground font-medium">significantly stronger rubrics and prompts</span>. When this step is skipped or rushed, critical evaluation criteria get missed.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      Learners who invest effort here consistently score higher.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What It Does NOT Need to Be */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <XCircle className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">What a Golden Example Deliverable Does Not Need to Be</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Does NOT need */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">It doesn't need to be...</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Perfect or polished enough to send to your boss.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DOES need */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">It does need to be...</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Thoughtful and detailed enough to give you a complete understanding of what a strong response should include.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goal Summary */}
          <div className="bg-muted/50 rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-foreground">
                <span className="font-medium">The goal is clarity and evaluative insight</span>, not perfection.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GoldenResponseInstructionsPage;
