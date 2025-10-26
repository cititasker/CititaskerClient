import React from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import { Paperclip, ExternalLink, Image, Download } from "lucide-react";

interface CommentContentProps {
  comment: CommentThreadT; // Your existing comment type
  level: number;
}

export const CommentContent: React.FC<CommentContentProps> = ({
  comment,
  level,
}) => {
  const getFileTypeFromUrl = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();

    if (!extension) return "file";

    // Image types
    if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(extension))
      return "image";
    // Video types
    if (["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"].includes(extension))
      return "video";
    // Audio types
    if (["mp3", "wav", "ogg", "aac", "flac", "m4a"].includes(extension))
      return "audio";
    // Document types
    if (["pdf", "doc", "docx", "txt", "rtf"].includes(extension))
      return "document";
    // Spreadsheet types
    if (["xls", "xlsx", "csv"].includes(extension)) return "spreadsheet";
    // Archive types
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) return "archive";

    return "file";
  };

  const getFileIcon = (url: string) => {
    const type = getFileTypeFromUrl(url);

    switch (type) {
      case "image":
        return <Image className="w-4 h-4" />;
      case "video":
        return <span className="text-sm">🎥</span>;
      case "audio":
        return <span className="text-sm">🎵</span>;
      case "document":
        return <span className="text-sm">📄</span>;
      case "spreadsheet":
        return <span className="text-sm">📊</span>;
      case "archive":
        return <span className="text-sm">🗜️</span>;
      default:
        return <Paperclip className="w-4 h-4" />;
    }
  };

  const getFileName = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split("/").pop() || "Attachment";
      return decodeURIComponent(fileName);
    } catch {
      // If URL parsing fails, try to extract filename from the end
      const parts = url.split("/");
      return parts[parts.length - 1] || "Attachment";
    }
  };

  const isImageFile = (url: string): boolean => {
    return getFileTypeFromUrl(url) === "image";
  };

  const isRootComment = level === 0;

  return (
    <div
      className={cn(
        "group relative transition-all duration-300 ease-in-out",
        "rounded-2xl rounded-tl-none shadow-sm",
        "border border-transparent hover:border-primary/20",
        isRootComment
          ? "bg-gradient-to-br from-primary-50 to-primary-100/80 text-primary-900"
          : "bg-background hover:bg-gray-50/50 text-gray-800 border-gray-100"
      )}
    >
      {/* Content */}
      <div className="p-4 sm:p-5">
        {comment.content && (
          <div
            className={cn(
              "text-sm sm:text-base leading-relaxed prose prose-sm max-w-none",
              "prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2",
              "prose-li:my-0.5 prose-blockquote:my-3 prose-code:text-xs",
              "prose-pre:text-xs prose-pre:max-w-full prose-pre:overflow-x-auto",
              isRootComment
                ? "prose-primary text-primary-900"
                : "prose-gray text-gray-800",
              // Enhanced prose styling
              "prose-headings:font-semibold prose-strong:font-semibold",
              "prose-a:text-primary-600 hover:prose-a:text-primary-700",
              "prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
              "prose-blockquote:border-l-primary-300 prose-blockquote:pl-4"
            )}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment.content, {
                ADD_ATTR: ["target"], // Allow target="_blank" for links
              }),
            }}
          />
        )}

        {/* Attachments */}
        {comment.files && comment.files.length > 0 && (
          <div
            className={cn(
              "mt-4 pt-4",
              comment.content && "border-t border-gray-200/60"
            )}
          >
            <div className="flex flex-wrap gap-2">
              {comment.files.map((fileUrl, index) => {
                const fileName = getFileName(fileUrl);
                const isImage = isImageFile(fileUrl);

                return (
                  <div
                    key={index}
                    className={cn(
                      "group/file flex items-center gap-2 px-3 py-2 rounded-lg",
                      "text-xs sm:text-sm font-medium transition-all duration-200",
                      "border border-gray-200 hover:border-primary-300",
                      "bg-white hover:bg-primary-50",
                      "cursor-pointer hover:shadow-sm",
                      "min-w-0 max-w-full sm:max-w-xs"
                    )}
                    onClick={() => window.open(fileUrl, "_blank")}
                  >
                    {/* File Icon */}
                    <div className="flex-shrink-0 text-primary-600">
                      {getFileIcon(fileUrl)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-gray-900 group-hover/file:text-primary-900">
                        {fileName}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {getFileTypeFromUrl(fileUrl)} file
                      </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover/file:opacity-100 transition-opacity">
                      <ExternalLink className="w-3 h-3 text-gray-400 hover:text-primary-600" />
                      <Download
                        className="w-3 h-3 text-gray-400 hover:text-primary-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Create a temporary link to trigger download
                          const link = document.createElement("a");
                          link.href = fileUrl;
                          link.download = fileName;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image Preview Row for Image Files */}
            {comment.files.some((url) => isImageFile(url)) && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {comment.files
                  .filter((url) => isImageFile(url))
                  .slice(0, 4) // Show max 4 image previews
                  .map((imageUrl, index) => (
                    <div
                      key={`preview-${index}`}
                      className="flex-shrink-0 cursor-pointer group relative"
                      onClick={() => window.open(imageUrl, "_blank")}
                    >
                      <img
                        src={imageUrl}
                        alt={`Attachment ${index + 1}`}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200 group-hover:border-primary-300 transition-colors"
                        loading="lazy"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))}

                {/* Show count if more than 4 images */}
                {comment.files.filter((url) => isImageFile(url)).length > 4 && (
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-medium">
                      +
                      {comment.files.filter((url) => isImageFile(url)).length -
                        4}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Attachment count for mobile */}
            {comment.files.length > 2 && (
              <div className="mt-2 text-xs text-gray-500 sm:hidden">
                {comment.files.length} attachments
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle accent line for root comments */}
      {isRootComment && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-400 to-primary-600 rounded-l-2xl" />
      )}
    </div>
  );
};
