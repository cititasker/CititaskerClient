import React, { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Bell } from "lucide-react";
import { getNotificationIcon } from "./utils";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "./types";

interface NotificationListProps {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  deleteNotification: (id: string, e: React.MouseEvent) => void;
}

const NotificationList = memo(function NotificationList({
  notifications,
  markAsRead,
  deleteNotification,
}: NotificationListProps) {
  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-5">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <Bell className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-900">No notifications</p>
        <p className="text-xs text-gray-500 mt-1">You're all caught up!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[300px] overflow-y-auto no-scrollbar">
      <div className="flex flex-col">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        ))}
      </div>
    </ScrollArea>
  );
});

const NotificationItem = memo(function NotificationItem({
  notification,
  markAsRead,
  deleteNotification,
}: {
  notification: NotificationItem;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string, e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={cn(
        "group relative px-5 py-4 cursor-pointer transition-all border-b last:border-b-0 hover:bg-gray-50",
        !notification.read && "bg-blue-50/50 hover:bg-blue-50"
      )}
      onClick={() => markAsRead(notification.id)}
    >
      <div className="flex gap-3">
        <div
          className={cn(
            "shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5",
            !notification.read ? "bg-white shadow-sm" : "bg-gray-100"
          )}
        >
          {getNotificationIcon(notification.type, notification.data?.icon)}
        </div>

        <div className="flex-1 min-w-0">
          {notification.data?.title && (
            <p
              className={cn(
                "text-xs font-semibold mb-1",
                !notification.read ? "text-gray-900" : "text-gray-700"
              )}
            >
              {notification.data.title}
            </p>
          )}
          <p
            className={cn(
              "text-sm leading-relaxed",
              !notification.read ? "text-gray-800" : "text-gray-600"
            )}
          >
            {notification.message}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">
              {notification.data?.created_at_human || notification.created_at}
            </span>
            {!notification.read && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => deleteNotification(notification.id, e)}
          className="shrink-0 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
});

export default NotificationList;
