"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatConversation from "@/components/shared/dashboard/messages/components/ChatConversation";
import { IMessage } from "@/components/shared/dashboard/messages/types";
import {
  mockMessages,
  mockConversations,
} from "@/components/shared/dashboard/messages/data";
import { useAppSelector } from "@/store/hook";

const ConversationView: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const params = useParams();
  const router = useRouter();
  const conversationId = params?.conversationId as string;
  const [messages, setMessages] = useState<IMessage[]>([]);

  const currentConversation = mockConversations.find(
    (conv) => conv.id === conversationId
  );

  useEffect(() => {
    if (conversationId && mockMessages[conversationId]) {
      setMessages(mockMessages[conversationId]);
    } else {
      setMessages([]);
    }
  }, [conversationId]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const newMessage: IMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      status: "read",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate response
    setTimeout(() => {
      const response: IMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you soon.",
        sender: "other",
        timestamp: new Date(),
        senderName: currentConversation?.name || "Unknown",
        status: "read",
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">
            Conversation not found
          </h3>
          <p className="text-neutral-500 mb-4">
            This conversation may have been deleted or you don't have access to
            it.
          </p>
          <button
            onClick={() => router.push(`/${user?.role}/dashboard/messages`)}
            className="btn-primary"
          >
            Back to Conversations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ChatConversation
        conversation={currentConversation}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ConversationView;
