"use client";
import { useEffect, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { postTaskSchema } from "@/schema/task";
import { reverseGeocode } from "@/services";
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
  const location = watch("location");
  const address = watch("address");

  // Auto-fill address from coordinates
  useEffect(() => {
    if (
      Array.isArray(location) &&
      location.length === 2 &&
      !address &&
      !autoFilledAddress.current
    ) {
      reverseGeocode(location[0], location[1]).then((addr) => {
        if (addr) {
          setValue("address", addr);
          autoFilledAddress.current = true;
        }
      });
    }
  }, [location, address, setValue]);

  const handleLocationSelect = (coords: [number, number]) => {
    const numericCoords = coords.map(Number) as [number, number];
    setValue("location", numericCoords);

    reverseGeocode(numericCoords[0], numericCoords[1]).then((addr) => {
      if (addr) {
        setValue("address", addr);
        autoFilledAddress.current = true;
      }
    });
  };

  const handleClearLocation = () => {
    setValue("address", null);
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
                <GooglePlacesAutocomplete
                  name="location"
                  label="Location"
                  onCoordinatesSelected={handleLocationSelect}
                />
              )}
            </div>
          </div>

          <PostTaskFormActions />
        </form>
      </FormProvider>
    </div>
  );
}
