import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMessage } from "../../types";
import { formatTime, getInitials } from "../../utils";

interface Props {
  message: IMessage;
  isUser: boolean;
  showAvatar: boolean;
  avatarUrl?: string;
  senderName?: string;
}

const ChatMessageBubble: React.FC<Props> = ({
  message,
  isUser,
  showAvatar,
  avatarUrl,
  senderName,
}) => {
  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start items-end space-x-2"
      )}
    >
      {!isUser && (
        <div className={showAvatar ? "visible" : "invisible"}>
          <Avatar className="h-7 w-7 ring-1 ring-white shadow-sm">
            <AvatarImage src={avatarUrl} alt={senderName} />
            <AvatarFallback className="bg-gradient-secondary text-white font-semibold text-xs">
              {getInitials(senderName || "")}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {showAvatar && !isUser && (
          <p className="text-xs text-neutral-500 mb-1 px-1 font-medium">
            {message.senderName || senderName}
          </p>
        )}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl shadow-sm relative group transition-all duration-200",
            isUser
              ? "bg-primary text-white rounded-br-md"
              : "bg-white border border-neutral-200 text-neutral-800 rounded-bl-md",
            "hover:shadow-md"
          )}
        >
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            {message.content}
          </p>
          <div className="text-xs mt-1 flex items-center space-x-1">
            <span className={cn("text-neutral-500", isUser && "text-muted")}>
              {formatTime(message.timestamp)}
            </span>
            {isUser &&
              (message.status === "read" ? (
                <CheckCheck size={14} className="text-blue-300" />
              ) : (
                <Check size={14} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
