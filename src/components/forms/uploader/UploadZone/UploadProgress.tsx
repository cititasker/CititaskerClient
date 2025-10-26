import { Loader2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
  error: { message: string } | null | undefined;
  onRetry: () => void;
  useCloudinary?: boolean;
}

export function UploadProgress({
  isUploading,
  progress,
  error,
  onRetry,
  useCloudinary = false,
}: UploadProgressProps) {
  if (isUploading) {
    return (
      <div className="p-4 border border-border-light rounded-xl bg-background-secondary space-y-3">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <div>
            <p className="text-sm font-medium">Processing images...</p>
            <p className="text-xs text-muted-foreground">
              Please wait while we process your files
            </p>
          </div>
        </div>
        {useCloudinary && <Progress value={progress} />}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">
            {useCloudinary ? "Upload Error" : "Processing Error"}
          </p>
          <p className="text-xs text-red-600">{error.message}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-red-600 hover:text-red-700 mt-1 p-0 h-auto"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
