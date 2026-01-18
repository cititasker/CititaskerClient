import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { DisputeType, TRole } from "@/lib/types/dispute.types";
import {
  calculateCountdown,
  getLatestProposal,
  getResponseDeadline,
} from "@/lib/utils/dispute-helpers";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface DisputeStatusHeaderProps {
  dispute: DisputeType;
  userRole: TRole;
}

export default function DisputeStatusHeader({
  dispute,
  userRole,
}: DisputeStatusHeaderProps) {
  const latestProposal = getLatestProposal(dispute);
  const deadline = latestProposal
    ? getResponseDeadline(latestProposal.created_at)
    : null;

  const [countdown, setCountdown] = useState(
    deadline
      ? calculateCountdown(deadline)
      : { hours: 0, minutes: 0, seconds: 0, expired: true }
  );

  useEffect(() => {
    if (!deadline || countdown.expired) return;

    const timer = setInterval(() => {
      const newCountdown = calculateCountdown(deadline);
      setCountdown(newCountdown);

      // Stop the timer when expired
      if (newCountdown.expired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, countdown.expired]);

  const getStatusConfig = () => {
    const otherRole = userRole === "poster" ? "Tasker" : "Poster";

    // Check who made the last proposal to determine who's waiting
    const isUserWaiting = latestProposal?.proposer_role === userRole;
    const needsUserAction = latestProposal?.proposer_role !== userRole;
    // && latestProposal?.status === "open";

    switch (dispute.status) {
      case "open":
      case "in-negotiation":
        return {
          badge: needsUserAction
            ? "Action required!"
            : isUserWaiting
            ? "Proposal sent"
            : "Dispute opened",
          title: needsUserAction
            ? "Respond to request"
            : `Wait for ${otherRole}'s response`,
          subtitle: needsUserAction
            ? `The ${otherRole} has put forward a request, please respond.`
            : undefined,
          showCountdown: !countdown.expired && needsUserAction,
        };

      case "escalated":
        return {
          badge: "Dispute escalated",
          title: "CitiTasker support will step in",
          subtitle:
            "CitiTasker support will step in to help you resolve the dispute.",
          showCountdown: false,
        };

      case "under_review":
        return {
          badge: "Under review",
          title: "Dispute under review",
          subtitle: "CitiTasker is reviewing your case.",
          showCountdown: false,
        };

      case "finished":
      case "closed":
        return {
          badge: "Closed",
          title: "Dispute closed",
          subtitle: "CitiTasker support has made a decision on this case.",
          showCountdown: false,
        };

      default:
        return {
          badge: "Unknown status",
          title: "Status unknown",
          showCountdown: false,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Card className="bg-primary-700 text-white border-0 p-6">
      <Badge
        variant="secondary"
        className="bg-white/20 text-white hover:bg-white/30 mb-4"
      >
        {config.badge}
      </Badge>

      <h2 className="text-2xl font-bold mb-2">{config.title}</h2>

      {config.subtitle && (
        <p className="text-white/90 text-sm mb-4">{config.subtitle}</p>
      )}

      {config.showCountdown && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Time remaining</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { value: countdown.hours, label: "hours" },
              { value: countdown.minutes, label: "mins" },
              { value: countdown.seconds, label: "secs" },
            ].map((unit, index) => (
              <React.Fragment key={unit.label}>
                <div className="flex flex-col items-center">
                  <div className="bg-white text-primary-700 rounded-lg px-3 py-2 text-xl font-bold min-w-[56px] text-center">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <span className="text-xs text-white/70 mt-1">
                    {unit.label}
                  </span>
                </div>
                {index < 2 && <span className="text-white/50 text-lg">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
