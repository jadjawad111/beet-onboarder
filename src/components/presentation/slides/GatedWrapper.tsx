import React from "react";

interface GatedWrapperProps {
  children: React.ReactNode;
  onGateUnlock?: () => void;
}

/**
 * A wrapper component that forwards onGateUnlock to its children.
 * Used inside ContentSlide to pass gate callbacks to deeply nested interactive components.
 */
const GatedWrapper = ({ children, onGateUnlock }: GatedWrapperProps) => {
  // Clone children and inject onGateUnlock
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && onGateUnlock) {
      return React.cloneElement(child as React.ReactElement<any>, { onGateUnlock });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default GatedWrapper;
