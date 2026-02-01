import React from "react";
import { cn } from "@/lib/utils";

interface ContentSlideProps {
  title: string;
  children: React.ReactNode;
  layout?: 'center' | 'left' | 'split' | 'full';
  className?: string;
  onGateUnlock?: () => void; // Pass-through for gate unlock
}

// Recursively inject onGateUnlock to all React elements that can accept it
const injectGateUnlock = (children: React.ReactNode, onGateUnlock: () => void): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    
    const element = child as React.ReactElement<any>;
    
    // If this element has children, recursively inject into them
    const newChildren = element.props.children 
      ? injectGateUnlock(element.props.children, onGateUnlock)
      : element.props.children;
    
    // Clone with both onGateUnlock prop and recursively updated children
    return React.cloneElement(element, { 
      onGateUnlock,
      children: newChildren 
    });
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
        "leading-relaxed",
        layout === 'center' && "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto",
        layout === 'left' && "text-lg md:text-xl text-muted-foreground",
        layout === 'full' && "w-full"
      )}>
        {childrenWithProps}
      </div>
    </div>
  );
};

export default ContentSlide;
