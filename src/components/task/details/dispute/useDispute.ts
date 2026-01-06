"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useFetchDispute,
  useRejectDisputeProposal,
  useUpdateProposal,
} from "@/services/dispute/dispute.hooks";
import { buildDisputeHistory } from "@/lib/utils/dispute-helpers";
import useModal from "@/hooks/useModal";
import { filterEmptyValues } from "@/utils";

export function useDispute() {
  const params = useParams();
  const taskId = params.disputeId as string;
  const [proposalId, setProposalId] = useState<any>(null);

  const [showProposalForm, setShowProposalForm] = useState(false);
  const showAcceptProposalForm = useModal();

  const { data, isLoading, error } = useFetchDispute(taskId);
  const rejectDisputeProposal = useRejectDisputeProposal();
  const updateDisputeStatus = useUpdateProposal();

  const dispute = data?.data?.[0];
  const history = dispute ? buildDisputeHistory(dispute) : [];

  const handleAcceptProposal = (proposalId: number) => {
    setProposalId(proposalId);
    showAcceptProposalForm.openModal();
  };

  const handleRejectProposal = async (proposalId: number) => {
    setProposalId(proposalId);
    setShowProposalForm(true);
  };

  const handleConfirmAcceptance = async () => {
    await updateDisputeStatus.mutateAsync({
      proposal_id: proposalId,
      status: "accept",
    });
    showAcceptProposalForm.closeModal();
  };

  const handleSubmitProposal = async (data: any) => {
    const payload = filterEmptyValues({
      ...data,
      dispute_id: dispute?.id,
      documents: data.documents.map((doc: any) => doc.url),
      refund_amount:
        data.your_request == "revision" ? 0 : Number(data.refund_amount),
    });
    await updateDisputeStatus.mutateAsync({
      proposal_id: proposalId,
      status: "reject",
    });
    await rejectDisputeProposal.mutateAsync(payload);
    setShowProposalForm(false);
  };

  return {
    // data
    dispute,
    history,

    // loading & error
    isLoading,
    error,

    // proposal form state
    showAcceptProposalForm,
    showProposalForm,
    setShowProposalForm,

    // actions
    handleAcceptProposal,
    handleRejectProposal,
    handleSubmitProposal,
    handleConfirmAcceptance,

    // mutation state
    isSubmittingProposal: rejectDisputeProposal.isPending,
    isUpdatingDisputeStatus: updateDisputeStatus.isPending,
  };
}
