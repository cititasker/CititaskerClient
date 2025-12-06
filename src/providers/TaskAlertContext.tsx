"use client";

import { TaskAlertToast } from "@/components/task/alerts/TaskAlertToast";
import { TaskAlert } from "@/components/task/hooks/useTaskAlerts";
import { useScreenBreakpoints } from "@/hooks/useScreenBreakpoints";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface TaskAlertContextProps {
  showAlert: (alert: TaskAlert) => void;
  hideAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

const TaskAlertContext = createContext<TaskAlertContextProps | undefined>(
  undefined
);

export const TaskAlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<TaskAlert[]>([]);
  const { isMediumScreen } = useScreenBreakpoints();

  const showAlert = useCallback((newAlert: TaskAlert) => {
    setAlerts((prev) => {
      if (prev.some((alert) => alert.id === newAlert.id)) {
        return prev;
      }
      return [...prev, newAlert];
    });
  }, []);

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return (
    <TaskAlertContext.Provider value={{ showAlert, hideAlert, clearAllAlerts }}>
      {children}

      {/* Alert Container */}
      <div
        className={cn(
          "fixed top-4 z-50 flex flex-col gap-3 pointer-events-none",
          isMediumScreen
            ? "right-4 w-full max-w-sm" // Desktop: right-aligned
            : "left-4 right-4" // Mobile: full width with margins
        )}
      >
        {alerts.map((alert, index) => (
          <TaskAlertToast
            key={alert.id}
            alert={alert}
            onClose={() => hideAlert(alert.id)}
            index={index}
          />
        ))}
      </div>
    </TaskAlertContext.Provider>
  );
};

export const useTaskAlert = () => {
  const context = useContext(TaskAlertContext);
  if (!context) {
    throw new Error("useTaskAlert must be used within a TaskAlertProvider");
  }
  return context;
};
