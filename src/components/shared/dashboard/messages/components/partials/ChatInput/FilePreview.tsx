import React from "react";
import { X, Play, User, FileText, Mic } from "lucide-react";
import type { FilePreview as FilePreviewType } from "../../../types";

interface FilePreviewProps {
  preview: FilePreviewType;
  onRemove: (id: string) => void;
  recordingTime?: number;
  formatTime?: (seconds: number) => string;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  preview,
  onRemove,
  recordingTime = 0,
  formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`,
}) => {
  const RemoveButton = () => (
    <button
      onClick={() => onRemove(preview.id)}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
    >
      <X className="w-3 h-3" />
    </button>
  );

  if (preview.type === "image" && preview.url) {
    return (
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-200">
          <img
            src={preview.url}
            alt={preview.name}
            className="w-full h-full object-cover"
          />
        </div>
        <RemoveButton />
      </div>
    );
  }

  if (preview.type === "video" && preview.url) {
    return (
      <div className="relative flex-shrink-0">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-200">
          <video
            src={preview.url}
            className="w-full h-full object-cover"
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
        </div>
        <RemoveButton />
      </div>
    );
  }

  if (preview.type === "document" || preview.type === "contact") {
    return (
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-lg bg-blue-100 flex flex-col items-center justify-center p-2">
          {preview.type === "contact" ? (
            <User className="w-6 h-6 text-blue-600 mb-1" />
          ) : (
            <FileText className="w-6 h-6 text-blue-600 mb-1" />
          )}
          <span className="text-xs text-blue-800 text-center truncate w-full">
            {preview.name}
          </span>
        </div>
        <RemoveButton />
      </div>
    );
  }

  if (preview.type === "audio") {
    return (
      <div className="relative flex-shrink-0">
        <div className="w-32 h-20 rounded-lg bg-green-100 flex items-center justify-center p-2">
          <div className="text-center">
            <Mic className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <span className="text-xs text-green-800">
              Voice {formatTime(recordingTime)}
            </span>
          </div>
        </div>
        <RemoveButton />
      </div>
    );
  }

  return null;
};
