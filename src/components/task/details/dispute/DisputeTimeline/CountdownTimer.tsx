// components/dispute/DisputeTimeline/CountdownTimer.tsx
"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  endsAt: string;
  compact?: boolean;
  className?: string;
  onExpire?: () => void;
}

export function CountdownTimer({
  endsAt,
  compact = false,
  className,
  onExpire,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    totalSeconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    totalSeconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const end = new Date(endsAt).getTime();
      const difference = end - now;

      if (difference <= 0) {
        setTimeRemaining({
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          totalSeconds: 0,
        });

        if (onExpire && !timeRemaining.isExpired) {
          onExpire();
        }
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeRemaining({
        hours,
        minutes,
        seconds,
        isExpired: false,
        totalSeconds,
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [endsAt, onExpire]);

  // Determine urgency level
  const getUrgencyLevel = () => {
    const hoursRemaining = timeRemaining.totalSeconds / 3600;
    if (hoursRemaining <= 2) return "critical";
    if (hoursRemaining <= 6) return "warning";
    return "normal";
  };

  const urgency = getUrgencyLevel();

  if (timeRemaining.isExpired) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-3 rounded-lg bg-error-light border border-error",
          compact && "p-2",
          className
        )}
      >
        <AlertTriangle
          className={cn("text-error", compact ? "w-4 h-4" : "w-5 h-5")}
        />
        <span
          className={cn(
            "font-semibold text-error",
            compact ? "text-sm" : "text-base"
          )}
        >
          Time Expired - Escalating to Admin
        </span>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 rounded-lg",
          urgency === "critical" && "bg-error-light text-error",
          urgency === "warning" && "bg-warning-light text-warning",
          urgency === "normal" && "bg-primary-50 text-primary-700",
          className
        )}
      >
        <Clock className="w-4 h-4" />
        <span className="font-semibold text-sm">
          {timeRemaining.hours > 0 && `${timeRemaining.hours}h `}
          {timeRemaining.minutes}m {timeRemaining.seconds}s
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 rounded-xl border",
        urgency === "critical" && "bg-error-light border-error",
        urgency === "warning" && "bg-warning-light border-warning",
        urgency === "normal" && "bg-primary-50 border-primary-200",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <Clock
          className={cn(
            "w-5 h-5",
            urgency === "critical" && "text-error",
            urgency === "warning" && "text-warning",
            urgency === "normal" && "text-primary-700"
          )}
        />
        <span
          className={cn(
            "font-semibold text-sm",
            urgency === "critical" && "text-error",
            urgency === "warning" && "text-warning",
            urgency === "normal" && "text-primary-700"
          )}
        >
          Time Remaining to Respond
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div
            className={cn(
              "text-3xl font-bold mb-1",
              urgency === "critical" && "text-error",
              urgency === "warning" && "text-warning",
              urgency === "normal" && "text-primary-700"
            )}
          >
            {String(timeRemaining.hours).padStart(2, "0")}
          </div>
          <div className="text-xs text-neutral-600 uppercase">Hours</div>
        </div>

        <div className="text-center">
          <div
            className={cn(
              "text-3xl font-bold mb-1",
              urgency === "critical" && "text-error",
              urgency === "warning" && "text-warning",
              urgency === "normal" && "text-primary-700"
            )}
          >
            {String(timeRemaining.minutes).padStart(2, "0")}
          </div>
          <div className="text-xs text-neutral-600 uppercase">Minutes</div>
        </div>

        <div className="text-center">
          <div
            className={cn(
              "text-3xl font-bold mb-1",
              urgency === "critical" && "text-error",
              urgency === "warning" && "text-warning",
              urgency === "normal" && "text-primary-700"
            )}
          >
            {String(timeRemaining.seconds).padStart(2, "0")}
          </div>
          <div className="text-xs text-neutral-600 uppercase">Seconds</div>
        </div>
      </div>

      {urgency === "critical" && (
        <div className="mt-3 pt-3 border-t border-error">
          <p className="text-xs text-error font-medium text-center">
            ⚠️ Less than 2 hours remaining! Please respond urgently.
          </p>
        </div>
      )}
    </div>
  );
}
