"use client";

import React, { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import ChatSidebar from "@/components/shared/dashboard/messages/components/ChatSidebar";
import { mockConversations } from "@/components/shared/dashboard/messages/data";
import { useAppSelector } from "@/store/hook";

interface ChatMessagesLayoutProps {
  children: React.ReactNode;
}

const ChatMessagesLayout: React.FC<ChatMessagesLayoutProps> = ({
  children,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const params = useParams();
  const pathname = usePathname();
  const conversationId = params?.conversationId as string;
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on the main messages page (not a specific conversation)
  const isMessagesPage =
    pathname === `/messages` ||
    pathname === `/${user?.role}/dashboard/messages`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-full flex bg-white rounded-2xl overflow-hidden shadow-md">
      {/* Sidebar - Show on desktop always, on mobile only when on messages page */}
      {(!isMobile || isMessagesPage) && (
        <div className="w-full lg:w-96 lg:flex-shrink-0 border-r border-border-light bg-white">
          <ChatSidebar
            conversations={mockConversations}
            activeConversationId={conversationId}
            baseUrl={`/${user?.role}/dashboard/messages`}
          />
        </div>
      )}

      {/* Main Content - Show on desktop always, on mobile only when viewing conversation */}
      {(!isMobile || !isMessagesPage) && (
        <div className="flex-1 min-w-0">{children}</div>
      )}
    </div>
  );
};

export default ChatMessagesLayout;
