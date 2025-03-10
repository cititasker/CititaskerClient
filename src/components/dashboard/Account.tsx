import { defaultProfile } from "@/constant/images";
import { queryClient } from "@/providers/ServerProvider";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { USERS } from "@/queries/queryKeys";
import { accountSchema, accountSchemaType } from "@/schema";
import { updateProfile, uploadProfile } from "@/services/user";
import { useAppSelector } from "@/store/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BiLoader } from "react-icons/bi";
import { MdOutlineCameraAlt } from "react-icons/md";
import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";
import { errorHandler } from "@/utils";

const Account = () => {
  const { user } = useAppSelector((state) => state.user);
  const { showSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: uploadProfile,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({ queryKey: [USERS] });
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({ queryKey: [USERS] });
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const methods = useForm<accountSchemaType>({
    defaultValues: {
      profile_image: "",
      full_name: "",
      email: "",
      phone_number: "",
      location: "",
      occupation: "",
    },
    resolver: zodResolver(accountSchema),
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (user?.profile_image) setValue("profile_image", user.profile_image);
    if (user.email) setValue("email", user.email);
    if (user?.phone_number) setValue("phone_number", user.phone_number);
    if (user?.location) setValue("location", user.location);
    if (user?.occupation) setValue("occupation", user.occupation);
    if (user.first_name && user.last_name) {
      setValue("full_name", `${user.first_name} ${user.last_name}`);
    } else if (user.first_name) {
      setValue("full_name", user.first_name);
    } else if (user?.last_name) {
      setValue("full_name", user.last_name);
    }
  }, [user]);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file);
      mutation.mutate(formData);
    }
  };

  const onSubmit: SubmitHandler<accountSchemaType> = (value) => {
    const { profile_image, ...rest } = value;
    updateProfileMutation.mutate(rest);
    console.log(profile_image);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[716px]">
        <label
          htmlFor="upload"
          className="inline-block w-[100px] h-[100px] rounded-full relative overflow-hidden group"
        >
          <Image
            src={user.profile_image ?? defaultProfile}
            alt="user profile"
            className="w-full h-full rounded-full object-cover"
            width={100}
            height={100}
          />
          <div
            className={`absolute top-0 left-0 cursor-pointer inline-flex items-center justify-center w-full h-full bg-[#000]/30 ${
              mutation.isPending
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {mutation.isPending ? (
              <BiLoader size={24} className="text-white animate-spin" />
            ) : (
              <MdOutlineCameraAlt size={24} className="text-white" />
            )}
          </div>
          <input id="upload" type="file" hidden onChange={handleUpload} />
        </label>
        <div className="mt-6">
          <Grid container columnSpacing="32px">
            <Grid size={{ xs: 12, md: 6 }}>
              <FormInput name="full_name" label="Full Name" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormInput name="email" label="Email Address" disabled />
            </Grid>
          </Grid>
          <Grid container columnSpacing="32px">
            <Grid size={{ xs: 12, md: 6 }}>
              <FormInput name="phone_number" label="Phone Number" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormInput name="location" label="Location" />
            </Grid>
          </Grid>
          <FormInput name="occupation" label="occupation" />
        </div>
        <FormButton
          type="submit"
          btnStyle="w-full mt-10"
          loading={updateProfileMutation.isPending}
        >
          Save
        </FormButton>
      </form>
    </FormProvider>
  );
};

export default Account;
