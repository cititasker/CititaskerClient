"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useNotificationsData } from "@/hooks/useNotificationsData";

type NotificationsContextType = ReturnType<typeof useNotificationsData> | null;

const NotificationsContext = createContext<NotificationsContextType>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();

  // Only initialize notifications when authenticated
  const isAuthenticated = status === "authenticated";

  // This will return default/empty state when not authenticated
  const notifications = useNotificationsData(isAuthenticated);

  return (
    <NotificationsContext.Provider value={notifications}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  }

  return context;
}
