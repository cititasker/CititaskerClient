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
import FormError from "@/components/forms/FormError";
import PostTaskFormActions from "./PostTaskFormActions";
import { OptionCardSelector } from "@/components/reusables/OptionCardSelector";
import { LocationTypeSelector } from "./LocationTypeSelector";

const schema = postTaskSchema.pick({
  location_type: true,
  state: true,
  location: true,
  address: true,
});

type SchemaType = z.infer<typeof schema>;

const OPTIONS = [
  { label: "In-Person", value: "in_person" },
  { label: "Online", value: "online" },
];

const StepTwo = () => {
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

  console.log(1, location);
  console.log(2, address);

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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 sm:gap-y-6 min-h-[65dvh] md:max-h-[600px] overflow-auto hide-scrollbar"
      >
        <div>
          <LocationTypeSelector />
          <FormError name="location_type" />
        </div>

        <div className="flex flex-col sm:flex-row gap-y-6 gap-x-4">
          <SelectState name="state" />

          <div className="flex-1 ">
            {address ? (
              <FormInput
                name="address"
                label="Location"
                clearable
                onClear={() => {
                  setValue("address", null);
                  setValue("location", [0, 0]);
                  autoFilledAddress.current = false;
                }}
              />
            ) : (
              <GooglePlacesAutocomplete
                name="location"
                label="Location"
                onCoordinatesSelected={(coords) => {
                  setValue("location", coords);
                  reverseGeocode(coords[0], coords[1]).then((addr) => {
                    if (addr) {
                      setValue("address", addr);
                      autoFilledAddress.current = true;
                    }
                  });
                }}
              />
            )}
          </div>
        </div>

        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
};

export default StepTwo;
