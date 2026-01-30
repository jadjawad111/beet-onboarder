import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  id?: string;
}

const CollapsibleSection = ({ title, children, defaultOpen = true, className, id }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} className={cn("border rounded-xl overflow-hidden my-6", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-muted/50 hover:bg-muted transition-colors text-left"
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0" />
        )}
        <span className="font-semibold">{title}</span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-5 border-t">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
