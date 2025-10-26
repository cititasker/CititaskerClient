import React from "react";
import { Plus, X, Image as ImageIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconDropdown } from "@/components/reusables/CustomDropdown";
import { AttachmentOption } from "../../../types";

const attachmentOptions: AttachmentOption[] = [
  {
    id: "gallery",
    label: "Photos & Videos",
    icon: <ImageIcon className="w-5 h-5" />,
    accept: "image/*,video/*",
    type: "image",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    id: "document",
    label: "Document",
    icon: <FileText className="w-5 h-5" />,
    accept: ".pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx,.zip,.rar",
    type: "document",
    color: "bg-blue-500 hover:bg-blue-600",
  },
];

interface AttachmentMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFileSelect: (option: AttachmentOption) => void;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    option: AttachmentOption
  ) => void;
  fileInputRefs: React.MutableRefObject<{
    [key: string]: HTMLInputElement | null;
  }>;
}

export const AttachmentMenu: React.FC<AttachmentMenuProps> = ({
  isOpen,
  onOpenChange,
  onFileSelect,
  onFileChange,
  fileInputRefs,
}) => (
  <div className="flex-shrink-0">
    <IconDropdown
      icon={isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      side="top"
      align="center"
      sideOffset={8}
      className="p-3 h-12 w-12"
      contentClassName="p-3 min-w-[160px]"
      onOpenChange={onOpenChange}
    >
      <div className="grid grid-cols-1 gap-3">
        {attachmentOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onFileSelect(option)}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <div
              className={cn(
                "p-3 rounded-full text-white transition-colors",
                option.color
              )}
            >
              {option.icon}
            </div>
            <span className="text-xs font-medium text-neutral-700 text-center">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </IconDropdown>

    {/* Hidden file inputs */}
    {attachmentOptions.map((option) => (
      <input
        key={option.id}
        ref={(el) => {
          fileInputRefs.current[option.id] = el;
        }}
        type="file"
        accept={option.accept}
        multiple={option.id !== "contact"}
        onChange={(e) => onFileChange(e, option)}
        className="hidden"
        {...(option.id === "camera" && { capture: "environment" })}
      />
    ))}
  </div>
);
