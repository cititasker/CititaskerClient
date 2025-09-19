import { EditorContent } from "@tiptap/react";
import FilePreviewList from "./attachment-preview/FilePreviewList";

interface EditorInputAreaProps {
  editor: any;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  attachments: File[];
  setAttachments: (files: File[]) => void;
}

const EditorInputArea: React.FC<EditorInputAreaProps> = ({
  editor,
  handleKeyDown,
  attachments,
  setAttachments,
}) => {
  return (
    <div className="p-3 pb-2">
      <EditorContent
        editor={editor}
        onKeyDown={handleKeyDown}
        className="prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:min-h-[20px]"
      />

      <FilePreviewList
        attachments={attachments}
        onRemove={(index) =>
          setAttachments(attachments.filter((_, i) => i !== index))
        }
      />
    </div>
  );
};

export default EditorInputArea;
