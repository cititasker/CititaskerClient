"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { convertToBase64 } from "@/utils";
import { cn } from "@/lib/utils";
import { Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ImageData {
  src: string;
  name: string;
  new: boolean;
}

interface ImageUploaderProps {
  name: string;
  label?: string;
  description?: string;
  multiple?: boolean;
  limit?: number;
  className?: string;
}

export default function ImageUploader({
  name,
  label = "Add Photos",
  description = "Upload images to help describe your task better",
  multiple = true,
  limit = 5,
  className,
}: ImageUploaderProps) {
  const { control, setValue, watch } = useFormContext();
  const [dragActive, setDragActive] = useState(false);
  const maxFiles = multiple ? limit : 1;

  // Watch the current value
  const currentImages = watch(name) || [];

  const handleFiles = async (files: File[]) => {
    const safeCurrentImages = currentImages || [];
    const remainingSlots = maxFiles - safeCurrentImages.length;
    const filesToProcess = files.slice(0, remainingSlots);

    try {
      const newImages: ImageData[] = await Promise.all(
        filesToProcess.map(async (file) => ({
          src: (await convertToBase64(file)) as string,
          name: file.name,
          new: true,
        }))
      );

      const updatedImages = [...safeCurrentImages, ...newImages];
      setValue(name, updatedImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    await handleFiles(files);
  };

  const handleRemove = (index: number) => {
    console.log("handleRemove called with index:", index);
    console.log("Current images before remove:", currentImages);

    if (!currentImages || !Array.isArray(currentImages)) {
      console.error("Current images is not an array:", currentImages);
      return;
    }

    if (index < 0 || index >= currentImages.length) {
      console.error(
        "Invalid index:",
        index,
        "Array length:",
        currentImages.length
      );
      return;
    }

    const updated = currentImages.filter((_, i) => i !== index);
    console.log("Updated images after remove:", updated);

    setValue(name, updated, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={cn("space-y-3", className)}>
          <FormLabel>{label}</FormLabel>

          {description && (
            <FormDescription className="text-sm text-text-muted">
              {description}
            </FormDescription>
          )}

          <FormControl>
            <div className="space-y-4">
              {/* Upload Area */}
              {(!currentImages || currentImages.length < maxFiles) && (
                <div
                  className={cn(
                    "relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200",
                    "hover:bg-background-secondary hover:border-border-medium cursor-pointer",
                    dragActive
                      ? "border-primary bg-primary-50"
                      : "border-border-light bg-background"
                  )}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple={multiple}
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div
                      className={cn(
                        "p-3 rounded-full transition-colors",
                        dragActive
                          ? "bg-primary text-white"
                          : "bg-background-secondary text-text-muted"
                      )}
                    >
                      <Upload className="w-6 h-6" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {dragActive ? "Drop images here" : "Upload Images"}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Drag and drop or click to browse • Max {maxFiles} images
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Grid */}
              {currentImages && currentImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currentImages.map((img: ImageData, index: number) => (
                    <div
                      key={`image-${index}-${img.name}`}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-border-light bg-background-secondary"
                    >
                      <Image
                        src={img.src}
                        alt={img.name || `Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(
                            "Remove button clicked for index:",
                            index
                          );
                          handleRemove(index);
                        }}
                        className={cn(
                          "absolute top-2 right-2 p-1.5 rounded-full z-10",
                          "bg-red-500 text-white shadow-lg",
                          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                          "hover:bg-red-600 active:scale-95"
                        )}
                      >
                        <X className="w-3 h-3" />
                      </button>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
              )}

              {/* Image count indicator */}
              {currentImages && currentImages.length > 0 && (
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  {currentImages.length} of {maxFiles} images uploaded
                </p>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
