import { deleteCloudinaryImage } from "@/lib/cloudinary-upload";
import { useState, useCallback } from "react";

interface UseCloudinaryDeleteOptions {
  onSuccess?: (publicId: string) => void;
  onError?: (error: string) => void;
}

export const useCloudinaryDelete = (
  options: UseCloudinaryDeleteOptions = {}
) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteImage = useCallback(
    async (publicId: string) => {
      setIsDeleting(true);
      setError(null);

      try {
        await deleteCloudinaryImage(publicId);
        options.onSuccess?.(publicId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Delete failed";
        setError(errorMessage);
        options.onError?.(errorMessage);
      } finally {
        setIsDeleting(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    deleteImage,
    isDeleting,
    error,
    reset,
  };
};
