import { cn } from "@/lib/utils";

interface ContentSlideProps {
  title: string;
  children: React.ReactNode;
  layout?: 'center' | 'left' | 'split';
  className?: string;
}

const ContentSlide = ({ 
  title, 
  children, 
  layout = 'center',
  className 
}: ContentSlideProps) => {
  return (
    <div className={cn(
      "w-full",
      layout === 'center' && "text-center",
      layout === 'left' && "text-left",
      className
    )}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
        {title}
      </h2>
      
      <div className={cn(
        "text-lg md:text-xl text-muted-foreground leading-relaxed",
        layout === 'center' && "max-w-2xl mx-auto"
      )}>
        {children}
      </div>
    </div>
  );
};

export default ContentSlide;
