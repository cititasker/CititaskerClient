/**
 * Helper utilities for managing category images
 */

export const CATEGORY_IMAGES = {
  "ASSEMBLING & INSTALLATION": "/images/categories/installer.png",
  "AUTOMOBILE AND BICYCLE": "/images/categories/auto_services.jpg",
  "TELEPHONE, COMPUTER and IT": "/images/categories/tech.jpg",
  "BUILDING AND CONSTRUCTION": "/images/categories/carpenter.png",
  CLEANING: "/images/categories/cleaner.png",
  "MOVING SERVICE": "/images/categories/moving_services.jpg",
  DELIVERY: "/images/categories/delivery_services.jpg",
  EVENT: "/images/categories/event_services.jpg",
  HANDYMAN: "/images/categories/handyman.jpg",
  "COOKING & CATERING": "/images/categories/catering_services.jpg",
  "INTERIOR DESIGN": "/images/categories/interior_design_services.jpg",
  "FASHION & BEAUTY": "/images/categories/makeup_artist.png",
  "COACHING & TUTORING": "/images/categories/tutor_services.jpg",
  LIFESTYLE: "/images/categories/lifestyle.jpg",
} as const;

export const DEFAULT_CATEGORY_IMAGE = "/images/categories/default.png";

/**
 * Get image path for a category name
 * Falls back to default image if category not found
 */
export function getCategoryImage(categoryName: string): string {
  return (
    CATEGORY_IMAGES[categoryName as keyof typeof CATEGORY_IMAGES] ||
    DEFAULT_CATEGORY_IMAGE
  );
}

/**
 * Get all available category names
 */
export function getAvailableCategoryNames(): string[] {
  return Object.keys(CATEGORY_IMAGES);
}

/**
 * Check if a category has a custom image
 */
export function hasCustomImage(categoryName: string): boolean {
  return categoryName in CATEGORY_IMAGES;
}
