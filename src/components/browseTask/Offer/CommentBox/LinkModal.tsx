import { Input } from "@/components/ui/input";
import React from "react";

interface LinkModalProps {
  url: string;
  setUrl: (url: string) => void;
  text: string;
  setText: (text: string) => void;
  onInsert: () => void;
  onCancel: () => void;
}

const LinkModal = ({
  url,
  setUrl,
  text,
  setText,
  onInsert,
  onCancel,
}: LinkModalProps) => {
  return (
    <div className="absolute bottom-[60px] left-0 z-50 bg-white border rounded-md p-4 shadow-md w-[300px]">
      <Input
        type="text"
        placeholder="example.com"
        className="flex-1 rounded-none h-[40px] border border-dark-grey-1 placeholder:text-black/40 mb-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        autoFocus
      />
      <Input
        type="text"
        placeholder="Display text (optional)"
        className="flex-1 border border-dark-grey-1 rounded-none h-[40px] placeholder:text-black/40"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onInsert}
          className="text-sm text-blue-600 font-medium"
        >
          Insert
        </button>
      </div>
    </div>
  );
};

export default LinkModal;
