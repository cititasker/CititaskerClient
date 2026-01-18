// components/disputes/DisputeTimeline.tsx
import {
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Clock,
  UserCheck,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  id: string;
  type:
    | "message"
    | "escalation"
    | "resolution"
    | "system"
    | "evidence_upload"
    | "proposal"
    | "status_change";
  actor: {
    id: string;
    name: string;
    role: "poster" | "tasker" | "admin" | "system";
    avatar?: string;
  };
  content?: string;
  metadata?: {
    status?: string;
    reason?: string;
    decision?: string;
    files?: Array<{ name: string; url: string; type: string }>;
    proposalAmount?: number;
    proposalStatus?: "pending" | "accepted" | "rejected";
  };
  createdAt: string;
}

interface DisputeTimelineProps {
  events: TimelineEvent[];
  currentUserRole: "poster" | "tasker" | "admin";
}

export function DisputeTimeline({
  events,
  currentUserRole,
}: DisputeTimelineProps) {
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "message":
        return MessageSquare;
      case "escalation":
        return AlertTriangle;
      case "resolution":
        return CheckCircle;
      case "evidence_upload":
        return Upload;
      case "proposal":
        return Clock;
      case "status_change":
        return UserCheck;
      case "system":
        return Shield;
      default:
        return MessageSquare;
    }
  };

  const getEventColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-600";
      case "escalation":
        return "bg-orange-100 text-orange-600";
      case "resolution":
        return "bg-green-100 text-green-600";
      case "evidence_upload":
        return "bg-purple-100 text-purple-600";
      case "proposal":
        return "bg-yellow-100 text-yellow-600";
      case "system":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "poster":
        return "bg-blue-100 text-blue-700";
      case "tasker":
        return "bg-green-100 text-green-700";
      case "admin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {events.map((event, index) => {
        const Icon = getEventIcon(event.type);
        const isCurrentUser = event.actor.role === currentUserRole;
        const isSystem = event.actor.role === "system";

        return (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {index !== events.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 -mb-6" />
            )}

            <div className="flex gap-4">
              {/* Avatar/Icon */}
              <div className="relative z-10">
                {isSystem ? (
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      getEventColor(event.type)
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ) : (
                  <Avatar className="w-12 h-12 border-2 border-white">
                    <AvatarImage src={event.actor.avatar} />
                    <AvatarFallback>
                      {event.actor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-gray-900">
                    {event.actor.name}
                  </span>
                  <Badge
                    className={cn(
                      "text-xs",
                      getRoleBadgeColor(event.actor.role)
                    )}
                  >
                    {event.actor.role.charAt(0).toUpperCase() +
                      event.actor.role.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(event.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Event-specific content */}
                {event.type === "message" && event.content && (
                  <div
                    className={cn(
                      "p-4 rounded-lg mt-2",
                      isCurrentUser
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                    )}
                  >
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {event.content}
                    </p>
                  </div>
                )}

                {event.type === "escalation" && (
                  <div className="p-4 rounded-lg mt-2 bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-900">
                        Dispute Escalated
                      </span>
                    </div>
                    {event.metadata?.reason && (
                      <p className="text-gray-700 text-sm">
                        {event.metadata.reason}
                      </p>
                    )}
                  </div>
                )}

                {event.type === "resolution" && (
                  <div className="p-4 rounded-lg mt-2 bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">
                        Dispute Resolved
                      </span>
                    </div>
                    {event.metadata?.decision && (
                      <p className="text-gray-700">{event.metadata.decision}</p>
                    )}
                  </div>
                )}

                {event.type === "evidence_upload" && event.metadata?.files && (
                  <div className="mt-2 space-y-2">
                    {event.metadata.files.map((file, i) => (
                      <a
                        key={i}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
                      >
                        <Upload className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-900 font-medium">
                          {file.name}
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {event.type === "proposal" && event.metadata && (
                  <div className="p-4 rounded-lg mt-2 bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900">
                        Settlement Proposal
                      </span>
                    </div>
                    {event.metadata.proposalAmount && (
                      <p className="text-gray-700 mb-2">
                        Amount:{" "}
                        <span className="font-semibold">
                          ₦{event.metadata.proposalAmount.toLocaleString()}
                        </span>
                      </p>
                    )}
                    {event.content && (
                      <p className="text-gray-700 text-sm">{event.content}</p>
                    )}
                    {event.metadata.proposalStatus && (
                      <Badge
                        className={cn(
                          "mt-2",
                          event.metadata.proposalStatus === "accepted" &&
                            "bg-green-100 text-green-700",
                          event.metadata.proposalStatus === "rejected" &&
                            "bg-red-100 text-red-700",
                          event.metadata.proposalStatus === "pending" &&
                            "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {event.metadata.proposalStatus.charAt(0).toUpperCase() +
                          event.metadata.proposalStatus.slice(1)}
                      </Badge>
                    )}
                  </div>
                )}

                {event.type === "system" && event.content && (
                  <div className="p-3 rounded-lg mt-2 bg-gray-50 border border-gray-200">
                    <p className="text-gray-700 text-sm italic">
                      {event.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
