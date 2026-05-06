import { Loader2, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type PlaceResult } from "@/features/host/properties/lib/nominatim";
import { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface LocationSearchInputProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  suggestions: PlaceResult[];
  searchLoading: boolean;
  suggestOpen: boolean;
  setSuggestOpen: (val: boolean) => void;
  markerPosition: { lat: number; lng: number } | null;
  onClearLocation: () => void;
  onSelectPlace: (place: PlaceResult) => void;
}

export function LocationSearchInput({
  searchQuery,
  setSearchQuery,
  suggestions,
  searchLoading,
  suggestOpen,
  setSuggestOpen,
  markerPosition,
  onClearLocation,
  onSelectPlace,
}: LocationSearchInputProps) {
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchWrapRef, () => setSuggestOpen(false));

  return (
    <div ref={searchWrapRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="place-search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSuggestOpen(true);
          }}
          onFocus={() => {
            if (searchQuery.trim().length >= 3 && suggestions.length > 0) {
              setSuggestOpen(true);
            }
          }}
          placeholder="e.g. 123 Rizal Ave, Lipa, Philippines"
          className="border-border bg-white pl-9 pr-9"
          autoComplete="street-address"
        />
        {searchLoading ? (
          <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        ) : markerPosition ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={onClearLocation}
            aria-label="Clear location"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      {suggestOpen && searchQuery.trim().length >= 3 ? (
        <div
          className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-md"
          role="listbox"
          aria-label="Search suggestions"
        >
          {searchLoading && suggestions.length === 0 ? (
            <div className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 shrink-0 animate-spin" />
              Searching…
            </div>
          ) : null}
          {!searchLoading && suggestions.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              No results. Try adding city or country.
            </p>
          ) : null}
          <ul className="py-1">
            {suggestions.map((place) => (
              <li key={place.id} role="option">
                <button
                  type="button"
                  className={cn(
                    "w-full px-3 py-2.5 text-left text-sm transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelectPlace(place)}
                >
                  <span className="line-clamp-2 font-medium leading-snug">
                    {place.displayName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
