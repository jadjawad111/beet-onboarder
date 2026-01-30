const WorkflowPage = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Step-by-step guide for completing tasks efficiently.
      </p>
      
      <div className="space-y-4">
        {[
          { step: 1, title: "Check Available Tasks", desc: "Log into the platform and review your task queue." },
          { step: 2, title: "Review Guidelines", desc: "Read the specific guidelines for each task type." },
          { step: 3, title: "Complete the Task", desc: "Follow the instructions and submit your work." },
          { step: 4, title: "Quality Check", desc: "Review your submission before final submit." },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
              {item.step}
            </div>
            <div>
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowPage;
