import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import {
  NormalizedImage,
  calculateTotalSize,
} from "@/lib/image-uploader-utils";
import { useCloudinaryDelete } from "@/hooks/useCloudinaryDelete";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";
import { CloudinaryImage } from "@/components/images/CloudinaryImage";

interface ImageGridProps {
  images: NormalizedImage[];
  onRemove: (index: number) => void;
  maxFiles: number;
  showFileDetails?: boolean;
  transformations?: Record<string, any>;
  useCloudinary?: boolean;
  onDeleteError?: (error: string) => void;
  onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  isUploading?: boolean;

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
}

export function ImageGrid({
  images,
  onRemove,
  maxFiles,
  showFileDetails = false,
  transformations = {},
  useCloudinary = false,
  onDeleteError,
  onFileSelect,
  acceptedFileTypes,
  multiple,
  isUploading = false,

  // Grid Customization
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

    if (useCloudinary && image?.publicId && image.isUploaded) {
      setDeletingIndex(index);
      await deleteImage(image.publicId);
    } else {
      onRemove(index);
    }
  };

  const canAddMore = images.length < maxFiles;
  const reversedImages = [...images].reverse();

  // Responsive grid column builder
  const buildGridCols = () => {
    const classes: string[] = [];

    if (gridCols.base) classes.push(`grid-cols-${gridCols.base}`);
    if (gridCols.sm) classes.push(`sm:grid-cols-${gridCols.sm}`);
    if (gridCols.md) classes.push(`md:grid-cols-${gridCols.md}`);
    if (gridCols.lg) classes.push(`lg:grid-cols-${gridCols.lg}`);
    if (gridCols.xl) classes.push(`xl:grid-cols-${gridCols.xl}`);
    if (gridCols["2xl"]) classes.push(`2xl:grid-cols-${gridCols["2xl"]}`);

    return classes.join(" ");
  };

  // Gap classes
  const gapClasses = {
    sm: "gap-1.5 sm:gap-2",
    md: "gap-2 sm:gap-3",
    lg: "gap-3 sm:gap-4",
    xl: "gap-4 sm:gap-6",
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "aspect-auto",
  };

  // Border radius classes
  const borderRadiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  // Icon size classes (responsive)
  const iconSizeClasses = {
    sm: "w-4 h-4 sm:w-5 sm:h-5",
    md: "w-5 h-5 sm:w-6 sm:h-6",
    lg: "w-6 h-6 sm:w-8 sm:h-8",
  };

  // Remove button size classes (responsive)
  const removeButtonSizeClasses = {
    sm: "p-0.5 sm:p-1",
    md: "p-1 sm:p-1.5",
    lg: "p-1.5 sm:p-2",
  };

  // Remove button icon size (responsive)
  const removeButtonIconSizeClasses = {
    sm: "w-3 h-3 sm:w-3.5 sm:h-3.5",
    md: "w-3.5 h-3.5 sm:w-4 sm:h-4",
    lg: "w-4 h-4 sm:w-5 sm:h-5",
  };

  // Remove button shape classes
  const removeButtonShapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-md",
  };

  // Remove button position classes (responsive)
  const removeButtonPositionClasses = {
    "top-left": "top-1 left-1 sm:top-2 sm:left-2",
    "top-right": "top-1 right-1 sm:top-2 sm:right-2",
    "bottom-left": "bottom-1 left-1 sm:bottom-2 sm:left-2",
    "bottom-right": "bottom-1 right-1 sm:bottom-2 sm:right-2",
  };

  // Image hover effect classes
  const imageHoverEffectClasses = {
    scale: "group-hover:scale-105",
    zoom: "group-hover:scale-110",
    brightness: "group-hover:brightness-110",
    none: "",
  };

  // Border width mapping
  const borderWidthMap = {
    "0": "border-0",
    "1": "border",
    "2": "border-2",
    "4": "border-4",
  };

  // Stats component
  const StatsComponent = () => {
    if (!showStats) return null;

    if (customStats) {
      return (
        <div className={statsClassName}>{customStats(images, maxFiles)}</div>
      );
    }

    return images.length > 0 ? (
      <div
        className={cn(
          "flex items-center justify-between text-xs sm:text-sm text-muted-foreground pt-2",
          statsClassName
        )}
      >
        <span>
          {images.length} of {maxFiles}{" "}
          {images.length === 1 ? "photo" : "photos"}
        </span>
        {showFileDetails && (
          <span className="hidden sm:inline">
            Total: {calculateTotalSize(images).toFixed(2)}MB
          </span>
        )}
      </div>
    ) : null;
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Stats at top */}
      {statsPosition === "top" && <StatsComponent />}

      {/* Grid Container */}
      <div
        className={cn("grid", buildGridCols(), gapClasses[gap], gridClassName)}
      >
        {/* Upload Box */}
        {canAddMore && !isUploading && showUploadBox && (
          <label
            htmlFor="image-upload"
            className={cn(
              "relative overflow-hidden cursor-pointer group transition-all duration-200",
              aspectRatioClasses[aspectRatio],
              borderRadiusClasses[imageBorderRadius],
              uploadBoxBorderStyle === "dashed" && "border-2 border-dashed",
              uploadBoxBorderStyle === "solid" && "border-2 border-solid",
              uploadBoxBorderStyle === "dotted" && "border-2 border-dotted",
              uploadBoxBorderColor,
              uploadBoxBgColor,
              uploadBoxHoverBgColor,
              "hover:border-primary/50",
              uploadBoxClassName
            )}
          >
            {uploadBoxContent || (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-primary px-2">
                <div
                  className={cn(
                    "p-2 sm:p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors",
                    uploadBoxIcon && "p-0 bg-transparent"
                  )}
                >
                  {uploadBoxIcon || (
                    <Upload className={iconSizeClasses[uploadBoxIconSize]} />
                  )}
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                  {uploadBoxText}
                </span>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={onFileSelect}
              accept={acceptedFileTypes?.join(",")}
              multiple={multiple}
            />
          </label>
        )}

        {/* Loading State */}
        {isUploading && (
          <div
            className={cn(
              "relative overflow-hidden flex flex-col items-center justify-center gap-2",
              aspectRatioClasses[aspectRatio],
              borderRadiusClasses[imageBorderRadius],
              "border-2 border-dashed border-primary/30 bg-primary/5",
              loadingClassName
            )}
          >
            {loadingIcon || (
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-spin" />
            )}
            {loadingText && (
              <span className="text-xs sm:text-sm text-primary text-center px-2">
                {loadingText}
              </span>
            )}
          </div>
        )}

        {/* Image Grid */}
        {reversedImages.map((img, displayIndex) => {
          const actualIndex = images.length - 1 - displayIndex;

          return (
            <div
              key={`${img.id}-${actualIndex}`}
              className={cn(
                "group relative overflow-hidden",
                aspectRatioClasses[aspectRatio],
                borderRadiusClasses[imageBorderRadius],
                borderWidthMap[imageBorderWidth],
                imageBorderColor,
                "bg-background-secondary",
                imageContainerClassName
              )}
            >
              {/* Image Display */}
              {img.publicId && useCloudinary ? (
                <CloudinaryImage
                  publicId={img.publicId}
                  alt={img.name || `Image ${displayIndex + 1}`}
                  width={200}
                  height={200}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-200",
                    imageHoverEffectClasses[imageHoverEffect],
                    imageClassName
                  )}
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
                  className={cn(
                    "object-cover transition-transform duration-200",
                    imageHoverEffectClasses[imageHoverEffect],
                    imageClassName
                  )}
                />
              )}

              {/* Loading overlay for deletion */}
              {deletingIndex === actualIndex && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" />
                </div>
              )}

              {/* Remove Button */}
              {showRemoveButton && (
                <button
                  type="button"
                  onClick={() => handleRemove(actualIndex)}
                  disabled={deletingIndex === actualIndex}
                  className={cn(
                    "absolute z-10 shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95",
                    removeButtonPositionClasses[removeButtonPosition],
                    removeButtonSizeClasses[removeButtonSize],
                    removeButtonShapeClasses[removeButtonShape],
                    removeButtonBgColor,
                    removeButtonHoverBgColor,
                    removeButtonVisibility === "hover" &&
                      "opacity-0 group-hover:opacity-100",
                    removeButtonVisibility === "always" && "opacity-100",
                    deletingIndex === actualIndex &&
                      "opacity-50 cursor-not-allowed",
                    "text-white",
                    removeButtonClassName
                  )}
                >
                  {removeButtonIcon || (
                    <X
                      className={removeButtonIconSizeClasses[removeButtonSize]}
                    />
                  )}
                </button>
              )}

              {/* File Details Overlay */}
              {img.size > 0 && showFileDetails && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1.5 sm:p-2 text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="truncate">{img.name}</p>
                  <p className="hidden sm:block">
                    {`${(img.size / 1024).toFixed(1)}KB • ${img.type
                      ?.split("/")[1]
                      ?.toUpperCase()}`}
                  </p>
                </div>
              )}

              {/* Hover Overlay */}
              {imageOverlayOnHover && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              )}
            </div>
          );
        })}
      </div>

      {/* Stats at bottom */}
      {statsPosition === "bottom" && <StatsComponent />}
    </div>
  );
}
