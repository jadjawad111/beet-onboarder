interface SectionDividerSlideProps {
  moduleNumber: number;
  title: string;
  subtitle?: string;
}

const SectionDividerSlide = ({ moduleNumber, title, subtitle }: SectionDividerSlideProps) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-8">
        {moduleNumber}
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionDividerSlide;
