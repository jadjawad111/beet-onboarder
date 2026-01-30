import Breadcrumbs from "@/components/Breadcrumbs";
import Callout from "@/components/Callout";
import PageNavigation from "@/components/PageNavigation";

const Quality = () => {
  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold mb-2">Quality Standards</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Placeholder: Add overview of quality expectations and standards.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Quality Expectations</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add description of quality standards.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add quality standard 1</li>
            <li>Placeholder: Add quality standard 2</li>
            <li>Placeholder: Add quality standard 3</li>
            <li>Placeholder: Add quality standard 4</li>
          </ul>
        </div>

        <Callout type="important">
          Placeholder: Add critical quality requirements that must be met.
        </Callout>

        <div>
          <h2 className="text-xl font-semibold mb-3">Quality Metrics</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add explanation of how quality is measured.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add metric 1 with target</li>
            <li>Placeholder: Add metric 2 with target</li>
            <li>Placeholder: Add metric 3 with target</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Common Mistakes to Avoid</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add list of common errors and how to avoid them.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add mistake 1 and solution</li>
            <li>Placeholder: Add mistake 2 and solution</li>
            <li>Placeholder: Add mistake 3 and solution</li>
          </ul>
        </div>

        <Callout type="note">
          Placeholder: Add information about quality reviews and feedback.
        </Callout>
      </section>

      <PageNavigation
        previousPage={{ title: "Communication & Support", href: "/onboarding/communication" }}
        nextPage={{ title: "First Task Checklist", href: "/onboarding/checklist" }}
      />
    </div>
  );
};

export default Quality;
