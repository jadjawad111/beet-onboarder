import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface ContentAccordionProps {
  summary: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

const ContentAccordion = ({ summary, children, className, defaultOpen = false }: ContentAccordionProps) => {
  return (
    <div className={cn("my-4", className)}>
      {/* Summary Card */}
      <div className="bg-muted/50 rounded-t-lg border border-b-0 p-4">
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Expandable Details */}
      <Accordion type="single" collapsible defaultValue={defaultOpen ? "details" : undefined}>
        <AccordionItem value="details" className="border rounded-b-lg border-t-0">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium text-primary hover:no-underline">
            Read the full details
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="prose prose-sm max-w-none text-foreground">
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ContentAccordion;
