"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, schema } from "../../_utils/schema";
import BioEditor from "./BioEditor";
import SkillsSection from "./SkillsSection";
import CertificatesSection from "./CertificatesSection";
import ActionsButtons from "@/components/reusables/ActionButtons";
import PersonalDetailsPreview from "@/components/tasker/ProfileView/PersonalDetailsPreview";

const PersonalDetails = () => {
  const [edit, setEdit] = useState(false);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: "",
      skills: [],
      certificates: [],
    },
  });

  const { handleSubmit, watch } = methods;

  const bio = watch("bio");
  const skills = watch("skills");
  const certificates = watch("certificates");

  const onSubmit = (data: FormSchema) => {
    console.log("Form Submitted:", data);
    setEdit(false);
  };

  const handleCancel = () => setEdit(false);

  if (!edit) {
    return (
      <PersonalDetailsPreview
        data={{ bio, skills, certificates }}
        onEdit={() => setEdit(true)}
        isEdit={true}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <BioEditor />
        <SkillsSection />
        <CertificatesSection />
        <div className="flex gap-4 pt-4 px-5 sm:px-[47px]">
          <ActionsButtons
            type="submit"
            cancelText="Cancel"
            okText="Save"
            className="mt-auto sm:gap-x-5 max-w-[653px]"
            handleCancel={handleCancel}
            loading={false}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalDetails;
