 import { FileInput, CheckCircle2, XCircle, FileText, Lightbulb, AlertTriangle } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
 const InputFilesSection = () => {
   return (
     <div className="space-y-8">
       {/* Header */}
       <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg">
         <div className="flex items-start gap-4">
           <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
             <FileInput className="w-7 h-7 text-primary" />
           </div>
           <div>
             <h3 className="text-xl font-bold text-foreground mb-2">Input Files</h3>
             <p className="text-base text-foreground leading-relaxed">
               Professional domain tasks often require reference material. Input files are the materials provided TO the model—distinct from the output deliverables you're asking it to produce.
             </p>
           </div>
         </div>
       </div>
 
       {/* Why Input Files Matter */}
       <div className="p-5 rounded-xl bg-card border border-border">
         <h4 className="text-lg font-bold text-foreground mb-4">Why Input Files Matter</h4>
         <p className="text-muted-foreground mb-4">
           In professional work, you rarely give instructions without providing the necessary materials. A financial analyst needs the spreadsheet data. An auditor needs the population file. A buyer needs the vendor quotations.
         </p>
         <Card className="border-2 border-primary/30 bg-primary/5">
           <CardContent className="p-5">
             <p className="font-semibold text-foreground mb-2">Input files vs. Output deliverables</p>
             <p className="text-sm text-muted-foreground">
               <strong className="text-foreground">Input files</strong> are the reference materials provided TO the model. 
               <strong className="text-foreground ml-1">Output deliverables</strong> are what the model produces. 
               These are different concepts. A clear deliverable in a prompt is NOT the same as an input file.
             </p>
           </CardContent>
         </Card>
       </div>
 
       {/* Tabs for Examples and Best Practices */}
       <Tabs defaultValue="example-1" className="w-full">
         <TabsList className="grid w-full grid-cols-3 mb-6">
           <TabsTrigger value="example-1" className="text-xs sm:text-sm">Example: Audit / AFC Metrics</TabsTrigger>
           <TabsTrigger value="example-2" className="text-xs sm:text-sm">Example: Automotive</TabsTrigger>
           <TabsTrigger value="best-practices" className="text-xs sm:text-sm">Best Practices</TabsTrigger>
         </TabsList>
 
         {/* Example 1: Audit / AFC Metrics */}
         <TabsContent value="example-1" className="space-y-6">
           <div className="rounded-2xl border-2 border-border bg-card overflow-hidden">
             <div className="p-4 bg-muted/50 border-b border-border">
               <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                 Example #1: Audit / AFC Metrics
               </p>
               <h4 className="text-lg font-bold text-foreground">Explicit File Reference</h4>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
               {/* Prompt Excerpt */}
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                   <FileText className="w-4 h-4" />
                   Prompt Excerpt
                 </div>
                 <Card className="bg-muted/30 border-dashed">
                   <CardContent className="p-4">
                     <div className="text-sm leading-relaxed text-foreground space-y-3">
                       <p>
                         You are an auditor and as part of an audit engagement, you are tasked with reviewing and testing the accuracy of reported Anti-Financial Crime Risk Metrics.
                       </p>
                       <p className="bg-primary/10 border-l-2 border-primary pl-2 py-1">
                         The attached spreadsheet titled <strong>'Population'</strong> contains Anti-Financial Crime Risk Metrics for Q2 and Q3 2024.
                       </p>
                       <p className="bg-primary/10 border-l-2 border-primary pl-2 py-1">
                         Using the data in the <strong>'Population'</strong> spreadsheet, complete the following:
                       </p>
                       <p className="text-muted-foreground text-xs">
                         1. Calculate sample size... 2. Variance analysis (columns H, I)... 3. Select sample...
                       </p>
                     </div>
                   </CardContent>
                 </Card>
 
                 {/* How Referenced */}
                 <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                   <CheckCircle2 className="w-4 h-4 text-primary" />
                   How the Input is Referenced
                 </div>
                 <div className="space-y-2">
                   <Card className="border-primary/30 bg-primary/5">
                     <CardContent className="p-3">
                       <p className="text-sm font-medium text-primary mb-1 italic">
                         "The attached spreadsheet titled 'Population'"
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Explicitly named file
                       </p>
                     </CardContent>
                   </Card>
                   <Card className="border-primary/30 bg-primary/5">
                     <CardContent className="p-3">
                       <p className="text-sm font-medium text-primary mb-1 italic">
                         "Using the data in the 'Population' spreadsheet"
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Re-referenced before tasks begin
                       </p>
                     </CardContent>
                   </Card>
                 </div>
               </div>
 
               {/* Embed */}
               <div className="space-y-4">
                 <div className="rounded-lg border bg-background overflow-hidden h-[350px]">
                   <iframe
                     src="https://docs.google.com/spreadsheets/d/1nrpI4qPfdjb_chj-APnPn158MG5t8h4X/preview?gid=168478092"
                     className="w-full h-full"
                     title="Population.xlsx"
                     allow="autoplay"
                   />
                 </div>
                 <Card>
                   <CardContent className="p-3">
                     <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Why this works</p>
                     <ul className="space-y-1">
                       <li className="flex items-start gap-2 text-xs text-foreground">
                         <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                         Self-contained: no external data required
                       </li>
                       <li className="flex items-start gap-2 text-xs text-foreground">
                         <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                         File explicitly named
                       </li>
                       <li className="flex items-start gap-2 text-xs text-foreground">
                         <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                         Tasks reference specific columns (H, I, J, K)
                       </li>
                     </ul>
                   </CardContent>
                 </Card>
               </div>
             </div>
           </div>
         </TabsContent>
 
         {/* Example 2: Automotive */}
         <TabsContent value="example-2" className="space-y-6">
           <div className="rounded-2xl border-2 border-border bg-card overflow-hidden">
             <div className="p-4 bg-muted/50 border-b border-border">
               <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                 Example #2: Automotive / Procurement
               </p>
               <h4 className="text-lg font-bold text-foreground">Grouped File Reference</h4>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
               {/* Prompt Excerpt */}
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                   <FileText className="w-4 h-4" />
                   Prompt Excerpt
                 </div>
                 <Card className="bg-muted/30 border-dashed">
                   <CardContent className="p-4">
                     <div className="text-sm leading-relaxed text-foreground space-y-3">
                       <p>
                         You're the category buyer for automotive electronics at LiIon Motors, leading the sourcing process for headlamps on Model I...
                       </p>
                       <p>
                         Create an Excel workbook with NPV calculation sheets for each vendor and a summary sheet for comparison...
                       </p>
                       <p className="bg-primary/10 border-l-2 border-primary pl-2 py-1">
                         <strong>All relevant documents</strong>, including vendor quotations and volume projections, <strong>are attached</strong>.
                       </p>
                     </div>
                   </CardContent>
                 </Card>
 
                 {/* How Referenced */}
                 <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                   <CheckCircle2 className="w-4 h-4 text-primary" />
                   How the Input is Referenced
                 </div>
                 <Card className="border-primary/30 bg-primary/5">
                   <CardContent className="p-3">
                     <p className="text-sm font-medium text-primary mb-1 italic">
                       "All relevant documents... are attached"
                     </p>
                     <p className="text-xs text-muted-foreground">
                       Files grouped but clearly scoped as attachments
                     </p>
                   </CardContent>
                 </Card>
               </div>
 
               {/* Embed */}
               <div className="space-y-4">
                 <div className="rounded-lg border bg-background overflow-hidden h-[350px]">
                   <iframe
                     src="https://drive.google.com/file/d/1aNuqF9z3xh7UdIfkRIMSMA0ibB6VIZQ2/preview"
                     className="w-full h-full"
                     title="Vendor quotations and volume projections"
                     allow="autoplay"
                   />
                 </div>
                 <Card>
                   <CardContent className="p-3">
                     <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Why this works</p>
                     <ul className="space-y-1">
                       <li className="flex items-start gap-2 text-xs text-foreground">
                         <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                         Model knows all attached files are inputs
                       </li>
                       <li className="flex items-start gap-2 text-xs text-foreground">
                         <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                         Acceptable in professional workflows
                       </li>
                       <li className="flex items-start gap-2 text-xs text-foreground">
                         <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                         Could list each file explicitly for more clarity
                       </li>
                     </ul>
                   </CardContent>
                 </Card>
               </div>
             </div>
           </div>
         </TabsContent>
 
         {/* Best Practices */}
         <TabsContent value="best-practices" className="space-y-6">
           {/* Core Characteristics */}
           <Card>
             <CardContent className="p-5">
               <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
                 Core Characteristics
               </h3>
               <p className="text-sm text-muted-foreground mb-4 italic">What's consistently true in quality prompts</p>
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-3">
                   <div className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                     <div>
                       <span className="text-sm font-medium text-foreground">Inputs are explicitly acknowledged as existing</span>
                       <p className="text-xs text-muted-foreground">The prompt clearly signals that files are provided.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                     <div>
                       <span className="text-sm font-medium text-foreground">Inputs are the authoritative source of truth</span>
                       <p className="text-xs text-muted-foreground">The task is grounded in the provided files, not outside knowledge.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                     <div>
                       <span className="text-sm font-medium text-foreground">Inputs are introduced before execution begins</span>
                       <p className="text-xs text-muted-foreground">Files are declared before the task depends on them.</p>
                     </div>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                     <div>
                       <span className="text-sm font-medium text-foreground">The input scope is clear and closed</span>
                       <p className="text-xs text-muted-foreground">The model knows which materials count as inputs.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                     <div>
                       <span className="text-sm font-medium text-foreground">Files are tied to concrete actions</span>
                       <p className="text-xs text-muted-foreground">Prompts explain how the files are used (analyze, calculate, reconcile).</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                     <div>
                       <span className="text-sm font-medium text-foreground">Inputs are treated as stable artifacts</span>
                       <p className="text-xs text-muted-foreground">Files are assumed complete, correct, and usable as provided.</p>
                     </div>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
 
           {/* Valid Ways to Reference */}
           <Card>
             <CardContent className="p-5">
               <h3 className="font-semibold text-foreground mb-2">
                 Valid Ways to Reference Input Files
               </h3>
               <p className="text-sm text-muted-foreground mb-4">
                 All of these work. The difference is specificity vs. realism, not correctness.
               </p>
               
               <div className="space-y-4">
                 <div className="flex items-start gap-4">
                   <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                       <p className="text-sm font-medium text-foreground">Enumerated Lists</p>
                       <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Most Explicit</span>
                     </div>
                     <p className="text-sm text-muted-foreground italic mb-1">
                       "You'll find everything you need in the attached files: COA.xlsx, Aurisic_Prepaid_Insurance.pdf…"
                     </p>
                     <p className="text-xs text-muted-foreground">
                       Zero guessing. Best for complex, multi-file tasks.
                     </p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4">
                   <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary/80 flex-shrink-0">2</div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                       <p className="text-sm font-medium text-foreground">Named Explicitly in Narrative</p>
                     </div>
                     <p className="text-sm text-muted-foreground italic mb-1">
                       "The attached spreadsheet titled 'Population' contains Anti-Financial Crime Risk Metrics..."
                     </p>
                     <p className="text-xs text-muted-foreground">
                       File is named and contextualized. Very common in professional asks.
                     </p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4">
                   <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">3</div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                       <p className="text-sm font-medium text-foreground">Grouped but Scoped</p>
                       <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Most Natural</span>
                     </div>
                     <p className="text-sm text-muted-foreground italic mb-1">
                       "Use the attached reference files, which include income, costs, and tax withholding data…"
                     </p>
                     <p className="text-xs text-muted-foreground">
                       Scope is closed and unambiguous. Mirrors how people actually communicate at work.
                     </p>
                   </div>
                 </div>
               </div>
 
               <div className="mt-4 pt-3 border-t border-border">
                 <p className="text-sm text-muted-foreground flex items-start gap-2">
                   <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                   <span><strong className="text-foreground">The Key:</strong> All valid prompts make it clear what files exist before the task depends on them.</span>
                 </p>
               </div>
             </CardContent>
           </Card>
 
           {/* What NOT to do */}
           <Card className="border-destructive/20 bg-destructive/5">
             <CardContent className="p-5">
               <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                 <AlertTriangle className="w-5 h-5 text-destructive" />
                 Avoid These Input File Mistakes
               </h3>
               <div className="space-y-3">
                 <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
                   <div className="flex items-start gap-2">
                     <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                     <span className="text-sm text-foreground font-medium">Referencing data that wasn't provided</span>
                   </div>
                   <div className="bg-background/50 rounded p-2 text-sm">
                     <p className="text-destructive/80 italic">"Pull the customer list from our internal CRM…"</p>
                     <p className="text-xs text-muted-foreground mt-1">❌ The model has no access to internal systems.</p>
                   </div>
                 </div>
                 
                 <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
                   <div className="flex items-start gap-2">
                     <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                     <span className="text-sm text-foreground font-medium">Requiring undisclosed external lookup</span>
                   </div>
                   <div className="bg-background/50 rounded p-2 text-sm">
                     <p className="text-destructive/80 italic">"Research current LIBOR rates online and use them…"</p>
                     <p className="text-xs text-muted-foreground mt-1">❌ Current data must be provided or task framed as open-world.</p>
                   </div>
                 </div>
                 
                 <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start pb-3 border-b border-destructive/10">
                   <div className="flex items-start gap-2">
                     <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                     <span className="text-sm text-foreground font-medium">Being vague about which data matters</span>
                   </div>
                   <div className="bg-background/50 rounded p-2 text-sm">
                     <p className="text-destructive/80 italic">"Using the relevant data, complete the analysis…"</p>
                     <p className="text-xs text-muted-foreground mt-1">❌ Which data? Which file? The model shouldn't infer.</p>
                   </div>
                 </div>
                 
                 <div className="grid md:grid-cols-[1fr,2fr] gap-3 items-start">
                   <div className="flex items-start gap-2">
                     <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                     <span className="text-sm text-foreground font-medium">Introducing a new dependency mid-task</span>
                   </div>
                   <div className="bg-background/50 rounded p-2 text-sm">
                     <p className="text-destructive/80 italic">"Step 3: Now refer to Budget.xlsx…"</p>
                     <p className="text-xs text-muted-foreground mt-1">❌ Fails if Budget.xlsx was not declared earlier.</p>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>
       </Tabs>
     </div>
   );
 };
 
 export default InputFilesSection;