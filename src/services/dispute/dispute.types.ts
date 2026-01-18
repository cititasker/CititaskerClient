type ProposalType = {
  created_at: string;
  details: string;
  documents: [];
  id: number;
  proposer_role: TRole;
  refund_amount: number;
  request: "full_refund" | "partial_refund" | "review";
  status: string;
  updated_at: string;
};

export interface DesputeType {
  applicant: string;
  created_at: string;
  dispute_code: string;
  id: 1;
  initial_proposal: ProposalType;
  last_activity: string;
  opend_by: TRole;
  proposals: ProposalType[];
  reason_for_dispute: "poorly_done";
  respondent: string;
  status: string;
  task_status: "started" | "not_started";
  updated_at: string;
}

export interface DesputeRes {
  data: DesputeType[];
}
