import { securitySchema, securitySchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../forms/FormInput";
import ActionsButtons from "../reusables/ActionButtons";
import FormButton from "../forms/FormButton";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { errorHandler } from "@/utils";
import { changePassword } from "@/services/auth";

const Security = () => {
  const { showSnackbar } = useSnackbar();

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
  return (
    <div>
      <div className="w-full rounded-30 border-[0.8px] border-solid border-light-grey px-12 py-8 mb-8">
        <div className="mb-8">
          <Typography className="mb-4 text-xl text-black font-semibold">
            Password
          </Typography>
          <Typography className="text-black">
            You will always receive important notifications about any payments,
            cancellations and your account.
          </Typography>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">
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
              loading={changePasswordMutation.isPending}
            />
          </form>
        </FormProvider>
      </div>
      <div className="w-full rounded-30 border-[0.8px] border-solid border-light-grey px-12 py-8 mb-8">
        <div className="flex justify-between items-center gap-3 mb-[60px]">
          <div className="max-w-[509px]">
            <Typography className="mb-4 text-xl text-black font-semibold">
              Password
            </Typography>
            <Typography className="text-black">
              You will always receive important notifications about any
              payments, cancellations and your account.
            </Typography>
          </div>
          <FormButton
            text="Deactivate"
            btnStyle="bg-light-grey min-w-[190px] text-black"
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="max-w-[509px]">
            <Typography className="mb-4 text-xl text-red-state-color font-semibold">
              Delete
            </Typography>
            <Typography className="text-black">
              You will always receive important notifications about any
              payments, cancellations and your account.
            </Typography>
          </div>
          <FormButton
            text="Delete"
            btnStyle="bg-red-state-color min-w-[190px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Security;
