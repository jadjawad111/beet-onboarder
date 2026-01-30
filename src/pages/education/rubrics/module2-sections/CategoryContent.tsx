import { ClipboardCheck, Brain, FileSearch, Layout, Scale, FileText } from "lucide-react";
import CategoryTag from "@/components/rubrics/CategoryTag";

const CategoryContent = () => {
  const categories = [
    {
      id: "instruction-following" as const,
      icon: ClipboardCheck,
      title: "Instruction Following",
      description: "If the criterion is about doing what the prompt asked",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "reasoning" as const,
      icon: Brain,
      title: "Reasoning",
      description: "If the criterion is about logic, correct application, or calculations",
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      id: "extraction" as const,
      icon: FileSearch,
      title: "Extraction",
      description: "If the criterion is about pulling facts from input files or the web",
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/30",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      id: "formatting" as const,
      icon: Layout,
      title: "Formatting",
      description: "If the criterion is about structure, layout, and presentation",
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
  ];

  return (
    <div className="space-y-10">
      {/* Definition Hero */}
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">What is Category?</h3>
            <p className="text-base text-foreground leading-relaxed">
              The <strong className="text-primary">Category</strong> labels what aspect of the output a criterion is evaluating. Choose <span className="font-bold text-primary">one category per criterion</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-foreground">The Four Categories</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className={`p-5 rounded-xl border-2 ${cat.borderColor} bg-gradient-to-br ${cat.color} hover:shadow-lg transition-all duration-200 min-h-[120px]`}
            >
              <div className="flex items-center gap-4 h-full">
                <div className={`w-14 h-14 rounded-xl ${cat.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <cat.icon className={`w-7 h-7 ${cat.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h5 className="text-base font-bold text-foreground">{cat.title}</h5>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{cat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Prompt */}
      <div className="rounded-xl border-2 border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide">Reference Prompt</span>
            <h4 className="font-semibold text-foreground mt-1">Texas Last Will and Testament</h4>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-3">
          <p className="text-sm text-foreground leading-relaxed italic">
            Draft a Texas Last Will and Testament for Maria L. Nguyen (Austin, Texas). She is married to David T. Nguyen and has two children: Ethan P. Nguyen and Lily R. Nguyen.
          </p>
          <p className="text-sm text-foreground italic">The Will must include:</p>
          <ul className="text-sm text-foreground italic space-y-1 ml-4">
            <li className="flex gap-2"><span>•</span><span>State that Maria L. Nguyen is the testator</span></li>
            <li className="flex gap-2"><span>•</span><span>Executor: David T. Nguyen; Alternate executor: Jordan M. Reyes</span></li>
            <li className="flex gap-2"><span>•</span><span>The client has requested that the will state the exact Texas requirements on Independent Executors from section 4 of <a href="https://www.txcourts.gov/media/1456660/will-unmarried-w-children-bilingual.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">the provided PDF</a></span></li>
            <li className="flex gap-2"><span>•</span><span>Executor has sole discretion to distribute personal property</span></li>
            <li className="flex gap-2"><span>•</span><span>Primary beneficiary: Entire estate to the spouse if they survive Maria</span></li>
            <li className="flex gap-2"><span>•</span><span>Contingent beneficiaries: If David predeceases Maria, estate to the children in equal shares</span></li>
            <li className="flex gap-2"><span>•</span><span>Testamentary trust for minors: minimum distribution age 25, max trust duration 21 years, spendthrift clause</span></li>
            <li className="flex gap-2"><span>•</span><span>Trustee/guardian: Jordan M. Reyes; Alternate: Olivia K. Brooks</span></li>
            <li className="flex gap-2"><span>•</span><span>Execution: Will is signed on May 13, 2025 in front of two witnesses and a notary</span></li>
            <li className="flex gap-2"><span>•</span><span>Include standard provisions (survivorship, residuary clause, fiduciary powers)</span></li>
            <li className="flex gap-2"><span>•</span><span>The Last Will and Testament document should be a PDF document between 8-11 pages</span></li>
          </ul>
        </div>
      </div>

      {/* Category Examples Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-foreground">Category Examples</h4>
            <p className="text-sm text-muted-foreground">Sample criteria from the Last Will prompt above</p>
          </div>
        </div>
        
        <div className="space-y-5">
          {/* Instruction Following */}
          <div className="rounded-xl border-2 border-blue-500/30 bg-card overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-blue-500/15 to-blue-600/5 border-b border-blue-500/20">
              <CategoryTag category="instruction-following" size="lg" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">📝 Example Criteria</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will and Testament document states that the testator is Maria L. Nguyen."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> This is instructed in the prompt.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will and Testament is between 8 to 11 pages in length."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> This is instructed in the prompt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reasoning */}
          <div className="rounded-xl border-2 border-purple-500/30 bg-card overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-purple-500/15 to-purple-600/5 border-b border-purple-500/20">
              <CategoryTag category="reasoning" size="lg" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">📝 Example Criteria</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will and Testament indicates that David T. Nguyen will take the estate only if they survive the testator."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> The document must correctly represent the survivorship condition and beneficiary logic.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will and Testament includes a page for notary acknowledgement."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> The prompt requires a notary, and a standard will package typically includes a notary acknowledgement section.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Extraction */}
          <div className="rounded-xl border-2 border-amber-500/30 bg-card overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-amber-500/15 to-amber-600/5 border-b border-amber-500/20">
              <CategoryTag category="extraction" size="lg" />
            </div>
            <div className="p-5">
              <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 mb-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Use Extraction when the prompt requires pulling facts from input files or the web (not the prompt itself). Not every rubric will include Extraction criteria.
                </p>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">📝 Example Criteria</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will and Testament states that the independent executor must be 18 years or older."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> This pulls a statement directly from the provided Texas Judicial Branch form.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will and Testament states that the client's choice of independent executor must be approved by the court before they can act in that role."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> This pulls a statement directly from the provided Texas Judicial Branch form.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formatting */}
          <div className="rounded-xl border-2 border-green-500/30 bg-card overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-green-500/15 to-green-600/5 border-b border-green-500/20">
              <CategoryTag category="formatting" size="lg" />
            </div>
            <div className="p-5">
              <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-500/20 mb-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Use Formatting when the criterion checks structure, organization, and presentation. Formatting is usually lower-weight unless explicitly required. <strong className="text-green-600 dark:text-green-400">Include at least 5 formatting criteria in your rubric.</strong>
                </p>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">📝 Example Criteria</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "All text in The Last Will and Testament is in Times New Roman font."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> This is a formatting convention commonly used in legal documents.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-500/20">
                  <p className="text-base text-foreground leading-relaxed mb-2">
                    "The Last Will document includes a cover page."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this category:</span> This is a nice-to-have formatting item and would likely be weighted lower.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
