"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BioEditor from "./BioEditor";
import SkillsSection from "./SkillsSection";
import CertificatesSection from "./CertificatesSection";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileDetails } from "@/services/user/users.api";
import { useAppSelector } from "@/store/hook";
import { API_ROUTES, ROLE } from "@/constant";
import { FormSchema, schema } from "../schema";
import Profile from "@/app/(website)/(public_profile)/_components/profile";
import { useGetUserProfile } from "@/services/user/user.hook";
import PulseLoader from "@/components/reusables/loaders/PulseLoader";

const PersonalDetails = () => {
  const [edit, setEdit] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { data, isLoading, isPending } = useGetUserProfile({ id: user.id });

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: "",
      skills: [],
      certificates: [],
    },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    const userData = data?.data;
    if (!userData) return;

    setValue("bio", userData.about_me || "");
    setValue(
      "skills",
      userData.skills?.map((name: string) => ({ name })) || []
    );
    setValue("certificates", userData.certifications || []);
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: updateProfileDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_PROFILE_DETAILS, user.id],
      });
      setEdit(false);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = ({ bio, skills, certificates }: FormSchema) => {
    const payload: any = {
      about_me: bio,
      ...(skills?.length && { skills: skills.map((s) => s.name) }),
      ...(certificates?.length && {
        certifications: certificates.map((c) => ({
          name: "Accounting",
          institution: c.institution,
          year: c.year,
        })),
      }),
    };

    mutation.mutate(payload);
  };

  if (!edit) {
    return (
      <Profile
        id={user.id}
        onEdit={() => setEdit(true)}
        isEdit={true}
        canShare={false}
      />
    );
  }

  if (isLoading || isPending) return <PulseLoader />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <BioEditor />
        {user.role === ROLE.tasker && (
          <>
            <SkillsSection />
            <CertificatesSection />
          </>
        )}

        <div className="flex gap-4">
          <ActionsButtons
            type="submit"
            cancelText="Cancel"
            okText="Save"
            className="mt-auto sm:gap-x-5 max-w-[653px]"
            handleCancel={() => setEdit(false)}
            loading={mutation.isPending}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalDetails;
