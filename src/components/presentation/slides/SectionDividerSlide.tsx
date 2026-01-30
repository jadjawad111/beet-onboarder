import { Check } from "lucide-react";

interface SectionDividerSlideProps {
  moduleNumber: number;
  title: string;
  subtitle?: string;
  topics?: string[];
}

const SectionDividerSlide = ({ moduleNumber, title, subtitle, topics }: SectionDividerSlideProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Module badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          {moduleNumber}
        </span>
        Section {moduleNumber}
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-xl text-muted-foreground">
          {subtitle}
        </p>
      )}

      {topics && topics.length > 0 && (
        <div className="mt-10 p-6 rounded-xl border bg-card/50">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">
            What you'll learn
          </p>
          <ul className="space-y-3 text-left max-w-md mx-auto">
            {topics.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SectionDividerSlide;
