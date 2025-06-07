"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils"; // helper for conditional classnames
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-square cursor-pointer overflow-hidden rounded-md",
              currentIndex === index && "ring-2 ring-primary"
            )}
            onClick={() => handleOpen(index)}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent hideClose className="p-0 max-w-xl">
          <DialogHeader className="hidden">
            <VisuallyHidden asChild>
              <DialogTitle />
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogDescription />
            </VisuallyHidden>
          </DialogHeader>
          <Carousel
            opts={{
              loop: true,
              startIndex: currentIndex,
            }}
            className="relative"
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video w-full relative">
                    <Image
                      src={src}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
