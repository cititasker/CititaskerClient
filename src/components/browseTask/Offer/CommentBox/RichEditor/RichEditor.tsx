"use client";

import LinkModal from "../LinkModal";
import EditorInputArea from "./components/EditorInputArea";
import EditorToolbar from "./components/EditorToolbar";
import FileInputHandler from "./components/FileInputHandler";
import { useRichEditor } from "./hooks/useRichEditor";

interface RichEditorProps {
  onContentUpdate: (html: string, isEmpty: boolean) => void;
  onFocusChange: (focused: boolean) => void;
  placeholder: string;
  attachments: File[];
  setAttachments: (files: File[]) => void;
  isLoading: boolean;
  onSubmit: () => void;
  compact?: boolean;
}

const RichEditor = ({
  onContentUpdate,
  onFocusChange,
  placeholder,
  attachments,
  setAttachments,
  isLoading,
  onSubmit,
  compact = false,
}: RichEditorProps) => {
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
        />
      )}

      <FileInputHandler
        inputRef={fileInputRef}
        attachments={attachments}
        setAttachments={setAttachments}
        refocusEditor={() => editor?.commands.focus()}
      />

      <LinkModal
        open={linkModal.isOpen}
        onClose={linkModal.closeModal}
        editor={editor}
      />
    </div>
  );
};

export default RichEditor;
