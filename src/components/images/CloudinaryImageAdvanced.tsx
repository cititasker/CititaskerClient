"use client";

import { CloudinaryImage } from "./CloudinaryImage";

interface ImagePreset {
  width: number;
  height: number;
  crop?: string;
  gravity?: string;
  quality?: string | number;
  format?: string;
}

const IMAGE_PRESETS: Record<string, ImagePreset> = {
  avatar: {
    width: 150,
    height: 150,
    crop: "fill",
    gravity: "face",
    quality: "auto",
    format: "auto",
  },
  thumbnail: {
    width: 300,
    height: 200,
    crop: "fill",
    quality: "auto",
    format: "auto",
  },
  card: {
    width: 400,
    height: 250,
    crop: "fill",
    quality: "auto",
    format: "auto",
  },
  hero: {
    width: 1200,
    height: 600,
    crop: "fill",
    quality: "auto",
    format: "auto",
  },
  gallery: {
    width: 800,
    height: 600,
    crop: "fill",
    quality: "auto",
    format: "auto",
  },
};

interface CloudinaryImageAdvancedProps {
  publicId: string;
  alt: string;
  preset?: keyof typeof IMAGE_PRESETS;
  customTransformations?: Record<string, any>;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function CloudinaryImageAdvanced({
  publicId,
  alt,
  preset,
  customTransformations = {},
  className,
  containerClassName,
  priority = false,
}: CloudinaryImageAdvancedProps) {
  const presetConfig = preset ? IMAGE_PRESETS[preset] : {};

  const transformations = {
    ...presetConfig,
    ...customTransformations,
  };

  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      className={className}
      containerClassName={containerClassName}
      priority={priority}
      {...transformations}
    />
  );
}
