import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { DistanceFormData } from "../schema";

interface UseDistanceFormProps {
  form: UseFormReturn<DistanceFormData>;
}

export function useDistanceForm({ form }: UseDistanceFormProps) {
  const autoFilledAddress = useRef(false);
  const { setValue } = form;

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
    handleClear,
    hasValidLocation,
    getLocationParams,
  };
}
