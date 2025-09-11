"use client";

import { useFormContext } from "react-hook-form";
import { CalendarDays, Sun, Sunrise, Sunset, Moon } from "lucide-react";
import { OptionCardSelector } from "@/components/reusables/OptionCardSelector";
import FormError from "@/components/reusables/FormError";

// TimeFrameSelector Component
export const TimeFrameSelector = () => {
  const TIME_FRAME_OPTIONS = [
    {
      value: "on_date",
      label: "On a specific date",
      icon: <CalendarDays className="text-xl" />,
      description: "Task must be done on this date",
    },
    {
      value: "before_date",
      label: "Before this date",
      icon: <CalendarDays className="text-xl" />,
      description: "Task must be completed by this date",
    },
    {
      value: "flexible_date",
      label: "Flexible timing",
      icon: <CalendarDays className="text-xl" />,
      description: "I'm flexible with the date",
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-medium text-text-primary mb-3">
          How flexible are you with timing?
        </h3>
        <OptionCardSelector
          name="time_frame"
          options={TIME_FRAME_OPTIONS}
          className="gap-3"
          itemClassName="min-h-[90px] sm:min-h-[100px]"
        />
      </div>
      <FormError name="time_frame" />
    </div>
  );
};

// TimeOfDaySelector Component
export const TimeOfDaySelector = () => {
  const { watch } = useFormContext();
  const showTimeOfDay = watch("showTimeOfDay");

  if (!showTimeOfDay) return null;

  const TIME_OPTIONS = [
    {
      value: "morning",
      label: "Morning",
      description: "Before 10am",
      icon: <Sunrise className="text-lg" />,
    },
    {
      value: "mid_day",
      label: "Mid-day",
      description: "10am - 2pm",
      icon: <Sun className="text-lg" />,
    },
    {
      value: "afternoon",
      label: "Afternoon",
      description: "2pm - 6pm",
      icon: <Sun className="text-lg" />,
    },
    {
      value: "evening",
      label: "Evening",
      description: "After 6pm",
      icon: <Sunset className="text-lg" />,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div>
        <h3 className="text-base font-medium text-text-primary mb-3">
          What time of day works best?
        </h3>
        <OptionCardSelector
          name="time"
          options={TIME_OPTIONS}
          columns={2}
          className="sm:grid-cols-4"
          itemClassName="min-h-[80px] p-3"
        />
      </div>
      <FormError name="time" />
    </div>
  );
};

// LocationTypeSelector Component
export const LocationTypeSelector = () => {
  const LOCATION_OPTIONS = [
    {
      label: "In-Person",
      value: "in_person",
      icon: <CalendarDays className="text-lg" />,
      description: "Meet face-to-face",
    },
    {
      label: "Online",
      value: "online",
      icon: <CalendarDays className="text-lg" />,
      description: "Work remotely",
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-text-primary">
        How would you like this task completed?
      </h3>
      <OptionCardSelector
        name="location_type"
        options={LOCATION_OPTIONS}
        columns={2}
        itemClassName="min-h-[90px]"
      />
    </div>
  );
};
