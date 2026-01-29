import FormButton from "@/components/forms/FormButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import HelpModal from "../HelpModal";
import { UseModalReturn } from "@/constant/interface";
import DisputeForm from "./DisputeForm";
import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/store/hook";

interface IProps {
  helpModal: UseModalReturn;
  taskId: string;
  hasDispute: boolean;
}

export default function DisputeCenter({
  helpModal,
  taskId,
  hasDispute,
}: IProps) {
  const disputeModal = useModal();
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      <Card className="shadow-none sm:shadow-sm sm:border-border-light">
        <CardHeader className="px-0 sm:px-5 py-2 text-black">
          <CardTitle className="text-2xl">Resolution centre</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-5">
          <p className="">Resolve task issues.</p>
          <FormButton
            variant="link"
            className="p-0 h-auto mt-1.5 underline"
            href={hasDispute ? `/${user.role}/dispute/${taskId}` : undefined}
            onClick={!hasDispute ? () => helpModal.openModal() : undefined}
          >
            {hasDispute ? "View dispute" : "Open dispute"}
          </FormButton>
        </CardContent>
      </Card>

      <HelpModal
        isOpen={helpModal.isOpen}
        onClose={helpModal.closeModal}
        handleSubmit={() => {
          helpModal.closeModal();
          disputeModal.openModal();
        }}
      />
      <DisputeForm
        isOpen={disputeModal.isOpen}
        onClose={disputeModal.closeModal}
      />
    </div>
  );
}
