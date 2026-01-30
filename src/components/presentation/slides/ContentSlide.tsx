import React from "react";
import { cn } from "@/lib/utils";

interface ContentSlideProps {
  title: string;
  children: React.ReactNode;
  layout?: 'center' | 'left' | 'split';
  className?: string;
  onGateUnlock?: () => void; // Pass-through for gate unlock
}

// Recursively inject onGateUnlock prop to all nested React elements
const injectGateUnlock = (children: React.ReactNode, onGateUnlock: () => void): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Clone the element with onGateUnlock prop
    const childProps: any = { onGateUnlock };
    
    // If the child has children, recursively inject into them too
    if (child.props.children) {
      childProps.children = injectGateUnlock(child.props.children, onGateUnlock);
    }
    
    return React.cloneElement(child as React.ReactElement<any>, childProps);
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
