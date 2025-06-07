import Image from "next/image";

const MobileToggle = ({ onClick }: { onClick: () => void }) => (
  <Image
    src="/icons/hamburger.svg"
    alt="hamburger-icon"
    width={20}
    height={40}
    className="md:hidden cursor-pointer w-auto h-auto"
    onClick={onClick}
  />
);

export default MobileToggle;
