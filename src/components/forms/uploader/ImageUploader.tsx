"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  NormalizedImage,
  normalizeFromFile,
  validateFile,
} from "@/lib/image-uploader-utils";
import { UploadZone } from "./UploadZone/UploadZone";
import { ImageGrid } from "./UploadZone/ImageGrid";
import { UploadProgress } from "./UploadZone/UploadProgress";
import { CloudinaryUploadResult } from "@/lib/cloudinary-upload";

interface ImageUploaderProps {
  name: string;
  label?: string;
  description?: string;
  multiple?: boolean;
  limit?: number;
  className?: string;

  // Conditional Cloudinary props
  useCloudinary?: boolean;
  folder?: string;
  tags?: string[];
  transformations?: Record<string, any>;

  // File validation
  acceptedFileTypes?: string[];
  maxFileSize?: number;

  // Callbacks
  onFilesSelected?: (files: File[]) => void;
  onUploadComplete?: (results: NormalizedImage[]) => void;
  onUploadError?: (error: any) => void;

  // Display options
  showFileDetails?: boolean;
}

export default function ImageUploader({
  name,
  label = "Add Photos",
  description = "Upload images to help describe your task better",
  multiple = true,
  limit = 5,
  className,

  // Cloudinary options
  useCloudinary = false,
  folder = "uploads",
  tags = [],
  transformations = {},

  // File validation
  acceptedFileTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  maxFileSize = 5,

  // Callbacks
  onFilesSelected,
  onUploadComplete,
  onUploadError,

  // Display options
  showFileDetails = false,
}: ImageUploaderProps) {
  const { control, setValue, watch } = useFormContext();
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLocalProcessing, setIsLocalProcessing] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const maxFiles = multiple ? limit : 1;
  const maxFileSizeBytes = maxFileSize * 1024 * 1024;
  const currentImages: NormalizedImage[] = watch(name) || [];

  // Cloudinary hook (only when needed)
  const cloudinaryUpload = useCloudinaryUpload({
    folder,
    tags,
    onSuccess: (result: CloudinaryUploadResult) => {
      // Get current images and add the new one
      const currentImagesData = watch(name) || [];
      const cloudinaryData = {
        id: result.public_id,
        url: result.secure_url,
        publicId: result.public_id,
        size: result.bytes,
        type: `${result.resource_type}/${result.format}`,
        name: result.original_filename,
        isUploaded: true,
      };
      const updatedImages = [...currentImagesData, cloudinaryData];

      setValue(name, updatedImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    onBatchComplete: (results) => {
      // This gets called when all files in a batch are done
      console.log("All files uploaded:", results);
      onUploadComplete?.(watch(name) || []);
    },
    onError: onUploadError,
  });

  // Local file processing
  const processLocalFiles = async (files: File[]) => {
    setIsLocalProcessing(true);
    setLocalError(null);

    try {
      const newImages: NormalizedImage[] = await Promise.all(
        files.map(async (file) => normalizeFromFile(file))
      );

      const updatedImages = [...currentImages, ...newImages];
      setValue(name, updatedImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
      onFilesSelected?.(files);
      onUploadComplete?.(updatedImages);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error processing files";
      setLocalError(errorMessage);
      onUploadError?.({ message: errorMessage });
    } finally {
      setIsLocalProcessing(false);
    }
  };

  // Unified file handler
  const handleFiles = async (files: File[]) => {
    const remainingSlots = maxFiles - currentImages.length;
    if (remainingSlots <= 0) {
      const errorMsg = `Maximum ${maxFiles} files allowed`;
      setLocalError(errorMsg);
      onUploadError?.({ message: errorMsg });
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);

    // Validate files
    for (const file of filesToProcess) {
      const validationError = validateFile(
        file,
        acceptedFileTypes,
        maxFileSizeBytes
      );
      if (validationError) {
        setLocalError(validationError);
        onUploadError?.({ message: validationError });
        return;
      }
    }

    // Route to appropriate handler
    if (useCloudinary) {
      try {
        if (filesToProcess.length === 1) {
          await cloudinaryUpload.uploadFile(filesToProcess[0]);
        } else {
          await cloudinaryUpload.uploadMultiple(filesToProcess);
        }
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
      }
    } else {
      await processLocalFiles(filesToProcess);
    }
  };

  // Event handlers
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      acceptedFileTypes.some((type) => {
        if (type.includes("*")) {
          return file.type.startsWith(type.replace("*", ""));
        }
        return file.type === type;
      })
    );
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragActive(false);
    }
  };

  const handleRemove = (index: number) => {
    const updated = currentImages.filter((_, i) => i !== index);
    setValue(name, updated, { shouldValidate: true, shouldDirty: true });
    onUploadComplete?.(updated);
  };

  const clearError = () => {
    setLocalError(null);
    cloudinaryUpload?.reset();
  };

  // Determine current state
  const isUploading = useCloudinary
    ? cloudinaryUpload.isUploading
    : isLocalProcessing;

  const uploadProgress = useCloudinary ? cloudinaryUpload.progress || 0 : 0;

  const uploadError = useCloudinary
    ? cloudinaryUpload.error
    : localError
    ? { message: localError }
    : null;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={cn("space-y-3", className)}>
          <FormLabel>{label}</FormLabel>

          {description && (
            <FormDescription className="text-sm text-muted-foreground">
              {description}
            </FormDescription>
          )}

          <FormControl>
            <div className="space-y-4">
              {/* Upload Zone */}
              {currentImages.length < maxFiles && !isUploading && (
                <UploadZone
                  dragActive={dragActive}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onFileSelect={handleUpload}
                  acceptedFileTypes={acceptedFileTypes}
                  multiple={multiple}
                  maxFiles={maxFiles}
                  maxFileSize={maxFileSize}
                />
              )}

              {/* Progress & Error Display */}
              <UploadProgress
                isUploading={!!isUploading}
                progress={uploadProgress}
                error={
                  uploadError || (deleteError ? { message: deleteError } : null)
                }
                onRetry={() => {
                  clearError();
                  setDeleteError(null);
                }}
                useCloudinary={useCloudinary}
              />

              {/* Image Grid */}
              <ImageGrid
                images={currentImages}
                onRemove={handleRemove}
                maxFiles={maxFiles}
                showFileDetails={showFileDetails}
                transformations={transformations}
                useCloudinary={useCloudinary}
                onDeleteError={setDeleteError}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Usage Examples:
/*
// Basic usage with form
<ImageUploader
  name="taskImages"
  label="Task Images"
  description="Upload images that show what needs to be done"
  multiple={true}
  limit={5}
/>

// Advanced usage with Cloudinary features
<ImageUploader
  name="profileImages"
  label="Profile Photos"
  multiple={false}
  limit={1}
  folder="user-profiles"
  tags={["profile", "avatar"]}
  transformations={{ width: 400, height: 400, crop: "fill", gravity: "face" }}
  maxFileSize={2}
  showFileDetails={true}
  onUploadComplete={(results) => {
    console.log("Upload completed:", results);
  }}
  onUploadError={(error) => {
    toast.error(`Upload failed: ${error.message}`);
  }}
/>

// Gallery uploader
<ImageUploader
  name="galleryImages"
  label="Gallery Images"
  description="Upload multiple images for your gallery"
  multiple={true}
  limit={10}
  folder="gallery"
  tags={["gallery", "showcase"]}
  acceptedFileTypes={["image/jpeg", "image/png", "image/webp"]}
  imagePreview="cloudinary"
  showProgress={true}
  showFileDetails={true}
/>
*/
