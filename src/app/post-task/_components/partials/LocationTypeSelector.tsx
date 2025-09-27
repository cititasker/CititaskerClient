import { OptionCardSelector } from "@/components/reusables/OptionCardSelector";
import { LuCalendarDays } from "react-icons/lu";

const OPTIONS = [
  { label: "In-Person", value: "in_person", icon: <LuCalendarDays /> },
  { label: "Online", value: "online", icon: <LuCalendarDays /> },
];

export const LocationTypeSelector = () => {
  return <OptionCardSelector name="location_type" options={OPTIONS} />;
};
