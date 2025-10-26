import Image from "next/image";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import {
  NormalizedImage,
  calculateTotalSize,
} from "@/lib/image-uploader-utils";
import { useCloudinaryDelete } from "@/hooks/useCloudinaryDelete";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CloudinaryImage } from "@/components/images/CloudinaryImage";

interface ImageGridProps {
  images: NormalizedImage[];
  onRemove: (index: number) => void;
  maxFiles: number;
  showFileDetails?: boolean;
  transformations?: Record<string, any>;
  useCloudinary?: boolean;
  onDeleteError?: (error: string) => void;
}

export function ImageGrid({
  images,
  onRemove,
  maxFiles,
  showFileDetails = false,
  transformations = {},
  useCloudinary = false,
  onDeleteError,
}: ImageGridProps) {
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const { deleteImage } = useCloudinaryDelete({
    onSuccess: (publicId) => {
      const index = images.findIndex(
        (img) => img.isUploaded && img.publicId === publicId
      );
      if (index !== -1) {
        onRemove(index);
      }
      setDeletingIndex(null);
    },
    onError: (error) => {
      onDeleteError?.(error);
      setDeletingIndex(null);
    },
  });

  const handleRemove = async (index: number) => {
    const image = images[index];

    // For Cloudinary images, delete from cloud first
    if (useCloudinary && image?.publicId && image.isUploaded) {
      setDeletingIndex(index);
      await deleteImage(image.publicId);
    } else {
      // For local images, just remove from state
      onRemove(index);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="group relative aspect-square rounded-xl overflow-hidden border border-border-light bg-background-secondary"
          >
            {/* Image Display */}
            {img.publicId && useCloudinary ? (
              <CloudinaryImage
                publicId={img.publicId}
                alt={img.name || `Image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                crop="fill"
                gravity="center"
                quality="auto"
                format="auto"
                {...transformations}
              />
            ) : (
              <Image
                src={img.url}
                alt={img.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            )}

            {/* Loading overlay for deletion */}
            {deletingIndex === index && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              disabled={deletingIndex === index}
              className={cn(
                "absolute top-2 right-2 p-1.5 rounded-full z-10",
                "bg-red-500 text-white shadow-lg",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "hover:bg-red-600 active:scale-95",
                deletingIndex === index && "opacity-50 cursor-not-allowed"
              )}
            >
              <X className="w-3 h-3" />
            </button>

            {/* File Details Overlay */}
            {img.size > 0 && showFileDetails && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="truncate">{img.name}</p>
                <p>
                  {`${(img.size / 1024).toFixed(1)}KB • ${img.type
                    ?.split("/")[1]
                    ?.toUpperCase()}`}
                </p>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          {images.length} of {maxFiles} images{" "}
          {useCloudinary ? "uploaded" : "selected"}
        </div>
        <div>Total size: {calculateTotalSize(images).toFixed(2)}MB</div>
      </div>
    </div>
  );
}
