"use client";
import React, { useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormError from "../reusables/FormError";
import SelectLabel from "../forms/SelectLabel";
import FormCheckbox from "../forms/FormCheckbox";
import FormDatePicker from "../forms/FormDatePicker";
import Icons from "../Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";
import { setTaskData } from "@/store/slices/task";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter, useSearchParams } from "next/navigation";
import PostTaskFormActions from "./PostTaskFormActions";
import dayjs from "dayjs";

const data = [
  {
    title: "Morning",
    text: "Before 10 am",
    icon: Icons.twilight,
    value: "morning",
  },
  {
    title: "Mid-day",
    text: "10am - 2pm",
    icon: Icons.clearDay,
    value: "mid_day",
  },
  {
    title: "Afternoon",
    text: "2pm - 6pm",
    icon: Icons.lightMode,
    value: "afternoon",
  },
  {
    title: "Evening",
    text: "After 6pm",
    icon: Icons.nightStay,
    value: "evening",
  },
];

const schema = postTaskSchema
  .pick({
    time_frame: true,
    date: true,
    showTimeOfDay: true,
    time: true,
  })
  .superRefine((values, ctx) => {
    if (values.showTimeOfDay && !values.time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select time of the day",
        path: ["time"],
      });
    }
  });
type schemaType = z.infer<typeof schema>;

const StepThree = () => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || 1;

  const methods = useForm<schemaType>({
    defaultValues: {
      time_frame: task.time_frame || null,
      date: task.date || "",
      showTimeOfDay: task.showTimeOfDay || false,
      time: task.time || null,
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, watch, setValue } = methods;

  useEffect(() => {
    if (task.time_frame) setValue("time_frame", task.time_frame);
    if (task.date) setValue("date", task.date);
    if (task.time) setValue("time", task.time);
    if (task.showTimeOfDay) setValue("showTimeOfDay", task.showTimeOfDay);
  }, [task]);

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
              <SelectLabel name="time_frame" value="on_date">
                <div className="w-fit flex flex-col items-center justify-center">
                  <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />
                  <Typography className="text-base text-black-2">
                    On a date
                  </Typography>
                </div>
              </SelectLabel>
              <SelectLabel name="time_frame" value="before_date">
                <div className="w-fit flex flex-col items-center justify-center">
                  <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />
                  <Typography className="text-base text-black-2">
                    Before a date
                  </Typography>
                </div>
              </SelectLabel>
              <SelectLabel name="time_frame" value="flexible_date">
                <div className="w-fit flex flex-col items-center justify-center">
                  <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />
                  <Typography className="text-base text-black-2">
                    Flexible date
                  </Typography>
                </div>
              </SelectLabel>
            </div>
            <FormError name="time_frame" />
          </div>
          <FormDatePicker
            name="date"
            label="When do you need this done?"
            className="mb-6"
            minDate={dayjs()}
          />
          <FormCheckbox
            name="showTimeOfDay"
            label="Pick a particulate time of the day."
            className="mb-6"
          />
          {watch("showTimeOfDay") && (
            <div className="mb-6">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[32px]">
                {data.map((el, i) => (
                  <SelectLabel
                    key={i}
                    name="time"
                    value={el.value}
                    showRadio={false}
                  >
                    <div className="flex flex-col gap-3 justify-center items-center">
                      {/* <Image src={el.icon} alt='' /> */}
                      <el.icon />
                      <Typography className="text-black-2 text-base font-normal">
                        {el.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-xs font-normal text-dark-grey-2"
                      >
                        {el.text}
                      </Typography>
                    </div>
                  </SelectLabel>
                ))}
              </div>
              <FormError name="time" />
            </div>
          )}
        </div>
        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
};

export default StepThree;
