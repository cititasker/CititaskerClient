import ImageUploader from "@/components/forms/uploader/ImageUploader";
import FormButton from "@/components/forms/FormButton";
import FormCheckbox from "@/components/forms/FormCheckbox";
import CustomModal from "@/components/reusables/CustomModal";
import Success from "@/components/reusables/Success";
import { Label } from "@/components/ui/label";
import { API_ROUTES } from "@/constant";
import useToggle from "@/hooks/useToggle";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useRequestPayment } from "@/services/tasks/tasks.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        src: z.string().min(1, "Image source is required"),
        new: z.boolean().optional(),
      })
    )
    .min(2, "You must upload at least 2 images"),

  agreed: z
    .boolean()
    .refine((v) => v === true, { message: "You must confirm task completion" }),
});

type schemaType = z.infer<typeof schema>;

export default function CompleteTaskModal({ isOpen, onClose }: IModal) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { id } = useParams() as { id: string };
  const success = useToggle();

  const requestPaymentMutation = useRequestPayment();

  const methods = useForm<schemaType>({
    defaultValues: {
      images: [],
      agreed: false,
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = () => {
    requestPaymentMutation.mutate(
      { task_id: id },
      {
        onSuccess: (data) => {
          success.handleOpen();
          showSnackbar(data.message, "success");
          queryClient.invalidateQueries({
            queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
          });
        },
        onError: (error) => {
          showSnackbar(error.message, "error");
        },
      }
    );
  };

  const handleClose = () => {
    onClose();
    success.handleClose();
    reset();
  };
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      contentClassName="max-w-md"
      title={!success.isOpen ? "Complete task" : undefined}
    >
      {!success.isOpen ? (
        <div>
          <div className="mb-2.5">
            <p className="text-black-2 text-sm">
              Please provide pictures/videos of the task completed
            </p>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label className="text-xs text-black mb-4">
                  File supported: JPEG (.jpeg) PNG (.png)
                  <br /> Maximum size: 5mb
                </Label>
                <ImageUploader name="images" multiple limit={4} />
              </div>
              <FormCheckbox
                name="agreed"
                label="I confirm that the task has been completed"
              />
              <FormButton
                type="submit"
                size="lg"
                className="mt-5 mx-auto px-10"
                loading={requestPaymentMutation.isPending}
              >
                Send
              </FormButton>
            </form>
          </FormProvider>
        </div>
      ) : (
        <Success
          title="Success!"
          desc="Judith N. has been notified of the completed task for review and to release payment."
          action={<FormButton text="Message" className="w-full" />}
        />
      )}
    </CustomModal>
  );
}
