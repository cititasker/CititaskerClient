import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hook";
import { updateProfileDetails } from "@/services/user/users.api";
import { useGetUserProfile } from "@/services/user/user.hook";
import { API_ROUTES } from "@/constant";
import {
  FormSchema,
  schema,
} from "@/components/shared/dashboard/profile/schema";

export const useProfileForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUserProfile({ id: user.id });

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: "",
      skills: [],
      certificates: [],
    },
  });

  const { reset } = methods;

  // Sync form with fetched data
  useEffect(() => {
    const userData = data?.data;
    if (userData) {
      reset({
        bio: userData.about_me || "",
        skills: userData.skills?.map((name: string) => ({ name })) || [],
        certificates: userData.certifications || [],
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: updateProfileDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_PROFILE_DETAILS, user.id],
      });
    },
  });

  const onSubmit = (formData: FormSchema) => {
    const payload = {
      about_me: formData.bio,
      ...(formData.skills?.length && {
        skills: formData.skills.map((s) => s.name),
      }),
      ...(formData.certificates?.length && {
        certifications: formData.certificates.map((c) => ({
          name: "Accounting",
          institution: c.institution,
          year: c.year,
        })),
      }),
    };

    mutation.mutate(payload);
  };

  return {
    methods,
    data: data?.data,
    isLoading,
    mutation,
    onSubmit,
  };
};
