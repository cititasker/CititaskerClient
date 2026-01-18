import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import React from "react";

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  isOnline: boolean;
  isMobile: boolean;
  onBack: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatar,
  isOnline,
  isMobile,
  onBack,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 h-auto"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-neutral-900 truncate text-sm sm:text-base">
            {name}
          </h3>
          <div className="flex items-center space-x-1">
            {isOnline && (
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            )}
            <p className="text-xs text-neutral-500">
              {isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" className="p-2 h-auto">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 h-auto">
          <Video size={18} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2 h-auto">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Clear Chat</DropdownMenuItem>
            <DropdownMenuItem>Block Contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
