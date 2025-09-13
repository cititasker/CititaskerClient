"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLoader } from "react-icons/bi";
import { MdOutlineCameraAlt } from "react-icons/md";

import { useMutation } from "@tanstack/react-query";
import { updateProfile, uploadProfile } from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { queryClient } from "@/providers/ServerProvider";
import { USERS } from "@/queries/queryKeys";
import { profileSchema, profileSchemaType, accountSchemaType } from "@/schema";
import { useAppSelector } from "@/store/hook";
import { errorHandler, getMaxDate } from "@/utils";
import { defaultProfile } from "@/constant/images";

import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormButton from "@/components/forms/FormButton";

const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

export default function Account() {
  const { user } = useAppSelector((state) => state.user);
  const { showSnackbar } = useSnackbar();

  const profileUpload = useMutation({
    mutationFn: uploadProfile,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({ queryKey: [USERS] });
    },
    onError: (error) => showSnackbar(errorHandler(error), "error"),
  });

  const profileUpdate = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({ queryKey: [USERS] });
    },
    onError: (error) => showSnackbar(errorHandler(error), "error"),
  });

  const methods = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profile_image: user.profile_image ?? "",
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.email ?? "",
      phone_number: user.phone_number ?? "",
      gender: user.gender ?? "",
      date_of_birth: user.date_of_birth ?? "",
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (user) {
      setValue("profile_image", user.profile_image ?? "");
      setValue("first_name", user.first_name ?? "");
      setValue("last_name", user.last_name ?? "");
      setValue("email", user.email ?? "");
      setValue("phone_number", user.phone_number ?? "");
      setValue("gender", user.gender ?? "");
      setValue("date_of_birth", user.date_of_birth ?? "");
    }
  }, [user]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file);
      profileUpload.mutate(formData);
    }
  };

  const onSubmit: SubmitHandler<accountSchemaType> = (values) => {
    const { profile_image, ...rest } = values;
    profileUpdate.mutate(rest);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[716px] w-full">
        {/* Profile Image Upload */}
        <label
          htmlFor="upload"
          className="inline-block w-[100px] h-[100px] rounded-full relative overflow-hidden group"
        >
          <Image
            src={user.profile_image ?? defaultProfile}
            alt="user profile"
            width={200}
            height={200}
            className="object-cover w-full h-full rounded-full"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${
              profileUpload.isPending
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {profileUpload.isPending ? (
              <BiLoader size={24} className="text-white animate-spin" />
            ) : (
              <MdOutlineCameraAlt size={24} className="text-white" />
            )}
          </div>
          <input id="upload" type="file" hidden onChange={handleUpload} />
        </label>

        {/* Form Fields */}
        <div className="mt-6 space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput name="first_name" label="First Name" />
            <FormInput name="last_name" label="Last Name" />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput name="email" label="Email" />
            <FormInput name="phone_number" label="Phone Number" />
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDatePicker
              name="date_of_birth"
              label="Date of Birth"
              maxDate={getMaxDate(18)}
            />
            <FormSelect name="gender" label="Gender" options={genderOptions} />
          </div>
        </div>

        {/* Submit */}
        <FormButton
          type="submit"
          className="w-full mt-10"
          loading={profileUpdate.isPending}
        >
          Save
        </FormButton>
      </form>
    </FormProvider>
  );
}
