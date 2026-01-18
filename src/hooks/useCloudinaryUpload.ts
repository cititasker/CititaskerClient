import { useState, useCallback } from "react";
import {
  uploadToCloudinaryClient,
  CloudinaryUploadError,
  CloudinaryUploadResult,
} from "@/lib/cloudinary-upload-client";

interface UseCloudinaryUploadOptions {
  folder?: string;
  tags?: string[];
  onSuccess?: (result: any) => void;
  onError?: (error: CloudinaryUploadError) => void;
  onBatchComplete?: (results: any[]) => void; // New callback for multiple uploads
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: CloudinaryUploadError | null;
  result: CloudinaryUploadResult | null;
  uploadedFiles: CloudinaryUploadResult[]; // Track all uploaded files
}

export const useCloudinaryUpload = (
  options: UseCloudinaryUploadOptions = {}
) => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    result: null,
    uploadedFiles: [],
  });

  const uploadFile = useCallback(
    async (file: File) => {
      setState((prev) => ({
        ...prev,
        isUploading: true,
        progress: 0,
        error: null,
        result: null,
      }));

      try {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setState((prev) => ({
            ...prev,
            progress: Math.min(prev.progress + 10, 90),
          }));
        }, 200);

        const result = await uploadToCloudinaryClient(file, {
          folder: options.folder,
          tags: options.tags,
        });

        clearInterval(progressInterval);

        setState((prev) => ({
          ...prev,
          isUploading: false,
          progress: 100,
          result,
          uploadedFiles: [...prev.uploadedFiles, result],
        }));

        options.onSuccess?.(result);
        return result;
      } catch (error) {
        const uploadError = error as CloudinaryUploadError;
        setState((prev) => ({
          ...prev,
          isUploading: false,
          progress: 0,
          error: uploadError,
        }));

        options.onError?.(uploadError);
        throw uploadError;
      }
    },
    [options]
  );

  // Fixed uploadMultiple function
  const uploadMultiple = useCallback(
    async (files: File[]) => {
      setState((prev) => ({
        ...prev,
        isUploading: true,
        progress: 0,
        error: null,
        uploadedFiles: [],
      }));

      const results: any[] = [];
      let completedCount = 0;

      try {
        // Upload files sequentially to avoid overwhelming the server
        for (const file of files) {
          try {
            const result = await uploadToCloudinaryClient(file, {
              folder: options.folder,
              tags: options.tags,
            });

            results.push(result);
            completedCount++;

            // Update progress based on completed files
            const progress = (completedCount / files.length) * 100;

            setState((prev) => ({
              ...prev,
              progress,
              uploadedFiles: [...prev.uploadedFiles, result],
            }));

            // Call individual success callback for each file
            options.onSuccess?.(result);
          } catch (error) {
            const uploadError = error as CloudinaryUploadError;
            setState((prev) => ({
              ...prev,
              isUploading: false,
              error: uploadError,
            }));
            options.onError?.(uploadError);
            throw uploadError;
          }
        }

        // All files uploaded successfully
        setState((prev) => ({
          ...prev,
          isUploading: false,
          progress: 100,
        }));

        // Call batch complete callback
        options.onBatchComplete?.(results);

        return results;
      } catch (error) {
        // Error already handled in the loop
        throw error;
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      error: null,
      result: null,
      uploadedFiles: [],
    });
  }, []);

  return {
    ...state,
    uploadFile,
    uploadMultiple,
    reset,
  };
};
