"use client";

import { useRef, useState, useCallback } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import useModal from "@/hooks/useModal";
import { moderateContent } from "@/lib/contentModeration";

interface UseRichEditorProps {
  placeholder: string;
  onContentUpdate: (html: string, isEmpty: boolean) => void;
  onFocusChange: (focused: boolean) => void;
  isLoading: boolean;
  onSubmit: () => void;
  compact?: boolean;
  moderationConfig?: any;
  onModerationWarning?: any;
}

export const useRichEditor = ({
  placeholder,
  onContentUpdate,
  onFocusChange,
  isLoading,
  onSubmit,
  moderationConfig,
  onModerationWarning,
  compact = false,
}: UseRichEditorProps) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const linkModal = useModal();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const isEmpty = editor.isEmpty;
      onContentUpdate(html, isEmpty);

      // Real-time moderation check (optional)
      if (moderationConfig?.enabled && !isEmpty) {
        const result = moderateContent(html, moderationConfig);
        if (result.warnings.length > 0) {
          onModerationWarning?.(result.warnings);
        }
      }
    },
    onFocus: () => {
      onFocusChange(true);
      setShowToolbar(true);
    },
    onBlur: ({ event }) => {
      const relatedTarget = event.relatedTarget as HTMLElement;
      const isClickingInsideEditor =
        editorContainerRef.current?.contains(relatedTarget);
      const isDropdown = relatedTarget?.closest(
        "[data-radix-popper-content-wrapper]"
      );

      if (!isClickingInsideEditor && !isDropdown && !isEmojiPickerOpen) {
        onFocusChange(false);
        setShowToolbar(false);
      }
    },
  });

  const insertEmoji = useCallback(
    (emoji: any) => {
      editor?.chain().focus().insertContent(emoji.native).run();
      setIsEmojiPickerOpen(false);
    },
    [editor]
  );

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (e.shiftKey) return; // Allow newline
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          onSubmit();
        }
      }
    },
    [onSubmit]
  );

  const canSend = !!editor && !editor?.isEmpty && !isLoading;

  return {
    editor,
    showToolbar,
    setShowToolbar,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    fileInputRef,
    editorContainerRef,
    linkModal,
    insertEmoji,
    handleFileUpload,
    handleKeyDown,
    canSend,
  };
};
