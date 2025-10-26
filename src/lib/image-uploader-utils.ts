import { convertToBase64 } from "@/app/post-task/utils/fileHelpers";

export interface NormalizedImage {
  id: string;
  url: string;
  file?: File;
  publicId?: string;
  isUploaded: boolean;
  size: number;
  type: string;
  name: string;
}

export async function normalizeFromFile(file: File): Promise<NormalizedImage> {
  return {
    id: crypto.randomUUID(),
    url: (await convertToBase64(file)) as string,
    file,
    isUploaded: false,
    size: file.size,
    type: file.type,
    name: file.name,
  };
}

export function normalizeFromCloudinaryUrl(url: string): NormalizedImage {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
  const publicId = match ? match[1] : crypto.randomUUID();

  return {
    id: publicId,
    url,
    publicId,
    isUploaded: true,
    size: 0,
    type: "image/jpeg",
    name: publicId.split("/").pop() || "existing_image",
  };
}

export const validateFile = (
  file: File,
  acceptedTypes: string[],
  maxSize: number
): string | null => {
  const isValidType = acceptedTypes.some((type) => {
    if (type.includes("*")) {
      return file.type.startsWith(type.replace("*", ""));
    }
    return file.type === type;
  });

  if (!isValidType) {
    return `File type ${file.type} is not supported`;
  }

  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / 1024 / 1024}MB`;
  }

  return null;
};

export const calculateTotalSize = (images: NormalizedImage[]): number => {
  return images.reduce((acc, img) => acc + img.size, 0) / 1024 / 1024;
};
