import React, { useState, useEffect, useCallback } from "react";

interface GatedExamplesWrapperProps {
  totalExamples: number;
  children: React.ReactNode;
  onGateUnlock?: () => void;
}

/**
 * Wrapper component that gates navigation until all examples are revealed.
 * It counts reveals from child ElementExampleRow components and only 
 * calls onGateUnlock when ALL examples have been revealed.
 */
const GatedExamplesWrapper = ({ 
  totalExamples, 
  children, 
  onGateUnlock 
}: GatedExamplesWrapperProps) => {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleExampleRevealed = useCallback(() => {
    setRevealedCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (revealedCount >= totalExamples && onGateUnlock) {
      onGateUnlock();
    }
  }, [revealedCount, totalExamples, onGateUnlock]);

  // Clone children and inject onRevealed callback
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { 
        onRevealed: handleExampleRevealed 
      });
    }
    return child;
  });

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
        Examples {revealedCount < totalExamples && (
          <span className="text-primary ml-2">
            (Hover all {totalExamples} to continue — {revealedCount}/{totalExamples})
          </span>
        )}
        {revealedCount >= totalExamples && (
          <span className="text-green-600 ml-2">
            ✓ All examples revealed
          </span>
        )}
      </p>
      <div className="space-y-4">
        {childrenWithProps}
      </div>
    </div>
  );
};

export default GatedExamplesWrapper;
