import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, User, XCircle, List } from "lucide-react";

interface TaskStatusCardProps {
  status: {
    value: string;
    label: string;
    count?: number;
  };
  isActive: boolean;
  onClick: () => void;
}

const statusIcons = {
  all: List,
  open: Clock,
  assigned: User,
  completed: CheckCircle,
  expired: XCircle,
};

const statusColors = {
  all: "bg-gray-100 text-gray-700 border-gray-200",
  open: "bg-blue-100 text-blue-700 border-blue-200",
  assigned: "bg-yellow-100 text-yellow-700 border-yellow-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  expired: "bg-red-100 text-red-700 border-red-200",
};

export function TaskStatusCard({
  status,
  isActive,
  onClick,
}: TaskStatusCardProps) {
  const Icon = statusIcons[status.value as keyof typeof statusIcons] || List;
  const colorClass =
    statusColors[status.value as keyof typeof statusColors] || statusColors.all;

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg border text-left transition-all duration-200
         hover:shadow-sm
        ${
          isActive
            ? "border-primary bg-primary/5 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${colorClass}`}>
          <Icon size={16} />
        </div>

        <div className="flex-1">
          <h3
            className={`font-medium ${
              isActive ? "text-primary" : "text-gray-900"
            }`}
          >
            {status.label}
          </h3>

          {status.count !== undefined && (
            <p className="text-xs text-gray-500 mt-1">
              {status.count} task{status.count !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {isActive && (
          <Badge
            variant="default"
            className="bg-primary text-white hidden sm:inline-block"
          >
            Active
          </Badge>
        )}
      </div>
    </button>
  );
}
