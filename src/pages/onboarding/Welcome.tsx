import { 
  Cpu, Brain, Database, Sparkles, BookOpen, Target, Shield, 
  Users, Rocket, ChevronRight, Lightbulb, AlertTriangle,
  GraduationCap, FlaskConical, Code, Zap, BarChart3, Eye,
  CheckCircle2, ArrowRight, Layers, TrendingUp
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageNavigation from "@/components/PageNavigation";
import { cn } from "@/lib/utils";
import TermCardFixed from "@/components/learning/TermCardFixed";
import { usePageVisit } from "@/hooks/usePageVisit";

// Track page visit
const useWelcomeVisit = () => usePageVisit("onboarding-welcome-visited");

// Section Card wrapper for premium look
const SectionCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn(
    "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm",
    className
  )}>
    {children}
  </div>
);

// Section Header
const SectionHeader = ({ 
  icon: Icon, 
  title, 
  number 
}: { 
  icon: React.ElementType; 
  title: string;
  number: string;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="relative">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-500 flex items-center justify-center">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{number}</span>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
  </div>
);

// Pillar Card Component
const PillarCard = ({ 
  icon: Icon, 
  title, 
  description, 
  analogy 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  analogy: string;
}) => (
  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 hover:shadow-md transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-md">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{description}</p>
    <div className="flex items-start gap-2 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
      <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-indigo-700 dark:text-indigo-300 italic">{analogy}</p>
    </div>
  </div>
);

// Data Phase Card Component
const DataPhaseCard = ({ 
  phase, 
  title, 
  volume, 
  description,
  highlight
}: { 
  phase: number;
  title: string; 
  volume: string;
  description: string;
  highlight?: boolean;
}) => (
  <div className={cn(
    "relative rounded-xl border p-5 transition-all duration-300",
    highlight 
      ? "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-md" 
      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
  )}>
    <div className={cn(
      "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md",
      highlight 
        ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" 
        : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
    )}>
      {phase}
    </div>
    <h4 className={cn(
      "text-lg font-bold mb-1",
      highlight ? "text-amber-900 dark:text-amber-100" : "text-slate-900 dark:text-white"
    )}>{title}</h4>
    <div className={cn(
      "inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3",
      highlight 
        ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200" 
        : "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
    )}>
      {volume}
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

// Training Method Card
const TrainingMethodCard = ({ 
  title, 
  acronym,
  description,
  icon: Icon
}: { 
  title: string;
  acronym: string;
  description: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30 p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="font-bold text-purple-900 dark:text-purple-100">{title}</h4>
        <span className="text-xs font-mono text-purple-600 dark:text-purple-400">({acronym})</span>
      </div>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

// Eval Type Card
const EvalTypeCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 hover:shadow-md transition-all duration-300">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  </div>
);

// Timeline Item
const TimelineItem = ({ 
  year, 
  title, 
  description,
  isLast = false
}: { 
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}) => (
  <div className="relative flex gap-6">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white z-10 shadow-lg">
        {year}
      </div>
      {!isLast && (
        <div className="w-0.5 h-full bg-gradient-to-b from-indigo-400 to-transparent absolute top-12 left-6 -translate-x-1/2" />
      )}
    </div>
    <div className="pb-8">
      <h4 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">{title}</h4>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  </div>
);

// Key Takeaways Component
const KeyTakeaways = ({ items }: { items: string[] }) => (
  <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 p-5 mt-6">
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="w-5 h-5 text-amber-500" />
      <h4 className="font-bold text-slate-900 dark:text-white">Key Takeaways</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Definitions for flashcards
const definitions = [
  { term: "Compute", definition: "The raw processing power and physical infrastructure (e.g., GPUs) needed to run AI models. Analogous to the processing speed and power in your brain." },
  { term: "Algorithms", definition: "The set of rules or instructions that AI models follow to process information. Analogous to neurons and synapses in your brain." },
  { term: "Data", definition: "The information itself that AI models learn from and store. The fuel that powers AI learning." },
  { term: "Human Data", definition: "Specialized information produced by people to steer and train AI models across pre-training, post-training, and evaluation phases." },
  { term: "Pre-training", definition: "The initial phase using extremely large volumes of data (10T+ tokens) scraped from the internet to help models predict the next word or token." },
  { term: "Post-training", definition: "The phase using high-quality data at lower volumes (500M+ tokens) to align AI with human judgment, values, and preferences." },
  { term: "Supervised Fine-Tuning (SFT)", definition: "A post-training method where operators provide 'Gold Standard' examples of prompts and perfect responses to teach desired AI behaviors." },
  { term: "RLHF", definition: "Reinforcement Learning from Human Feedback. A method where humans rank AI-generated responses to teach the model nuance and preferred outputs." },
  { term: "Embeddings", definition: "Vector representations of words, images, or other data that allow AI models to understand relationships between concepts." },
  { term: "Evaluations (Evals)", definition: "Tests and assessments used to determine how well AI models perform on specific tasks and capabilities." },
  { term: "Benchmarks", definition: "Publicly available standardized tests (like MMLU) that assess and compare AI models on various capabilities." },
  { term: "Red Teaming", definition: "A specialized evaluation where humans act as adversaries, trying to trick the model into giving harmful, biased, or restricted information." },
];

const Welcome = () => {
  useWelcomeVisit();
  
  return (
    <div className="pb-24">
      <Breadcrumbs />
      
      {/* Unique Hero Section - Deep Indigo/Purple Theme */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3),transparent_50%)]" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-purple-400/20 blur-xl" />
        
        <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Essential Reading</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-400/30 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">~15 min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Handshake AI
          </h1>
          
          <p className="text-xl text-white/95 max-w-3xl leading-relaxed">
            Understanding Human Data and our role in shaping the future of artificial intelligence.
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-2xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">Please Read Carefully</h2>
            <p className="text-amber-800 dark:text-amber-200">
              This foundational content explains what Human Data is, how AI models are trained, and why Handshake AI exists. 
              Understanding these concepts is <strong>essential</strong> for your success in this role. Take your time with each section.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Core Pillars of AI */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Layers} title="The Core Pillars of AI" number="1" />
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          There are three core pillars of any AI system:
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          <PillarCard
            icon={Cpu}
            title="Compute"
            description="Computers and machines (e.g., GPUs) provide the raw computing power and physical infrastructure to actually run the AI models."
            analogy="Analogous to the processing speed and power in your brain"
          />
          <PillarCard
            icon={Code}
            title="Algorithms"
            description="Algorithms are analogous to the actual neurons and synapses in your brain and how they process information."
            analogy="The actual neurons and synapses in your brain"
          />
          <PillarCard
            icon={Database}
            title="Data"
            description="Data is analogous to the information itself that you have learned from and stored."
            analogy="The information you have learned from and stored"
          />
        </div>

        <KeyTakeaways items={[
          "AI systems require all three pillars: Compute, Algorithms, and Data",
          "Data is the 'fuel' that powers AI learning",
          "Human Data specifically refers to information produced by people to steer AI models"
        ]} />
      </SectionCard>

      {/* Section 2: What is Human Data? */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Users} title="What is Human Data?" number="2" />

        <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
          <p className="text-lg text-slate-600 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">"Human data"</strong> refers to the specialized information produced by people to steer AI models. Humans provide the information that the model learns from. There are three distinct phases of data:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          <DataPhaseCard
            phase={1}
            title="Pre-training"
            volume="10T+ tokens"
            description="Extremely large volumes used to help the model predict the next word or token. AI labs have scraped the entire internet for pre-training data."
          />
          <DataPhaseCard
            phase={2}
            title="Post-training"
            volume="500M+ tokens"
            description="Extremely high-quality data at relatively lower volumes. This is where human expertise becomes critical for aligning AI with human values."
            highlight
          />
          <DataPhaseCard
            phase={3}
            title="Evaluations"
            volume="Ongoing"
            description="Assessments or tests to determine how 'good' AI models are at various tasks."
          />
        </div>

        <KeyTakeaways items={[
          "Human Data is specialized information produced by people to guide AI models",
          "Pre-training uses massive volumes of internet data for foundational learning",
          "Post-training requires smaller volumes of extremely high-quality human-crafted data",
          "Evaluations measure model capabilities and guide improvement"
        ]} />
      </SectionCard>

      {/* Section 3: How AI Models are Trained */}
      <SectionCard className="mb-8">
        <SectionHeader icon={GraduationCap} title="How are AI Models Trained?" number="3" />

        {/* Pre-Training */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Pre-Training: The Foundational Data
          </h3>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-300">
            <p>
              Pre-training is about <strong className="text-slate-900 dark:text-white">breadth over depth</strong>. AI labs scrape the public internet - Wikipedia, Reddit, GitHub, YouTube, etc. - to create a statistical map of human language.
            </p>
            
            <p>
              By transforming this data into <strong className="text-slate-900 dark:text-white">embeddings</strong> (vector representations of each word, image, etc.), the model learns that "Paris" is closer to "France" than it is to "Apple." It essentially learns to be a world-class pattern recognition engine.
            </p>

            <p>
              This is why we call them <strong className="text-slate-900 dark:text-white">GPTs (Generative Pre-Trained Transformers)</strong>. They aren't "thinking" - they are predicting the next most likely piece of a sequence based on everything humans have ever written online.
            </p>
          </div>

          {/* Problem callout */}
          <div className="mt-6 rounded-xl border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">The Problem with Pre-training Alone</h4>
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
                  The internet is a noisy, chaotic place. A model trained only with pre-training data is like a person who has read every book in the Library of Congress but has never spoken to another human. It is incredibly "knowledgeable" but socially incoherent.
                </p>
                <div className="rounded-lg bg-white dark:bg-slate-900 p-4 border border-amber-200 dark:border-amber-700">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">Illustrative Example:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                    If you asked a pre-trained model, "How do I bake a cake?" Instead of giving you a recipe, it might respond with: "How do I bake a cake? How do I fix a car? How do I fly a plane?" because it saw many "How-to" lists on the web and is simply continuing the pattern of asking questions rather than answering them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Training */}
        <div className="rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20 p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Post-Training: Aligning to Taste and Human Preferences
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Post-training is where we align raw token prediction with human judgement and values. We use two primary methods:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <TrainingMethodCard
              icon={Target}
              title="Supervised Fine-Tuning"
              acronym="SFT"
              description="Operators write 'Gold Standard' examples of how the AI should behave. We provide the prompt and the perfect response. This teaches the model how to be helpful, concise, accurate, etc."
            />
            <TrainingMethodCard
              icon={TrendingUp}
              title="Reinforcement Learning from Human Feedback"
              acronym="RLHF"
              description="We give the model a prompt and let it generate multiple different answers. The operator then ranks them from best to worst. This teaches the model nuance - identifying which answer is preferred."
            />
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm">
            <p>
              <strong className="text-slate-900 dark:text-white">Post-training is typically expensive</strong> because it fundamentally requires humans to do the work. While there are significant volumes of synthetic data generated to augment the volume of post-training data, ultimately the arbiter of human judgement has to be humans.
            </p>
            
            <p>
              In this phase, <strong className="text-slate-900 dark:text-white">data quality is extremely important</strong>. One high-quality "gold" response is often more valuable than 40,000 tokens of raw web-scraped text.
            </p>

            <p>
              Post-training data is needed for all kinds of capabilities: following instructions, factuality, frontier STEM reasoning, writing code, leveraging tools like the computer terminal or Gmail, generating images and videos, etc.
            </p>

            <p>
              As models have become more complex and capable, post-training data has become even more difficult to produce because it requires finding people who have the right kind of background/expertise (not everybody is capable of training a model to write code), training them on how to produce high-quality data, and managing their quality at scale.
            </p>
          </div>

          {/* Emerging paradigms */}
          <div className="mt-6 rounded-lg bg-white dark:bg-slate-900 p-4 border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Emerging Paradigm: Semi-Verifiable Tasks
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              In the last 6-12 months, a new paradigm of Reinforcement Learning has emerged for training models on semi-verifiable tasks. For prompts where there is a clear right answer (think about asking a model to answer a math homework question), it will be more clear whether the AI model produced a good response because the answer is verifiable. For prompts where there is not a clear right answer (think about asking a model to produce a management presentation), it is harder to judge. The industry has attempted to solve this by <strong className="text-slate-900 dark:text-white">creating rubrics to evaluate model responses</strong> - the same way your English teacher would grade your essays using a rubric.
            </p>
          </div>
        </div>

        <KeyTakeaways items={[
          "Pre-training creates foundational knowledge from internet-scale data",
          "Post-training aligns AI with human values using SFT and RLHF methods",
          "Data quality matters enormously - one gold response can outweigh thousands of tokens of web data",
          "Post-training requires specialized human expertise that's challenging to find at scale",
          "Rubrics are increasingly used to evaluate responses for complex, subjective tasks"
        ]} />
      </SectionCard>

      {/* Section 4: Evaluations */}
      <SectionCard className="mb-8">
        <SectionHeader icon={BarChart3} title="Evaluation: The Exam" number="4" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Evaluations (or "Evals") are the tests we run to validate whether the AI model is capable of what we want it to be. There are typically 4 types of evaluations:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <EvalTypeCard
            icon={BarChart3}
            title="Benchmarks"
            description="Publicly available tests (like the MMLU or Humanity's Last Exam) that assess models on various capabilities. These tests are often produced by credible organizations and companies (often not the AI labs) and they include leaderboards for which models score the highest."
          />
          <EvalTypeCard
            icon={Eye}
            title="Internal Eval Sets"
            description="Private tests that AI labs produce exclusively for themselves (typically in partnership with data companies). Designing good internal eval sets is a competitive advantage. If every other AI lab knew about all the eval sets their competitors had, they would essentially know the 'product roadmap' of the lab."
          />
          <EvalTypeCard
            icon={Users}
            title="Human Preferences"
            description="Judgment-based evaluations. Humans compare multiple AI model responses and gauge which one is more helpful or useful. These signals can be noisy, but they can be particularly helpful when trying to get a holistic sense of the personality or style of a model."
          />
          <EvalTypeCard
            icon={Shield}
            title="Red Teaming"
            description="A specialized form of evaluation where humans act as 'adversaries,' trying to trick the model into giving harmful, biased, or restricted information."
          />
        </div>

        <div className="rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 p-4">
          <p className="text-center font-semibold text-slate-900 dark:text-white">
            Without thoughtful eval sets, the industry is flying blind.
          </p>
        </div>

        <KeyTakeaways items={[
          "Evaluations validate AI capabilities across four main types",
          "Benchmarks are public; internal eval sets are competitive advantages",
          "Human preference testing captures nuance that automated tests miss",
          "Red teaming ensures AI safety by probing for vulnerabilities"
        ]} />
      </SectionCard>

      {/* Section 5: What Makes Good Data */}
      <SectionCard className="mb-8">
        <SectionHeader icon={FlaskConical} title="What Makes Good Data?" number="5" />

        <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-900 dark:text-red-100 mb-2">A Common Misconception</h4>
              <p className="text-sm text-red-800 dark:text-red-200">
                You will often hear the human data industry referred to as "data annotation". This is a terrible misnomer since it is evocative of early computer vision data annotation, which consisted of drawing boxes around cars and stop signs. It was pretty black-and-white whether the data quality was good - did the human draw a tight box around the car or not? An individual didn't need to have much taste-making or expertise in order to produce this kind of data.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 mb-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-3">Today's Reality</h4>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Producing data to train LLMs today, however, is <strong className="text-slate-900 dark:text-white">complex</strong>, requires <strong className="text-slate-900 dark:text-white">significant judgement and attention to detail</strong>, and is often difficult to tell if the data quality is good.
          </p>
          <div className="rounded-lg bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm italic text-slate-600 dark:text-slate-300">
              It's a very different cognitive requirement to write up a 100+ line rubric explaining what a good slide deck looks like for a management presentation than it is to draw a box around a car.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 p-6 mb-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            The Definition of "Good" Data
          </h4>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            In a theoretical sense - <strong className="text-slate-900 dark:text-white">"good" data is data that helps models meaningfully improve on a certain capability</strong>. We currently measure this improvement across all 4 of the ways we do evals (with a heavy skew towards public benchmarks and internal eval sets), so researchers often think about "good" data as whatever helps their model improve on benchmarks and internal eval sets.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-white dark:bg-slate-900 p-4 border border-indigo-200 dark:border-indigo-700">
              <h5 className="font-semibold text-slate-900 dark:text-white mb-2">When Researchers Know What's Good</h5>
              <p className="text-slate-600 dark:text-slate-300">
                Sometimes a researcher will have a very clear sense about what "good" data looks like because they have already trained their model on a particular shape of data and successfully realized improvements. In those instances, our goal is to produce data that is as faithful to the requirements as possible.
              </p>
            </div>
            <div className="rounded-lg bg-white dark:bg-slate-900 p-4 border border-indigo-200 dark:border-indigo-700">
              <h5 className="font-semibold text-slate-900 dark:text-white mb-2">When Researchers Are Experimenting</h5>
              <p className="text-slate-600 dark:text-slate-300">
                Other times, a researcher will not have a clear sense about what "good" data looks like because they are experimenting with a new shape of data. In these instances, our goal is to collaborate as much as possible on what the best shape of data could be. Often times researchers are not only amenable, but prefer for data companies to provide their expertise in refining and adjusting their experimental specs.
              </p>
            </div>
          </div>
        </div>

        <KeyTakeaways items={[
          "LLM data production is far more complex than traditional annotation",
          "'Good' data measurably improves model capabilities on evaluations",
          "Sometimes we execute to spec; sometimes we collaborate to define the spec",
          "Data companies add value through expertise, not just labor"
        ]} />
      </SectionCard>

      {/* Section 6: Handshake's Story */}
      <SectionCard className="mb-8">
        <SectionHeader icon={Rocket} title="History of How Handshake Entered the Human Data Industry" number="6" />

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          It's a pretty straightforward story:
        </p>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 mb-6">
          <TimelineItem
            year="2023"
            title="The Beginning"
            description="A data vendor reached out to Handshake looking for students who could train AI models on math, physics, chemistry, etc."
          />
          <TimelineItem
            year="12+"
            title="Months of Partnership"
            description="Handshake supplied students to this data vendor for more than 12 months."
          />
          <TimelineItem
            year="2024"
            title="The Realization"
            description="Handshake recognized that the real foundation of the AI economy isn't just models or infrastructure...it's people with the ability to contribute meaningful human intelligence."
          />
          <TimelineItem
            year="2025"
            title="Building Our Own Division"
            description="Handshake is building the career network for the AI economy. By launching our own human data division and working directly with AI labs, we're creating real pathways for people to build durable, high-utility skills while connecting them to meaningful work as AI reshapes every industry."
            isLast
          />
        </div>

        <div className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="font-bold text-slate-900 dark:text-white">Where We Are Today</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Handshake started with advanced STEM reasoning tasks (PhD-level) and then expanded into many types of data, working directly with leading AI labs to shape the future of artificial intelligence.
          </p>
        </div>

        <KeyTakeaways items={[
          "Handshake discovered its strength: access to talented people who can produce quality data",
          "The transition from supplier to direct partner with AI labs was a natural evolution",
          "Starting with STEM expertise provided a strong foundation for expansion"
        ]} />
      </SectionCard>

      {/* Flashcards Section */}
      <SectionCard className="mb-8">
        <SectionHeader icon={BookOpen} title="Key Definitions" number="7" />

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Click each card to reveal the definition. Use these as a quick reference as you progress through your training.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {definitions.map((def, index) => (
            <TermCardFixed
              key={index}
              term={def.term}
              definition={def.definition}
            />
          ))}
        </div>
      </SectionCard>

      <PageNavigation
        nextPage={{ title: "Getting Access", href: "/onboarding/access" }}
      />
    </div>
  );
};

export default Welcome;
