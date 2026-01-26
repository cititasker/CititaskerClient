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

export function useNotificationsData(isAuthenticated: boolean = false) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const queryClient = useQueryClient();
  const isInitialMount = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  const { data: allNotificationsResponse, isLoading: isLoadingAll } =
    useFetchNotifications({
      enabled: isAuthenticated,
      params: { page: 1, per_page: 20 },
    });

  const notifications: NotificationItem[] = useMemo(() => {
    return (allNotificationsResponse?.data?.data || []).map(
      transformNotification,
    );
  }, [allNotificationsResponse]);

  const unreadNotifications = useMemo(() => {
    return notifications.filter((n) => !n.read);
  }, [notifications]);

  const unreadCount = unreadNotifications.length;

  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  // Initialize audio on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/notification.wav");
      audioRef.current.volume = 0.5;

      // Preload the audio
      audioRef.current.load();
    }
  }, []);

  // Unlock audio on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current && !audioUnlockedRef.current) {
        // Create a silent play to unlock audio context
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audioRef.current?.pause();
              audioRef.current!.currentTime = 0;
              audioUnlockedRef.current = true;
            })
            .catch(() => {
              // Silent fail - audio will be unlocked on next interaction
            });
        }
      }
    };

    // Listen for any user interaction
    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, unlockAudio, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, unlockAudio);
      });
    };
  }, []);

  const playNotificationSound = useCallback(() => {
    if (soundEnabled && !isInitialMount.current && audioRef.current) {
      // Reset audio to start
      audioRef.current.currentTime = 0;

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Only log in development
          if (process.env.NODE_ENV === "development") {
            console.warn("Could not play notification sound:", err.message);
          }
          // Silently fail in production
        });
      }
    }
  }, [soundEnabled]);

  const handleNewNotification = useCallback(
    (notification: any, type: string) => {
      console.log("New notification received:", type, notification);

      playNotificationSound();

      const taskNotifications = [
        "RequestTaskSurchargeRequest",
        "NewDisputeProposalNotification",
        "PosterCancelledTaskNotification",
        "TaskerRescheduleRequestNotification",
        "RescheduleCounterRejectedNotification",
        "RescheduleCounterAcceptedNotification",
        "TaskCompletionNotification",
        "NewOfferNotification",
        "PaymentRequestNotification",
        "DisputeProposalNotification",
        "NewDisputeNotification",
      ].map((notificationType) => `App\\Notifications\\${notificationType}`);

      if (taskNotifications.includes(type)) {
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.USER_TASKS],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.TASKS],
        });
      }

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
    [playNotificationSound, queryClient],
  );

  const { isConnected } = usePusher({
    onNotification: handleNewNotification,
    enabled: true,
  });

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    const timer = setTimeout(() => {
      isInitialMount.current = false;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = useCallback(
    (id: string) => {
      markAsReadMutation.mutate(id);
    },
    [markAsReadMutation],
  );

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const deleteNotification = useCallback(
    (id: string) => {
      deleteNotificationMutation.mutate(id);
    },
    [deleteNotificationMutation],
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
    isConnected,
  };
}
