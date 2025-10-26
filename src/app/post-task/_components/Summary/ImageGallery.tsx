import Image from "next/image";
import React from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NormalizedImage } from "@/lib/image-uploader-utils";

const ImageGallery = React.memo(
  ({ images, taskName }: { images: NormalizedImage[]; taskName?: string }) => {
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

    if (!images?.length) {
      return (
        <Card className="p-0 overflow-hidden">
          <div className="aspect-[4/3] relative bg-background-secondary">
            <div className="flex flex-col items-center justify-center h-full text-text-muted">
              <ImageIcon className="w-12 h-12 mb-2" />
              <p className="text-sm">No image provided</p>
            </div>
          </div>
        </Card>
      );
    }

    const selectedImage = images[selectedImageIndex];
    const hasMultipleImages = images.length > 1;

    const navigateImage = (direction: "prev" | "next") => {
      if (direction === "prev") {
        setSelectedImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else {
        setSelectedImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    return (
      <Card className="p-0 overflow-hidden">
        <div className="aspect-[4/3] relative bg-background-secondary group">
          <Image
            src={selectedImage.url}
            alt={taskName || `Task image ${selectedImageIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            priority={selectedImageIndex === 0}
          />

          {hasMultipleImages && (
            <>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-lg"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-lg"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {hasMultipleImages && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-medium">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {hasMultipleImages && (
          <div className="p-3 bg-background-secondary/50">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide p-1">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === selectedImageIndex
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  }
);

export default ImageGallery;
