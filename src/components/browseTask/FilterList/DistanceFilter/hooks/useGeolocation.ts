import { useState, useRef, useEffect } from "react";

type LocationStatus = "idle" | "loading" | "success" | "error";

interface UseGeolocationReturn {
  status: LocationStatus;
  error: string;
  retry: () => void;
  skip: () => void;
}

export function useGeolocation(
  onLocationUpdate: (coords: [number, number]) => void
): UseGeolocationReturn {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [error, setError] = useState("");
  const watchId = useRef<number | null>(null);

  const stopTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const handleError = (err: GeolocationPositionError) => {
    const messages: { [key: number]: string } = {
      [err.PERMISSION_DENIED]: "Location access denied.",
      [err.POSITION_UNAVAILABLE]:
        "Location unavailable (common in development).",
      [err.TIMEOUT]: "Location request timed out.",
    };

    setError(messages[err.code] || "Location error occurred.");
    setStatus("error");
  };

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        onLocationUpdate(coords);
        setStatus("success");
      },
      handleError,
      { enableHighAccuracy: false, maximumAge: 600000, timeout: 15000 }
    );
  };

  const retry = () => {
    stopTracking();
    getLocation();
  };

  const skip = () => {
    stopTracking();
    setStatus("idle");
    setError("");
  };

  useEffect(() => {
    getLocation();
    return stopTracking;
  }, []);

  return { status, error, retry, skip };
}
