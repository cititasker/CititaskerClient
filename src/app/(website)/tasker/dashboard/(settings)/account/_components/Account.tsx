import { defaultProfile } from "@/constant/images";
import { queryClient } from "@/providers/ServerProvider";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { USERS } from "@/queries/queryKeys";
import { accountSchemaType, profileSchema, profileSchemaType } from "@/schema";
import { useAppSelector } from "@/store/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BiLoader } from "react-icons/bi";
import { MdOutlineCameraAlt } from "react-icons/md";
import FormInput from "../../../../../../../components/forms/FormInput";
import FormButton from "../../../../../../../components/forms/FormButton";
import { errorHandler, maxDate } from "@/utils";
import FormDatePicker from "../../../../../../../components/forms/FormDatePicker";
import FormSelect from "../../../../../../../components/forms/FormSelect";
import { updateProfile, uploadProfile } from "@/services/user/users.api";

const options = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

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

  const methods = useForm<profileSchemaType>({
    defaultValues: {
      profile_image: "",
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.email ?? "",
      phone_number: user.phone_number ?? "",
      gender: user.gender ?? "",
      date_of_birth: user.date_of_birth ?? "",
    },
    resolver: zodResolver(profileSchema),
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (user?.profile_image) setValue("profile_image", user.profile_image);
    if (user.first_name) setValue("first_name", user.first_name);
    if (user.last_name) setValue("last_name", user.last_name);
    if (user.email) setValue("email", user.email);
    if (user?.phone_number) setValue("phone_number", user.phone_number);
    if (user?.gender) setValue("gender", user.gender);
    if (user?.date_of_birth) setValue("date_of_birth", user.date_of_birth);
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
        <div className="mt-6 space-y-6">
          <div className="w-full flex justify-between gap-8">
            <FormInput name="first_name" label="First Name" />
            <FormInput name="last_name" label="Last Name" />
          </div>
          <div className="w-full flex justify-between gap-8">
            <FormInput name="email" label="Email" />
            <FormInput name="phone_number" label="Phone Number" />
          </div>
          <div className="w-full flex justify-between gap-8">
            <FormDatePicker
              name="date_of_birth"
              label="Date of Birth"
              maxDate={maxDate}
            />
            <FormSelect name="gender" label="Gender" options={options} />
          </div>
        </div>
        <FormButton
          type="submit"
          className="w-full mt-10"
          loading={updateProfileMutation.isPending}
        >
          Save
        </FormButton>
      </form>
    </FormProvider>
  );
};

export default Account;
