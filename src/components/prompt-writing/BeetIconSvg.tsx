import { cn } from "@/lib/utils";

interface BeetIconSvgProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

/**
 * Minimalist geometric beet icon
 * Flat design with root shape and two stylized leaves
 * Uses Beet brand color (Deep Plum #7A2048)
 */
const BeetIconSvg = ({ size = "md", className }: BeetIconSvgProps) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      {/* Left leaf */}
      <path
        d="M20 8C16 4 12 6 10 10C12 12 16 12 20 8Z"
        className="fill-[hsl(var(--beet))]"
        opacity="0.7"
      />
      {/* Right leaf */}
      <path
        d="M28 8C32 4 36 6 38 10C36 12 32 12 28 8Z"
        className="fill-[hsl(var(--beet))]"
        opacity="0.7"
      />
      {/* Stem */}
      <rect
        x="22"
        y="8"
        width="4"
        height="6"
        rx="1"
        className="fill-[hsl(var(--beet))]"
        opacity="0.8"
      />
      {/* Main beet body */}
      <ellipse
        cx="24"
        cy="26"
        rx="12"
        ry="14"
        className="fill-[hsl(var(--beet))]"
      />
      {/* Root tip */}
      <path
        d="M24 40L22 46C23 47 25 47 26 46L24 40Z"
        className="fill-[hsl(var(--beet))]"
        opacity="0.9"
      />
      {/* Highlight */}
      <ellipse
        cx="20"
        cy="24"
        rx="3"
        ry="4"
        className="fill-white"
        opacity="0.15"
      />
    </svg>
  );
};

export default BeetIconSvg;
