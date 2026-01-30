import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

interface BulletSlideProps {
  title: string;
  bullets: string[];
  variant?: 'default' | 'check' | 'arrow';
  numbered?: boolean;
}

const BulletSlide = ({ 
  title, 
  bullets, 
  variant = 'default',
  numbered = false 
}: BulletSlideProps) => {
  const BulletIcon = variant === 'check' ? CheckCircle2 : variant === 'arrow' ? ArrowRight : Circle;
  
  return (
    <div className="text-left max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10 leading-tight">
        {title}
      </h2>
      
      <ul className="space-y-5">
        {bullets.map((bullet, index) => (
          <li 
            key={index}
            className="flex items-start gap-4 text-lg md:text-xl text-foreground"
          >
            {numbered ? (
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
            ) : (
              <BulletIcon className={cn(
                "flex-shrink-0 w-6 h-6 mt-0.5",
                variant === 'check' && "text-primary",
                variant === 'arrow' && "text-primary",
                variant === 'default' && "text-muted-foreground w-3 h-3 mt-2.5"
              )} />
            )}
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletSlide;
