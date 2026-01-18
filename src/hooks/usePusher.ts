"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

if (typeof window !== "undefined") {
  (window as any).Pusher = Pusher;
}

// Enable Pusher logging in development only
if (process.env.NODE_ENV === "development") {
  Pusher.logToConsole = true;
}

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
  const pusherChannelRef = useRef<any>(null);
  const onNotificationRef = useRef(onNotification);

  const [connectionState, setConnectionState] = useState<string>("initialized");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!enabled || !isAuthenticated || !authToken || !user?.id) {
      setConnectionState("disabled");
      return;
    }

    if (echoRef.current) return;

    const requiredEnvVars = {
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    };

    const missingVar = Object.entries(requiredEnvVars).find(
      ([_, value]) => !value
    );
    if (missingVar) {
      console.error(
        `Missing required env var: NEXT_PUBLIC_PUSHER_${missingVar[0].toUpperCase()}`
      );
      setAuthError(`Missing ${missingVar[0]} configuration`);
      return;
    }

    setConnectionState("initializing");

    try {
      const apiBaseUrl = requiredEnvVars.apiUrl!.replace(/\/$/, "");
      const authEndpoint = `${apiBaseUrl}/broadcasting/auth`;

      // Initialize Laravel Echo with Pusher
      echoRef.current = new Echo({
        broadcaster: "pusher",
        key: requiredEnvVars.key,
        cluster: requiredEnvVars.cluster,
        forceTLS: true,
        encrypted: true,
        authEndpoint,
        auth: {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        },
        enabledTransports: ["ws", "wss"],
      });

      const pusherInstance = echoRef.current.connector.pusher;

      // Monitor connection state changes
      pusherInstance.connection.bind("state_change", (states: any) => {
        setConnectionState(states.current);
        if (states.current === "connected") {
          setAuthError(null);
        }
      });

      pusherInstance.connection.bind("error", (err: any) => {
        console.error("Pusher connection error:", err);
        setAuthError(err.error?.message || "Connection error");
      });

      // Subscribe to user's private channel
      const channelName = `user.${user.id}`;
      const echoChannel = echoRef.current.private(channelName);
      pusherChannelRef.current = pusherInstance.channel(
        `private-${channelName}`
      );

      // Monitor subscription errors
      pusherChannelRef.current.bind(
        "pusher:subscription_error",
        (status: any) => {
          console.error("Channel subscription failed:", status);
          setAuthError(`Subscription failed: ${status}`);
        }
      );

      // Listen for Laravel notification broadcasts
      echoChannel.notification((notification: any) => {
        onNotificationRef.current?.(notification, notification.type);
      });

      // Listen for specific notification types
      NOTIFICATION_TYPES.forEach((notificationType) => {
        const eventName = `App\\Notifications\\${notificationType}`;
        pusherChannelRef.current.bind(eventName, (data: any) => {
          onNotificationRef.current?.(data, notificationType);
        });
      });
    } catch (error) {
      console.error("Failed to initialize Pusher:", error);
      setConnectionState("error");
      setAuthError(error instanceof Error ? error.message : "Unknown error");
    }

    // Cleanup function
    return () => {
      if (pusherChannelRef.current) {
        NOTIFICATION_TYPES.forEach((notificationType) => {
          pusherChannelRef.current.unbind(
            `App\\Notifications\\${notificationType}`
          );
        });
        pusherChannelRef.current = null;
      }

      if (echoRef.current) {
        echoRef.current.leave(`user.${user.id}`);
        echoRef.current.disconnect();
        echoRef.current = null;
      }

      setConnectionState("disconnected");
    };
  }, [enabled, isAuthenticated, authToken, user?.id]);

  return {
    echo: echoRef.current,
    channel: pusherChannelRef.current,
    isConnected: connectionState === "connected",
    connectionState,
    authError,
  };
}
