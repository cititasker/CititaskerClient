"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon, AlertCircle } from "lucide-react";
import Image from "next/image";

interface CloudinaryImageProps extends Omit<CldImageProps, "src"> {
  publicId: string;
  alt: string;
  fallbackSrc?: string;
  showFallback?: boolean;
  loadingClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
}

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  fallbackSrc,
  showFallback = true,
  className,
  loadingClassName,
  errorClassName,
  containerClassName,
  ...props
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Default optimizations
  const defaultProps: Partial<CldImageProps> = {
    format: "auto",
    quality: "auto",
    dpr: "auto",
    loading: "lazy",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    ...props,
  };

  if (hasError && showFallback) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded-lg",
          "min-h-[200px] text-gray-400",
          errorClassName,
          containerClassName
        )}
      >
        {fallbackSrc ? (
          <Image
            src={fallbackSrc}
            alt={alt}
            className={className}
            width={width}
            height={height}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-8 h-8" />
            <span className="text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full", containerClassName)}>
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg",
            "animate-pulse",
            loadingClassName
          )}
        >
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <CldImage
        src={publicId}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...defaultProps}
      />
    </div>
  );
}
