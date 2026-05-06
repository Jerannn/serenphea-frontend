import { useState, useEffect, useRef } from "react";
import { searchPlaces, type PlaceResult } from "@/features/host/properties/lib/nominatim";

export function usePlaceSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);

  const skipNextSearchRef = useRef(false);

  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      setSuggestions([]);
      setSearchLoading(false);
      return;
    }

    const q = searchQuery.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    const ac = new AbortController();
    const timer = window.setTimeout(() => {
      searchPlaces(q, { limit: 8, signal: ac.signal })
        .then((rows) => {
          if (ac.signal.aborted) return;
          setSuggestions(rows);
          setSuggestOpen(true);
        })
        .catch(() => {
          if (ac.signal.aborted) return;
          setSuggestions([]);
        })
        .finally(() => {
          if (!ac.signal.aborted) setSearchLoading(false);
        });
    }, 550);

    return () => {
      window.clearTimeout(timer);
      ac.abort();
    };
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    setSuggestions,
    searchLoading,
    suggestOpen,
    setSuggestOpen,
    skipNextSearchRef,
  };
}
