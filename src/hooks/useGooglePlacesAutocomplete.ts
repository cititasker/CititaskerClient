import { useEffect, useRef, useState, useCallback } from "react";

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
  // ✅ Fix: Use undefined as initial value for optional timeout
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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

    if (window.google?.maps?.places) {
      initializeService();
      return;
    }

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

  // Fetch function
  const fetchPlaces = useCallback(
    (searchInput: string) => {
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
    },
    [countryCode, filterByCity]
  );

  // Handle input changes with debounce
  useEffect(() => {
    if (!isReady) return;

    if (input.length >= minInputLength) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        fetchPlaces(input);
      }, debounceMs);
    } else {
      // Clear timeout if input is too short
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setPlaces([]);
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [input, isReady, minInputLength, debounceMs, fetchPlaces]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      pendingRequestRef.current = false;
    };
  }, []);

  return {
    input,
    options: places,
    places,
    isLoading,
    isReady,
    error,
    setInput,
    setOptions: setPlaces,
    setPlaces,
  };
};
