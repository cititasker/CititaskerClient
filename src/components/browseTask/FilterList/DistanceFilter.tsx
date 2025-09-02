import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "@/components/forms/GooglePlacesAutocomplete";
import { reverseGeocode } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.object({
  location: z.any(),
  distance: z.number(),
  address: z.string(),
  userLocation: z.object({ lat: z.any(), lng: z.any() }),
});

type RangeForm = z.infer<typeof schema>;

export default function DistanceFilter() {
  const autoFilledAddress = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const method = useForm<RangeForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: [],
      distance: 0,
      address: "",
      userLocation: {
        lat: null,
        lng: null,
      },
    },
  });

  const { setValue, watch, handleSubmit, reset } = method;

  const location = watch("location");
  const address = watch("address");
  const distance = watch("distance");

  useEffect(() => {
    if (
      Array.isArray(location) &&
      location.length === 2 &&
      !address &&
      !autoFilledAddress.current
    ) {
      reverseGeocode(location[0], location[1]).then((addr) => {
        if (addr) {
          setValue("address", addr);
          autoFilledAddress.current = true;
        }
      });
    }
  }, [location, address, setValue]);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const distance = searchParams.get("distance");

    if (lat && lng) {
      setValue("location", [parseFloat(lat), parseFloat(lng)]);
    }

    if (distance) {
      setValue("distance", parseFloat(distance));
    }
  }, []);

  let watchId: number | null = null;

  useEffect(() => {
    getLocation();
    return () => {
      stopTrackingLocation();
    };
  }, []);

  function getLocation() {
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(
            `New location: Latitude: ${latitude}, Longitude: ${longitude}`
          );

          setValue("userLocation", { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        {
          enableHighAccuracy: true, // Request high accuracy (useful for mobile)
          maximumAge: 300000, // Cache the location for 5 minutes
          timeout: 10000, // Timeout after 10 seconds if no location
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function stopTrackingLocation() {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  }

  const onSubmit = (data: RangeForm) => {
    console.log("Submitted:", data);
    const current = new URLSearchParams(searchParams.toString());
    // Set new values
    current.set("distance", String(data.distance));

    if (Array.isArray(data.location) && data.location.length === 2) {
      current.set("lat", String(data.location[0]));
      current.set("lng", String(data.location[1]));
    }
    // Update the URL
    router.push(`?${current.toString()}`);
  };

  const handleReset = () => {
    reset();
    const current = new URLSearchParams(searchParams.toString());
    current.delete("lat");
    current.delete("lng");
    current.delete("distance");
    router.push(`?${current.toString()}`);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {address ? (
          <FormInput
            name="address"
            clearable
            onClear={() => {
              setValue("address", "");
              setValue("location", []);
              autoFilledAddress.current = false;
            }}
          />
        ) : (
          <GooglePlacesAutocomplete
            name="location"
            onCoordinatesSelected={(coords) => {
              setValue("location", coords);
              reverseGeocode(coords[0], coords[1]).then((addr) => {
                if (addr) {
                  setValue("address", addr);
                  autoFilledAddress.current = true;
                }
              });
            }}
          />
        )}

        <div>
          <p className="mb-2">Distance ({distance} km)</p>
          <div className="px-3">
            <Controller
              name="distance"
              control={method.control}
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <Slider
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  min={0}
                  max={100}
                  step={1}
                  styles={{
                    track: { background: "var(--primary)", height: 5 },
                    handle: {
                      width: 18,
                      height: 18,
                      top: 3,
                      borderColor: "var(--primary)",
                      background: "var(--primary)",
                      opacity: 1,
                    },
                    rail: { height: 5 },
                  }}
                  handleRender={(node, handleProps) => {
                    // Clone the handle element and add focus/blur
                    const child = node.props.children;

                    return (
                      <Tooltip
                        overlay={`${handleProps.value} km`}
                        placement="bottom"
                        visible={tooltipVisible || handleProps.dragging}
                        key={handleProps.index}
                        overlayInnerStyle={{ zIndex: 10 }}
                      >
                        {React.cloneElement(node, {
                          ...node.props,
                          onFocus: () => setTooltipVisible(true),
                          onBlur: () => setTooltipVisible(false),
                          tabIndex: 0, // make it focusable
                          children: child,
                        })}
                      </Tooltip>
                    );
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-3 ml-auto w-fit">
          <FormButton
            variant="nude"
            text="Apply"
            size="lg"
            className="font-medium text-primary p-0 h-fit"
            type="submit"
          />
          {address && (
            <FormButton
              variant="destructive"
              text="Clear"
              size="lg"
              className="font-medium text-destructive bg-transparent p-0 h-fit"
              onClick={handleReset}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
