import { useState, useEffect, useCallback, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Clock, 
  List,
  Maximize2,
  X,
  BookOpen,
  PartyPopper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { triggerBeetConfetti } from "./BeetConfetti";

interface Prompt {
  id: number;
  title: string;
  content: string;
}

interface PromptCarouselProps {
  prompts: Prompt[];
  className?: string;
}

// Estimate reading time (avg 200 words per minute)
const estimateReadingTime = (text: string): number => {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const STORAGE_KEY = "beet-prompts-read";
const CELEBRATION_KEY = "beet-prompts-celebrated-10";
const REQUIRED_READS = 10;

const PromptCarousel = ({ prompts, className }: PromptCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [readPrompts, setReadPrompts] = useState<Set<number>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasCelebrated = useRef(false);

  // Load read prompts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setReadPrompts(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse read prompts", e);
      }
    }
    // Check if already celebrated
    hasCelebrated.current = localStorage.getItem(CELEBRATION_KEY) === 'true';
  }, []);

  // Check for 10 reads and trigger celebration
  useEffect(() => {
    if (readPrompts.size >= REQUIRED_READS && !hasCelebrated.current) {
      hasCelebrated.current = true;
      localStorage.setItem(CELEBRATION_KEY, 'true');
      setShowCelebration(true);
      // Trigger confetti after a small delay for impact
      setTimeout(() => {
        triggerBeetConfetti();
      }, 300);
    }
  }, [readPrompts.size]);

  // Mark current prompt as read after 3 seconds of viewing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!readPrompts.has(currentIndex)) {
        const newRead = new Set([...readPrompts, currentIndex]);
        setReadPrompts(newRead);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...newRead]));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, readPrompts]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? prompts.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 250);
  }, [isAnimating, prompts.length]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === prompts.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 250);
  }, [isAnimating, prompts.length]);

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? "right" : "left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 250);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, isFullscreen]);

  const currentPrompt = prompts[currentIndex];
  const readCount = readPrompts.size;
  const progressPercent = Math.round((readCount / prompts.length) * 100);
  const readingTime = estimateReadingTime(currentPrompt.content);

  const PromptContent = ({ inModal = false }: { inModal?: boolean }) => (
    <div className={cn(
      "transition-all duration-250 ease-out",
      isAnimating && direction === "right" && "translate-x-8 opacity-0",
      isAnimating && direction === "left" && "-translate-x-8 opacity-0",
      !isAnimating && "translate-x-0 opacity-100"
    )}>
      {/* Prompt Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1">
          <h4 className={cn(
            "font-bold text-primary leading-tight",
            inModal ? "text-2xl" : "text-lg"
          )}>
            {currentPrompt.title}
          </h4>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {readingTime} min read
            </span>
            {readPrompts.has(currentIndex) && (
              <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
                <Check className="h-3 w-3" />
                Read
              </span>
            )}
          </div>
        </div>
        
        {/* Prompt number badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{currentIndex + 1}</span>
        </div>
      </div>
      
      {/* Prompt Content */}
      <div className={cn(
        "leading-relaxed whitespace-pre-wrap text-foreground/90",
        inModal ? "text-base" : "text-sm"
      )}>
        {currentPrompt.content}
      </div>
    </div>
  );

  return (
    <>
      <div className={cn("relative", className)}>
        {/* Celebration Banner */}
        {showCelebration && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-success/20 via-primary/20 to-secondary/20 border-2 border-success/40 animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <PartyPopper className="h-6 w-6 text-success" />
              <div className="text-center">
                <p className="font-bold text-foreground">🎉 Milestone Reached! You've read 10+ prompts!</p>
                <p className="text-sm text-muted-foreground mt-1">Keep reading to build even stronger intuition!</p>
              </div>
              <PartyPopper className="h-6 w-6 text-success" />
            </div>
            <div className="flex justify-center mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  triggerBeetConfetti();
                }}
                className="gap-2 bg-success/10 hover:bg-success/20 border-success/30 text-success"
              >
                🎊 Celebrate Again!
              </Button>
            </div>
          </div>
        )}
        {/* Premium Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Left: Reading Progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">
                {readCount}/{prompts.length} read
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{progressPercent}%</span>
            </div>
          </div>

          {/* Right: Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Jump Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-8 px-3">
                  <List className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-xs">Jump to</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <ScrollArea className="h-64">
                  {prompts.map((prompt, index) => (
                    <DropdownMenuItem
                      key={prompt.id}
                      onClick={() => goToIndex(index)}
                      className={cn(
                        "flex items-center gap-3 py-2.5 cursor-pointer",
                        index === currentIndex && "bg-primary/10"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                        readPrompts.has(index) 
                          ? "bg-success/15 text-success" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {readPrompts.has(index) ? <Check className="h-3 w-3" /> : index + 1}
                      </div>
                      <span className={cn(
                        "text-sm truncate",
                        index === currentIndex && "font-medium"
                      )}>
                        {prompt.title}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Expand Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(true)}
              className="h-8 w-8"
              title="Expand to fullscreen"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>

            {/* Nav Arrows */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                disabled={isAnimating}
                className="h-8 w-8 rounded-none border-r"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="px-3 text-xs font-medium text-muted-foreground min-w-[60px] text-center">
                {currentIndex + 1} / {prompts.length}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                disabled={isAnimating}
                className="h-8 w-8 rounded-none border-l"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Card */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-secondary" />
          
          {/* Content */}
          <div className="p-6 md:p-8 min-h-[350px]">
            <PromptContent />
          </div>

          {/* Bottom gradient fade for long content indication */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
        </div>

        {/* Condensed Progress Indicator */}
        <div className="flex items-center justify-center gap-1 mt-4">
          {prompts.map((_, index) => {
            const isRead = readPrompts.has(index);
            const isCurrent = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  isCurrent 
                    ? "w-8 bg-primary" 
                    : isRead 
                      ? "w-2 bg-success/60 hover:bg-success" 
                      : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                )}
                title={`${prompts[index].title}${isRead ? " (read)" : ""}`}
              />
            );
          })}
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-xs text-muted-foreground mt-3">
          Use <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px] font-mono">→</kbd> arrow keys to navigate
        </p>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-card/50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Prompt {currentIndex + 1} of {prompts.length}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{readCount} read</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Nav in modal */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={isAnimating}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  disabled={isAnimating}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullscreen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <ScrollArea className="flex-1">
              <div className="max-w-3xl mx-auto p-8 md:p-12">
                <PromptContent inModal />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptCarousel;
