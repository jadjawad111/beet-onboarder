import React from "react";
import { cn } from "@/lib/utils";

interface ContentSlideProps {
  title: string;
  children: React.ReactNode;
  layout?: 'center' | 'left' | 'split';
  className?: string;
  onGateUnlock?: () => void; // Pass-through for gate unlock
}

const ContentSlide = ({ 
  title, 
  children, 
  layout = 'center',
  className,
  onGateUnlock, // Accept but don't use directly - children will receive via cloneElement
}: ContentSlideProps) => {
  // Clone children and inject onGateUnlock to first-level children that support it
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && onGateUnlock) {
      return React.cloneElement(child as React.ReactElement<any>, { onGateUnlock });
    }
    return child;
  });

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
