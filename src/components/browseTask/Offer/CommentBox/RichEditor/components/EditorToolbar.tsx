import {
  Bold,
  Italic,
  Code,
  Paperclip,
  Link as LinkIcon,
  Send,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import EmojiDropdown from "./EmojiDropdown";
import { Button } from "@/components/ui/button";

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
}) => {
  return (
    <div className="flex items-center justify-between px-3 pb-3 pt-1 border-t border-neutral-100">
      <div className="flex items-center gap-1">
        <ToolbarButton
          isActive={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor?.isActive("code")}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-neutral-200 mx-1" />

        <EmojiDropdown
          onSelect={insertEmoji}
          onOpenChange={setIsEmojiPickerOpen}
        />

        <ToolbarButton onClick={handleFileUpload}>
          <Paperclip className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton onClick={openLinkModal}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted hidden sm:block">
          {compact ? "Enter to send" : "⌘ + Enter to send"}
        </span>
        <Button
          type="submit"
          size="sm"
          onClick={onSubmit}
          disabled={!canSend}
          className="h-8 px-3 btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden sm:inline">Sending</span>
            </span>
          ) : (
            <>
              <Send className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Send</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
