import React from "react";
import { DisputeType, TRole } from "@/lib/types/dispute.types";
import { canSubmitProposal } from "@/lib/utils/dispute-helpers";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface DisputeActionsProps {
  dispute: DisputeType;
  userRole: TRole;
  onSubmitProposal: () => void;
  isLoading?: boolean;
}

export default function DisputeActions({
  dispute,
  userRole,
  onSubmitProposal,
  isLoading = false,
}: DisputeActionsProps) {
  const canSubmit = canSubmitProposal(dispute, userRole);

  if (!canSubmit) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={onSubmitProposal}
        disabled={isLoading}
        size="lg"
        className="shadow-lg gap-2"
      >
        <MessageSquare className="w-5 h-5" />
        Submit Counter Proposal
      </Button>
    </div>
  );
}
