// components/disputes/DisputeProgress.tsx
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisputeProgressProps {
  status: "open" | "in_progress" | "escalated" | "resolved" | "closed";
  escalatedAt?: string;
  resolvedAt?: string;
}

export function DisputeProgress({
  status,
  escalatedAt,
  resolvedAt,
}: DisputeProgressProps) {
  const steps = [
    {
      id: "open",
      label: "Dispute Opened",
      icon: AlertCircle,
      status: "complete" as const,
    },
    {
      id: "in_progress",
      label: "In Discussion",
      icon: Clock,
      status: status === "open" ? "pending" : ("complete" as const),
    },
    {
      id: "escalated",
      label: "Escalated to Admin",
      icon: AlertCircle,
      status: escalatedAt
        ? "complete"
        : status === "escalated"
        ? "current"
        : ("pending" as const),
    },
    {
      id: "resolved",
      label: "Resolved",
      icon: status === "closed" ? XCircle : CheckCircle2,
      status: resolvedAt ? "complete" : ("pending" as const),
    },
  ];

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="font-semibold mb-6">Dispute Progress</h3>

      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isComplete = step.status === "complete";
            const isCurrent = step.status === "current";
            const isPending = step.status === "pending";

            return (
              <div key={step.id} className="flex items-start gap-4">
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2",
                    isComplete && "bg-green-500 border-green-500",
                    isCurrent && "bg-blue-500 border-blue-500",
                    isPending && "bg-gray-100 border-gray-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isComplete && "text-white",
                      isCurrent && "text-white",
                      isPending && "text-gray-400"
                    )}
                  />
                </div>

                <div className="flex-1 pt-1">
                  <p
                    className={cn(
                      "font-medium",
                      isComplete && "text-gray-900",
                      isCurrent && "text-blue-600",
                      isPending && "text-gray-400"
                    )}
                  >
                    {step.label}
                  </p>

                  {step.id === "escalated" && escalatedAt && (
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(escalatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}

                  {step.id === "resolved" && resolvedAt && (
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(resolvedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
