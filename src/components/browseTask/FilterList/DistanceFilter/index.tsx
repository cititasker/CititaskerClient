import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGeolocation } from "./hooks/useGeolocation";
import { useUrlParams } from "./hooks/useUrlParams";
import { useDistanceForm } from "./hooks/useDistanceForm";
import { LocationStatus } from "./LocationStatus";
import { LocationInput } from "./LocationInput";
import { DistanceSliderCard } from "./DistanceSliderCard";
import { ActionButtons } from "../ActionButtons";
import { DistanceFormData, schema } from "./schema";

export default function DistanceFilter() {
  const form = useForm<DistanceFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: [],
      distance: 0,
      address: "",
      userLocation: { lat: null, lng: null },
    },
  });

  const { setValue, watch, handleSubmit, reset } = form;
  const location = watch("location");
  const address = watch("address");
  const distance = watch("distance");
  const userLocation = watch("userLocation");

  const { updateUrl, clearUrl } = useUrlParams(setValue);

  const geolocation = useGeolocation((coords) => {
    setValue("userLocation", { lat: coords[0], lng: coords[1] });
  });

  const { handleClear, hasValidLocation, getLocationParams } = useDistanceForm({
    form,
  });

  const hasCoordinates = hasValidLocation({
    location,
    address,
    distance,
    userLocation,
  });

  const onSubmit = (data: DistanceFormData) => {
    if (!hasValidLocation(data)) {
      console.warn("Cannot apply distance filter: no coordinates available");
      return;
    }

    const params = {
      distance: data.distance,
      ...getLocationParams(data),
    };

    updateUrl(params);
  };

  const handleReset = () => {
    const currentUserLocation = userLocation; // Preserve current geolocation

    reset({
      location: [],
      distance: 0,
      address: "",
      userLocation: currentUserLocation, // Keep geolocation data
    });

    // Clear manual location from URL but keep geolocation as fallback
    clearUrl(["lat", "lng", "distance"]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Distance Filter
        </h3>
        <p className="text-sm text-gray-500">
          Find tasks within your preferred distance
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Location Status */}
          <LocationStatus
            status={geolocation.status}
            error={geolocation.error}
            onRetry={geolocation.retry}
            onSkip={geolocation.skip}
          />

          {/* Location Input */}
          <LocationInput address={address} onClear={handleClear} />

          {/* Distance Slider */}
          <DistanceSliderCard value={distance} />

          {/* Coordinate requirement message */}
          {!hasCoordinates && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                Select a location or enable geolocation to use distance
                filtering
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <ActionButtons
            onReset={handleReset}
            disabled={!hasCoordinates}
            hasValues={!!address || hasCoordinates}
          />
        </form>
      </FormProvider>
    </div>
  );
}
