import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export default function SkeletonLoader({
  className,
  variant = "rectangular",
  width,
  height,
  animate = true,
}: SkeletonLoaderProps) {
  const variants = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "bg-gray-200",
        animate && "animate-pulse",
        variants[variant],
        className,
      )}
      style={{ width, height }}
    />
  );
}
