import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Check, ChevronDown, Lock, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import beetIcon from "@/assets/beet-icon.png";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { generateAndDownloadCoursePDF } from "@/utils/generateCoursePDF";
import { Button } from "@/components/ui/button";

export interface Slide {
  id: string;
  content: React.ReactNode;
  section?: string; // Main section this slide belongs to
  title?: string;
  parentId?: string; // For nested slides under another slide
  gated?: boolean; // Whether this slide requires completion before continuing
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
  // Generate a storage key based on the course title for unique per-course progress
  const storageKey = `course-progress-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Load initial state from localStorage
  const [currentSlide, setCurrentSlide] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        return data.currentSlide ?? 0;
      }
    } catch {}
    return 0;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        return new Set(data.visitedSlides ?? [0]);
      }
    } catch {}
    return new Set([0]);
  });
  const [highestSlideReached, setHighestSlideReached] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        return data.highestSlideReached ?? 0;
      }
    } catch {}
    return 0;
  });
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  
  // Persist unlocked slides in localStorage so they stay unlocked between sessions
  const [unlockedSlides, setUnlockedSlides] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        return new Set(data.unlockedSlides ?? []);
      }
    } catch {}
    return new Set();
  });
  
  // Save all progress to localStorage whenever relevant state changes
  useEffect(() => {
    try {
      const progressData = {
        currentSlide,
        visitedSlides: [...visitedSlides],
        highestSlideReached,
        unlockedSlides: [...unlockedSlides],
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(progressData));
    } catch {
      // Ignore storage errors
    }
  }, [currentSlide, visitedSlides, highestSlideReached, unlockedSlides, storageKey]);

  const totalSlides = slides.length;
  const mainContentRef = useRef<HTMLElement>(null);
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;
  // Progress is based on highest slide reached, not current position
  const progress = ((highestSlideReached + 1) / totalSlides) * 100;

  const currentSlideData = slides[currentSlide];
  const isCurrentSlideGated = currentSlideData?.gated ?? false;
  const isCurrentSlideUnlocked = unlockedSlides.has(currentSlideData?.id ?? '');
  // TEMP: Disable all gating for preview - set to true to always allow continue
  const canContinue = true; // Original: !isCurrentSlideGated || isCurrentSlideUnlocked;

  // Function to unlock the current slide (passed to children)
  const unlockCurrentSlide = useCallback(() => {
    if (currentSlideData?.id) {
      setUnlockedSlides(prev => new Set(prev).add(currentSlideData.id));
    }
  }, [currentSlideData?.id]);

  // Track visited slides and highest slide reached, and scroll to top on slide change
  useEffect(() => {
    setVisitedSlides(prev => new Set([...prev, currentSlide]));
    setHighestSlideReached(prev => Math.max(prev, currentSlide));
    // Scroll main content to top when slide changes
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentSlide]);

  // Auto-open the section containing the current slide
  useEffect(() => {
    const currentSectionName = slides[currentSlide]?.section || "Overview";
    setOpenSections(prev => {
      const next = new Set(prev);
      next.add(currentSectionName);
      return next;
    });
  }, [currentSlide, slides]);

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
    if (!canContinue) return;
    
    if (isLastSlide) {
      // Trigger completion - stays on overlay until user clicks download or exits
      setIsComplete(true);
      onComplete?.();
    } else {
      goToSlide(currentSlide + 1, 'next');
    }
  }, [isLastSlide, currentSlide, goToSlide, onComplete, canContinue]);

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

  // Handle practice overlay navigation events
  useEffect(() => {
    const handlePracticeContinue = () => {
      // Continue to next slide (practice exercises)
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1, 'next');
      }
    };

    const handlePracticeSkip = () => {
      // Find the Bronze section start (skip all practice exercises)
      const bronzeIndex = slides.findIndex(s => s.section === '"Bronze" Response');
      if (bronzeIndex !== -1 && bronzeIndex > currentSlide) {
        goToSlide(bronzeIndex, 'next');
      } else {
        // Fallback: just go to next slide
        handleNext();
      }
    };

    window.addEventListener('practice-overlay-continue', handlePracticeContinue);
    window.addEventListener('practice-overlay-skip', handlePracticeSkip);
    
    return () => {
      window.removeEventListener('practice-overlay-continue', handlePracticeContinue);
      window.removeEventListener('practice-overlay-skip', handlePracticeSkip);
    };
  }, [currentSlide, totalSlides, slides, goToSlide, handleNext]);

  // Clone children and inject unlockCurrentSlide prop
  const slideContent = useMemo(() => {
    const content = currentSlideData?.content;
    if (!content || typeof content !== 'object' || !('type' in content)) {
      return content;
    }
    
    // If it's a React element, clone it with the unlock callback
    try {
      const element = content as React.ReactElement;
      return React.cloneElement(element, {
        onGateUnlock: unlockCurrentSlide,
      } as any);
    } catch {
      return content;
    }
  }, [currentSlideData?.content, unlockCurrentSlide]);

  // Handle PDF download
  const handleDownloadPDF = async () => {
    try {
      await generateAndDownloadCoursePDF();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  // Handle closing the completion overlay
  const handleCloseCompletion = () => {
    navigate(exitPath);
  };

  // Completion overlay - stays until user clicks download or exits
  if (isComplete) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        onClick={handleCloseCompletion}
      >
        <div 
          className="text-center animate-fade-in max-w-md px-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleCloseCompletion}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
          
          {/* Celebration animation */}
          <div className="relative mb-8">
            <img 
              src={beetIcon} 
              alt="Beet" 
              className="w-32 h-32 mx-auto animate-bounce"
              style={{ animationDuration: '0.6s' }}
            />
            {/* Confetti particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          
          {/* Reference Download */}
          <div className="mt-8 p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">Course Reference</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get the complete course content as a printable reference guide.
            </p>
            <Button
              asChild
              className="gap-2 w-full sm:w-auto"
              size="lg"
            >
              <a href="/education/prompt-writing/reference" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4" />
                Download Reference Guide
              </a>
            </Button>
          </div>
          
          {/* Info callout */}
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg max-w-md">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Your progress is saved in this browser. Download the reference guide for offline access or use on other devices.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Click anywhere or press the X to return to overview
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

        {/* Step list with sections */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-2">
            {(() => {
              // Group slides by section
              const sections: { name: string; slides: { slide: Slide; index: number }[] }[] = [];
              let currentSection: { name: string; slides: { slide: Slide; index: number }[] } | null = null;

              slides.forEach((slide, index) => {
                const sectionName = slide.section || "Overview";
                if (!currentSection || currentSection.name !== sectionName) {
                  currentSection = { name: sectionName, slides: [] };
                  sections.push(currentSection);
                }
                currentSection.slides.push({ slide, index });
              });

              return sections.map((section) => {
                const sectionHasCurrent = section.slides.some(s => s.index === currentSlide);
                const sectionComplete = section.slides.every(s => s.index < currentSlide);
                const firstSlideIndex = section.slides[0]?.index ?? 0;
                const isSectionVisited = visitedSlides.has(firstSlideIndex);

                return (
                  <Collapsible
                    key={section.name}
                    open={openSections.has(section.name)}
                    onOpenChange={(open) => {
                      setOpenSections(prev => {
                        const next = new Set(prev);
                        if (open) {
                          next.add(section.name);
                        } else {
                          next.delete(section.name);
                        }
                        return next;
                      });
                    }}
                  >
                    <div className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                      sectionHasCurrent && "bg-primary/5",
                      "hover:bg-muted/50"
                    )}>
                      {/* Clickable section name - navigates to first slide */}
                      <button
                        onClick={() => {
                          if (isSectionVisited) {
                            goToSlide(firstSlideIndex, firstSlideIndex > currentSlide ? 'next' : 'prev');
                          }
                        }}
                        disabled={!isSectionVisited}
                        className={cn(
                          "flex items-center gap-2 text-left flex-1",
                          !isSectionVisited && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {sectionComplete ? (
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                        ) : (
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center",
                            sectionHasCurrent ? "bg-primary" : "bg-muted"
                          )}>
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              sectionHasCurrent ? "bg-primary-foreground" : "bg-muted-foreground"
                            )} />
                          </div>
                        )}
                        <span className={cn(
                          "text-sm font-medium hidden lg:block",
                          sectionHasCurrent ? "text-primary" : "text-foreground"
                        )}>
                          {section.name}
                        </span>
                      </button>
                      
                      {/* Collapse toggle */}
                      <CollapsibleTrigger className="p-1 rounded hover:bg-muted/50 hidden lg:block">
                        <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-2">
                        {(() => {
                          // Separate ALL practice slides from regular slides
                          const practicePattern = /^Practice #\d+$/;
                          const regularSlides: { slide: Slide; index: number }[] = [];
                          const continuePracticeSlides: { slide: Slide; index: number }[] = [];
                          
                          section.slides.forEach(item => {
                            if (practicePattern.test(item.slide.title || '')) {
                              continuePracticeSlides.push(item);
                            } else {
                              regularSlides.push(item);
                            }
                          });
                          
                          const hasContinuePractice = continuePracticeSlides.length > 0;
                          const continuePracticeHasCurrent = continuePracticeSlides.some(s => s.index === currentSlide);
                          const continuePracticeComplete = continuePracticeSlides.every(s => s.index < highestSlideReached);
                          const continuePracticeFirstVisited = continuePracticeSlides.length > 0 && visitedSlides.has(continuePracticeSlides[0].index);
                          
                          return (
                            <>
                              {regularSlides.map(({ slide, index }) => {
                                const isCurrent = index === currentSlide;
                                const isVisited = visitedSlides.has(index);
                                const isPast = index < highestSlideReached;
                                
                                // Filter child slides - exclude Practice slides (they go in Continue Practising)
                                const practicePattern = /^Practice #\d+$/;
                                const childSlides = slides
                                  .map((s, i) => ({ slide: s, index: i }))
                                  .filter(s => s.slide.parentId === slide.id && !practicePattern.test(s.slide.title || ''));
                                const hasChildren = childSlides.length > 0;
                                const childIsCurrent = childSlides.some(c => c.index === currentSlide);
                                
                                if (slide.parentId) return null;
                                
                                return (
                                  <div key={slide.id}>
                                    <button
                                      onClick={() => isVisited && goToSlide(index, index > currentSlide ? 'next' : 'prev')}
                                      disabled={!isVisited}
                                      className={cn(
                                        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all text-left",
                                        (isCurrent || childIsCurrent) && "bg-primary/10 text-primary",
                                        !isCurrent && !childIsCurrent && isVisited && "hover:bg-muted cursor-pointer",
                                        !isVisited && "opacity-50 cursor-not-allowed"
                                      )}
                                    >
                                      <div className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors",
                                        isCurrent && "bg-primary text-primary-foreground",
                                        isPast && !isCurrent && "bg-primary/20 text-primary",
                                        !isPast && !isCurrent && "bg-muted text-muted-foreground"
                                      )}>
                                        {isPast && !isCurrent ? (
                                          <Check className="w-3 h-3" />
                                        ) : (
                                          index + 1
                                        )}
                                      </div>
                                      <span className={cn(
                                        "text-xs truncate hidden lg:block",
                                        (isCurrent || childIsCurrent) ? "text-primary font-medium" : "text-muted-foreground"
                                      )}>
                                        {slide.title || `Step ${index + 1}`}
                                      </span>
                                    </button>
                                    
                                    {hasChildren && (
                                      <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border/50 pl-2">
                                        {childSlides.map(({ slide: childSlide, index: childIndex }) => {
                                          const isChildCurrent = childIndex === currentSlide;
                                          const isChildVisited = visitedSlides.has(childIndex);
                                          const isChildPast = childIndex < highestSlideReached;
                                          
                                          return (
                                            <button
                                              key={childSlide.id}
                                              onClick={() => isChildVisited && goToSlide(childIndex, childIndex > currentSlide ? 'next' : 'prev')}
                                              disabled={!isChildVisited}
                                              className={cn(
                                                "w-full flex items-center gap-2 px-2 py-1 rounded-md transition-all text-left",
                                                isChildCurrent && "bg-primary/10 text-primary",
                                                !isChildCurrent && isChildVisited && "hover:bg-muted cursor-pointer",
                                                !isChildVisited && "opacity-50 cursor-not-allowed"
                                              )}
                                            >
                                              <div className={cn(
                                                "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 transition-colors",
                                                isChildCurrent && "bg-primary text-primary-foreground",
                                                isChildPast && !isChildCurrent && "bg-primary/20 text-primary",
                                                !isChildPast && !isChildCurrent && "bg-muted text-muted-foreground"
                                              )}>
                                                {isChildPast && !isChildCurrent ? (
                                                  <Check className="w-2.5 h-2.5" />
                                                ) : (
                                                  childIndex + 1
                                                )}
                                              </div>
                                              <span className={cn(
                                                "text-[11px] truncate hidden lg:block",
                                                isChildCurrent ? "text-primary font-medium" : "text-muted-foreground"
                                              )}>
                                                {childSlide.title || `Step ${childIndex + 1}`}
                                              </span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              
                              {/* Continue Practising collapsible group */}
                              {hasContinuePractice && (
                                <Collapsible
                                  open={openSections.has("Continue Practising")}
                                  onOpenChange={(open) => {
                                    setOpenSections(prev => {
                                      const next = new Set(prev);
                                      if (open) {
                                        next.add("Continue Practising");
                                      } else {
                                        next.delete("Continue Practising");
                                      }
                                      return next;
                                    });
                                  }}
                                >
                                  <div className={cn(
                                    "flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors",
                                    continuePracticeHasCurrent && "bg-primary/10"
                                  )}>
                                    <CollapsibleTrigger className="flex items-center gap-2 flex-1 text-left">
                                      {continuePracticeComplete ? (
                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                          <Check className="w-3 h-3 text-primary" />
                                        </div>
                                      ) : (
                                        <div className={cn(
                                          "w-5 h-5 rounded-full flex items-center justify-center",
                                          continuePracticeHasCurrent ? "bg-primary" : "bg-muted"
                                        )}>
                                          <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            continuePracticeHasCurrent ? "bg-primary-foreground" : "bg-muted-foreground"
                                          )} />
                                        </div>
                                      )}
                                      <span className={cn(
                                        "text-xs font-medium hidden lg:block",
                                        continuePracticeHasCurrent ? "text-primary" : "text-muted-foreground"
                                      )}>
                                        Continue Practising
                                      </span>
                                      <ChevronDown className="w-3 h-3 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180 hidden lg:block" />
                                    </CollapsibleTrigger>
                                  </div>
                                  
                                  <CollapsibleContent>
                                    <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border/50 pl-2">
                                      {continuePracticeSlides.map(({ slide, index }) => {
                                        const isCurrent = index === currentSlide;
                                        const isVisited = visitedSlides.has(index);
                                        const isPast = index < highestSlideReached;
                                        
                                        return (
                                          <button
                                            key={slide.id}
                                            onClick={() => isVisited && goToSlide(index, index > currentSlide ? 'next' : 'prev')}
                                            disabled={!isVisited}
                                            className={cn(
                                              "w-full flex items-center gap-2 px-2 py-1 rounded-md transition-all text-left",
                                              isCurrent && "bg-primary/10 text-primary",
                                              !isCurrent && isVisited && "hover:bg-muted cursor-pointer",
                                              !isVisited && "opacity-50 cursor-not-allowed"
                                            )}
                                          >
                                            <div className={cn(
                                              "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 transition-colors",
                                              isCurrent && "bg-primary text-primary-foreground",
                                              isPast && !isCurrent && "bg-primary/20 text-primary",
                                              !isPast && !isCurrent && "bg-muted text-muted-foreground"
                                            )}>
                                              {isPast && !isCurrent ? (
                                                <Check className="w-2.5 h-2.5" />
                                              ) : (
                                                index + 1
                                              )}
                                            </div>
                                            <span className={cn(
                                              "text-[11px] truncate hidden lg:block",
                                              isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                                            )}>
                                              {slide.title || `Step ${index + 1}`}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              });
            })()}
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
            {slides[currentSlide]?.section && (
              <span className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                {slides[currentSlide].section}
              </span>
            )}
            {isCurrentSlideGated && !isCurrentSlideUnlocked && (
              <span className="px-2 py-1 rounded-full bg-amber-500/10 text-xs font-medium text-amber-600 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Complete to continue
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
        <main ref={mainContentRef} className="flex-1 flex flex-col px-8 md:px-16 lg:px-24 pt-12 pb-24 overflow-y-auto">
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div 
              key={currentSlideData?.id}
              className={cn(
                "w-full max-w-4xl my-auto transition-all duration-250 ease-out",
                isTransitioning && slideDirection === 'next' && "opacity-0 translate-x-12",
                isTransitioning && slideDirection === 'prev' && "opacity-0 -translate-x-12",
                !isTransitioning && "opacity-100 translate-x-0"
              )}
            >
              {slideContent}
            </div>
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
              disabled={isTransitioning || !canContinue}
              className={cn(
                "flex items-center gap-2 px-8 py-3 text-base font-semibold rounded-xl transition-all shadow-lg",
                !canContinue && "opacity-50 cursor-not-allowed",
                canContinue && "hover:shadow-xl",
                isLastSlide 
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {!canContinue ? (
                <>
                  <Lock className="w-4 h-4" />
                  Complete Activity
                </>
              ) : isLastSlide ? (
                "Complete Course"
              ) : (
                "Continue"
              )}
              {canContinue && <ChevronRight className="w-5 h-5" />}
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
