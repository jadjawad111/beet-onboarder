import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadPlaceholderProps {
  title: string;
  description?: string;
  className?: string;
}

const DownloadPlaceholder = ({ title, description, className }: DownloadPlaceholderProps) => {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border bg-muted/30 my-4",
      className
    )}>
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <FileText className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        )}
      </div>
      <Button variant="outline" size="sm" className="gap-2 flex-shrink-0" disabled>
        <Download className="h-4 w-4" />
        Download
      </Button>
    </div>
  );
};

export default DownloadPlaceholder;
