import ChatMessagesLayout from "@/components/shared/dashboard/messages/components/ChatMessagesLayout";
import React from "react";

interface MessagesLayoutProps {
  children: React.ReactNode;
}

const MessagesLayout: React.FC<MessagesLayoutProps> = ({ children }) => {
  return <ChatMessagesLayout>{children}</ChatMessagesLayout>;
};

export default MessagesLayout;
