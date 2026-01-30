import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface QualityBarOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
}

const QualityBarOverlay = ({ isVisible, onComplete }: QualityBarOverlayProps) => {
  const [countdown, setCountdown] = useState(3);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(3);
      setIsExiting(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(onComplete, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, onComplete]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(onComplete, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300",
        isExiting ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      
      {/* Content */}
      <div 
        className={cn(
          "relative max-w-2xl mx-4 p-8 md:p-12 rounded-2xl border-2 border-warning bg-card shadow-2xl transition-all duration-300",
          isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        )}
      >
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <span className="text-5xl">⚠️</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          The Quality Bar is Unforgiving
        </h2>

        {/* Content */}
        <div className="space-y-4 text-muted-foreground">
          <p className="text-center">
            <strong className="text-foreground">Please read this carefully.</strong>
          </p>
          
          <p>
            Quality is not just "important" in Project Beet; <strong className="text-foreground">it is the entire product</strong>.
          </p>
          
          <p>
            Because we are trying to simulate the hardest parts of professional work, the bar for acceptance is extremely high.
          </p>
          
          <p>
            <strong className="text-foreground">Writing these prompts is inherently difficult.</strong> If it feels easy to write, it will likely be easy for the model to solve, which means it is not useful data.
          </p>
          
          <p>
            <strong className="text-foreground">Do not skim.</strong> Data shows that the majority of fellows who do not read every word of these guidelines wholeheartedly fail the assessment.
          </p>
        </div>

        {/* Countdown / Dismiss */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary">
              {countdown}
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            or click to continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualityBarOverlay;
