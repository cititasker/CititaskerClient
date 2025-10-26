"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IConversation, IMessage } from "../types";
import { useAppSelector } from "@/store/hook";

import { formatDate } from "../utils";
import ChatHeader from "./partials/ChatHeader";
import ChatInput from "./partials/ChatInput/ChatInput";
import ChatMessageBubble from "./partials/ChatMessageBubble";

interface ChatConversationProps {
  conversation: IConversation;
  messages: IMessage[];
  onSendMessage: (message: string) => void;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversation,
  messages,
  onSendMessage,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [messageInput, setMessageInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [messageInput, adjustTextareaHeight]);

  // const handleSend = () => {
  //   if (!messageInput.trim()) return;
  //   onSendMessage(messageInput);
  //   setMessageInput("");
  // };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSend();
  //   }
  // };

  const handleBackNavigation = () => {
    router.push(`/${user?.role}/dashboard/messages`);
  };

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups: { [key: string]: IMessage[] }, message) => {
      const dateKey = formatDate(message.timestamp);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
      return groups;
    },
    {}
  );

  // const renderMessageStatus = (message: IMessage, isUser: boolean) => {
  //   if (!isUser) return null;

  //   return (
  //     <div className="flex items-center mt-1 space-x-1">
  //       <span className="text-xs text-primary-100">
  //         {formatTime(message.timestamp)}
  //       </span>
  //       <div className="text-primary-100">
  //         {message.status === "read" ? (
  //           <CheckCheck size={14} className="text-blue-300" />
  //         ) : (
  //           <Check size={14} />
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-neutral-50 to-white relative">
      <div className="relative z-10 h-full flex flex-col">
        <ChatHeader
          name={conversation.name}
          avatar={conversation.avatar}
          isOnline={conversation.isOnline}
          isMobile={isMobile}
          onBack={handleBackNavigation}
        />
        <ScrollArea className="flex-1 px-2 sm:px-4">
          {Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date} className="mb-6">
              <div className="flex justify-center py-2 sticky top-16 z-10">
                <div className="px-3 py-1.5 bg-white/90 rounded-full text-xs font-medium text-neutral-600 border shadow-sm">
                  {date}
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {msgs.map((msg, i) => {
                  const isUser = msg.sender === "user";
                  const showAvatar =
                    !isUser && (i === 0 || msgs[i - 1].sender !== msg.sender);
                  return (
                    <ChatMessageBubble
                      key={msg.id}
                      message={msg}
                      isUser={isUser}
                      showAvatar={showAvatar}
                      avatarUrl={conversation.avatar}
                      senderName={conversation.name}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <ChatInput
          value={messageInput}
          onChange={setMessageInput}
          onSend={() => {
            if (messageInput.trim()) {
              onSendMessage(messageInput);
              setMessageInput("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatConversation;
