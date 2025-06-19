"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import Reviews from "../Reviews";
import { Badge } from "@/components/ui/badge";
import BioEditor from "./BioEditor";
import SkillsSection from "./SkillsSection";
import { FormSchema, schema } from "../../_utils/schema";
import CertificatesSection from "./CertificatesSection";
import ActionsButtons from "@/components/reusables/ActionButtons";

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

  const { handleSubmit, watch, formState } = methods;

  console.log(22, formState.errors);

  const bio = watch("bio");
  const skills = watch("skills");
  const certificates = watch("certificates");

  const onSubmit = (data: FormSchema) => {
    console.log("Form Submitted:", data);
    setEdit(false);
  };

  const handleCancel = () => setEdit(false);

  return (
    <div>
      {!edit && (
        <div className="flex justify-end items-center gap-4 mb-5 px-5 sm:px-[47px]">
          <FormButton
            variant="nude"
            className="text-primary px-0 py-0"
            onClick={() => setEdit(true)}
            size="sm"
            icon={<Icons.edit />}
          >
            Edit profile
          </FormButton>
          <FormButton
            variant="nude"
            className="text-primary px-0 py-0"
            onClick={() => console.log("Share")}
            size="sm"
            icon={<Icons.share />}
          >
            Share profile
          </FormButton>
        </div>
      )}

      {edit ? (
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
      ) : (
        <div className="space-y-[50px] px-5 sm:px-[47px]">
          {bio && (
            <div>
              <p className="text-sm font-bold mb-3">About me</p>
              <div dangerouslySetInnerHTML={{ __html: bio }} />
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <p className="text-sm font-bold mb-3">Skills</p>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((s, i) => (
                  <Badge
                    key={i}
                    className="bg-light-grey hover:bg-light-grey/45 text-black-2 px-4 py-2 text-sm rounded-full "
                  >
                    {s.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {bio && (
            <div>
              <Reviews />
            </div>
          )}
          {certificates && certificates.length > 0 && (
            <div>
              <p className="text-sm font-bold mb-1">Certifications:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <img
                      src="/images/Certificate.svg"
                      alt="certificate"
                      width={40}
                      height={40}
                    />
                    <div className="text-sm">
                      <p className="font-medium">{cert.institution}</p>
                      <p>Graduated {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
