import { Button } from "@/components/ui/button";
import { Target, ArrowRight, Dumbbell } from "lucide-react";

interface PracticeOverlayProps {
  onContinuePractice?: () => void;
  onSkip?: () => void;
}

// Custom event for practice overlay navigation
export const PRACTICE_CONTINUE_EVENT = "practice-overlay-continue";
export const PRACTICE_SKIP_EVENT = "practice-overlay-skip";

const PracticeOverlay = ({ onContinuePractice, onSkip }: PracticeOverlayProps) => {

  const handleContinue = () => {
    // Dispatch custom event for PresentationLayout to handle
    window.dispatchEvent(new CustomEvent(PRACTICE_CONTINUE_EVENT));
    onContinuePractice?.();
  };

  const handleSkip = () => {
    // Dispatch custom event for PresentationLayout to handle
    window.dispatchEvent(new CustomEvent(PRACTICE_SKIP_EVENT));
    onSkip?.();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
        <Dumbbell className="w-10 h-10 text-primary" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-4">
        Ready for More Practice?
      </h2>

      {/* Recommendation */}
      <div className="max-w-xl mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          You've completed the introductory exercises. Great work!
        </p>
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-600/50">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                We strongly recommend continuing
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Practice until you can identify prompt failures correctly <span className="font-bold">at least 3 times in a row</span>. 
                This builds the pattern recognition you'll need for real task design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <p className="text-muted-foreground mb-8">
        12 additional exercises are ready, covering concierge, rental, property management, and financial services scenarios.
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        {/* Big Yes Button */}
        <Button
          onClick={handleContinue}
          size="lg"
          className="h-16 px-12 text-xl font-bold gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          Yes, Let's Practice!
          <ArrowRight className="w-6 h-6" />
        </Button>

        {/* Skip Button - visible but secondary */}
        <Button
          onClick={handleSkip}
          variant="outline"
          size="sm"
          className="mt-4 text-muted-foreground hover:text-foreground"
        >
          No thanks, skip ahead
        </Button>
      </div>
    </div>
  );
};

export default PracticeOverlay;
