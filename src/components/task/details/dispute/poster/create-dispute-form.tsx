import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import FormSelect from "@/components/forms/FormSelect";
import CurrencyInput from "@/components/forms/CurrencyInput";
import FormTextArea from "@/components/forms/FormTextArea";
import ImageUploader from "@/components/forms/uploader/ImageUploader";
import CustomModal from "@/components/reusables/CustomModal";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { useCreateDispute } from "@/services/dispute/dispute.hooks";
import { filterEmptyValues } from "@/utils";
import {
  disputeSchema,
  DisputeSchemaType,
  STATUS_OPTIONS,
  REQUEST_OPTIONS,
  DISPUTE_REASON_NOT_STARTED,
  DISPUTE_REASON_STARTED,
} from "../shared/dispute-form-constants";

interface CreateDisputeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORM_ID = "create-dispute-form";

export default function CreateDisputeForm({
  isOpen,
  onClose,
}: CreateDisputeFormProps) {
  const createDispute = useCreateDispute();
  const { id } = useParams();

  const methods = useForm<DisputeSchemaType>({
    defaultValues: {
      task_status: "",
      reason_for_dispute: "",
      your_request: "",
      refund_amount: "",
      details: "",
      documents: [],
    },
    resolver: zodResolver(disputeSchema),
  });

  const { watch, reset } = methods;
  const taskStatus = watch("task_status");
  const yourRequest = watch("your_request");

  const reasonOptions = useMemo(() => {
    if (taskStatus === "not_started") return DISPUTE_REASON_NOT_STARTED;
    return DISPUTE_REASON_STARTED;
  }, [taskStatus]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: DisputeSchemaType) => {
    const payload = filterEmptyValues({
      ...data,
      task_id: id,
      documents: data.documents.map((doc: any) => doc.url),
      refund_amount: Number(data.refund_amount),
    });

    createDispute.mutate(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Dispute Form"
      titleClassName="text-center"
      size="lg"
      customFooter={
        <ActionsButtons
          okText="Submit dispute"
          formId={FORM_ID}
          loading={createDispute.isPending}
          cancelText="Cancel"
          handleCancel={handleClose}
        />
      }
    >
      <FormProvider {...methods}>
        <form
          id={FORM_ID}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormSelect
            name="task_status"
            options={STATUS_OPTIONS}
            label="Task status"
          />

          <FormSelect
            name="reason_for_dispute"
            options={reasonOptions}
            label="Reason for dispute"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              name="your_request"
              options={REQUEST_OPTIONS}
              label="Your request"
              className="w-full"
            />

            <CurrencyInput
              name="refund_amount"
              label="Refund amount"
              className="w-full"
              placeholder="Enter refund amount"
              disabled={yourRequest === "review"}
            />
          </div>

          <FormTextArea
            name="details"
            label="Details"
            placeholder="Please provide detail information about the dispute"
            rows={4}
          />

          <ImageUploader
            name="documents"
            useCloudinary={true}
            folder="dispute-images"
            tags={["dispute"]}
            limit={4}
            maxFileSize={3}
            showFileDetails={true}
            gridCols={{
              base: 1,
              sm: 2,
              md: 3,
              lg: 4,
            }}
            uploadBoxIconSize="sm"
            removeButtonSize="sm"
            gap="sm"
          />
        </form>
      </FormProvider>
    </CustomModal>
  );
}
