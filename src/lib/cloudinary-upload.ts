import cloudinary from "./cloudinary";

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  original_filename: string;
}

interface UploadOptions {
  folder?: string;
  transformation?: object;
  tags?: string[];
  context?: Record<string, string>;
  overwrite?: boolean;
  resource_type?: "image" | "video" | "raw" | "auto";
}

export class CloudinaryUploadError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "CloudinaryUploadError";
  }
}

// Client-side upload (using upload preset)
export const uploadToCloudinaryClient = async (
  file: File,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> => {
  const { folder = "uploads", tags = [], resource_type = "auto" } = options;

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
    throw new CloudinaryUploadError(
      "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not defined"
    );
  }

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new CloudinaryUploadError(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );
  formData.append("folder", folder);

  if (tags.length > 0) {
    formData.append("tags", tags.join(","));
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new CloudinaryUploadError(
        errorData.error?.message || "Upload failed",
        errorData.error?.code
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CloudinaryUploadError) {
      throw error;
    }
    throw new CloudinaryUploadError("Network error during upload");
  }
};

// Server-side upload (for API routes)
export const uploadToCloudinaryServer = async (
  fileBuffer: Buffer | string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> => {
  const {
    folder = "uploads",
    transformation = {},
    tags = [],
    context = {},
    overwrite = false,
    resource_type = "image",
  } = options;

  try {
    const result = await cloudinary.uploader.upload(fileBuffer as any, {
      folder,
      transformation,
      tags,
      context,
      overwrite,
      resource_type,
      use_filename: true,
      unique_filename: !overwrite,
    });

    return result as CloudinaryUploadResult;
  } catch (error: any) {
    throw new CloudinaryUploadError(
      error.message || "Server upload failed",
      error.http_code
    );
  }
};

// Delete image utility
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    throw new CloudinaryUploadError(
      error.message || "Delete failed",
      error.http_code
    );
  }
};

interface DeleteResult {
  success: boolean;
  message: string;
}

export const deleteCloudinaryImage = async (
  publicId: string
): Promise<DeleteResult> => {
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Delete failed");
    }

    return result;
  } catch (error) {
    console.error("Client delete error:", error);
    throw new Error(error instanceof Error ? error.message : "Delete failed");
  }
};

// Bulk delete utility (optional)
export const deleteBulkCloudinaryImages = async (
  publicIds: string[]
): Promise<DeleteResult[]> => {
  const results = await Promise.allSettled(
    publicIds.map((id) => deleteCloudinaryImage(id))
  );

  return results.map((result, index) => ({
    publicId: publicIds[index],
    success: result.status === "fulfilled",
    message:
      result.status === "fulfilled"
        ? result.value.message
        : result.reason?.message || "Delete failed",
  }));
};
