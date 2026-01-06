"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";

import { joinPosterApi } from "@/services";
import { useSnackbar } from "@/providers/SnackbarProvider";

const posterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});

type PosterFormData = z.infer<typeof posterSchema>;

interface PosterFormProps {
  onSuccess: () => void;
}

export default function PosterForm({ onSuccess }: PosterFormProps) {
  const { showSnackbar } = useSnackbar();

  const methods = useForm<PosterFormData>({
    resolver: zodResolver(posterSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: joinPosterApi,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: any) => {
      if (error?.errors?.email) {
        const err = error.errors.email[0];
        methods.setError("email", { type: "manual", message: err });
      }
      showSnackbar(error.message, "error");
    },
  });

  const onSubmit: SubmitHandler<PosterFormData> = (values) => {
    mutation.mutate(values);
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
          type="email"
          placeholder="Enter your email address"
          disabled={mutation.isPending}
        />

        {/* Submit */}
        <FormButton
          type="submit"
          className="w-full rounded-full"
          loading={mutation.isPending}
          text="Join Waitlist"
        />
      </form>
    </FormProvider>
  );
}
