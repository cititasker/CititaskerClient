"use client";

import { forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";
import { useRichEditor } from "./hooks/useRichEditor";
import EditorInputArea from "./components/EditorInputArea";

const EditorToolbar = dynamic(() => import("./components/EditorToolbar"), {
  ssr: false,
});

const LinkModal = dynamic(() => import("../LinkModal"), {
  ssr: false,
});

const FileInputHandler = dynamic(
  () => import("./components/FileInputHandler"),
  {
    ssr: false,
  }
);

interface RichEditorProps {
  onContentUpdate: (html: string, isEmpty: boolean) => void;
  onFocusChange: (focused: boolean) => void;
  placeholder: string;
  attachments: File[];
  setAttachments: (files: File[]) => void;
  isLoading: boolean;
  onSubmit: () => void;
  compact?: boolean;
  acceptTypes?: string[];
  showLinkButton?: boolean;
}

export interface RichEditorRef {
  reset: () => void;
  focus: () => void;
  blur: () => void;
  isEmpty: () => boolean;
}

const RichEditor = forwardRef<RichEditorRef, RichEditorProps>(
  (
    {
      onContentUpdate,
      onFocusChange,
      placeholder,
      attachments,
      setAttachments,
      isLoading,
      onSubmit,
      compact = false,
      acceptTypes,
      showLinkButton = false,
    },
    ref
  ) => {
    const {
      editor,
      showToolbar,
      fileInputRef,
      insertEmoji,
      handleKeyDown,
      handleFileUpload,
      setIsEmojiPickerOpen,
      linkModal,
    } = useRichEditor({
      placeholder,
      onContentUpdate,
      onFocusChange,
      isLoading,
      onSubmit,
    });

    // Expose methods to parent component
    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          if (editor) {
            editor.commands.clearContent();
            editor.commands.blur();
            onContentUpdate("", true);
          }
        },
        focus: () => {
          editor?.commands.focus();
        },
        blur: () => {
          editor?.commands.blur();
        },
        isEmpty: () => {
          return editor?.isEmpty ?? true;
        },
      }),
      [editor, onContentUpdate]
    );

    const canSend = !!editor && !editor.isEmpty && !isLoading;

    return (
      <div className="editor-container">
        <EditorInputArea
          editor={editor}
          handleKeyDown={handleKeyDown}
          attachments={attachments}
          setAttachments={setAttachments}
        />

        {(showToolbar || !compact) && (
          <EditorToolbar
            editor={editor}
            onSubmit={onSubmit}
            canSend={canSend}
            isLoading={isLoading}
            compact={compact}
            handleFileUpload={handleFileUpload}
            insertEmoji={insertEmoji}
            setIsEmojiPickerOpen={setIsEmojiPickerOpen}
            openLinkModal={linkModal.openModal}
            showLinkButton={showLinkButton}
          />
        )}

        <FileInputHandler
          inputRef={fileInputRef}
          attachments={attachments}
          setAttachments={setAttachments}
          refocusEditor={() => editor?.commands.focus()}
          acceptTypes={acceptTypes}
        />

        {linkModal.isOpen && (
          <LinkModal
            open={linkModal.isOpen}
            onClose={linkModal.closeModal}
            editor={editor}
          />
        )}
      </div>
    );
  }
);

RichEditor.displayName = "RichEditor";

export default RichEditor;
