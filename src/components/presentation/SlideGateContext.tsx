import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SlideGateContextType {
  isSlideGated: (slideId: string) => boolean;
  isSlideUnlocked: (slideId: string) => boolean;
  registerGate: (slideId: string) => void;
  unlockGate: (slideId: string) => void;
  resetGates: () => void;
}

const SlideGateContext = createContext<SlideGateContextType | null>(null);

export const useSlideGate = () => {
  const context = useContext(SlideGateContext);
  if (!context) {
    throw new Error("useSlideGate must be used within a SlideGateProvider");
  }
  return context;
};

// Hook for components that gate slides - returns callback to unlock
export const useGateUnlock = (slideId: string) => {
  const { registerGate, unlockGate, isSlideUnlocked } = useSlideGate();
  
  // Register this gate on mount
  useState(() => {
    registerGate(slideId);
  });

  const unlock = useCallback(() => {
    unlockGate(slideId);
  }, [slideId, unlockGate]);

  return { unlock, isUnlocked: isSlideUnlocked(slideId) };
};

interface SlideGateProviderProps {
  children: ReactNode;
}

export const SlideGateProvider = ({ children }: SlideGateProviderProps) => {
  const [gatedSlides, setGatedSlides] = useState<Set<string>>(new Set());
  const [unlockedSlides, setUnlockedSlides] = useState<Set<string>>(new Set());

  const registerGate = useCallback((slideId: string) => {
    setGatedSlides(prev => new Set(prev).add(slideId));
  }, []);

  const unlockGate = useCallback((slideId: string) => {
    setUnlockedSlides(prev => new Set(prev).add(slideId));
  }, []);

  const isSlideGated = useCallback((slideId: string) => {
    return gatedSlides.has(slideId);
  }, [gatedSlides]);

  const isSlideUnlocked = useCallback((slideId: string) => {
    return unlockedSlides.has(slideId);
  }, [unlockedSlides]);

  const resetGates = useCallback(() => {
    setGatedSlides(new Set());
    setUnlockedSlides(new Set());
  }, []);

  return (
    <SlideGateContext.Provider 
      value={{ 
        isSlideGated, 
        isSlideUnlocked, 
        registerGate, 
        unlockGate, 
        resetGates 
      }}
    >
      {children}
    </SlideGateContext.Provider>
  );
};

export default SlideGateContext;
