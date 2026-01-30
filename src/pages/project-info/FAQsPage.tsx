const FAQsPage = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Answers to common questions about the project.
      </p>
      
      <div className="space-y-4">
        {[
          { q: "How do I get paid?", a: "Payment is processed weekly via the platform. Ensure your payment details are up to date." },
          { q: "What if I need to take time off?", a: "You can adjust your availability in the platform settings. No minimum hours required." },
          { q: "How do I report issues?", a: "Use the #support channel in Slack or the in-platform reporting feature." },
          { q: "Can I work on multiple task types?", a: "Yes, once you're qualified for each task type through the relevant training." },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <h3 className="font-medium text-foreground mb-2">{item.q}</h3>
            <p className="text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;
