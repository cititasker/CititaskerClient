import React from "react";
import {
  Bold,
  Italic,
  Code,
  Paperclip,
  Link as LinkIcon,
  Send,
} from "lucide-react";
import dynamic from "next/dynamic";
import ToolbarButton from "./ToolbarButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EmojiDropdown = dynamic(() => import("./EmojiDropdown"), {
  loading: () => (
    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-neutral-100 rounded animate-pulse" />
  ),
  ssr: false,
});

interface EditorToolbarProps {
  editor: any;
  onSubmit: () => void;
  canSend: boolean;
  isLoading: boolean;
  compact?: boolean;
  handleFileUpload: () => void;
  insertEmoji: (emoji: any) => void;
  setIsEmojiPickerOpen: (open: boolean) => void;
  openLinkModal: () => void;
  showLinkButton?: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  onSubmit,
  canSend,
  isLoading,
  compact,
  handleFileUpload,
  insertEmoji,
  setIsEmojiPickerOpen,
  openLinkModal,
  showLinkButton,
}) => {
  return (
    <div className="flex items-center justify-between px-2 sm:px-3 pb-2 sm:pb-3 pt-1 border-t border-neutral-100 gap-2">
      {/* Left Side - Formatting Tools */}
      <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          <ToolbarButton
            isActive={editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Bold className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </ToolbarButton>

          <ToolbarButton
            isActive={editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Italic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </ToolbarButton>

          <ToolbarButton
            isActive={editor?.isActive("code")}
            onClick={() => editor?.chain().focus().toggleCode().run()}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </ToolbarButton>
        </div>

        {/* Separator */}
        <div className="w-px h-5 sm:h-6 bg-neutral-200 mx-1 flex-shrink-0" />

        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          <div className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center">
            <EmojiDropdown
              onSelect={insertEmoji}
              onOpenChange={setIsEmojiPickerOpen}
            />
          </div>

          <ToolbarButton
            onClick={handleFileUpload}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </ToolbarButton>

          {showLinkButton && (
            <ToolbarButton
              onClick={openLinkModal}
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </ToolbarButton>
          )}
        </div>
      </div>

      {/* Right Side - Send Button */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Help Text - Hidden on mobile, visible on larger screens */}
        <span className="text-xs text-neutral-500 hidden md:block whitespace-nowrap">
          {compact ? "Enter to send" : "⌘ + Enter to send"}
        </span>

        {/* Send Button */}
        <Button
          type="submit"
          size="sm"
          onClick={onSubmit}
          disabled={!canSend}
          className={cn(
            "h-8 sm:h-9 btn-primary flex-shrink-0 transition-all",
            "px-2 sm:px-3",
            !canSend && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden xs:inline text-xs sm:text-sm">
                Sending
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-1 sm:gap-2">
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline text-xs sm:text-sm">Send</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
