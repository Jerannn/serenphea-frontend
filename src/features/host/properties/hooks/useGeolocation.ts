import { useState, useCallback } from "react";
import { toast } from "sonner";
import { reverseGeocode } from "@/features/host/properties/lib/nominatim";

export function useGeolocation() {
  const [geoLoading, setGeoLoading] = useState(false);

  const useMyLocation = useCallback(
    (onSuccess: (lat: number, lng: number, place: any) => void) => {
      if (!navigator.geolocation) {
        toast.error("Location isn’t available in this browser.");
        return;
      }
      
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          try {
            const place = await reverseGeocode(lat, lng);
            onSuccess(lat, lng, place);
          } finally {
            setGeoLoading(false);
          }
        },
        () => {
          setGeoLoading(false);
          toast.error("Could not read your location. Check permissions.");
        },
        { enableHighAccuracy: true, maximumAge: 60_000, timeout: 12_000 },
      );
    },
    []
  );

  return {
    geoLoading,
    useMyLocation,
  };
}
