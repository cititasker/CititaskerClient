import { useRef, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { reverseGeocode } from "@/services";
import { DistanceFormData } from "../schema";

interface UseDistanceFormProps {
  form: UseFormReturn<DistanceFormData>;
}

export function useDistanceForm({ form }: UseDistanceFormProps) {
  const autoFilledAddress = useRef(false);
  const { setValue, watch } = form;
  const location = watch("location");
  const address = watch("address");

  // Auto-fill address when location changes
  useEffect(() => {
    if (
      Array.isArray(location) &&
      location.length === 2 &&
      !address &&
      !autoFilledAddress.current
    ) {
      reverseGeocode(location[0], location[1])
        .then((addr) => {
          console.log("RUN", addr);
          if (addr) {
            setValue("address", addr);
            autoFilledAddress.current = true;
          } else {
            // Fallback address
            setValue(
              "address",
              `Location (${location[0].toFixed(4)}, ${location[1].toFixed(4)})`
            );
          }
        })
        .catch((error) => {
          console.warn("Reverse geocoding failed:", error);
          // Set fallback address
          setValue(
            "address",
            `Location (${location[0].toFixed(4)}, ${location[1].toFixed(4)})`
          );
        });
    }
  }, [location, address, setValue]);

  const handleLocationSelect = async (coords: [number, number]) => {
    setValue("location", coords);
    autoFilledAddress.current = true; // Prevent auto-fill effect

    try {
      const addr = await reverseGeocode(coords[0], coords[1]);
      if (addr) {
        setValue("address", addr);
      } else {
        setValue(
          "address",
          `Location (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`
        );
      }
    } catch (error) {
      console.warn("Reverse geocoding failed:", error);
      setValue(
        "address",
        `Location (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`
      );
    }
  };

  const handleClear = () => {
    setValue("address", "");
    setValue("location", []);
    autoFilledAddress.current = false;
  };

  const hasValidLocation = (data: DistanceFormData) => {
    return (
      (Array.isArray(data.location) && data.location.length === 2) ||
      (data.userLocation.lat && data.userLocation.lng)
    );
  };

  const getLocationParams = (
    data: DistanceFormData
  ): Record<string, number> => {
    // Check manual location selection first
    if (Array.isArray(data.location) && data.location.length === 2) {
      const lat = Number(data.location[0]);
      const lng = Number(data.location[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    // Check geolocation fallback
    if (data.userLocation.lat !== null && data.userLocation.lng !== null) {
      const lat = Number(data.userLocation.lat);
      const lng = Number(data.userLocation.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    return {};
  };

  return {
    handleLocationSelect,
    handleClear,
    hasValidLocation,
    getLocationParams,
  };
}
