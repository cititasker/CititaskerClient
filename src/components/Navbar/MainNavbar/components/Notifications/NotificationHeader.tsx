import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "@/components/icons/index";

interface NotificationHeaderProps {
  unreadCount: number;
  onClose: () => void;
}

export default React.memo(function NotificationHeader({
  unreadCount,
  onClose,
}: NotificationHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-gray-50 to-white">
      <div>
        <h3 className="font-semibold text-gray-900 text-base">Notifications</h3>
        {unreadCount > 0 && (
          <p className="text-xs text-gray-500 mt-0.5">
            You have {unreadCount} unread{" "}
            {unreadCount === 1 ? "notification" : "notifications"}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-7 w-7 rounded-full hover:bg-gray-200"
      >
        <X className="w-4 h-4 text-gray-600" />
      </Button>
    </div>
  );
});
