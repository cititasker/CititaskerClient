"use client";
import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TaskMarker } from "./TaskMarker";
import { calculateMapBounds, getMapCenter } from "./utils/mapUtils";

interface TaskMapProps {
  tasks: ITask[];
}

export function TaskMap({ tasks }: TaskMapProps) {
  const mapBounds = useMemo(() => calculateMapBounds(tasks), [tasks]);
  const mapCenter = useMemo(() => getMapCenter(tasks), [tasks]);

  // Filter tasks with valid coordinates
  const validTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const [lat, lng] = task.location;
        return !isNaN(Number(lat)) && !isNaN(Number(lng));
      }),
    [tasks]
  );

  if (tasks.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No tasks to display on map</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapBounds ? undefined : 10}
      bounds={mapBounds}
      boundsOptions={{
        padding: [20, 20],
        maxZoom: 15,
      }}
      zoomSnap={0.5}
      zoomDelta={0.5}
      scrollWheelZoom={true}
      className="w-full h-full z-20"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validTasks.map((task) => (
        <TaskMarker key={task.id} task={task} />
      ))}
    </MapContainer>
  );
}
