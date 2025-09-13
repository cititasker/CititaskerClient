import React from "react";
import { formatDate, truncate } from "@/utils";
import { Calendar, MapPin, Users } from "lucide-react";
import { LOCATION_TYPE } from "@/constant";

interface TaskCardDetailsProps {
  date: string;
  locationType: LocationTypeT;
  address: string | null;
  offerCount: number;
}

const detailIcons = {
  calendar: Calendar,
  location: MapPin,
  offers: Users,
};

export function TaskCardDetails({
  date,
  locationType,
  address,
  offerCount,
}: TaskCardDetailsProps) {
  const details = [
    {
      icon: detailIcons.calendar,
      text: formatDate(date, "D MMM YYYY"),
      color: "text-blue-600",
    },
    {
      icon: detailIcons.location,
      text: `${LOCATION_TYPE[locationType]} • ${truncate(
        address || "Location not specified",
        25
      )}`,
      color: "text-green-600",
    },
    {
      icon: detailIcons.offers,
      text: `${offerCount} ${offerCount === 1 ? "Offer" : "Offers"}`,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-2">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center gap-3 text-sm">
          <div className={`p-1.5 rounded-md bg-gray-50 ${detail.color}`}>
            <detail.icon size={14} />
          </div>
          <span className="text-gray-700 flex-1">{detail.text}</span>
        </div>
      ))}
    </div>
  );
}
