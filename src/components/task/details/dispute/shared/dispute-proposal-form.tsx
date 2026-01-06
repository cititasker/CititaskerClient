import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormSelect from "@/components/forms/FormSelect";
import CurrencyInput from "@/components/forms/CurrencyInput";
import FormTextArea from "@/components/forms/FormTextArea";
import ImageUploader from "@/components/forms/uploader/ImageUploader";
import CustomModal from "@/components/reusables/CustomModal";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { TRole } from "@/lib/types/dispute.types";

const MAX_IMAGE_COUNT = 3;

const proposalSchema = z
  .object({
    your_request: z.string().min(1, "Please select your proposal"),
    refund_amount: z.string().optional(),
    details: z.string().min(10, "Please provide details about your proposal"),
    documents: z
      .array(z.any())
      .max(MAX_IMAGE_COUNT, `You can upload up to ${MAX_IMAGE_COUNT} images`),
  })
  .superRefine((data, ctx) => {
    if (data.your_request !== "review" && !data.refund_amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["refund_amount"],
        message: "Please enter the refund amount",
      });
    }
  });

type ProposalFormData = z.infer<typeof proposalSchema>;

interface DisputeProposalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProposalFormData) => void;
  isLoading?: boolean;
  userRole: TRole;
}

const PROPOSAL_OPTIONS = [
  { id: "review", name: "Review" },
  { id: "partial_refund", name: "Partial Refund" },
  { id: "full_refund", name: "Full Refund" },
];

const FORM_ID = "dispute-proposal-form";

export default function DisputeProposalForm({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  userRole,
}: DisputeProposalFormProps) {
  const methods = useForm<ProposalFormData>({
    defaultValues: {
      your_request: "",
      refund_amount: "",
      details: "",
      documents: [],
    },
    resolver: zodResolver(proposalSchema),
  });

  const { watch, handleSubmit, reset } = methods;
  const selectedRequest = watch("your_request");

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: ProposalFormData) => {
    onSubmit(data);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Submit Proposal"
      titleClassName="text-center"
      size="lg"
      customFooter={
        <ActionsButtons
          okText="Send proposal"
          formId={FORM_ID}
          loading={isLoading}
          cancelText="Cancel"
          handleCancel={handleClose}
        />
      }
    >
      <FormProvider {...methods}>
        <form
          id={FORM_ID}
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              name="your_request"
              options={PROPOSAL_OPTIONS}
              label="Your proposal"
              className="w-full"
            />

            {selectedRequest !== "review" && (
              <CurrencyInput
                name="refund_amount"
                label="Refund amount"
                className="w-full"
                placeholder="Enter refund amount"
              />
            )}
          </div>

          <FormTextArea
            name="details"
            label="Comment"
            placeholder="Please provide detail information about your proposal"
            rows={4}
          />

          <ImageUploader
            name="documents"
            useCloudinary={true}
            folder="dispute-proposals"
            tags={["dispute", "proposal"]}
            limit={MAX_IMAGE_COUNT}
            maxFileSize={5}
            showFileDetails={true}
            gridCols={{
              base: 2,
              sm: 3,
              md: 4,
            }}
            uploadBoxIconSize="sm"
            removeButtonSize="sm"
            gap="sm"
          />

          <div className="bg-info-light border border-info/20 rounded-lg p-3 text-sm text-neutral-700">
            <p className="font-medium mb-1">Note:</p>
            <p>
              Your proposal will be sent to the{" "}
              {userRole === "poster" ? "Tasker" : "Poster"}. They will have 24
              hours to respond. If no response is received, the dispute will be
              escalated to CitiTasker support.
            </p>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
}
