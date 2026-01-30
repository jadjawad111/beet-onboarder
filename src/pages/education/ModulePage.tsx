import { useParams } from "react-router-dom";
import { Play, Image } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Callout from "@/components/Callout";
import PageNavigation from "@/components/PageNavigation";

const categoryTitles: Record<string, string> = {
  general: "General Project Instructions",
  "prompt-writing": "Prompt Writing",
  rubrics: "Rubrics Creation",
};

const ModulePage = () => {
  const { category, moduleId } = useParams<{ category: string; moduleId: string }>();
  const moduleNumber = moduleId?.replace("module-", "") || "1";
  const categoryTitle = categoryTitles[category || ""] || "Unknown";

  const currentModule = parseInt(moduleNumber);
  const prevModule = currentModule > 1 ? currentModule - 1 : null;
  const nextModule = currentModule < 4 ? currentModule + 1 : null;

  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold mb-2">Module {moduleNumber}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {categoryTitle} — Placeholder: Add module subtitle
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Learning Objectives</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add description of what learners will achieve in this module.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add learning objective 1</li>
            <li>Placeholder: Add learning objective 2</li>
            <li>Placeholder: Add learning objective 3</li>
            <li>Placeholder: Add learning objective 4</li>
          </ul>
        </div>

        <Callout type="note" title="Prerequisites">
          Placeholder: Add any prerequisites for this module.
        </Callout>

        {/* Video Placeholder */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Video Content</h2>
          <div className="aspect-video bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="h-8 w-8 text-primary ml-1" />
            </div>
            <p className="text-muted-foreground text-sm">Placeholder: Embed video content here</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Module Content</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add main instructional content for this module.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add content section 1</li>
            <li>Placeholder: Add content section 2</li>
            <li>Placeholder: Add content section 3</li>
          </ul>
        </div>

        {/* Visual Component Placeholder */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Visual Examples</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="aspect-[4/3] bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
              <Image className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Placeholder: Add image or diagram</p>
            </div>
            <div className="aspect-[4/3] bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
              <Image className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Placeholder: Add image or diagram</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Key Concepts</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add explanation of key concepts covered.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add concept 1</li>
            <li>Placeholder: Add concept 2</li>
            <li>Placeholder: Add concept 3</li>
          </ul>
        </div>

        <Callout type="important">
          Placeholder: Add critical information or common mistakes to avoid.
        </Callout>

        {/* Additional Video Placeholder */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Walkthrough Demo</h2>
          <div className="aspect-video bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="h-8 w-8 text-primary ml-1" />
            </div>
            <p className="text-muted-foreground text-sm">Placeholder: Embed demo or walkthrough video here</p>
          </div>
        </div>

        <Callout type="reminder">
          Placeholder: Add reminder about next steps or resources.
        </Callout>

        <div>
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add summary of key takeaways from this module.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add takeaway 1</li>
            <li>Placeholder: Add takeaway 2</li>
            <li>Placeholder: Add takeaway 3</li>
          </ul>
        </div>
      </section>

      <PageNavigation
        previousPage={
          prevModule
            ? { title: `Module ${prevModule}`, href: `/education/${category}/module-${prevModule}` }
            : { title: categoryTitle, href: `/education/${category}` }
        }
        nextPage={
          nextModule
            ? { title: `Module ${nextModule}`, href: `/education/${category}/module-${nextModule}` }
            : undefined
        }
      />
    </div>
  );
};

export default ModulePage;
