import { useRef, useCallback } from "react";
import { reverseGeocode } from "@/features/host/properties/lib/nominatim";

export function useReverseGeocode() {
  const reverseAbortRef = useRef<AbortController | null>(null);

  const reverseGeocodeWithAbort = useCallback(
    async (lat: number, lng: number) => {
      reverseAbortRef.current?.abort();
      const ac = new AbortController();
      reverseAbortRef.current = ac;
      
      try {
        const place = await reverseGeocode(lat, lng, ac.signal);
        if (ac.signal.aborted) return null;
        return place;
      } catch (e) {
        if (ac.signal.aborted) return null;
        throw e;
      }
    },
    []
  );

  const abortReverseGeocode = useCallback(() => {
    reverseAbortRef.current?.abort();
  }, []);

  return {
    reverseGeocodeWithAbort,
    abortReverseGeocode,
  };
}
