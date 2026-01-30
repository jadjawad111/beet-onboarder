import { cn } from "@/lib/utils";

interface BeetIconProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

/**
 * Beet Icon - A stylized representation of a beet vegetable
 * Uses Handshake AI brand gradient (Cyan → Lime)
 */
const BeetIcon = ({ size = "md", className }: BeetIconProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-foreground",
        sizeClasses[size],
        className
      )}
    >
      B
    </div>
  );
};

export default BeetIcon;
