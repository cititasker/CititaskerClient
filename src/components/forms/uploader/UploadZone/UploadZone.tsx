import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  dragActive: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFileTypes: string[];
  multiple: boolean;
  maxFiles: number;
  maxFileSize: number;
}

export function UploadZone({
  dragActive,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  acceptedFileTypes,
  multiple,
  maxFiles,
  maxFileSize,
}: UploadZoneProps) {
  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer",
        dragActive ? "border-primary bg-primary-50" : "border-border-light",
        "hover:bg-background-secondary hover:border-border-medium"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept={acceptedFileTypes.join(",")}
        multiple={multiple}
        onChange={onFileSelect}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div className="text-center space-y-3">
        <div
          className={cn(
            "p-3 rounded-full mx-auto w-fit transition-colors",
            dragActive
              ? "bg-primary text-white"
              : "bg-background-secondary text-muted-foreground"
          )}
        >
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <p className="font-medium text-text-primary">
            {dragActive
              ? "Drop images here"
              : multiple
              ? "Select Files"
              : "Select File"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Max {maxFiles} file(s) • {maxFileSize}MB each
          </p>
          <p className="text-xs text-muted-foreground">
            {acceptedFileTypes
              .map((type) => type.split("/")[1].toUpperCase())
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
