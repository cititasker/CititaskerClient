"use client";
import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

if (typeof window !== "undefined") {
  (window as any).Pusher = Pusher;
}

// Notification event types
const NOTIFICATION_TYPES = [
  "NewDisputeNotification",
  "DisputeProposalNotification",
  "PaymentRequestNotification",
  "NewOfferNotification",
  "TaskCompletionNotification",
  "RescheduleApprovedNotification",
  "RescheduleRejectedWithCounterNotification",
  "RescheduleCounterAcceptedNotification",
  "RescheduleCounterRejectedNotification",
  "TaskerRescheduleRequestNotification",
  "PosterCancelledTaskNotification",
  "OfferWithdrawnNotification",
  "NewDisputeProposalNotification",
  "RegistrationNotification",
  "PasswordResetNotification",
  "RequestTaskSurchargeRequest",
] as const;

interface UsePusherOptions {
  onNotification?: (notification: any, type: string) => void;
  enabled?: boolean;
}

export function usePusher(options: UsePusherOptions = {}) {
  const { onNotification, enabled = true } = options;
  const { user, authToken, isAuthenticated } = useAuth();
  const echoRef = useRef<any>(null);
  const channelRef = useRef<any>(null);

  const onNotificationRef = useRef(onNotification);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  // Initialize Echo
  useEffect(() => {
    if (!enabled || !isAuthenticated || !authToken || !user?.id) {
      return;
    }

    // Prevent duplicate connections
    if (echoRef.current) {
      return;
    }

    console.log("Initializing Pusher connection...");

    // Initialize Laravel Echo with Pusher
    echoRef.current = new Echo({
      broadcaster: "pusher",
      key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
      authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      },
    });

    // Subscribe to private user
    const channelName = `user.${user.id}`;
    channelRef.current = echoRef.current.private(channelName);

    console.log("Pusher connected:", channelName);

    // Bind each notification type
    NOTIFICATION_TYPES.forEach((notificationType) => {
      const eventName = `App\\Models\\User.${notificationType}`;

      channelRef.current.listen(eventName, (data: any) => {
        console.log(`Received ${notificationType}:`, data);
        onNotificationRef.current?.(data, notificationType);
      });

      console.log(`Listening to: ${eventName}`);
    });

    return () => {
      if (channelRef.current) {
        NOTIFICATION_TYPES.forEach((notificationType) => {
          const eventName = `App\\Models\\User.${notificationType}`;
          channelRef.current.stopListening(eventName);
        });
        echoRef.current?.leave(channelName);
      }
      echoRef.current?.disconnect();
      echoRef.current = null;
      channelRef.current = null;
      console.log("Pusher disconnected");
    };
  }, [enabled, isAuthenticated, authToken, user?.id]);

  return {
    echo: echoRef.current,
    channel: channelRef.current,
  };
}
