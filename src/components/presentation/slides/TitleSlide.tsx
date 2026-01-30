import beetIcon from "@/assets/beet-icon.png";

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  presenter?: string;
  moduleNumber?: number;
}

const TitleSlide = ({ 
  title, 
  subtitle, 
  presenter = "Project Beet",
  moduleNumber 
}: TitleSlideProps) => {
  return (
    <div className="text-center">
      {moduleNumber && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          Module {moduleNumber}
        </div>
      )}
      
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-xl md:text-2xl text-muted-foreground mb-12">
          {subtitle}
        </p>
      )}
      
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm uppercase tracking-widest text-muted-foreground/60">
          Presented by
        </span>
        <div className="flex items-center gap-3">
          <img src={beetIcon} alt="" className="w-8 h-8" />
          <span className="text-lg font-semibold text-foreground">{presenter}</span>
        </div>
      </div>
    </div>
  );
};

export default TitleSlide;
