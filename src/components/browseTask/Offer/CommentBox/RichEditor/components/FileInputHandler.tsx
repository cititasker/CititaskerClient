interface FileInputHandlerProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  attachments: File[];
  setAttachments: (files: File[]) => void;
  refocusEditor: () => void;
}

const FileInputHandler: React.FC<FileInputHandlerProps> = ({
  inputRef,
  attachments,
  setAttachments,
  refocusEditor,
}) => {
  return (
    <input
      ref={inputRef}
      type="file"
      multiple
      accept="*/*"
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        setAttachments([...attachments, ...files]);
        e.target.value = "";
        setTimeout(refocusEditor, 100);
      }}
      className="hidden"
    />
  );
};

export default FileInputHandler;
