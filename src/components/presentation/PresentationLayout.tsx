import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import beetIcon from "@/assets/beet-icon.png";

export interface Slide {
  id: string;
  content: React.ReactNode;
  module?: number;
}

interface PresentationLayoutProps {
  slides: Slide[];
  title: string;
  presenter?: string;
  onComplete?: () => void;
  exitPath?: string;
}

const PresentationLayout = ({ 
  slides, 
  title, 
  presenter = "Project Beet",
  onComplete,
  exitPath = "/education/prompt-writing"
}: PresentationLayoutProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const totalSlides = slides.length;
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  const goToSlide = useCallback((index: number, direction: 'next' | 'prev') => {
    if (isTransitioning || index < 0 || index >= totalSlides) return;
    
    setSlideDirection(direction);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 200);
  }, [isTransitioning, totalSlides]);

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      // Trigger completion animation
      setIsComplete(true);
      onComplete?.();
      
      // Navigate away after animation
      setTimeout(() => {
        navigate(exitPath);
      }, 2500);
    } else {
      goToSlide(currentSlide + 1, 'next');
    }
  }, [isLastSlide, currentSlide, goToSlide, onComplete, navigate, exitPath]);

  const handlePrev = useCallback(() => {
    goToSlide(currentSlide - 1, 'prev');
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Completion overlay
  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          {/* Celebration animation */}
          <div className="relative mb-8">
            <img 
              src={beetIcon} 
              alt="Beet" 
              className="w-32 h-32 mx-auto animate-bounce"
              style={{ animationDuration: '0.6s' }}
            />
            {/* Confetti particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Course Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            You've mastered Prompt Writing
          </p>
          <p className="text-sm text-muted-foreground">
            Returning to overview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Main slide area */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24 py-12">
        <div 
          className={cn(
            "w-full max-w-4xl transition-all duration-200",
            isTransitioning && slideDirection === 'next' && "opacity-0 translate-x-8",
            isTransitioning && slideDirection === 'prev' && "opacity-0 -translate-x-8",
            !isTransitioning && "opacity-100 translate-x-0"
          )}
        >
          {slides[currentSlide]?.content}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <footer className="flex items-center justify-between px-6 md:px-12 py-4 border-t bg-card/50 backdrop-blur-sm">
        {/* Left: Presenter info */}
        <div className="flex items-center gap-3 min-w-[150px]">
          <img src={beetIcon} alt="" className="w-6 h-6" />
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
            {presenter}
          </span>
        </div>

        {/* Center: Navigation controls */}
        <div className="flex items-center gap-4">
          {/* Previous button */}
          <button
            onClick={handlePrev}
            disabled={isFirstSlide || isTransitioning}
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all",
              isFirstSlide 
                ? "text-muted-foreground/40 cursor-not-allowed" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index, index > currentSlide ? 'next' : 'prev')}
                className={cn(
                  "transition-all duration-200 rounded-full",
                  index === currentSlide 
                    ? "w-6 h-2 bg-primary" 
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <span className="text-sm text-muted-foreground min-w-[60px] text-center">
            {currentSlide + 1} / {totalSlides}
          </span>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all",
              isLastSlide 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <span className="hidden sm:inline">{isLastSlide ? "Complete" : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Spacer for symmetry */}
        <div className="min-w-[150px]" />
      </footer>
    </div>
  );
};

export default PresentationLayout;
