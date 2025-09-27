import React from "react";
import {
  X,
  File,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatFileSize, truncate } from "@/utils";
import { cn } from "@/lib/utils";

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return ImageIcon;
  if (fileType.startsWith("video/")) return Video;
  if (fileType.startsWith("audio/")) return Music;
  if (fileType.includes("pdf") || fileType.includes("document"))
    return FileText;
  return File;
};

export const FilePreview = ({
  file,
  onRemove,
  className,
}: {
  file: File;
  onRemove: () => void;
  className?: string;
}) => {
  const isImage = file.type.startsWith("image/");
  const FileIcon = getFileIcon(file.type);
  const fileUrl = URL.createObjectURL(file);

  // Clean up URL when component unmounts
  React.useEffect(() => {
    return () => URL.revokeObjectURL(fileUrl);
  }, [fileUrl]);

  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all hover:border-neutral-300 hover:shadow-md",
        "w-32 flex-shrink-0", // Fixed width to prevent text cutoff
        className
      )}
    >
      {/* Remove Button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 w-6 h-6 p-0 bg-neutral-900/80 hover:bg-white text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </Button>

      {/* File Content */}
      {isImage ? (
        <div className="aspect-square w-full relative bg-neutral-100">
          <Image
            src={fileUrl}
            alt={file.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      ) : (
        <div className="aspect-square w-full flex flex-col items-center justify-center p-4 bg-neutral-50">
          <FileIcon className="w-8 h-8 text-text-muted mb-2" />
          <span className="text-xs text-center text-text-secondary font-medium leading-tight">
            {truncate(file.name, 12)}
          </span>
        </div>
      )}

      {/* File Info - Fixed layout */}
      <div className="p-3 bg-white border-t border-neutral-100 space-y-1">
        <p
          className="text-xs font-medium text-text-primary truncate"
          title={file.name}
        >
          {truncate(file.name, 18)}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted font-medium">
            {formatFileSize(file.size)}
          </p>
          {/* File type indicator */}
          <span className="text-xs text-text-muted bg-neutral-100 px-1.5 py-0.5 rounded uppercase">
            {file.type.split("/")[1]?.slice(0, 3) || "file"}
          </span>
        </div>
      </div>
    </div>
  );
};
