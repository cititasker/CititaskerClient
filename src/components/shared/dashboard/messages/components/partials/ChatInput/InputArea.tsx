import React from "react";
import { cn } from "@/lib/utils";
import EmojiDropdown from "@/components/shared/components/comment/CommentBox/RichEditor/components/EmojiDropdown";

interface InputAreaProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onEmojiSelect: (emoji: any) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  inputRef,
  value,
  onChange,
  onKeyDown,
  onEmojiSelect,
}) => (
  <div className="flex-1 min-w-0">
    <div
      className={cn(
        "bg-neutral-50 rounded-3xl border transition-all duration-200 relative",
        "border-neutral-200 focus-within:border-primary-400 focus-within:bg-white"
      )}
    >
      <div className="flex items-end">
        <textarea
          ref={inputRef}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Type a message..."
          rows={1}
          className={cn(
            "flex-1 px-4 py-3 bg-transparent border-none resize-none",
            "focus:outline-none text-sm placeholder:text-neutral-500",
            "min-h-[48px] max-h-[120px] leading-5"
          )}
        />
        <div className="p-2 flex-shrink-0">
          <EmojiDropdown onSelect={onEmojiSelect} onOpenChange={() => {}} />
        </div>
      </div>
    </div>
  </div>
);
