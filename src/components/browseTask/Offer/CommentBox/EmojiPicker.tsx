// components/EmojiPicker.tsx
import React from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiPickerProps {
  onSelect: (emoji: any) => void;
}

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  return (
    <div className="absolute bottom-[60px] left-0 z-50">
      <Picker data={data} onEmojiSelect={onSelect} />
    </div>
  );
};

export default EmojiPicker;
