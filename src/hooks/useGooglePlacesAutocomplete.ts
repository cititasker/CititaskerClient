import { useEffect, useRef, useMemo, useState } from "react";
import { debounce } from "lodash";

export type PlaceOption = {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

export const useGooglePlacesAutocomplete = () => {
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const [input, setInput] = useState("");
  const autocompleteService = useRef<any>(null);
  const [ready, setReady] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptId = "google-maps";

    const initializeService = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
        setReady(true);
      }
    };

    if (!document.querySelector(`#${scriptId}`)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initializeService;
      document.head.appendChild(script);
    } else {
      initializeService(); // May already be available
    }
  }, []);

  const fetchPredictions = useMemo(
    () =>
      debounce((input: string) => {
        if (!autocompleteService.current || !input) return;

        autocompleteService.current.getPlacePredictions(
          {
            input,
            types: ["geocode"],
            componentRestrictions: { country: "NG" },
            location: new window.google.maps.LatLng(6.5244, 3.3792),
            radius: 50000,
          },
          (predictions: any[] = []) => {
            if (!predictions) {
              setOptions([]);
              return;
            }

            const filtered = predictions.filter((pred) =>
              pred.description.toLowerCase().includes("lagos")
            );

            setOptions(filtered);
          }
        );
      }, 300),
    []
  );

  useEffect(() => {
    if (ready && input) {
      fetchPredictions(input);
    } else {
      setOptions([]);
    }
  }, [input, ready]);

  return {
    input,
    setInput,
    options,
    setOptions,
    ready,
  };
};
