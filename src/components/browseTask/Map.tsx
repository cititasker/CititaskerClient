"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllTasksQuery } from "@/queries/task";
import { defaultProfile } from "@/constant/images";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { truncate } from "@/utils";
import Link from "next/link";
import Icons from "../Icons";

export default function Map() {
  const { data } = useSuspenseQuery(getAllTasksQuery());
  const tasks: ITask[] = data.data.data || [];

  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      scrollWheelZoom={true}
      fadeAnimation
      bounds={[[6.5244, 3.3792]]}
      boundsOptions={{ animate: true }}
      className="w-full h-full z-[99]"
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
          <Popup className="popup">
            <Link
              href={`/browse-task/${task.id}`}
              className="w-full flex gap-3 min-w-[406px] rounded-[48px]"
            >
              <div>
                <div className="flex flex-col items-center mb-[14px]">
                  <Image
                    src={task.poster.profile?.profile_image || defaultProfile}
                    alt="poster profile"
                    width={80}
                    height={80}
                    className="object-cover h-[80px] w-[80px] rounded-full"
                  />
                  <Typography className="text-center text-black-2 text-sm font-semibold">
                    Posted by
                  </Typography>
                  <Typography className="text-center text-black-2 text-sm font-semibold">
                    Taiwo J.
                  </Typography>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Icons.distance height={22} width={14} className="mt-1.5" />
                    <div>
                      <Typography className="text-xs text-black-2 font-semibold">
                        Location
                      </Typography>
                      <Typography className="text-xs text-dark-grey-2 font-normal">
                        Badore Ajah, Lagos
                      </Typography>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icons.distance height={22} width={14} className="mt-1.5" />
                    <div>
                      <Typography className="text-xs text-black-2 font-semibold">
                        Location
                      </Typography>
                      <Typography className="text-xs text-dark-grey-2 font-normal">
                        Badore Ajah, Lagos
                      </Typography>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icons.distance height={22} width={14} className="mt-1.5" />
                    <div>
                      <Typography className="text-xs text-black-2 font-semibold">
                        Location
                      </Typography>
                      <Typography className="text-xs text-dark-grey-2 font-normal">
                        Badore Ajah, Lagos
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Typography className="text-base font-medium !m-0">
                  {task.name}
                </Typography>
                <Typography
                  className="text-sm text-black !m-0"
                  title={task.description}
                >
                  {truncate(task.description, 40)}
                </Typography>
              </div>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
