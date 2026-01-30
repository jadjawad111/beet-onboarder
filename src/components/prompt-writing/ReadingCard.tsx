import { cn } from "@/lib/utils";
import BeetIcon from "./BeetIcon";

interface ReadingCardProps {
  children: React.ReactNode;
  className?: string;
  showEmblem?: boolean;
}

const ReadingCard = ({ children, className, showEmblem = true }: ReadingCardProps) => {
  return (
    <div className={cn(
      "relative bg-card rounded-2xl border shadow-sm p-8 md:p-12",
      className
    )}>
      {/* Subtle Beet Emblem */}
      {showEmblem && (
        <div className="absolute top-6 right-6 opacity-10 select-none pointer-events-none">
          <BeetIcon size="lg" />
        </div>
      )}
      
      {/* Content */}
      <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
        {children}
      </div>
    </div>
  );
};

export default ReadingCard;
