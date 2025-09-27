import { Smile } from "lucide-react";
import { IconDropdown } from "@/components/reusables/CustomDropdown";
import EmojiPicker from "./EmojiPicker";

interface EmojiDropdownProps {
  onSelect: (emoji: any) => void;
  onOpenChange: (open: boolean) => void;
}

const EmojiDropdown: React.FC<EmojiDropdownProps> = ({
  onSelect,
  onOpenChange,
}) => {
  return (
    <IconDropdown
      icon={<Smile className="w-4 h-4" />}
      side="top"
      align="start"
      sideOffset={8}
      contentClassName="p-0"
      onOpenChange={onOpenChange}
    >
      <EmojiPicker onSelect={onSelect} />
    </IconDropdown>
  );
};

export default EmojiDropdown;
