import React from "react";
import { Clock, FileText } from "lucide-react";
import { DisputeHistoryItem, TRole } from "@/lib/types/dispute.types";
import {
  formatDateTime,
  formatCurrency,
  getProposalLabel,
} from "@/lib/utils/dispute-helpers";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";

interface DisputeHistoryProps {
  history: DisputeHistoryItem[];
  userRole: TRole;
  onAcceptProposal?: (proposalId: number) => void;
  onRejectProposal?: (proposalId: number) => void;
  isRejectLoading?: boolean;
}

export default function DisputeHistory({
  history,
  userRole,
  onAcceptProposal,
  onRejectProposal,
  isRejectLoading,
}: DisputeHistoryProps) {
  const getHistoryItemConfig = (item: DisputeHistoryItem) => {
    const isOwnAction = item.actor === userRole;
    const otherRole = userRole === "poster" ? "Tasker" : "Poster";

    // Fixed: User needs to act when OTHER party made the proposal and it's open
    const needsAction = !isOwnAction && item.proposal?.status === "open";

    switch (item.type) {
      case "dispute_opened":
        return {
          title: isOwnAction
            ? "You opened a dispute"
            : `${otherRole} opened a dispute`,
          bgClass: "bg-neutral-50",
          showProposal: true,
          showActions: needsAction,
        };

      case "proposal_submitted":
        return {
          title: isOwnAction ? "Your proposal" : `${otherRole}'s proposal`,
          bgClass: "bg-white border border-neutral-200",
          showProposal: true,
          showActions: needsAction,
        };

      case "proposal_accepted":
        return {
          title: isOwnAction
            ? "You accepted the proposal"
            : `${otherRole} accepted your proposal`,
          bgClass: "bg-success-light border border-success/20",
          showProposal: false,
          showActions: false,
        };

      case "proposal_rejected":
        return {
          title: isOwnAction
            ? "You rejected the proposal"
            : `${otherRole} rejected your proposal`,
          bgClass: "bg-error-light border border-error/20",
          showProposal: false,
          showActions: false,
        };

      case "escalated":
        return {
          title: "Dispute escalated to CitiTasker",
          subtitle: "Waiting for CitiTasker's feedback",
          bgClass: "bg-warning-light border border-warning/20",
          showProposal: false,
          showActions: false,
        };

      case "cititasker_stepped_in":
        return {
          title: "CitiTasker stepped in",
          subtitle: "Waiting for CitiTasker's feedback",
          bgClass: "bg-info-light border border-info/20",
          showProposal: false,
          showActions: false,
        };

      case "cititasker_comment":
        return {
          title: "CitiTasker's comment",
          subtitle: item.comment,
          bgClass: "bg-info-light border border-info/20",
          showProposal: false,
          showActions: false,
        };

      case "dispute_resolved":
        return {
          title: "Dispute resolved",
          subtitle: item.decision,
          bgClass: "bg-success-light border border-success/20",
          showProposal: true,
          showActions: false,
        };

      default:
        return {
          title: "Unknown action",
          bgClass: "bg-neutral-50",
          showProposal: false,
          showActions: false,
        };
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-neutral-900 mb-6">
        Dispute History
      </h3>

      <div className="relative space-y-6">
        {history.map((item, index) => {
          const config = getHistoryItemConfig(item);
          const isLast = index === history.length - 1;

          return (
            <div key={item.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-sm" />

              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-2 top-5 bottom-0 w-0.5 bg-neutral-200 -mb-6" />
              )}

              {/* Content */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-neutral-900">
                    {config.title}
                  </h4>
                  <span className="text-xs text-neutral-500">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>

                {config.subtitle && (
                  <p className="text-sm text-neutral-600">{config.subtitle}</p>
                )}

                {config.showProposal && item.proposal && (
                  <div
                    className={cn("rounded-lg p-4 space-y-3", config.bgClass)}
                  >
                    {config.showActions && (
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-200">
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium text-neutral-700">
                          Action required: Please respond to this proposal
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">
                          Proposal:
                        </p>
                        <p className="text-sm font-medium text-neutral-900 capitalize">
                          {getProposalLabel(item.proposal.request)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">
                          Refund amount:
                        </p>
                        <p className="text-sm font-medium text-neutral-900">
                          {formatCurrency(item.proposal.refund_amount)}
                        </p>
                      </div>
                    </div>

                    {item.proposal.details && (
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">
                          Comment:
                        </p>
                        <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                          {item.proposal.details}
                        </p>
                      </div>
                    )}

                    {item.proposal.documents.length > 0 && (
                      <div>
                        <p className="text-xs text-neutral-500 mb-2">
                          Attachments:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.proposal.documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2 py-1 bg-white border border-neutral-200 rounded text-xs hover:bg-neutral-50 transition-colors"
                            >
                              <FileText className="w-3 h-3" />
                              Doc {idx + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {config.showActions &&
                      onAcceptProposal &&
                      onRejectProposal && (
                        <div className="flex gap-3 pt-3 border-t border-neutral-200">
                          <FormButton
                            onClick={() => onAcceptProposal(item.proposal!.id)}
                            className="flex-1"
                          >
                            Accept
                          </FormButton>
                          <FormButton
                            onClick={() => onRejectProposal(item.proposal!.id)}
                            variant="outline"
                            className="flex-1"
                            loading={isRejectLoading}
                          >
                            Reject
                          </FormButton>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
