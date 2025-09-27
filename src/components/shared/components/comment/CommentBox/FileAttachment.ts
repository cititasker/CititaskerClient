import { Node, mergeAttributes } from "@tiptap/core";

export interface FileAttachmentOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fileAttachment: {
      setFileAttachment: (options: {
        src: string;
        filename: string;
        mime: string;
      }) => ReturnType;
    };
  }
}

export const FileAttachment = Node.create<FileAttachmentOptions>({
  name: "fileAttachment",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      filename: { default: null },
      mime: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "a[data-file-attachment]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-file-attachment": "",
        href: HTMLAttributes.src,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "text-blue-600 underline",
      }),
      HTMLAttributes.filename || "Download file",
    ];
  },

  addCommands() {
    return {
      setFileAttachment:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
