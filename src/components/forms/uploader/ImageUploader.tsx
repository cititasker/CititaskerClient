"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";
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

  // Grid Customization
  gridClassName?: string;
  gridCols?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: "sm" | "md" | "lg" | "xl";
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";

  // Upload Box Customization
  uploadBoxClassName?: string;
  uploadBoxContent?: ReactNode;
  uploadBoxIcon?: ReactNode;
  uploadBoxText?: string;
  uploadBoxBorderStyle?: "dashed" | "solid" | "dotted";
  uploadBoxBorderColor?: string;
  uploadBoxBgColor?: string;
  uploadBoxHoverBgColor?: string;
  uploadBoxIconSize?: "sm" | "md" | "lg";
  showUploadBox?: boolean;

  // Image Item Customization
  imageClassName?: string;
  imageContainerClassName?: string;
  imageBorderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  imageBorderWidth?: "0" | "1" | "2" | "4";
  imageBorderColor?: string;
  imageHoverEffect?: "scale" | "zoom" | "brightness" | "none";
  imageOverlayOnHover?: boolean;

  // Remove Button Customization
  removeButtonClassName?: string;
  removeButtonPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  removeButtonSize?: "sm" | "md" | "lg";
  removeButtonIcon?: ReactNode;
  removeButtonBgColor?: string;
  removeButtonHoverBgColor?: string;
  removeButtonShape?: "circle" | "square" | "rounded";
  showRemoveButton?: boolean;
  removeButtonVisibility?: "always" | "hover";

  // Loading State Customization
  loadingClassName?: string;
  loadingIcon?: ReactNode;
  loadingText?: string;

  // Stats Customization
  showStats?: boolean;
  statsClassName?: string;
  statsPosition?: "top" | "bottom";
  customStats?: (images: NormalizedImage[], maxFiles: number) => ReactNode;

  // Progress Customization
  showProgress?: boolean;
  progressClassName?: string;
}

export default function ImageUploader({
  name,
  label = "Add Photos",
  description,
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

  // Grid Customization (with responsive defaults)
  gridClassName,
  gridCols = { base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 },
  gap = "md",
  aspectRatio = "square",

  // Upload Box Customization
  uploadBoxClassName,
  uploadBoxContent,
  uploadBoxIcon,
  uploadBoxText = "Add Photo",
  uploadBoxBorderStyle = "dashed",
  uploadBoxBorderColor = "border-primary/30",
  uploadBoxBgColor = "bg-primary/5",
  uploadBoxHoverBgColor = "hover:bg-primary/10",
  uploadBoxIconSize = "md",
  showUploadBox = true,

  // Image Item Customization
  imageClassName,
  imageContainerClassName,
  imageBorderRadius = "xl",
  imageBorderWidth = "1",
  imageBorderColor = "border-border-light",
  imageHoverEffect = "scale",
  imageOverlayOnHover = true,

  // Remove Button Customization
  removeButtonClassName,
  removeButtonPosition = "top-right",
  removeButtonSize = "md",
  removeButtonIcon,
  removeButtonBgColor = "bg-black/60",
  removeButtonHoverBgColor = "hover:bg-black/80",
  removeButtonShape = "circle",
  showRemoveButton = true,
  removeButtonVisibility = "hover",

  // Loading State Customization
  loadingClassName,
  loadingIcon,
  loadingText,

  // Stats Customization
  showStats = true,
  statsClassName,
  statsPosition = "bottom",
  customStats,

  // Progress Customization
  showProgress = false,
  progressClassName,
}: ImageUploaderProps) {
  const { control, setValue, watch } = useFormContext();
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLocalProcessing, setIsLocalProcessing] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const maxFiles = multiple ? limit : 1;
  const maxFileSizeBytes = maxFileSize * 1024 * 1024;
  const currentImages: NormalizedImage[] = watch(name) || [];

  // Cloudinary hook
  const cloudinaryUpload = useCloudinaryUpload({
    folder,
    tags,
    onSuccess: (result: CloudinaryUploadResult) => {
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
        <FormItem className={cn("space-y-1", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          {description && (
            <FormDescription className="text-sm text-muted-foreground">
              {description}
            </FormDescription>
          )}

          <FormControl>
            <div className="space-y-4">
              {/* Progress & Error Display */}
              {showProgress && (
                <UploadProgress
                  isUploading={!!isUploading}
                  progress={uploadProgress}
                  error={
                    uploadError ||
                    (deleteError ? { message: deleteError } : null)
                  }
                  onRetry={() => {
                    clearError();
                    setDeleteError(null);
                  }}
                  useCloudinary={useCloudinary}
                  className={progressClassName}
                />
              )}

              {/* Image Grid with Upload Box */}
              <ImageGrid
                images={currentImages}
                onRemove={handleRemove}
                maxFiles={maxFiles}
                showFileDetails={showFileDetails}
                transformations={transformations}
                useCloudinary={useCloudinary}
                onDeleteError={setDeleteError}
                onFileSelect={handleUpload}
                acceptedFileTypes={acceptedFileTypes}
                multiple={multiple}
                isUploading={isUploading}
                // Grid props
                gridClassName={gridClassName}
                gridCols={gridCols}
                gap={gap}
                aspectRatio={aspectRatio}
                // Upload box props
                uploadBoxClassName={uploadBoxClassName}
                uploadBoxContent={uploadBoxContent}
                uploadBoxIcon={uploadBoxIcon}
                uploadBoxText={uploadBoxText}
                uploadBoxBorderStyle={uploadBoxBorderStyle}
                uploadBoxBorderColor={uploadBoxBorderColor}
                uploadBoxBgColor={uploadBoxBgColor}
                uploadBoxHoverBgColor={uploadBoxHoverBgColor}
                uploadBoxIconSize={uploadBoxIconSize}
                showUploadBox={showUploadBox}
                // Image props
                imageClassName={imageClassName}
                imageContainerClassName={imageContainerClassName}
                imageBorderRadius={imageBorderRadius}
                imageBorderWidth={imageBorderWidth}
                imageBorderColor={imageBorderColor}
                imageHoverEffect={imageHoverEffect}
                imageOverlayOnHover={imageOverlayOnHover}
                // Remove button props
                removeButtonClassName={removeButtonClassName}
                removeButtonPosition={removeButtonPosition}
                removeButtonSize={removeButtonSize}
                removeButtonIcon={removeButtonIcon}
                removeButtonBgColor={removeButtonBgColor}
                removeButtonHoverBgColor={removeButtonHoverBgColor}
                removeButtonShape={removeButtonShape}
                showRemoveButton={showRemoveButton}
                removeButtonVisibility={removeButtonVisibility}
                // Loading props
                loadingClassName={loadingClassName}
                loadingIcon={loadingIcon}
                loadingText={loadingText}
                // Stats props
                showStats={showStats}
                statsClassName={statsClassName}
                statsPosition={statsPosition}
                customStats={customStats}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
