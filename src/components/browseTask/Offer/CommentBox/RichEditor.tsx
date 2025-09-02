"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";

import LinkModal from "./LinkModal";
import IconTooltipButton from "@/components/reusables/IconTooltipButton";
import { IEmojiCLip, IEmojiSmile, ILink, ISend2 } from "@/constant/icons";
import EmojiPicker from "./EmojiPicker";
import { FileAttachment } from "./FileAttachment";
import { Loader } from "lucide-react";
import CustomDropdown from "@/components/reusables/CustomDropdown";
import { useScreenBreakpoints } from "@/hooks/useScreenBreakpoints";
import FilePreviewList from "./attachment-preview/FilePreviewList";
import useModal from "@/hooks/useModal";
import { cn } from "@/lib/utils";

interface RichEditorProps {
  onContentUpdate: (html: string) => void;
  isLoading?: boolean;
  attachments: File[];
  setAttachments: (files: File[]) => void;
}

const RichEditor = ({
  onContentUpdate,
  isLoading,
  setAttachments,
  attachments,
}: RichEditorProps) => {
  const linkModal = useModal();
  const { isSmallScreen } = useScreenBreakpoints();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true, // This makes the link clickable
        autolink: false,
        linkOnPaste: false,
      }),
      ImageExt,
      FileAttachment,
      Placeholder.configure({ placeholder: "Reply" }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onContentUpdate(editor.getHTML());
    },
  });

  const insertEmoji = (emoji: any) => {
    editor?.chain().focus().insertContent(emoji.native).run();
  };

  const insertAttachment = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      setAttachments([...attachments, file]);
    };

    input.click();
  };

  return (
    <div className="max-w-full">
      <div className="rounded-[10px] bg-light-primary-1 border border-primary p-2 text-sm">
        <EditorContent editor={editor} className="ProseMirror prose" />

        <FilePreviewList
          attachments={attachments}
          onRemove={(index) =>
            setAttachments(attachments.filter((_, i) => i !== index))
          }
        />
        <div
          className={cn(
            "flex justify-between items-center",
            !attachments.length && "mt-3"
          )}
        >
          <div className="flex gap-x-5">
            <CustomDropdown
              trigger={<IEmojiSmile />}
              side={isSmallScreen ? undefined : "left"}
              contentClassName="p-0"
            >
              <EmojiPicker onSelect={insertEmoji} />
            </CustomDropdown>

            <IconTooltipButton
              icon={<IEmojiCLip />}
              label="Attach file"
              onClick={insertAttachment}
            />
            <IconTooltipButton
              icon={<ILink />}
              label="Insert link"
              onClick={linkModal.openModal}
            />
          </div>
          <button type="submit" aria-label="Send reply">
            {isLoading ? (
              <span className="flex items-center gap-2 text-sm">
                <Loader size={16} className="animate-spin" /> Sending
              </span>
            ) : (
              <ISend2 className="scale-90" />
            )}
          </button>
        </div>
      </div>

      <LinkModal
        open={linkModal.isOpen}
        onCancel={linkModal.closeModal}
        editor={editor}
      />
    </div>
  );
};

export default RichEditor;
