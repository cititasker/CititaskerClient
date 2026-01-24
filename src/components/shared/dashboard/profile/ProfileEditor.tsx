"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAppSelector } from "@/store/hook";
import { useGetUserProfile } from "@/services/user/user.hook";
import { useBaseMutation } from "@/hooks/useBaseMutation";
import { updateProfileDetails } from "@/services/user/users.api";
import { API_ROUTES } from "@/constant";

import PublicProfile from "./public-view/components/PublicProfile";
import FormTextEditor from "@/components/reusables/FormTextEditor";
import FormButton from "@/components/forms/FormButton";

const profileSchema = z.object({
  about_me: z.string().min(10, "Bio must be at least 10 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileEditor() {
  const { user } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetUserProfile({ id: user.id });

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { about_me: "" },
  });

  useEffect(() => {
    if (data?.data?.about_me) {
      methods.reset({ about_me: data.data.about_me });
    }
  }, [data, methods]);

  const mutation = useBaseMutation(updateProfileDetails, {
    invalidateQueryKeys: [[API_ROUTES.GET_PROFILE_DETAILS, user.id]],
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const onSubmit = (formData: ProfileFormData) => {
    mutation.mutate(formData);
  };

  if (!isEditing) {
    return (
      <PublicProfile
        id={user.id}
        data={data?.data}
        isLoading={isLoading}
        onEdit={() => setIsEditing(true)}
        canShare
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormTextEditor
          name="about_me"
          label="About me"
          placeholder="Tell us about yourself..."
        />

        <FormButton
          type="submit"
          disabled={!methods.formState.isDirty}
          loading={mutation.isPending}
          className="max-w-xs w-full"
        />
      </form>
    </FormProvider>
  );
}
