import {
  DisputeType,
  DisputeHistoryItem,
  TRole,
  ProposalType,
} from "../types/dispute.types";
import { format } from "date-fns";

export const getProposalLabel = (type: string): string => {
  const labels: Record<string, string> = {
    full_refund: "Full Refund",
    partial_refund: "Partial Refund",
    review: "Review",
  };
  return labels[type] || type;
};

export const getReasonLabel = (reason: string): string => {
  return reason
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "d MMM yyyy");
};

export const formatDateTime = (dateString: string): string => {
  return format(new Date(dateString), "d MMM yyyy hh:mma");
};

export const calculateCountdown = (targetDate: string) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    hours: Math.floor(difference / (1000 * 60 * 60)) % 24,
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    expired: false,
  };
};

// Calculate 24-hour deadline from a timestamp
export const getResponseDeadline = (timestamp: string): string => {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + 24);
  return date.toISOString();
};

export const buildDisputeHistory = (
  dispute: DisputeType
): DisputeHistoryItem[] => {
  const history: DisputeHistoryItem[] = [];

  // Initial dispute opening
  history.push({
    id: `dispute-opened-${dispute.id}`,
    type: "dispute_opened",
    actor: dispute.opend_by,
    timestamp: dispute.created_at,
    proposal: dispute.initial_proposal,
  });

  // Add all proposals
  dispute.proposals.forEach((proposal) => {
    history.push({
      id: `proposal-${proposal.id}`,
      type: "proposal_submitted",
      actor: proposal.proposer_role,
      timestamp: proposal.created_at,
      proposal,
    });

    // Add acceptance/rejection if status indicates it
    if (proposal.status === "accepted") {
      history.push({
        id: `accepted-${proposal.id}`,
        type: "proposal_accepted",
        actor: proposal.proposer_role === "poster" ? "tasker" : "poster",
        timestamp: proposal.updated_at,
        proposal,
      });
    } else if (proposal.status === "rejected") {
      history.push({
        id: `rejected-${proposal.id}`,
        type: "proposal_rejected",
        actor: proposal.proposer_role === "poster" ? "tasker" : "poster",
        timestamp: proposal.updated_at,
        proposal,
      });
    }
  });

  // Add escalation if status is escalated or beyond
  if (["escalated", "under_review", "closed"].includes(dispute.status)) {
    history.push({
      id: `escalated-${dispute.id}`,
      type: "escalated",
      actor: "cititasker",
      timestamp: dispute.last_activity,
    });
  }

  // Sort by timestamp
  return history.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const getLatestProposal = (
  dispute: DisputeType
): ProposalType | null => {
  if (dispute.proposals.length === 0) return dispute.initial_proposal;
  return dispute.proposals[dispute.proposals.length - 1];
};

export const isAwaitingResponse = (
  dispute: DisputeType,
  userRole: TRole
): boolean => {
  const latestProposal = getLatestProposal(dispute);
  if (!latestProposal) return false;

  // User is waiting if the latest proposal was made BY them and status is pending
  return (
    dispute.status === "in-negotiation" &&
    latestProposal.proposer_role === userRole &&
    latestProposal.status === "pending"
  );
};

export const canSubmitProposal = (
  dispute: DisputeType,
  userRole: TRole
): boolean => {
  const latestProposal = getLatestProposal(dispute);
  if (!latestProposal) return false;

  // User can submit if the latest proposal was NOT made by them and they haven't responded
  return (
    ["open", "in-negotiation"].includes(dispute.status) &&
    latestProposal.proposer_role !== userRole &&
    latestProposal.status === "pending"
  );
};
