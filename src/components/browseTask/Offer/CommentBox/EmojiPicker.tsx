import React from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiPickerProps {
  onSelect: (emoji: any) => void;
}

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  return (
    <div className="">
      <Picker
        data={data}
        onEmojiSelect={onSelect}
        perLine={8}
        emojiButtonSize={32}
        emojiSize={22}
      />
    </div>
  );
};

export default EmojiPicker;
