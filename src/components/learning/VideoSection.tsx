import { useState, useEffect } from "react";
import { Play, Check, MoreVertical, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface VideoSectionProps {
  id: string;
  title: string;
  description: string;
  duration?: string;
}

const VideoSection = ({ id, title, description, duration = "5-10 min" }: VideoSectionProps) => {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`video-${id}`);
    if (saved === "true") {
      setWatched(true);
    }
  }, [id]);

  const handleMarkWatched = () => {
    const newValue = !watched;
    setWatched(newValue);
    localStorage.setItem(`video-${id}`, String(newValue));
  };

  return (
    <div className="rounded-xl border bg-card p-6 mb-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Video Content</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover z-50">
            <DropdownMenuItem className="cursor-pointer">
              <FileText className="h-4 w-4 mr-2" />
              View transcript
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in new tab
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Video Placeholder */}
      <div className="aspect-video rounded-lg bg-muted/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4 relative overflow-hidden">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Play className="h-8 w-8 text-primary ml-1" />
          </div>
          <p className="font-medium mb-1">{title}</p>
          <p className="text-sm text-muted-foreground">{duration}</p>
        </div>
        
        {watched && (
          <div className="absolute inset-0 bg-success/10 flex items-center justify-center">
            <div className="bg-success/90 text-success-foreground px-4 py-2 rounded-full flex items-center gap-2 font-medium">
              <Check className="h-4 w-4" />
              Watched
            </div>
          </div>
        )}
      </div>

      {/* Single Action */}
      <Button
        variant={watched ? "secondary" : "outline"}
        onClick={handleMarkWatched}
        className={cn(
          "w-full gap-2 transition-all",
          watched && "bg-success/10 text-success border-success/30 hover:bg-success/20"
        )}
      >
        <Check className={cn("h-4 w-4", watched && "fill-success/20")} />
        {watched ? "Marked as watched" : "Mark as watched"}
      </Button>
    </div>
  );
};

export default VideoSection;
