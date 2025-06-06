import { LuCalendarDays } from "react-icons/lu";
import FormError from "@/components/forms/FormError";
import { OptionCardSelector } from "@/components/reusables/OptionCardSelector";

export const TimeFrameSelector = () => {
  const TIME_FRAME_OPTIONS = [
    {
      value: "on_date",
      label: "On a date",
      icon: <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />,
    },
    {
      value: "before_date",
      label: "Before a date",
      icon: <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />,
    },
    {
      value: "flexible_date",
      label: "Flexible date",
      icon: <LuCalendarDays className="text-2xl mb-2.5 text-black-2" />,
    },
  ];

  return (
    <div className="mb-6">
      <OptionCardSelector
        name="time_frame"
        options={TIME_FRAME_OPTIONS}
        itemClassName="text-black-2"
        className="md:gap-[32px]"
      />
      <FormError name="time_frame" />
    </div>
  );
};
