"use client";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";

import FormInput from "@/components/forms/FormInput";
import SelectState from "@/components/forms/SelectState";
import { GooglePlacesAutocomplete } from "@/components/forms/GooglePlacesAutocomplete";
import PostTaskFormActions from "./partials/PostTaskFormActions";
import { LocationTypeSelector } from "./partials/LocationTypeSelector";
import FormError from "@/components/reusables/FormError";
import { useStepForm } from "../hooks/useStepForm";

// Custom schema with validation
const stepTwoSchema = postTaskSchema
  .pick({
    location_type: true,
    state: true,
    location: true,
    address: true,
  })
  .superRefine((data, ctx) => {
    if (!Array.isArray(data.location) || data.location.length !== 2) {
      ctx.addIssue({
        path: ["location"],
        code: z.ZodIssueCode.custom,
        message: "Please select a location",
      });
    }
  });

export default function StepTwo() {
  const autoFilledAddress = useRef(false);

  const { methods, onSubmit } = useStepForm({
    schema: postTaskSchema,
    pickFields: ["location_type", "state", "location", "address"],
    customSchema: stepTwoSchema,
  });

  const { watch, setValue } = methods;

  // Fixed watch usage - use individual field names
  const address = watch("address");

  const handleClearLocation = () => {
    setValue("address", undefined);
    setValue("location", []);
    autoFilledAddress.current = false;
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <LocationTypeSelector />
            <FormError name="location_type" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SelectState name="state" />

            <div className="flex-1">
              {address ? (
                <FormInput
                  name="address"
                  label="Location"
                  clearable
                  onClear={handleClearLocation}
                />
              ) : (
                <GooglePlacesAutocomplete name="location" label="Location" />
              )}
            </div>
          </div>

          <PostTaskFormActions />
        </form>
      </FormProvider>
    </div>
  );
}
