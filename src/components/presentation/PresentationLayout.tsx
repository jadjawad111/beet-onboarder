import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import beetIcon from "@/assets/beet-icon.png";

export interface Slide {
  id: string;
  content: React.ReactNode;
  module?: number;
  title?: string;
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
  exitPath = "/education"
}: PresentationLayoutProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(new Set([0]));

  const totalSlides = slides.length;
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  // Track visited slides
  useEffect(() => {
    setVisitedSlides(prev => new Set([...prev, currentSlide]));
  }, [currentSlide]);

  const goToSlide = useCallback((index: number, direction: 'next' | 'prev') => {
    if (isTransitioning || index < 0 || index >= totalSlides) return;
    
    setSlideDirection(direction);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 250);
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

  const handleExit = () => {
    navigate(exitPath);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        handleExit();
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
            You've mastered {title}
          </p>
          <p className="text-sm text-muted-foreground">
            Returning to overview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex bg-background">
      {/* Left sidebar - Step progress */}
      <aside className="w-20 lg:w-72 border-r border-border bg-card flex-shrink-0 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={beetIcon} alt="" className="w-8 h-8" />
            <div className="hidden lg:block">
              <h2 className="font-semibold text-sm text-foreground">{title}</h2>
              <p className="text-xs text-muted-foreground">{presenter}</p>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground hidden lg:inline">Progress</span>
            <span className="text-xs font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step list */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {slides.map((slide, index) => {
              const isCurrent = index === currentSlide;
              const isVisited = visitedSlides.has(index);
              const isPast = index < currentSlide;
              
              return (
                <button
                  key={slide.id}
                  onClick={() => isVisited && goToSlide(index, index > currentSlide ? 'next' : 'prev')}
                  disabled={!isVisited}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left",
                    isCurrent && "bg-primary/10 border border-primary/30",
                    !isCurrent && isVisited && "hover:bg-muted cursor-pointer",
                    !isVisited && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Step indicator */}
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors",
                    isCurrent && "bg-primary text-primary-foreground",
                    isPast && !isCurrent && "bg-primary/20 text-primary",
                    !isPast && !isCurrent && "bg-muted text-muted-foreground"
                  )}>
                    {isPast && !isCurrent ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  {/* Step title (desktop only) */}
                  <span className={cn(
                    "text-sm truncate hidden lg:block",
                    isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {slide.title || `Step ${index + 1}`}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Exit button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleExit}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="hidden lg:inline">Exit Course</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar with step counter */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">
              Step {currentSlide + 1} of {totalSlides}
            </span>
            {slides[currentSlide]?.module && (
              <span className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                Module {slides[currentSlide].module}
              </span>
            )}
          </div>
          
          {/* Back button (visible when not on first slide) */}
          {!isFirstSlide && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </header>

        {/* Slide content */}
        <main className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24 py-12 overflow-y-auto">
          <div 
            className={cn(
              "w-full max-w-4xl transition-all duration-250 ease-out",
              isTransitioning && slideDirection === 'next' && "opacity-0 translate-x-12",
              isTransitioning && slideDirection === 'prev' && "opacity-0 -translate-x-12",
              !isTransitioning && "opacity-100 translate-x-0"
            )}
          >
            {slides[currentSlide]?.content}
          </div>
        </main>

        {/* Bottom action bar - prominent Continue button */}
        <footer className="px-6 py-6 border-t border-border bg-card/50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Previous (subtle) */}
            <button
              onClick={handlePrev}
              disabled={isFirstSlide || isTransitioning}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                isFirstSlide 
                  ? "invisible" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Continue button (prominent) */}
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className={cn(
                "flex items-center gap-2 px-8 py-3 text-base font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl",
                isLastSlide 
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isLastSlide ? "Complete Course" : "Continue"}
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Spacer for symmetry */}
            <div className="w-24" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PresentationLayout;
