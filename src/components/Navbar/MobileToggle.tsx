import { Menu } from "lucide-react";
import { MdClose } from "react-icons/md";
import { Button } from "../ui/button";

interface MobileToggleProps {
  open: boolean;
  onClick: () => void;
}

const MobileToggle = ({ open, onClick }: MobileToggleProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="bg-background border-border xl:hidden"
    >
      {open ? <MdClose className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  );
};

export default MobileToggle;
