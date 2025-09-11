"use client";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";
import FormInput from "@/components/forms/FormInput";
import SelectState from "@/components/forms/SelectState";
import { GooglePlacesAutocomplete } from "@/components/forms/GooglePlacesAutocomplete";
import { reverseGeocode } from "@/services";
import PostTaskFormActions from "./PostTaskFormActions";
import { LocationTypeSelector } from "./LocationTypeSelector";
import FormError from "@/components/reusables/FormError";

const schema = postTaskSchema
  .pick({
    location_type: true,
    state: true,
    location: true,
    address: true,
  })
  .superRefine((data, ctx) => {
    // if (data.location_type === "in_person") {
    if (!Array.isArray(data.location) || data.location.length !== 2) {
      ctx.addIssue({
        path: ["location"],
        code: z.ZodIssueCode.custom,
        message: "Please select a location",
      });
    }
    // }
  });

type SchemaType = z.infer<typeof schema>;

export default function StepTwo() {
  const { task } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") || 1);
  const autoFilledAddress = useRef(false);

  const methods = useForm<SchemaType>({
    defaultValues: {
      location_type: task.location_type || null,
      state: task.state || null,
      location: task.location || [],
      address: task.address || null,
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, watch, setValue } = methods;
  const location = watch("location");
  const address = watch("address");

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

  const onSubmit = (data: SchemaType) => {
    dispatch(setTaskData(data));

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("step", String(step + 1));
    router.push(nextUrl.toString());
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  onClear={() => {
                    setValue("address", null);
                    setValue("location", []);
                    autoFilledAddress.current = false;
                  }}
                />
              ) : (
                <GooglePlacesAutocomplete
                  name="location"
                  label="Location"
                  onCoordinatesSelected={(coords) => {
                    // Convert string coordinates to numbers
                    const numericCoords = [
                      Number(coords[0]),
                      Number(coords[1]),
                    ];
                    setValue("location", numericCoords);
                    reverseGeocode(numericCoords[0], numericCoords[1]).then(
                      (addr) => {
                        if (addr) {
                          setValue("address", addr);
                          autoFilledAddress.current = true;
                        }
                      }
                    );
                  }}
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
