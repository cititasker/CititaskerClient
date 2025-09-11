import React from "react";
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import Image from "next/image";
import { defaultProfile } from "@/constant/images";
import { formatCurrency, formatDateAgo, initializeName } from "@/utils";
import FormButton from "../forms/FormButton";
import { validateCoordinates } from "./utils/mapUtils";
import { MapPin, Calendar, User, ExternalLink } from "lucide-react";
import StatusChip from "../reusables/StatusChip";

interface TaskMarkerProps {
  task: ITask;
}

export function TaskMarker({ task }: TaskMarkerProps) {
  const coordinates = validateCoordinates(task.location[0], task.location[1]);

  if (!coordinates) {
    console.warn(`Invalid coordinates for task ${task.id}:`, task.location);
    return null;
  }

  const redirectUrl = (id: number) => {
    const url = new URL(window.location.href);
    return url.search
      ? `${url.pathname}/${id}${url.search}`
      : `${url.pathname}/${id}`;
  };

  const customIcon = icon({
    iconUrl: "/images/citi-marker.png",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });

  return (
    <Marker position={coordinates} icon={customIcon}>
      <Popup
        className="custom-popup"
        closeButton={false}
        maxWidth={320}
        minWidth={280}
      >
        <div className="overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 pb-3">
            <div className="flex items-start justify-between gap-3">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <Image
                  src={task.poster.profile?.profile_image || defaultProfile}
                  alt="Task poster"
                  width={60}
                  height={60}
                  className="rounded-full object-cover w-[60px] h-[60px]"
                  style={{ aspectRatio: "1 / 1" }}
                />
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* Budget Display */}
              <div className="flex-1 inline-flex flex-col items-center bg-light-primary-1 rounded-lg px-3 py-2 shadow-sm border">
                <span className="text-xs text-gray-500 font-medium mb-0.5 text-center">
                  Budget
                </span>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency({ value: task.budget, noFraction: true })}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 pt-3">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-3">
              <StatusChip status={task.status} isActive />

              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="capitalize">
                  {task.location_type?.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Task Title */}
            <div className="mb-2">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                {task.name}
              </h3>
            </div>

            {/* Task Description */}
            {task.description && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {task.description}
                </p>
              </div>
            )}

            {/* Meta Information */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs text-gray-600">
                <User className="w-3.5 h-3.5 mr-2 text-gray-400" />
                <span>
                  Posted by{" "}
                  <span className="font-medium text-gray-800">
                    {initializeName({
                      first_name:
                        task.poster_profile?.first_name || "Anonymous",
                      last_name: task.poster_profile?.last_name || "User",
                    })}
                  </span>
                </span>
              </div>

              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400" />
                <span>{formatDateAgo(task.created_at)}</span>
              </div>

              {task.offer_count > 0 && (
                <div className="flex items-center text-xs text-gray-600">
                  <div className="w-3.5 h-3.5 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>
                    {task.offer_count}{" "}
                    {task.offer_count === 1 ? "offer" : "offers"} received
                  </span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <FormButton
              href={redirectUrl(task.id)}
              className="
                w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80
                text-white font-semibold py-2.5 px-4 rounded-lg
                shadow-md hover:shadow-lg
                transform hover:scale-[1.02] transition-all duration-200
                flex items-center justify-center gap-2
                border-0
              "
            >
              <span className="text-white">View Task Details</span>
              <ExternalLink className="w-4 h-4 text-white" />
            </FormButton>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
