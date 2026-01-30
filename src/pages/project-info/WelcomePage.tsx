const WelcomePage = () => {
  return (
    <div className="space-y-6">
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-muted-foreground">
          Welcome to Project Beet 2.0! This guide will help you get started with everything you need to know.
        </p>
        
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What is Beet 2.0?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Beet 2.0 is a data annotation project focused on creating high-quality training data for AI systems. 
          As a contributor, you'll be working on tasks that help improve AI capabilities.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What to Expect</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Complete onboarding materials to understand the project
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Finish training modules to develop your skills
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Pass the assessment to qualify for paid work
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Getting Help</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have questions at any point, check the FAQs section or reach out to the support team.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
