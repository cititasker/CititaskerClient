// components/RichEditor.tsx
"use client";

import React, { useState } from "react";
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

interface RichEditorProps {
  onContentUpdate: (html: string) => void;
  isLoading?: boolean;
}

const RichEditor = ({ onContentUpdate, isLoading }: RichEditorProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

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
    setShowEmojiPicker(false);
  };

  const insertAttachment = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*"; // allow any file type

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;

        editor
          ?.chain()
          .focus()
          .setFileAttachment({
            src: url,
            filename: file.name,
            mime: file.type,
          })
          .run();
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  const insertLink = () => {
    if (!editor || !linkUrl.trim()) return;

    const url = linkUrl.trim();
    const text = linkText.trim() || url;

    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text,
        marks: [
          {
            type: "link",
            attrs: {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      })
      .run();

    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  return (
    <>
      <div className="rounded-[10px] bg-light-primary-1 border border-primary p-2 min-h-[120px] text-sm prose max-w-none">
        <EditorContent editor={editor} className="ProseMirror" />
      </div>

      {showEmojiPicker && <EmojiPicker onSelect={insertEmoji} />}

      {showLinkModal && (
        <LinkModal
          url={linkUrl}
          setUrl={setLinkUrl}
          text={linkText}
          setText={setLinkText}
          onInsert={insertLink}
          onCancel={() => setShowLinkModal(false)}
        />
      )}

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-x-5">
          <IconTooltipButton
            icon={<IEmojiSmile />}
            label="Insert emoji"
            onClick={() => {
              setShowEmojiPicker((prev) => !prev);
              setShowLinkModal(false);
            }}
          />
          <IconTooltipButton
            icon={<IEmojiCLip />}
            label="Attach file"
            onClick={insertAttachment}
          />
          <IconTooltipButton
            icon={<ILink />}
            label="Insert link"
            onClick={() => {
              setShowLinkModal(true);
              setShowEmojiPicker(false);
            }}
          />
        </div>
        <button type="submit" aria-label="Send reply">
          {isLoading ? (
            <span className="flex items-center gap-2 text-sm">
              <Loader size={16} className="animate-spin" /> Sending
            </span>
          ) : (
            <ISend2 />
          )}
        </button>
      </div>
    </>
  );
};

export default RichEditor;
