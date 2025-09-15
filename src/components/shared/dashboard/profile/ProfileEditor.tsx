"use client";

import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE } from "@/constant";
import { useAppSelector } from "@/store/hook";
import { SkillsInput } from "./SkillsInput";
import { CertificatesInput } from "./CertificatesInput";
import FormTextEditor from "@/components/reusables/FormTextEditor";
import { useProfileForm } from "./hooks/useProfileForm";
import LoadingMessage from "../LoadingMessage";
import PublicProfile from "./public-view/components/PublicProfile";
import { FormActionButtons } from "../FormActionButtons";

const ProfileEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { methods, data, isLoading, mutation, onSubmit } = useProfileForm();

  const handleSubmit = async (formData: any) => {
    try {
      await onSubmit(formData);
      if (!mutation.isError) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleCancel = () => {
    methods.reset();
    setIsEditing(false);
  };

  if (isLoading) {
    return <LoadingMessage message="Loading profile..." />;
  }

  if (!isEditing) {
    return (
      <PublicProfile
        id={user?.id || ""}
        data={data}
        onEdit={() => setIsEditing(true)}
        isEdit={true}
        canShare={true}
      />
    );
  }

  return (
    <Card className="w-full shadow-none space-y-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Edit Profile
        </CardTitle>
        <FormActionButtons
          onCancel={handleCancel}
          isDisabled={mutation.isPending}
          formId="profile-form"
          isLoading={isLoading}
        />
      </CardHeader>

      <CardContent className="space-y-8 p-0">
        <FormProvider {...methods}>
          <form
            id="profile-form"
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormTextEditor
              name="bio"
              label="About Me"
              placeholder="Share your experience, skills, and what makes you unique. Help clients understand why they should choose you for their projects."
            />

            {user.role === ROLE.tasker && (
              <>
                <SkillsInput
                  name="skills"
                  label="Skills & Expertise"
                  placeholder="e.g., React Development, Graphic Design, Content Writing"
                />

                <CertificatesInput name="certificates" label="Certifications" />
              </>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
