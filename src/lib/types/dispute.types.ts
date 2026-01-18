export type TRole = "poster" | "tasker";

export type DisputeStatus =
  | "open"
  | "in-negotiation"
  | "escalated"
  | "under_review"
  | "closed"
  | "finished";

export type ProposalType = {
  created_at: string;
  details: string;
  documents: string[];
  id: number;
  proposer_role: TRole;
  refund_amount: number;
  request: "full_refund" | "partial_refund" | "review";
  status: string;
  updated_at: string;
};

export interface DisputeType {
  applicant: string;
  created_at: string;
  dispute_code: string;
  id: number;
  initial_proposal: ProposalType;
  last_activity: string;
  opend_by: TRole;
  proposals: ProposalType[];
  reason_for_dispute: string;
  respondent: string;
  status: DisputeStatus;
  task_status: "started" | "not_started";
  updated_at: string;
}

export interface DisputeRes {
  data: DisputeType[];
}

export interface DisputeHistoryItem {
  id: string;
  type:
    | "dispute_opened"
    | "proposal_submitted"
    | "proposal_accepted"
    | "proposal_rejected"
    | "escalated"
    | "cititasker_stepped_in"
    | "cititasker_comment"
    | "dispute_resolved";
  actor: TRole | "cititasker";
  timestamp: string;
  proposal?: ProposalType;
  comment?: string;
  decision?: string;
}

export interface DisputeTimelineStep {
  label: string;
  date?: string;
  active: boolean;
}
