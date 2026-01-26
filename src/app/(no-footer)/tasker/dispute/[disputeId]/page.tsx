"use client";

import DisputeStatusHeader from "@/components/task/details/dispute/shared/dispute-status-header";
import DisputeDetailsCard from "@/components/task/details/dispute/shared/dispute-details-card";
import DisputeTimeline from "@/components/task/details/dispute/shared/dispute-timeline";
import DisputeHistory from "@/components/task/details/dispute/shared/dispute-history";
import DisputeProposalForm from "@/components/task/details/dispute/shared/dispute-proposal-form";
import DisputeActions from "@/components/task/details/dispute/shared/dispute-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispute } from "@/components/task/details/dispute/useDispute";
import { ConfirmModal } from "@/components/reusables/Modals/ConfirmModal";

export default function TaskerDisputePage() {
  const {
    dispute,
    history,
    isLoading,
    error,
    showProposalForm,
    setShowProposalForm,
    handleAcceptProposal,
    handleRejectProposal,
    handleSubmitProposal,
    isSubmittingProposal,
    isUpdatingDisputeStatus,
    showAcceptProposalForm,
    handleConfirmAcceptance,
  } = useDispute();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 p-top">
        <div className="container-w py-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dispute) {
    return (
      <div className="min-h-screen bg-neutral-50 p-top">
        <div className="container-w py-0 flex items-center justify-center">
          {error
            ? "Failed to load dispute details. Please try again."
            : "Dispute not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-top">
      <div className="container-w py-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <DisputeStatusHeader dispute={dispute} userRole="tasker" />
            <DisputeDetailsCard dispute={dispute} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <DisputeTimeline dispute={dispute} />
            <DisputeHistory
              history={history}
              userRole="tasker"
              onAcceptProposal={handleAcceptProposal}
              onRejectProposal={handleRejectProposal}
              isRejectLoading={isUpdatingDisputeStatus}
            />
          </div>
        </div>
      </div>

      <DisputeActions
        dispute={dispute}
        userRole="tasker"
        onSubmitProposal={() => setShowProposalForm(true)}
      />

      <DisputeProposalForm
        isOpen={showProposalForm}
        onClose={() => setShowProposalForm(false)}
        onSubmit={handleSubmitProposal}
        userRole="tasker"
        isLoading={isSubmittingProposal || isUpdatingDisputeStatus}
      />

      <ConfirmModal
        open={showAcceptProposalForm.isOpen}
        onClose={showAcceptProposalForm.closeModal}
        title="Accept Proposal"
        description="Are you sure you want to accept this propsosal?"
        loading={isUpdatingDisputeStatus}
        onConfirm={handleConfirmAcceptance}
        confirmText="Accept Proposal"
        cancelText="Cancel"
      />
    </div>
  );
}
