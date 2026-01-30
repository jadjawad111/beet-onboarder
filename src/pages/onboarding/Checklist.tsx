import Breadcrumbs from "@/components/Breadcrumbs";
import Callout from "@/components/Callout";
import PageNavigation from "@/components/PageNavigation";

const Checklist = () => {
  return (
    <div>
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold mb-2">First Task Checklist</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Placeholder: Add overview of everything needed before starting first task.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Pre-Task Checklist</h2>
          <div className="bg-muted/50 rounded-lg p-4">
            <ul className="space-y-3">
              {[
                "Completed all onboarding sections",
                "Account access verified",
                "Tools installed and configured",
                "Communication channels joined",
                "Quality standards reviewed",
                "Practice task completed",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-primary/30 flex-shrink-0" />
                  <span className="text-muted-foreground">Placeholder: {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Callout type="important">
          Placeholder: Add any final requirements before starting live work.
        </Callout>

        <div>
          <h2 className="text-xl font-semibold mb-3">First Task Guidelines</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add guidance for approaching first task.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add guideline 1</li>
            <li>Placeholder: Add guideline 2</li>
            <li>Placeholder: Add guideline 3</li>
            <li>Placeholder: Add guideline 4</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">What to Expect</h2>
          <p className="text-muted-foreground mb-4">
            Placeholder: Add description of what first tasks look like.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Placeholder: Add expectation 1</li>
            <li>Placeholder: Add expectation 2</li>
            <li>Placeholder: Add expectation 3</li>
          </ul>
        </div>

        <Callout type="reminder">
          Placeholder: Add reminder about support availability during first tasks.
        </Callout>
      </section>

      <PageNavigation
        previousPage={{ title: "Quality Standards", href: "/onboarding/quality" }}
        nextPage={{ title: "Education", href: "/education" }}
      />
    </div>
  );
};

export default Checklist;
