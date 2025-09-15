"use client";

import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
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

interface TextEditorProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

const FormTextEditor = ({
  name,
  label,
  placeholder = "Type your text here...",
  className = "",
}: TextEditorProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`space-y-2 ${className}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="prose-editor">
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
                modules={editorModules}
                className="bg-white text-sm"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextEditor;
