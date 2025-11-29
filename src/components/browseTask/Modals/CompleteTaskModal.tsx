import ImageUploader from "@/components/forms/uploader/ImageUploader";
import FormButton from "@/components/forms/FormButton";
import FormCheckbox from "@/components/forms/FormCheckbox";
import CustomModal from "@/components/reusables/CustomModal";
import Success from "@/components/reusables/Success";
import { Label } from "@/components/ui/label";
import { API_ROUTES } from "@/constant";
import useToggle from "@/hooks/useToggle";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useCompleteTask } from "@/services/tasks/tasks.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppSelector } from "@/store/hook";
import { initializeName } from "@/utils";

// Define the image schema structure
const uploadedImageSchema = z.object({
  id: z.string(),
  isUploaded: z.boolean(),
  name: z.string(),
  publicId: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string().url(),
});

// Main form schema
const schema = z.object({
  images: z
    .array(uploadedImageSchema)
    .min(2, "You must upload at least 2 images")
    .max(4, "You can upload a maximum of 4 images"),
  agreed: z
    .boolean()
    .refine((v) => v === true, { message: "You must confirm task completion" }),
});

type schemaType = z.infer<typeof schema>;

export default function CompleteTaskModal({ isOpen, onClose }: IModal) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { taskDetails } = useAppSelector((s) => s.task);
  const id = taskDetails?.id;
  const success = useToggle();

  const completeTask = useCompleteTask();

  const posterName = initializeName({
    first_name: taskDetails?.poster?.profile.first_name,
    last_name: taskDetails?.poster?.profile.last_name,
  });

  const methods = useForm<schemaType>({
    defaultValues: {
      images: [],
      agreed: false,
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: schemaType) => {
    console.log("Form data:", data);

    const formData = new FormData();
    formData.append("task_id", String(id));

    data.images.forEach((image) => {
      formData.append("completion_evidence[]", image.url);
    });

    completeTask.mutate(formData, {
      onSuccess: (data) => {
        success.handleOpen();
        showSnackbar(data.message, "success");
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.GET_TASK_BY_ID, String(id)],
        });
      },
      onError: (error) => {
        showSnackbar(error.message, "error");
      },
    });
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
      title={!success.isOpen ? "Complete task" : undefined}
    >
      {!success.isOpen ? (
        <div>
          <div className="mb-2.5">
            <p className="text-black-2 text-sm">
              Please provide pictures of the task completed
            </p>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label className="text-xs text-black mb-4">
                  File supported: JPEG (.jpeg) PNG (.png)
                  <br /> Maximum size: 3mb
                </Label>
                <ImageUploader
                  name="images"
                  useCloudinary={true}
                  folder="task-images"
                  tags={["task"]}
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
              </div>
              <FormCheckbox
                name="agreed"
                label="I confirm that the task has been completed"
              />
              <FormButton
                type="submit"
                size="lg"
                className="mt-5 mx-auto px-10"
                loading={completeTask.isPending}
              >
                Send
              </FormButton>
            </form>
          </FormProvider>
        </div>
      ) : (
        <Success
          title="Success!"
          desc={`${posterName} has been notified of the completed task for review and to release payment.`}
          action={<FormButton text="Message" className="w-full" href="/" />}
        />
      )}
    </CustomModal>
  );
}
