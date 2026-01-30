import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlaceholderProps {
  title: string;
  description?: string;
  moduleId: string;
  videoId: string;
}

const VideoPlaceholder = ({ title, description, moduleId, videoId }: VideoPlaceholderProps) => {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`video-${moduleId}-${videoId}`);
    if (saved === "true") {
      setWatched(true);
    }
  }, [moduleId, videoId]);

  const handleToggle = (checked: boolean) => {
    setWatched(checked);
    localStorage.setItem(`video-${moduleId}-${videoId}`, String(checked));
  };

  return (
    <div className="rounded-xl border overflow-hidden my-4">
      <div className="aspect-video bg-muted/50 flex flex-col items-center justify-center gap-3 relative">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
          watched ? "bg-success/20" : "bg-primary/10"
        )}>
          <Play className={cn(
            "h-8 w-8 ml-1",
            watched ? "text-success" : "text-primary"
          )} />
        </div>
        <p className="text-muted-foreground text-sm text-center px-4">{title}</p>
        {description && (
          <p className="text-muted-foreground text-xs text-center px-4">{description}</p>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t">
        <span className="text-sm font-medium">Mark as watched</span>
        <Switch checked={watched} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
};

export default VideoPlaceholder;
