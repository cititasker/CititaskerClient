"use client";
import React, { useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import FormError from "../reusables/FormError";
import SelectLabel from "../forms/SelectLabel";
import SelectState from "../forms/SelectState";
import GoogleMaps from "../forms/GoogleMaps";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useRouter, useSearchParams } from "next/navigation";
import PostTaskFormActions from "./PostTaskFormActions";
import { reverseGeocode } from "@/services";
import FormInput from "../forms/FormInput";

const schema = postTaskSchema.pick({
  location_type: true,
  state: true,
  location: true,
  address: true,
});

type schemaType = z.infer<typeof schema>;

const StepTwo = () => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || 1;

  const methods = useForm<schemaType>({
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
    if (task.location_type) setValue("location_type", task.location_type);
    if (task.location) setValue("location", task.location);
    if (task.address) setValue("address", task.address);
    if (task.state) setValue("state", task.state);
  }, [task]);

  useEffect(() => {
    if (location.length && !address) {
      getAddress();
    }
  }, [location]);

  const getAddress = async () => {
    const latitude = Number(location[0]);
    const longitude = Number(location[1]);
    const result = await reverseGeocode(latitude, longitude);
    if (result) setValue("address", result);
  };

  const onSubmit: SubmitHandler<schemaType> = (values) => {
    dispatch(setTaskData(values));
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("step", `${+step + 1}`);
    currentUrl.searchParams.set("d", "f");
    push(`${currentUrl}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-auto hide-scrollbar min-h-[65dvh] max-h-[600px] flex flex-col"
      >
        <div className="flex-1">
          <div className="mb-6">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[32px]">
              <SelectLabel name="location_type" value="in_person">
                <div className="w-fit flex flex-col items-center justify-center">
                  <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />
                  <Typography className="text-base text-black-2">
                    In-Person
                  </Typography>
                </div>
              </SelectLabel>
              <SelectLabel name="location_type" value="online">
                <div className="w-fit flex flex-col items-center justify-center">
                  <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />
                  <Typography className="text-base text-black-2">
                    Online
                  </Typography>
                </div>
              </SelectLabel>
            </div>
            <FormError name="location_type" />
          </div>
          <div className="flex items-center w-full gap-8">
            <SelectState name="state" label="State" />
            {address ? (
              <FormInput name="address" label="Location" />
            ) : (
              <GoogleMaps name="location" label="Location" />
            )}
          </div>
        </div>
        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
};

export default StepTwo;
