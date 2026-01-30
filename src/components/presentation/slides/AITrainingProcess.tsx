import { FileText, Zap, CheckCircle, XCircle, ArrowRight, ArrowDown, Lightbulb } from "lucide-react";

const AITrainingProcess = () => {
  return (
    <div className="space-y-4">
      {/* Step 1: Strong Foundations */}
      <div className="p-4 rounded-xl border bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">1</span>
          <h4 className="font-semibold text-foreground">Strong Foundations</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">You have a strong prompt and a strong rubric.</p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <span className="text-xl text-primary font-bold">+</span>
          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
        </div>
      </div>

      {/* Step 2: Mass Generation */}
      <div className="p-4 rounded-xl border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">2</span>
          <h4 className="font-semibold text-foreground">Mass Generation</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">The prompt is given to a model, which generates thousands of responses.</p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-10 rounded bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">×1000s</span>
        </div>
      </div>

      {/* Step 3: Automated Evaluation */}
      <div className="p-4 rounded-xl border bg-primary/5 border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
          <h4 className="font-semibold text-foreground">Automated Evaluation</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">The judge model evaluates every response using your rubric.</p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-12 rounded bg-muted flex items-center justify-center">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="w-14 h-14 rounded-xl bg-primary/20 border-2 border-primary/30 flex flex-col items-center justify-center">
            <span className="text-lg">🤖</span>
            <span className="text-[10px] text-primary font-medium">Judge</span>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="flex flex-col gap-1">
            <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> True
            </span>
            <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 flex items-center gap-1">
              <XCircle className="w-3 h-3" /> False
            </span>
          </div>
        </div>
      </div>

      {/* Step 4: Scoring */}
      <div className="p-4 rounded-xl border bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">4</span>
          <h4 className="font-semibold text-foreground">Scoring</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">The judge model assigns each response a score based on the rubric evaluation.</p>
        <div className="flex items-center justify-center gap-2">
          {[
            { score: 92, color: "bg-green-500" },
            { score: 87, color: "bg-green-400" },
            { score: 64, color: "bg-amber-400" },
            { score: 45, color: "bg-orange-400" },
            { score: 23, color: "bg-red-400" },
          ].map(({ score, color }) => (
            <div key={score} className="flex flex-col items-center gap-1">
              <div className="w-10 h-12 rounded bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs text-white font-bold ${color}`}>
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 5: Performance Ranking */}
      <div className="p-4 rounded-xl border bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">5</span>
          <h4 className="font-semibold text-foreground">Performance Ranking</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">We identify the top-performing and bottom-performing responses.</p>
        <div className="grid grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="text-center">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">Top Performers</p>
            <div className="flex flex-col items-center gap-1">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900">
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">#{rank}</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              ))}
            </div>
          </div>
          {/* Bottom Performers */}
          <div className="text-center">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-2">Bottom Performers</p>
            <div className="flex flex-col items-center gap-1">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-bold text-red-700 dark:text-red-300">#{rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps 6 & 7: Reinforcement */}
      <div className="grid grid-cols-2 gap-3">
        {/* Positive Reinforcement */}
        <div className="p-4 rounded-xl border bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">6</span>
            <h4 className="font-semibold text-foreground text-sm">Positive Reinforcement</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            We feed high-scoring responses back into the model: "This is what good looks like."
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-10 h-12 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <CheckCircle className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
            </div>
            <ArrowDown className="w-4 h-4 text-green-500" />
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
              "Do more like this"
            </span>
          </div>
        </div>

        {/* Negative Reinforcement */}
        <div className="p-4 rounded-xl border bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">7</span>
            <h4 className="font-semibold text-foreground text-sm">Negative Reinforcement</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            We feed low-scoring responses back: "Avoid producing outputs like this."
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-10 h-12 rounded bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <XCircle className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
            </div>
            <ArrowDown className="w-4 h-4 text-red-500" />
            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
              "Avoid this"
            </span>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div className="p-4 rounded-xl border bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary">🎯</span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Goal</h4>
            <p className="text-sm text-muted-foreground">
              As the model iterates through this process, it improves until most responses score near perfect on the rubric.
            </p>
          </div>
        </div>
      </div>

      {/* Key Implication */}
      <div className="p-4 rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-pink-50/50 dark:bg-pink-950/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-pink-600" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Key Implication: Keeping Your Rubric Generalizable</h4>
            <p className="text-sm text-muted-foreground">
              This is why your rubric must be able to evaluate{" "}
              <strong className="text-primary">unknown future outputs that may still be correct</strong>, not just the specific response you had in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITrainingProcess;
