import Image from "next/image";
import { MdClose } from "react-icons/md";

const MobileToggle = ({
  onClick,
  open,
}: {
  onClick: () => void;
  open: boolean;
}) => {
  if (open)
    return (
      <MdClose
        className="text-2xl cursor-pointer"
        onClick={onClick}
        aria-label="Close mobile menu"
      />
    );
  return (
    <Image
      src="/icons/hamburger.svg"
      alt="hamburger-icon"
      width={20}
      height={40}
      className="md:hidden cursor-pointer w-auto h-auto"
      onClick={onClick}
    />
  );
};

export default MobileToggle;
