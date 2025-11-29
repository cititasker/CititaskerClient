"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";
import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AutocompleteSearch } from "./FormAutoComplete";

interface GooglePlacesAutocompleteProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const GooglePlacesAutocomplete = ({
  name,
  label,
  placeholder = "Search for a location...",
  className,
  required = false,
  disabled = false,
}: GooglePlacesAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, setValue } = useFormContext();
  const { input, setInput, options, isLoading } = useGooglePlacesAutocomplete();

  const fetchPlaceDetails = async (placeId: string, label: string) => {
    if (!window?.google?.maps?.places) return;

    setLoading(true);

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      { placeId, fields: ["geometry"] },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        setLoading(false);

        if (status === "OK" && place?.geometry?.location) {
          const lat = place?.geometry.location.lat();
          const lng = place?.geometry.location.lng();

          setValue(name, [lat, lng]);
          setValue("address", label);
        } else {
          setValue(name, undefined);
          setValue("address", undefined);
        }
      }
    );
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    // If input is cleared, also clear the form field
    if (!value.trim()) {
      setValue(name, undefined);
    }
  };

  const hasValidCoordinates = (value: any) => {
    return (
      Array.isArray(value) &&
      value.length === 2 &&
      typeof value[0] === "number" &&
      typeof value[1] === "number" &&
      !isNaN(value[0]) &&
      !isNaN(value[1])
    );
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && (
            <FormLabel
              htmlFor={name}
              className="text-sm font-medium text-text-primary"
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </FormLabel>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={disabled || loading}
                aria-expanded={open}
                aria-invalid={!!fieldState.error}
                className={cn(
                  "w-full h-12 px-4 rounded-xl border border-border-medium shadow-none justify-start font-normal",
                  "bg-background hover:bg-background-secondary transition-colors duration-200",
                  fieldState.error
                    ? "border-error focus:border-error"
                    : "border-border-light focus:border-primary hover:border-border-medium",
                  !hasValidCoordinates(field.value) && "text-text-primary",
                  (disabled || loading) && "cursor-wait opacity-50"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  {loading && (
                    <Loader2 className="h-4 w-4 animate-spin text-text-muted" />
                  )}
                  <span className="truncate">
                    {loading
                      ? "Getting location..."
                      : field.value?.label || placeholder}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0 bg-background border-border-light rounded-xl shadow-lg"
              align="start"
              sideOffset={4}
            >
              <Command shouldFilter={false}>
                <AutocompleteSearch
                  searchable
                  searchQuery={input}
                  onSearchQueryChange={handleInputChange}
                  placeholder="Type to search addresses..."
                />

                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin text-text-muted mr-2" />
                    <span className="text-sm text-text-muted">
                      Searching...
                    </span>
                  </div>
                )}

                <CommandEmpty className="py-6 text-center text-sm text-text-muted">
                  {input.length < 2
                    ? "Type at least 2 characters to search"
                    : "No locations found"}
                </CommandEmpty>

                <CommandList className="max-h-60 overflow-y-auto">
                  {options.map((option) => (
                    <CommandItem
                      key={option.place_id}
                      onSelect={() => {
                        const label = `${
                          option.structured_formatting.main_text
                        }${
                          option.structured_formatting.secondary_text
                            ? ", " + option.structured_formatting.secondary_text
                            : ""
                        }`;
                        // Set address label immediately
                        setValue("address", label);

                        // Fetch coordinates
                        fetchPlaceDetails(option.place_id, label);

                        setOpen(false);
                      }}
                      className={cn(
                        "flex items-start gap-3 p-3 cursor-pointer transition-colors duration-150",
                        "hover:bg-background-secondary text-text-primary"
                      )}
                    >
                      <MapPin className="h-4 w-4 text-text-muted mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {option.structured_formatting.main_text}
                        </p>
                        {option.structured_formatting.secondary_text && (
                          <p className="text-xs text-text-muted mt-0.5 truncate">
                            {option.structured_formatting.secondary_text}
                          </p>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
