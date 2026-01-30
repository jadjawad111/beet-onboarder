import React from "react";
import { cn } from "@/lib/utils";

interface ContentSlideProps {
  title: string;
  children: React.ReactNode;
  layout?: 'center' | 'left' | 'split';
  className?: string;
  onGateUnlock?: () => void; // Pass-through for gate unlock
}

// Inject onGateUnlock only to first-level React elements
// Do NOT inject recursively - components with their own gate tracking (like GatedElementSlide)
// manage their own sub-component callbacks and call onGateUnlock when ALL are complete
const injectGateUnlock = (children: React.ReactNode, onGateUnlock: () => void): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    // Only inject onGateUnlock to first-level children, not recursively
    return React.cloneElement(child as React.ReactElement<any>, { onGateUnlock });
  });
};

const ContentSlide = ({ 
  title, 
  children, 
  layout = 'center',
  className,
  onGateUnlock,
}: ContentSlideProps) => {
  // Inject onGateUnlock recursively to all children
  const childrenWithProps = onGateUnlock 
    ? injectGateUnlock(children, onGateUnlock)
    : children;

  return (
    <div className={cn(
      "w-full",
      layout === 'center' && "text-center",
      layout === 'left' && "text-left",
      className
    )}>
      {title && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
          {title}
        </h2>
      )}
      
      <div className={cn(
        "text-lg md:text-xl text-muted-foreground leading-relaxed",
        layout === 'center' && "max-w-2xl mx-auto"
      )}>
        {childrenWithProps}
      </div>
    </div>
  );
};

export default ContentSlide;
