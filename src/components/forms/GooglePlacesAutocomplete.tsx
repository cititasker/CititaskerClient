"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";
import { useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  onCoordinatesSelected?: (coords: [number, number]) => void;
}

export const GooglePlacesAutocomplete = ({
  name,
  label,
  placeholder = "Search location...",
  onCoordinatesSelected,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { control, setValue } = useFormContext();
  const { input, setInput, options } = useGooglePlacesAutocomplete();

  const listRef = useRef<HTMLDivElement>(null);

  const fetchPlaceDetails = (placeId: string) => {
    if (typeof window !== "undefined" && window.google?.maps?.places) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(
        { placeId, fields: ["geometry"] },
        (
          place: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === "OK" && place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setValue("location", [lat, lng]);
            onCoordinatesSelected?.([lat, lng]);
          }
        }
      );
    } else {
      console.error("Google Maps API is not available.");
    }
  };

  return (
    <div className="space-y-1 w-full">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between rounded-[40px] font-normal hover:bg-transparent"
              >
                {field.value?.length ? "Loading..." : placeholder}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search address..."
                  value={input}
                  onValueChange={setInput}
                />
                <CommandEmpty>No locations found.</CommandEmpty>

                <CommandList>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.place_id}
                      onSelect={() => {
                        field.onChange(opt.description);
                        fetchPlaceDetails(opt.place_id);
                        setOpen(false);
                      }}
                      className="cursor-pointer flex gap-2 items-start"
                    >
                      <FaMapMarkerAlt className="text-muted-foreground mt-1" />
                      <div className="text-left">
                        <p className="text-sm font-medium">
                          {opt.structured_formatting.main_text}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {opt.structured_formatting.secondary_text}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};
