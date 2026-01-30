import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { 
  ArrowRight, ArrowLeft, BookOpen, 
  AlertTriangle, FileWarning
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import beetIcon from "@/assets/beet-icon.png";
import RubricsProgressTracker from "@/components/rubrics/RubricsProgressTracker";
import ErrorCard from "@/components/rubrics/ErrorCard";
import { useRubricsModule3Completion } from "@/hooks/useRubricsModule3Completion";

// Error content data with comprehensive guidance
const COMMON_ERRORS = [
  {
    id: "ambiguous",
    number: 1,
    title: "Ambiguous",
    description: "A criterion is ambiguous when a judge model can't reliably mark it True/False from the deliverable because it uses subjective language, undefined standards, or fuzzy thresholds. Ambiguity leads to inconsistent scoring across evaluators and future responses.",
    examplePrompt: '"You are a consultant. Create a 6-slide proposal deck (PDF) that includes: Problem Summary, Proposed Approach, Timeline, Risks & Mitigations."',
    goodExamples: [
      {
        content: "The proposal deck includes a slide titled 'Risks and Mitigations'.",
        explanation: "Clear, observable, binary.",
      },
    ],
    badExamples: [
      {
        content: "The proposal deck is well-organized.",
        explanation: '"Well-organized" is subjective; different judges will interpret it differently.',
      },
    ],
    howToDetect: [
      'Look for subjective adjectives: good, strong, well-written, clear, professional, appropriate, thorough, compelling, polished, correct (without specifying what "correct" means).',
      'Look for undefined standards: "industry-standard," "best practices," "proper," "high quality."',
      'Look for fuzzy quantifiers: "enough," "adequate," "detailed," "concise," "reasonable" (unless defined with a concrete threshold).',
      "Quick test: Could two reasonable reviewers disagree while reading the same output? If yes → likely ambiguous.",
    ],
    howToFix: "Replace subjective words with observable artifacts (sections, headings, specific required statements, counts, or clearly defined thresholds).",
  },
  {
    id: "not-self-contained",
    number: 2,
    title: "Not self-contained",
    description: "A criterion is not self-contained when it relies on information outside the criterion + deliverable (e.g., prompt text, input files, URLs, or other rubric items). This fails because the judge model evaluates each criterion in isolation and does not read the prompt, links, or input files.",
    examplePrompt: '"Using the data below, write a one-page Q1 sales summary (PDF). Data: January = $310k, February = $420k, March = $510k."',
    goodExamples: [
      {
        content: "The summary states total Q1 sales are $1,240,000.",
        explanation: "All needed context is inside the criterion.",
      },
    ],
    badExamples: [
      {
        content: "The summary includes the total Q1 sales from the input data.",
        explanation: 'The judge model doesn\'t have access to "the input data" unless the numbers are in the criterion or already inside the deliverable in a checkable way.',
      },
    ],
    howToDetect: [
      'Look for references like: "from the prompt," "from the input file," "from the spreadsheet," "from the chart above," "from the provided link," "as described earlier."',
      'Look for pronouns that require context: "this," "that," "the above," "the following" (when nothing follows inside the criterion).',
      'Look for criteria that depend on other criteria: "The response satisfies the requirements above."',
      "Quick test: If you only showed someone the criterion + deliverable (and nothing else), could they judge it? If no → not self-contained.",
    ],
    howToFix: "Include the needed reference inside the criterion (e.g., the specific number, list of allowed items, required names, required clauses).",
  },
  {
    id: "stacked",
    number: 3,
    title: "Stacked",
    description: "A criterion is stacked when it measures two or more independent checks at once. Because scoring is binary, a response that satisfies half the requirement still fails the entire criterion—creating unfair scoring and noisy training signals.",
    examplePrompt: '"Write a kickoff email that includes: (1) meeting date, (2) Zoom link, (3) agenda bullets."',
    goodExamples: [
      {
        content: "The email includes the meeting date.",
        explanation: "Atomic — measures one thing.",
      },
      {
        content: "The email includes a Zoom link.",
        explanation: "Atomic — measures one thing.",
      },
    ],
    badExamples: [
      {
        content: "The email includes the meeting date and the Zoom link.",
        explanation: "Two separate requirements in one True/False.",
      },
    ],
    howToDetect: [
      'Look for "and / as well as / along with" connecting multiple requirements.',
      "Look for multiple nouns that could be independently present/absent.",
      "Quick test: Can a response partially satisfy this? If yes → it's stacked.",
    ],
    howToFix: "Split into multiple atomic criteria, one per check.",
  },
  {
    id: "convoluted",
    number: 4,
    title: "Convoluted phrasing",
    description: "A criterion has convoluted phrasing when it's longer or more complex than necessary, making it harder to interpret consistently. Even if technically judgeable, it increases reviewer errors and inconsistent judgments.",
    examplePrompt: '"Write a one-page summary report that includes a table summarizing 2026 farm produce totals."',
    goodExamples: [
      {
        content: "The table in the Summary Report includes a title indicating it summarizes farm produce production for 2026.",
        explanation: "Clean, direct, easy to parse.",
      },
    ],
    badExamples: [
      {
        content: "The summary report has a table in it where the title indicates that it is meant to be a summary of the values for farm produce production for 2026.",
        explanation: "Wordy, indirect, harder to parse.",
      },
    ],
    howToDetect: [
      'The criterion contains multiple dependent clauses ("where… that… which… meant to…").',
      'The criterion repeats itself ("indicates that it indicates…").',
      "You have to reread it to understand what is being checked.",
      "Quick test: Can you rewrite it in 1 sentence with fewer words without losing meaning? If yes → it's likely convoluted.",
    ],
    howToFix: 'Use a consistent template: "The [deliverable/section] [states/includes] [specific observable detail]."',
  },
  {
    id: "process-words",
    number: 5,
    title: "Process words",
    description: "A criterion uses process words when it evaluates how the deliverable was produced instead of what the deliverable contains or is. The judge model cannot see process, only the final output.",
    examplePrompt: '"Create a sample track in MP4 format."',
    goodExamples: [
      {
        content: "The sample track is an MP4 file.",
        explanation: "Observable output state.",
      },
    ],
    badExamples: [
      {
        content: "The sample track is converted into an MP4 file.",
        explanation: "Conversion process is not observable.",
      },
    ],
    howToDetect: [
      'Look for verbs like: "researched," "confirmed," "validated," "ensured," "considered," "followed," "converted," "calculated," "used."',
      'Look for phrases implying intent or method: "made sure," "took steps," "properly handled."',
      "Quick test: Could the deliverable be correct even if we don't know how it was made? If yes → measure the deliverable, not the process.",
    ],
    howToFix: 'Convert process → observable output state: "The deliverable includes…" / "The deliverable states…" / "The deliverable is…"',
  },
];

// Task, Prompt, and Rubric Specific Errors
const SPECIFIC_ERRORS = [
  {
    id: "missing-criteria",
    number: 6,
    title: "Missing Criteria",
    description: "Missing Criteria is a rubric-level error: the rubric fails to include criteria for one or more essential requirements (core prompt asks, critical failure modes, or key quality dimensions). This allows clearly bad or incomplete deliverables to score well.",
    examplePrompt: '"You are a luxury travel advisor. Create a ≤3-page PDF with a numbered list of Forbes 5-star NYC hotels. For each hotel: header, polished description, full address, amenities. Bold pet-friendly and swimming-related amenities."',
    goodExamples: [],
    badExamples: [],
    missingExample: "Since the prompt explicitly requests a PDF, omitting a criterion that verifies the deliverable is a PDF would leave a critical gap in the rubric.",
    howToDetect: [
      "Do a prompt decomposition and make a checklist of explicit must-haves. Verify each has at least one criterion.",
      "Run a 'bad-but-polished' thought experiment: Could a deliverable omit a core requirement and still score high? If yes → missing criteria.",
      "Check category coverage: Are Instruction Following + Reasoning + Formatting represented appropriately? (and Extraction when required)",
      "Check failure-mode coverage: Are common wrong responses penalized (negative criteria), especially for high-impact errors?",
    ],
    howToFix: "Start from a mock deliverable outline and ensure each major section/requirement is represented by at least one criterion. Add a small set of high-impact negative criteria for common catastrophic mistakes.",
  },
  {
    id: "criteria-inaccurate",
    number: 7,
    title: "Criteria Inaccurate",
    description: "A criterion is inaccurate when it measures something that should not be required for an ideal solution—because it's not asked in the prompt, not justified as a domain-implied requirement, or it contradicts the prompt/goal.",
    examplePrompt: '"Write a 2-paragraph customer support email. Must: apologize, explain next steps for a refund, and include the ticket number \'TP-4821\'."',
    goodExamples: [
      {
        content: "The email includes the ticket number 'TP-4821'.",
        explanation: "Directly required by the prompt.",
      },
      {
        content: "The email describes that the customer should confirm their payment details to receive a refund.",
        explanation: "Reasonable implicit requirement for refund process.",
      },
    ],
    badExamples: [
      {
        content: "The email offers a 20% discount code to the customer.",
        explanation: "Not required; a correct response can omit it.",
      },
    ],
    howToDetect: [
      "Traceability test: Can you point to a prompt line that requires this? If yes → likely accurate (explicit). If no → ask if it is truly implied by professional standards (implicit), or if it's implicitly required to meet the explicit requirements.",
      "'Correct-but-fails' test: Can you imagine a high-quality deliverable that satisfies the prompt but fails this criterion? If yes → inaccurate (or overly restrictive).",
      "Consistency test: Does the criterion contradict another criterion or the prompt (wrong dates, wrong names, wrong deliverable type)?",
    ],
    howToFix: "Remove the requirement, or rewrite it as an optional low-weight polish item if it's truly a 'nice to have.' If it's meant to be implied, rewrite it so it's clearly tied to professional usefulness and still judgeable.",
  },
  {
    id: "restrictive",
    number: 8,
    title: "Restrictive",
    description: "A criterion is restrictive when it overfits to a narrow version of the 'right answer,' making the rubric fail the Generalizable Rubric rule. Restrictive criteria often enforce exact wording, arbitrary counts, or specific examples that aren't required—excluding many valid responses.",
    examplePrompt: '"Write a short executive summary of a quarterly update. Include: revenue, major risks, and next-quarter priorities. Keep it concise, under 500 words."',
    goodExamples: [
      {
        content: "The executive summary is between 100 - 500 words.",
        explanation: "Generalizable + still judgeable.",
      },
    ],
    badExamples: [
      {
        content: "The executive summary is exactly 200 words.",
        explanation: '"Concise" does not mean exactly 200 words; many valid summaries could be 150 or 250.',
      },
    ],
    howToDetect: [
      "Look for exactness where the prompt allows flexibility: exact word counts, exact number of bullets, exact ordering, exact phrasing.",
      "Look for quotes used unnecessarily (forcing exact text matches).",
      "Ask: Would a valid alternative approach fail? (Different structure, different phrasing, different ordering)",
      "'Paraphrase test': If the deliverable uses synonyms or a different but equivalent structure, would this criterion incorrectly fail? If yes → restrictive.",
    ],
    howToFix: "Replace exact constraints with checks for the underlying requirement (presence of required elements). Only use quotes when the prompt explicitly demands exact text.",
  },
  {
    id: "inaccurate-weighting",
    number: 9,
    title: "Inaccurate Weighting",
    description: "A rubric has inaccurate weighting when weights don't reflect relative importance for the prompt and deliverable. This can cause minor polish items to outweigh core correctness—or make catastrophic failures barely matter.",
    examplePrompt: '"Draft a one-page safety incident report template. Must include: incident date, location, what happened, and any injuries. Use clear headings. The report should be modifiable in a Word Document."',
    goodExamples: [
      {
        content: "The report includes a placeholder for the incident date.",
        weight: 90,
        explanation: "Date is core requirement, weighted appropriately.",
      },
      {
        content: "All headings in the report template are bolded.",
        weight: 20,
        explanation: "Formatting is minor polish, weighted lower.",
      },
      {
        content: "The report is in PDF format.",
        weight: -80,
        explanation: "Contradicts prompt (Word required), strong negative.",
      },
    ],
    badExamples: [
      {
        content: "The report includes a placeholder for the incident date.",
        weight: 20,
        explanation: "Date is core; should be weighted much higher.",
      },
      {
        content: "All headings in the report template are bolded.",
        weight: 90,
        explanation: "Minor formatting shouldn't outweigh core requirements.",
      },
      {
        content: "The report is in PDF format.",
        weight: -10,
        explanation: "This directly contradicts the prompt; -10 is too mild.",
      },
    ],
    howToDetect: [
      "Pairwise test: If two responses differ only on this criterion, should that decide the winner? If no but weight is high → overweighted. If yes but weight is low → underweighted.",
      "Coverage balance test: Add up weights mentally—do 'nice-to-haves' collectively outweigh core requirements?",
      "Consistency test: Do similar-importance criteria have similar weights?",
      "Negative weight sanity test: Are egregious, common mistakes punished strongly enough?",
    ],
    howToFix: "Re-anchor the rubric: assign 80–100 to true core requirements, 10–30 to polish, and reserve strong negatives for catastrophic failures. Normalize: similar items → similar weights.",
  },
  {
    id: "incorrect-implicit-explicit",
    number: 10,
    title: "Incorrect Implicit/Explicit Label",
    description: "The Implicit/Explicit label is incorrect when it does not align with whether the requirement is directly stated in the prompt (Explicit) or implied by the task and requires intermediate steps or domain judgment (Implicit).",
    examplePrompt: '"Using the client\'s tax documents, prepare a 1040 return (PDF) with all appropriate schedules."',
    goodExamples: [
      {
        content: "The 1040 package is in PDF format.",
        label: "Explicit",
        explanation: "Prompt directly says PDF.",
      },
      {
        content: "The 1040 package includes Schedule A.",
        label: "Implicit",
        explanation: "Depends on interpreting the client's documents.",
      },
    ],
    badExamples: [
      {
        content: "The 1040 package includes Schedule A.",
        label: "Explicit",
        explanation: "Whether Schedule A is required depends on interpreting the client's documents → should be Implicit, not Explicit.",
      },
    ],
    howToDetect: [
      "Traceability test: Can you point to a sentence in the prompt that directly states the requirement? Yes → Explicit. No → Implicit, if the criterion measures something that requires intermediate steps to satisfy a prompt requirement or requires professional judgment.",
    ],
    howToFix: "Try to map each criterion to a specific statement or request in the prompt. If it isn't explicitly stated, it is likely implicit.",
  },
];

const RubricsModule3 = () => {
  const navigate = useNavigate();
  
  const {
    isLoaded,
    toggleErrorRead,
    isErrorRead,
    allErrorsRead,
    allGeneralErrorsRead,
    allSpecificErrorsRead,
    generalErrorsReadCount,
    specificErrorsReadCount,
    completeModule,
    isModuleComplete,
  } = useRubricsModule3Completion();

  // Auto-complete module when all errors are read
  useEffect(() => {
    if (allErrorsRead && !isModuleComplete) {
      completeModule();
    }
  }, [allErrorsRead, isModuleComplete, completeModule]);

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <Breadcrumbs />

      {/* Progress Tracker */}
      <RubricsProgressTracker />

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-warning via-warning/90 to-orange-500 p-8 md:p-12 mb-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating Beet */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 opacity-25">
          <img 
            src={beetIcon} 
            alt="" 
            className="w-16 h-16 md:w-20 md:h-20 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">Step 3 of 4</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Rubric Errors
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            There are many common pitfalls in rubric writing. If you keep the judge model's limitations in mind, you can avoid most of them.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-foreground">10 Error Types</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: GENERAL RUBRIC ERRORS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">5 General Rubric Errors</h2>
              <p className="text-sm text-muted-foreground">Criteria-level issues that affect individual items</p>
            </div>
          </div>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
            allGeneralErrorsRead 
              ? "bg-green-500/15 text-green-700 dark:text-green-400"
              : "bg-muted text-muted-foreground"
          }`}>
            {generalErrorsReadCount}/5 understood
          </span>
        </div>

        <div className="space-y-4">
          {COMMON_ERRORS.map((error) => (
            <ErrorCard
              key={error.id}
              number={error.number}
              title={error.title}
              description={error.description}
              examplePrompt={error.examplePrompt}
              goodExamples={error.goodExamples}
              badExamples={error.badExamples}
              howToDetect={error.howToDetect}
              howToFix={error.howToFix}
              isRead={isErrorRead(error.id)}
              onToggleRead={() => toggleErrorRead(error.id)}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: TASK, PROMPT, AND RUBRIC SPECIFIC ERRORS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <FileWarning className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">5 Task, Prompt & Rubric Specific Errors</h2>
              <p className="text-sm text-muted-foreground">Rubric-level issues that affect overall quality</p>
            </div>
          </div>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
            allSpecificErrorsRead 
              ? "bg-green-500/15 text-green-700 dark:text-green-400"
              : "bg-muted text-muted-foreground"
          }`}>
            {specificErrorsReadCount}/5 understood
          </span>
        </div>

        <div className="space-y-4">
          {SPECIFIC_ERRORS.map((error) => (
            <ErrorCard
              key={error.id}
              number={error.number}
              title={error.title}
              description={error.description}
              examplePrompt={error.examplePrompt}
              goodExamples={error.goodExamples}
              badExamples={error.badExamples}
              missingExample={error.missingExample}
              howToDetect={error.howToDetect}
              howToFix={error.howToFix}
              isRead={isErrorRead(error.id)}
              onToggleRead={() => toggleErrorRead(error.id)}
              variant="specific"
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-muted/30 via-card to-muted/30 p-6 mt-10">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost"
            onClick={() => {
              navigate("/education/rubrics/module-2");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="gap-2 text-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Anatomy of a Rubric
          </Button>
          
          <Button 
            onClick={() => {
              navigate("/education/rubrics/module-4");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="gap-2 px-6 py-3 bg-gradient-to-r from-warning to-orange-500 hover:opacity-90 transition-all text-white"
          >
            Continue to Rubric Checklist
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RubricsModule3;
