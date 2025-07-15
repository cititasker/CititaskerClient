import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TestEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello</p>",
  });
  if (!editor) return <div>Loading editor…</div>;
  return <EditorContent editor={editor} />;
}
export default TestEditor;
