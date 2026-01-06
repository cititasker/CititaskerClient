"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as z from "zod";

import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";
import { FormAutoComplete } from "../forms/FormAutoComplete";

import { getCategories, joinTaskerApi } from "@/services";
import { capitalize } from "@/utils";
import { useSnackbar } from "@/providers/SnackbarProvider";

const taskerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  occupation: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

type TaskerFormData = z.infer<typeof taskerSchema>;

interface TaskerFormProps {
  onSuccess: () => void;
}

export default function TaskerForm({ onSuccess }: TaskerFormProps) {
  const { showSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<ITaskCategory[]>([]);

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (categoryQuery.data?.length) {
      setCategories(
        categoryQuery.data.map((el: ITaskCategory) => ({
          ...el,
          name: capitalize(el.name),
        }))
      );
    }
  }, [categoryQuery.data]);

  const methods = useForm<TaskerFormData>({
    resolver: zodResolver(taskerSchema),
    defaultValues: {
      name: "",
      email: "",
      occupation: null,
    },
  });

  const mutation = useMutation({
    mutationFn: joinTaskerApi,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: any) => {
      showSnackbar(error.message, "error");
    },
  });

  const onSubmit: SubmitHandler<TaskerFormData> = (values) => {
    const payload = {
      ...values,
      occupation: values.occupation?.id,
    };

    mutation.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Full Name */}
        <FormInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          disabled={mutation.isPending}
        />

        {/* Email */}
        <FormInput
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          disabled={mutation.isPending}
        />

        {/* Occupation */}
        <FormAutoComplete
          name="occupation"
          label="What type of service will you provide?"
          options={categories}
          getOptionLabel={(opt) => opt.name}
          isOptionEqualToValue={(a, b) => a?.id === b?.id}
          placeholder="Select service category"
          disabled={mutation.isPending || categoryQuery.isLoading}
        />

        {/* Submit */}
        <FormButton
          className="w-full"
          type="submit"
          text="Join Waitlist"
          loading={mutation.isPending}
        />
      </form>
    </FormProvider>
  );
}
