"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import ImageViewerDialog from "@/components/reusables/ImageViewerDialog";
interface ImageGalleryProps {
  images: string[];
  className?: string;
  thumbnailClassName?: string;
  columns?: 2 | 3 | 4 | 5;
  aspectRatio?: "square" | "video" | "auto";
  showCounter?: boolean;
}

export default function ImageGallery({
  images,
  className,
  thumbnailClassName,
  columns = 4,
  aspectRatio = "square",
  showCounter = true,
}: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<number | null>(null);

  const totalImages = images.length;

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex]);

  const handleOpen = useCallback((index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [totalImages]);

  const handleImageLoad = useCallback((index: number) => {
    setLoading((prev) => (prev === index ? null : prev));
  }, []);

  const handleImageLoadStart = useCallback((index: number) => {
    setLoading(index);
  }, []);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-40 bg-background-secondary rounded-xl border-2 border-dashed border-border-light">
        <p className="text-text-muted text-sm">No images to display</p>
      </div>
    );
  }

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  };

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-[4/3]",
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={cn("space-y-4", className)}>
        <div className={cn("grid gap-2 sm:gap-3", gridCols[columns])}>
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={cn(
                "group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200",
                "hover:scale-[1.02] hover:shadow-lg",
                "border border-border-light hover:border-border-medium",
                aspectClasses[aspectRatio],
                thumbnailClassName
              )}
              onClick={() => handleOpen(index)}
            >
              {/* Loading placeholder */}
              {loading === index && (
                <div className="absolute inset-0 bg-background-secondary animate-pulse rounded-xl" />
              )}

              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onLoadStart={() => handleImageLoadStart(index)}
                onLoad={() => handleImageLoad(index)}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>

              {/* Image counter for first image */}
              {index === 0 && totalImages > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  +{totalImages - 1}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Image counter */}
        {showCounter && totalImages > 1 && (
          <p className="text-center text-sm text-text-muted">
            {totalImages} image{totalImages > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Image Viewer Dialog */}
      <ImageViewerDialog open={open} onOpenChange={setOpen} images={images} />
    </>
  );
}
