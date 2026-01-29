"use client";

import { useState, useEffect, useMemo } from "react";
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
import ActionsButtons from "@/components/reusables/ActionButtons";
import { SkillsInput } from "./SkillsInput";
import { CertificatesInput } from "./CertificatesInput";

const profileSchema = z.object({
  about_me: z.string().min(10, "Bio must be at least 10 characters"),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill name is required"),
      }),
    )
    .optional()
    .default([]),
  certifications: z
    .array(
      z.object({
        name: z.string().min(1, "Certificate name is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.string().min(1, "Year is required"),
      }),
    )
    .optional()
    .default([]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfilePayload {
  about_me: string;
  skills: string[];
  certifications: {
    name: string;
    institution: string;
    year: string;
  }[];
}

export default function ProfileEditor() {
  const { user } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetUserProfile({ id: user.id });

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      about_me: "",
      skills: [],
      certifications: [],
    },
  });

  // Initialize form with user data
  useEffect(() => {
    if (!data?.data) return;

    methods.reset({
      about_me: data.data.about_me ?? "",
      skills: (data.data.skills ?? []).map((skill: string) => ({
        name: skill,
      })),
      certifications: data.data.certifications ?? [],
    });
  }, [data, methods]);

  const mutation = useBaseMutation(updateProfileDetails, {
    invalidateQueryKeys: [[API_ROUTES.GET_PROFILE_DETAILS, user.id]],
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const onSubmit = (formData: ProfileFormData) => {
    // Transform form data to API payload format
    const payload: ProfilePayload = {
      about_me: formData.about_me,
      skills: (formData.skills ?? []).map((skill) => skill.name),
      certifications: formData.certifications ?? [],
    };

    console.log("Submitting payload:", payload);
    mutation.mutate(payload);
  };

  // Check if form has any changes
  const hasChanges = useMemo(() => {
    return methods.formState.isDirty && !mutation.isPending;
  }, [methods.formState.isDirty, mutation.isPending]);

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
        {/* About Me Section */}
        <FormTextEditor
          name="about_me"
          label="About Me"
          placeholder="Tell us about yourself, your experience, and what makes you unique..."
        />

        {/* Skills Section */}
        <SkillsInput
          name="skills"
          label="Skills"
          placeholder="Add your skills..."
        />

        {/* Certifications Section */}
        <CertificatesInput
          name="certifications"
          label="Certifications"
          maxCertificates={10}
        />

        {/* Action Buttons */}
        <div className="pt-4 border-t border-border-light">
          <ActionsButtons
            type="submit"
            okText="Save Changes"
            cancelText="Cancel"
            disabled={!hasChanges}
            loading={mutation.isPending}
            className="max-w-xs w-full"
            handleCancel={() => {
              methods.reset();
              setIsEditing(false);
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
}
