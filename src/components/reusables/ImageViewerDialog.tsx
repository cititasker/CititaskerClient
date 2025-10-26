"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface ImageViewerDialogProps {
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIndex?: number;
  className?: string;
}

export default function ImageViewerDialog({
  images,
  open,
  onOpenChange,
  initialIndex = 0,
  className,
}: ImageViewerDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loading, setLoading] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const totalImages = images.length;

  // Reset index when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [open, initialIndex]);

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
          onOpenChange(false);
          break;
        case " ":
          e.preventDefault();
          setIsZoomed((prev) => !prev);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    setIsZoomed(false);
  }, [totalImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [totalImages]);

  const handleImageLoad = useCallback((index: number) => {
    setLoading((prev) => (prev === index ? null : prev));
  }, []);

  const handleImageLoadStart = useCallback((index: number) => {
    setLoading(index);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  }, []);

  if (!totalImages) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[95vw] w-full max-h-[95vh] h-full p-0 bg-black/95 backdrop-blur-sm border-none focus:outline-none",
          className
        )}
        hideClose
      >
        <VisuallyHidden asChild>
          <DialogTitle>
            Image Viewer - {currentIndex + 1} of {totalImages}
          </DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>
            Use arrow keys to navigate, space to zoom, escape to close
          </DialogDescription>
        </VisuallyHidden>

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
            {/* Image counter */}
            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
              {currentIndex + 1} / {totalImages}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Zoom toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="bg-black/50 text-white rounded-full p-2 h-10 w-10"
                title={isZoomed ? "Zoom out (Space)" : "Zoom in (Space)"}
              >
                {isZoomed ? (
                  <ZoomOut className="w-5 h-5" />
                ) : (
                  <ZoomIn className="w-5 h-5" />
                )}
              </Button>

              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="bg-black/50 text-white rounded-full p-2 h-10 w-10"
                title="Close (Escape)"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Main image container */}
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
            <div
              className={cn(
                "relative transition-all duration-300 ease-in-out cursor-pointer",
                isZoomed ? "scale-150 sm:scale-200" : "max-w-full max-h-full"
              )}
              style={{
                maxWidth: isZoomed ? "none" : "calc(100vw - 4rem)",
                maxHeight: isZoomed ? "none" : "calc(100vh - 8rem)",
              }}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              {/* Loading indicator */}
              {loading === currentIndex && (
                <div className="absolute inset-0 bg-background-secondary/20 animate-pulse rounded-lg" />
              )}

              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                width={1200}
                height={800}
                className={cn(
                  "max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl",
                  "transition-all duration-300"
                )}
                style={{
                  maxWidth: isZoomed ? "none" : "100%",
                  maxHeight: isZoomed ? "none" : "100%",
                }}
                onLoadStart={() => handleImageLoadStart(currentIndex)}
                onLoad={() => handleImageLoad(currentIndex)}
                priority
              />
            </div>
          </div>

          {/* Navigation buttons */}
          {totalImages > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 transition-all duration-200"
                disabled={loading !== null}
                title="Previous image (←)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 transition-all duration-200"
                disabled={loading !== null}
                title="Next image (→)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </>
          )}

          {/* Touch swipe areas for mobile */}
          {totalImages > 1 && !isZoomed && (
            <>
              <div
                className="absolute left-0 top-0 w-1/3 h-full cursor-pointer sm:hidden z-40"
                onClick={handlePrevious}
              />
              <div
                className="absolute right-0 top-0 w-1/3 h-full cursor-pointer sm:hidden z-40"
                onClick={handleNext}
              />
            </>
          )}

          {/* Bottom thumbnail strip */}
          {totalImages > 1 && totalImages <= 8 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] overflow-x-auto">
              <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2 min-w-fit">
                {images.map((src, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
                      currentIndex === index
                        ? "border-white scale-110 ring-2 ring-white/50"
                        : "border-transparent opacity-60 hover:opacity-80 hover:scale-105"
                    )}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Help text */}
          {totalImages > 1 && (
            <div className="absolute bottom-4 right-4 z-50">
              <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
                <div className="hidden sm:block space-y-1">
                  <div>← → Navigate</div>
                  <div>Space: Zoom</div>
                  <div>Esc: Close</div>
                </div>
                <div className="sm:hidden">Tap sides to navigate</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
