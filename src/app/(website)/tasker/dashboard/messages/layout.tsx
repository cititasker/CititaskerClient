import MessageList from "@/components/shared/dashboard/messages/MessageList";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6">
      <div className="max-w-[376px] w-full">
        <MessageList />
      </div>
      <ScrollArea className="flex-1">{children}</ScrollArea>
    </div>
  );
}
