import React from "react";
import FormInput from "@/components/forms/FormInput";
import { GooglePlacesAutocomplete } from "@/components/forms/GooglePlacesAutocomplete";
import { MapPin } from "lucide-react";

interface LocationInputProps {
  address: string;
  onClear: () => void;
}

export function LocationInput({ address, onClear }: LocationInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <MapPin size={16} />
        Location
      </label>

      {address ? (
        <FormInput
          name="address"
          clearable
          onClear={onClear}
          className="bg-white border-gray-200 rounded-lg"
        />
      ) : (
        <GooglePlacesAutocomplete name="location" />
      )}

      <p className="text-xs text-gray-500">
        {address
          ? "Selected location"
          : "Search for a location or enable geolocation"}
      </p>
    </div>
  );
}
