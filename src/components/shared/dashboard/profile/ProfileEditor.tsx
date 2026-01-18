"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import FormTextEditor from "@/components/reusables/FormTextEditor";

const profileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  // Add other profile fields
  name: z.string().min(1, "Name is required"),
  // ... other fields
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileEditor() {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      name: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    // Handle profile update
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput name="name" label="Name" placeholder="Enter your name" />

        <FormTextEditor
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
        />

        {/* Add other form fields */}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </FormProvider>
  );
}
