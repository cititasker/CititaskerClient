"use client";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { usePusher } from "./usePusher";
import {
  useNotifications as useFetchNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from "@/services/notifications/notifications.hook";
import { useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/constant";
import {
  NotificationItem,
  transformNotification,
} from "@/components/Navbar/MainNavbar/components/Notifications/types";

export function useNotifications() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const queryClient = useQueryClient();
  const isInitialMount = useRef(true);

  const { data: allNotificationsResponse, isLoading: isLoadingAll } =
    useFetchNotifications();
  // const { data: unreadResponse, isLoading: isLoadingUnread } =
  //   useUnreadNotifications();

  const notifications: NotificationItem[] = useMemo(() => {
    return (allNotificationsResponse?.data?.data || []).map(
      transformNotification
    );
  }, [allNotificationsResponse]);

  // const unreadNotifications: NotificationItem[] = useMemo(() => {
  //   return (unreadResponse?.data?.data || []).map(transformNotification);
  // }, [unreadResponse]);

  const unreadNotifications = useMemo(() => {
    return notifications.filter((n) => !n.read);
  }, [notifications]);

  const unreadCount = useMemo(() => {
    return unreadNotifications.length;
  }, [unreadNotifications]);

  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const playNotificationSound = useCallback(() => {
    if (soundEnabled && !isInitialMount.current) {
      const audio = new Audio("/sounds/notification.wav");
      audio.play().catch((err) => {
        console.warn("Could not play notification sound:", err);
      });
    }
  }, [soundEnabled]);

  const handleNewNotification = useCallback(
    (notification: any, type: string) => {
      console.log("New notification received:", type, notification);

      playNotificationSound();

      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.NOTIFICATIONS.GET_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.NOTIFICATIONS.UNREAD],
      });

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(notification.title || "New Notification", {
          body: notification.message || notification.data?.message,
          icon: "/icons/icon.png",
        });
      }
    },
    [playNotificationSound, queryClient]
  );

  usePusher({
    onNotification: handleNewNotification,
    enabled: true,
  });

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    isInitialMount.current = false;
  }, []);

  const markAsRead = useCallback(
    (id: string) => {
      markAsReadMutation.mutate(id);
    },
    [markAsReadMutation]
  );

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const deleteNotification = useCallback(
    (id: string) => {
      deleteNotificationMutation.mutate(id);
    },
    [deleteNotificationMutation]
  );

  return {
    notifications,
    unreadNotifications,
    unreadCount,
    isLoading: isLoadingAll,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    soundEnabled,
    setSoundEnabled,
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
  };
}
