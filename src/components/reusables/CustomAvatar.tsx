import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils";

interface CustomAvatarProps {
  src?: string;
  alt?: string;
  fullName?: string;
  size?: "sm" | "md" | "lg"; // for responsive sizing
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10 sm:w-14 sm:h-14",
  lg: "w-20 h-20 sm:w-24 sm:h-24",
};

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src = "",
  alt = "",
  fullName = "",
  size = "md",
  className = "",
}) => {
  return (
    <Avatar
      className={`${sizeMap[size]} border-2 border-neutral-200 ${className}`}
    >
      <AvatarImage src={src} alt={alt || fullName} />
      <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold">
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
