import { Cpu, Code, Database, Users, GraduationCap, Target } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
            Essential Reading
          </span>
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
            ~10 min
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Welcome to Handshake AI</h1>
        <p className="text-lg text-white/90 max-w-2xl">
          Understanding Human Data and our role in shaping the future of artificial intelligence.
        </p>
      </div>

      {/* The 3 Pillars */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">The Core Pillars of AI</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Compute</h3>
            <p className="text-sm text-muted-foreground">
              Raw processing power (GPUs) that runs AI models. Like processing speed in your brain.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Algorithms</h3>
            <p className="text-sm text-muted-foreground">
              Rules that AI follows to process information. Like neurons and synapses.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Data</h3>
            <p className="text-sm text-muted-foreground">
              The information AI learns from. The fuel that powers AI learning.
            </p>
          </div>
        </div>
      </section>

      {/* What is Human Data */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">What is Human Data?</h2>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">"Human data"</strong> is specialized information produced by people to steer AI models. There are three phases:
        </p>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-foreground">Pre-training (10T+ tokens)</h4>
              <p className="text-sm text-muted-foreground">Massive internet data helps the model predict the next word.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border-2 border-primary/30 bg-primary/5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-foreground">Post-training (500M+ tokens) ← You are here</h4>
              <p className="text-sm text-muted-foreground">High-quality human-crafted data aligns AI with human values and judgment.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-foreground">Evaluations (Ongoing)</h4>
              <p className="text-sm text-muted-foreground">Tests to measure how well AI performs on various tasks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Methods */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">How AI Models are Trained</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Supervised Fine-Tuning (SFT)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Providing "gold standard" examples of prompts and perfect responses to teach desired behaviors.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">RLHF</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Reinforcement Learning from Human Feedback. Humans rank AI responses to teach nuance and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Why Handshake Exists */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Why Handshake AI Exists</h2>
        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">The Problem</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Pre-trained models are powerful but unreliable. They generate plausible-sounding but often wrong outputs. They lack judgment.
          </p>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-foreground font-medium">
              Handshake exists to create the high-quality human data that teaches AI models real professional judgment.
            </p>
          </div>
        </div>
      </section>

      {/* Key Terms */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Key Terms to Know</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { term: "Compute", def: "Processing power and infrastructure (GPUs)" },
            { term: "Embeddings", def: "Vector representations that show relationships between concepts" },
            { term: "Benchmarks", def: "Standardized tests (like MMLU) to compare AI models" },
            { term: "Red Teaming", def: "Testing where humans try to trick the model into harmful outputs" },
          ].map((item) => (
            <div key={item.term} className="p-4 rounded-xl border border-border bg-card">
              <span className="font-semibold text-foreground">{item.term}:</span>{" "}
              <span className="text-sm text-muted-foreground">{item.def}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;