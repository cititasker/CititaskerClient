"use client";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface CustomQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  modules?: any;
  formats?: string[];
  className?: string;
}

const defaultModules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "code-block"],
    ["blockquote", "code-block"],
    // [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { list: "check" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const defaultFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  //   "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

function FormTextEditor({
  value,
  onChange,
  placeholder = "Type your text here...",
  modules = defaultModules,
  formats = defaultFormats,
  className,
}: CustomQuillEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
      formats={formats}
      className={className}
    />
  );
}

export default FormTextEditor;
