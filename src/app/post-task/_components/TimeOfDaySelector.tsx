"use client";

import { useFormContext } from "react-hook-form";
import FormError from "@/components/reusables/FormError";
import Icons from "@/components/Icons";
import { OptionCardSelector } from "@/components/reusables/OptionCardSelector";

const timeOptions = [
  {
    value: "morning",
    title: "Morning",
    description: "Before 10am",
    icon: Icons.twilight,
  },
  {
    value: "mid_day",
    title: "Mid-day",
    description: "10am - 2pm",
    icon: Icons.clearDay,
  },
  {
    value: "afternoon",
    title: "Afternoon",
    description: "2pm - 6pm",
    icon: Icons.lightMode,
  },
  {
    value: "evening",
    title: "Evening",
    description: "After 6pm",
    icon: Icons.nightStay,
  },
];

export const TimeOfDaySelector = () => {
  const { watch } = useFormContext();
  const show = watch("showTimeOfDay");

  if (!show) return null;

  const options = timeOptions.map(
    ({ value, title, description, icon: Icon }) => ({
      value,
      label: (
        <div className="flex flex-col items-center gap-1">
          <Icon className="text-xl" />
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      ),
    })
  );

  return (
    <div className="mb-6">
      <OptionCardSelector
        name="time"
        options={options}
        className="grid-cols-[repeat(auto-fill,minmax(100px,1fr))]"
        itemClassName="h-[100px]"
      />
      <FormError name="time" />
    </div>
  );
};
