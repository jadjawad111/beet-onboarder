interface SectionDividerSlideProps {
  moduleNumber: number;
  title: string;
  subtitle?: string;
  topics?: string[];
}

const SectionDividerSlide = ({ moduleNumber, title, subtitle, topics }: SectionDividerSlideProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-8">
        {moduleNumber}
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-xl text-muted-foreground mb-8">
          {subtitle}
        </p>
      )}

      {topics && topics.length > 0 && (
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            In this section
          </p>
          <ul className="space-y-2">
            {topics.map((topic, idx) => (
              <li key={idx} className="text-lg text-foreground">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SectionDividerSlide;
