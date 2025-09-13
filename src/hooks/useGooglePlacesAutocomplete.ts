import { useEffect, useRef, useMemo, useState } from "react";
import { debounce } from "lodash";

export interface PlaceOption {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text?: string;
  };
}

interface UseGooglePlacesAutocompleteOptions {
  minInputLength?: number;
  debounceMs?: number;
  countryCode?: string;
  filterByCity?: string;
}

// Move default location outside to prevent recreation
const DEFAULT_LOCATION_BIAS = {
  lat: 6.5244,
  lng: 3.3792,
  radius: 50000,
};

export const useGooglePlacesAutocomplete = (
  options: UseGooglePlacesAutocompleteOptions = {}
) => {
  const {
    minInputLength = 2,
    debounceMs = 300,
    countryCode = "NG",
    filterByCity,
  } = options;

  const [places, setPlaces] = useState<PlaceOption[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const pendingRequestRef = useRef<boolean>(false);

  // Initialize Google Maps API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeService = () => {
      if (window.google?.maps?.places?.AutocompleteService) {
        autocompleteServiceRef.current =
          new window.google.maps.places.AutocompleteService();
        setIsReady(true);
        setError(null);
      }
    };

    // Check if already loaded
    if (window.google?.maps?.places) {
      initializeService();
      return;
    }

    // Load the script if not already present
    const existingScript = document.querySelector("#google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", initializeService);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initializeService;
    script.onerror = () => {
      setError("Failed to load Google Maps API");
      setIsReady(false);
    };

    document.head.appendChild(script);
  }, []);

  // Create stable debounced function with useRef to avoid recreation
  const debouncedFetchRef = useRef<ReturnType<typeof debounce> | null>(null);

  if (!debouncedFetchRef.current) {
    debouncedFetchRef.current = debounce((searchInput: string) => {
      if (
        !autocompleteServiceRef.current ||
        !searchInput.trim() ||
        pendingRequestRef.current
      ) {
        return;
      }

      pendingRequestRef.current = true;
      setIsLoading(true);
      setError(null);

      const request: google.maps.places.AutocompletionRequest = {
        input: searchInput.trim(),
        types: ["geocode"],
        componentRestrictions: { country: countryCode },
        location: new window.google.maps.LatLng(
          DEFAULT_LOCATION_BIAS.lat,
          DEFAULT_LOCATION_BIAS.lng
        ),
        radius: DEFAULT_LOCATION_BIAS.radius,
      };

      autocompleteServiceRef.current.getPlacePredictions(
        request,
        (predictions, status) => {
          pendingRequestRef.current = false;
          setIsLoading(false);

          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            let filteredPredictions = predictions;

            // Apply city filter if specified
            if (filterByCity) {
              filteredPredictions = predictions.filter((prediction) =>
                prediction.description
                  .toLowerCase()
                  .includes(filterByCity.toLowerCase())
              );
            }

            setPlaces(filteredPredictions as PlaceOption[]);
          } else if (
            status ===
            window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            setPlaces([]);
          } else {
            setError("Failed to fetch location suggestions");
            setPlaces([]);
          }
        }
      );
    }, debounceMs);
  }

  // Handle input changes
  useEffect(() => {
    if (!isReady || !debouncedFetchRef.current) return;

    if (input.length >= minInputLength) {
      debouncedFetchRef.current(input);
    } else {
      debouncedFetchRef.current.cancel();
      setPlaces([]);
      setIsLoading(false);
    }
  }, [input, isReady, minInputLength]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debouncedFetchRef.current) {
        debouncedFetchRef.current.cancel();
      }
      pendingRequestRef.current = false;
    };
  }, []);

  return {
    // Data
    input,
    options: places, // Keeping 'options' for backward compatibility
    places,

    // State
    isLoading,
    isReady,
    error,

    // Actions
    setInput,
    setOptions: setPlaces, // For backward compatibility
    setPlaces,
  };
};
