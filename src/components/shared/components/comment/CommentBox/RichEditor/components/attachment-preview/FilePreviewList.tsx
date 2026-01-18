"use client";

import React from "react";
import { FilePreview } from "./FilePreview";

interface FilePreviewListProps {
  attachments: File[];
  onRemove: (index: number) => void;
}

const FilePreviewList: React.FC<FilePreviewListProps> = ({
  attachments,
  onRemove,
}) => {
  if (attachments.length === 0) return null;

  return (
    <div className="mt-3 mb-2">
      {/* Horizontal scrollable container for multiple files */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {attachments.map((file, index) => (
          <FilePreview
            key={`${file.name}-${index}-${file.lastModified}`}
            file={file}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>

      {/* File count indicator for multiple files */}
      {attachments.length > 1 && (
        <div className="mt-2 text-xs text-text-muted">
          {attachments.length} file{attachments.length !== 1 ? "s" : ""}{" "}
          attached
        </div>
      )}
    </div>
  );
};

export default FilePreviewList;
