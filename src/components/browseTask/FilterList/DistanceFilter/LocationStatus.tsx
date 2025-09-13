import React from "react";

interface LocationStatusProps {
  status: "idle" | "loading" | "success" | "error";
  error: string;
  onRetry: () => void;
  onSkip: () => void;
}

type Action = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

type StatusConfig = {
  icon: string;
  message: string;
  className: string;
  spinner?: boolean;
  actions?: Action[];
};

export function LocationStatus({
  status,
  error,
  onRetry,
  onSkip,
}: LocationStatusProps) {
  if (status === "idle") return null;

  const statusConfig: Record<
    "idle" | "loading" | "success" | "error",
    StatusConfig
  > = {
    idle: {
      icon: "",
      message: "",
      className: "",
      spinner: false,
      actions: [],
    },
    loading: {
      icon: "📍",
      message: "Detecting location...",
      className: "text-blue-600 bg-blue-50 border-blue-200",
      spinner: true,
    },
    success: {
      icon: "✅",
      message: "Location detected",
      className: "text-green-600 bg-green-50 border-green-200",
      actions: [{ label: "disable", onClick: onSkip }],
    },
    error: {
      icon: "ℹ️",
      message: error,
      className: "text-amber-600 bg-amber-50 border-amber-200",
      actions: [
        { label: "Try Again", onClick: onRetry, variant: "primary" },
        { label: "Skip", onClick: onSkip, variant: "secondary" },
      ],
    },
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <div className={`text-sm p-3 rounded-lg border ${config.className}`}>
      <div className="flex items-center gap-2">
        {config.spinner && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
        )}
        <span>{config.icon}</span>
        <span className="flex-1">{config.message}</span>

        {config.actions && (
          <div className="flex gap-2 ml-auto">
            {config.actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  action.variant === "primary"
                    ? "bg-current bg-opacity-20 hover:bg-opacity-30"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
