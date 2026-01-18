"use client";

import React, { useState, memo, useCallback } from "react";
import { Bell } from "@/components/icons/index";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationHeader from "./NotificationHeader";
import dynamic from "next/dynamic";
import { useNotifications } from "@/providers/NotificationsProvider";

const NotificationTabs = dynamic(() => import("./NotificationTabs"), {
  loading: () => <div className="p-5 text-center">Loading...</div>,
  ssr: false,
});

const NotificationBell = memo(function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Track individual notification loading states
  const [loadingStates, setLoadingStates] = useState<{
    markingAsRead: string | null;
    deleting: string | null;
  }>({
    markingAsRead: null,
    deleting: null,
  });

  const {
    notifications,
    unreadNotifications,
    unreadCount,
    isLoading,
    markAsRead: originalMarkAsRead,
    markAllAsRead,
    deleteNotification: originalDeleteNotification,
    isMarkingAllAsRead,
  } = useNotifications();

  // Wrap markAsRead to track individual notification
  const handleMarkAsRead = useCallback(
    (id: string) => {
      setLoadingStates((prev) => ({ ...prev, markingAsRead: id }));
      originalMarkAsRead(id);

      // Reset after operation completes
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, markingAsRead: null }));
      }, 1000);
    },
    [originalMarkAsRead]
  );

  // Wrap deleteNotification to track individual notification
  const handleDeleteNotification = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setLoadingStates((prev) => ({ ...prev, deleting: id }));
      originalDeleteNotification(id);

      // Reset after operation completes
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, deleting: null }));
      }, 1000);
    },
    [originalDeleteNotification]
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white ring-2 ring-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[350px] p-0 bg-white shadow-xl border-0 rounded-2xl overflow-hidden"
        align="center"
        sideOffset={16}
      >
        <NotificationHeader
          unreadCount={unreadCount}
          onClose={() => setIsOpen(false)}
        />

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        ) : (
          <NotificationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            unreadCount={unreadCount}
            markAllAsRead={markAllAsRead}
            markAsRead={handleMarkAsRead}
            deleteNotification={handleDeleteNotification}
            isMarkingAllAsRead={isMarkingAllAsRead}
            loadingStates={loadingStates}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default NotificationBell;
