// utils/fileHelpers.ts
// Utility functions for handling file operations without storing File objects in Redux

export interface SerializableImage {
  src: string; // base64 data URL
  name: string;
  new: boolean;
}

/**
 * Convert base64 string back to File object when needed for form submission
 */
export const base64ToFile = (
  dataURL: string,
  filename: string = "image"
): File => {
  const arr = dataURL.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

/**
 * Convert File to base64 string for storage in Redux
 */
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validate image file
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return validTypes.includes(file.type) && file.size <= maxSize;
};

/**
 * Convert serializable images to FormData for API submission
 */
export const imagesToFormData = (
  images: SerializableImage[],
  formData: FormData
): void => {
  images?.forEach((img, index) => {
    if (img.new && img.src) {
      try {
        const file = base64ToFile(img.src, img.name || `image-${index}.jpg`);
        formData.append("images[]", file);
      } catch (error) {
        console.warn(`Failed to convert image ${index} to file:`, error);
      }
    }
  });
};

/**
 * Get file extension from base64 data URL
 */
export const getFileExtensionFromBase64 = (base64: string): string => {
  const match = base64.match(/data:image\/([a-zA-Z]*);base64/);
  return match ? match[1] : "jpg";
};
