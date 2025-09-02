"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngBounds } from "leaflet";
import { defaultProfile } from "@/constant/images";
import Image from "next/image";
import { formatCurrency, formatDateAgo, initializeName } from "@/utils";
import FormButton from "../forms/FormButton";
import { useEffect, useState } from "react";

interface IProps {
  tasks: ITask[];
}
export default function Map({ tasks }: IProps) {
  const [mapBounds, setMapBounds] = useState<LatLngBounds | undefined>(
    undefined
  );

  useEffect(() => {
    if (tasks.length > 0) {
      const bounds = tasks.map((task) => [
        Number(task.location[0]),
        Number(task.location[1]),
      ]) as [number, number][];

      setMapBounds(new LatLngBounds(bounds));
    }
  }, [tasks]);

  const redirectUrl = (id: any) => {
    const url = new URL(window.location.href);
    if (url.search) {
      return `${url.pathname}/${id}/${url.search}`;
    }
    return `${url.pathname}/${id}`;
  };

  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={10}
      zoomSnap={0.5}
      zoomDelta={0.5}
      scrollWheelZoom={true}
      fadeAnimation
      // bounds={[[6.5244, 3.3792]]}
      bounds={mapBounds}
      boundsOptions={{ animate: true }}
      className="w-full h-full z-20"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tasks.map((task) => (
        <Marker
          key={task.id}
          position={[Number(task.location[0]), Number(task.location[1])]}
          icon={icon({
            iconUrl: "/images/citi-marker.png",
            iconSize: [25, 35],
            attribution:
              '&copy; <a href="https://www.flaticon.com/free-icons/address" title="address icons">Address icons created by hqrloveq - Flaticon</a>',
          })}
        >
          <Popup className="popup" closeButton={false}>
            <div>
              <div className="mb-2 flex gap-3 justify-between w-full">
                <Image
                  src={task.poster.profile?.profile_image || defaultProfile}
                  alt="poster profile"
                  width={80}
                  height={80}
                  className="object-cover h-[80px] w-[80px] rounded-full"
                />
                <div className="w-fit rounded-lg px-4 py-3 bg-[#EEFAFE] text-center">
                  <span className="text-sm text-dark-grey-2 inline-block mb-1">
                    Task Budget
                  </span>
                  <p className="text-2xl font-semibold text-black">
                    {formatCurrency({ value: task.budget, noFraction: true })}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-base font-medium mb-1">{task.name}</h2>
                <p className="text-xs font-normal">
                  Posted by{" "}
                  <span className="text-secondary">
                    {initializeName({
                      first_name: task.poster_profile?.first_name,
                      last_name: task.poster_profile?.last_name,
                    })}
                  </span>{" "}
                  {formatDateAgo(task.created_at)}
                </p>
              </div>
              <FormButton
                href={redirectUrl(task.id)}
                text="View task"
                className="!text-white w-full mt-3 h-10"
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
