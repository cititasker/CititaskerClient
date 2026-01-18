import { securitySchema, securitySchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { errorHandler } from "@/utils";
import { changePassword } from "@/services/auth";
import FormInput from "@/components/forms/FormInput";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormButton from "@/components/forms/FormButton";
import { Power, Trash2 } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import { DeleteConfirmModal } from "@/components/reusables/Modals/ConfirmModal";

const Security = () => {
  const { showSnackbar } = useSnackbar();
  const showPassword = useToggle();
  const showDelete = useToggle();
  const showDeactivate = useToggle();

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess(data) {
      showSnackbar(data.message, "success");
      reset();
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });
  const methods = useForm<securitySchemaType>({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    resolver: zodResolver(securitySchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<securitySchemaType> = (values) => {
    changePasswordMutation.mutate(values);
  };

  const handleDelete = () => {
    //
  };
  const handleDeactivate = () => {
    //
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <p className="mb-6 text-xl text-black font-semibold">Change password</p>
        {!showPassword.isOpen ? (
          <FormButton onClick={showPassword.handleOpen}>
            Change password
          </FormButton>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-[500px] space-y-6"
            >
              <FormInput
                name="current_password"
                label="Current Password"
                type="password"
              />
              <FormInput
                name="new_password"
                label="New Password"
                type="password"
              />
              <FormInput
                name="new_password_confirmation"
                label="Confirm Password"
                type="password"
              />
              <ActionsButtons
                okText="Save"
                className="mt-5"
                handleCancel={showPassword.handleClose}
                loading={changePasswordMutation.isPending}
              />
            </form>
          </FormProvider>
        )}
      </div>
      <div>
        <div className="flex justify-between gap-3 mb-6 md:mb-10 lg:mb-[60px]">
          <div className="max-w-[509px]">
            <p className="mb-2 sm:mb-4 text-lg sm:text-xl text-black font-semibold">
              Deactivate account
            </p>
            <p className="text-sm sm:text-base text-black">
              You will not be able to post task or accept offers on the tasks
              you have posted.
            </p>
          </div>
          <FormButton
            variant="outline"
            className="shrink-0 border-red-state-color text-red-state-color bg-red-state-color-fill  max-w-[190px] sm:w-full w-12 p-0 rounded-full flex items-center justify-center"
            onClick={showDeactivate.handleOpen}
          >
            <span className="hidden sm:inline-block">Deactivate</span>
            <Power className="sm:hidden" />
          </FormButton>
        </div>
        <div className="flex justify-between gap-3">
          <div className="max-w-[509px]">
            <p className="mb-2 sm:mb-4 text-lg sm:text-xl text-red-state-color font-semibold">
              Delete
            </p>
            <p className="text-sm sm:text-base text-black">
              All data assosiated with your account will be erased.
            </p>
          </div>
          <FormButton
            variant="outline"
            className="shrink-0 border-red-state-color text-red-state-color bg-red-state-color-fill  max-w-[190px] sm:w-full w-12 p-0 rounded-full flex items-center justify-center"
            onClick={showDelete.handleOpen}
          >
            <span className="hidden sm:inline-block">Delete</span>
            <Trash2 className="sm:hidden" />
          </FormButton>
        </div>
      </div>
      <DeleteConfirmModal
        open={showDelete.isOpen}
        onClose={showDelete.handleClose}
        title="Delete account"
        description="You want to delete your account? Note: This action is irreversible and will permanently delete your account"
        loading={false}
        onConfirm={handleDelete}
      />
      <DeleteConfirmModal
        open={showDeactivate.isOpen}
        onClose={showDeactivate.handleClose}
        type="warning"
        title="Deactivate account"
        description="You want to de-activate your account?"
        confirmText="Deactivate"
        loading={false}
        onConfirm={handleDeactivate}
      />
    </div>
  );
};

export default Security;
