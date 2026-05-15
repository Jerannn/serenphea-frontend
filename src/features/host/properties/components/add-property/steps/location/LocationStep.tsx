import { useState, useCallback, useEffect } from "react";
import { useSubmit } from "react-router-dom";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  structuredToEditableLines,
  type PlaceResult,
} from "@/features/host/properties/lib/nominatim";
import Map, { type LatLng } from "../../../Map";

import { useLocationForm } from "@/features/host/properties/hooks/useLocationForm";
import { usePlaceSearch } from "@/features/host/properties/hooks/usePlaceSearch";
import { useReverseGeocode } from "@/features/host/properties/hooks/useReverseGeocode";
import { useGeolocation } from "@/features/host/properties/hooks/useGeolocation";

import { LocationSearchInput } from "@/features/host/properties/components/add-property/steps/location/LocationSearchInput";
import { AddressFields } from "@/features/host/properties/components/add-property/steps/location/AddressFields";
import { LocationChips } from "@/features/host/properties/components/add-property/steps/location/LocationChips";
import { UseCurrentLocationButton } from "@/features/host/properties/components/add-property/steps/location/UseCurrentLocationButton";

const MAP_CONFIG = {
  defaultCenter: { lat: 18.5, lng: 0 },
  zoomPin: 16,
  zoomWorld: 2,
};

export default function LocationStep() {
  const submit = useSubmit();
  const form = useLocationForm();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    setSuggestions,
    searchLoading,
    suggestOpen,
    setSuggestOpen,
    skipNextSearchRef,
  } = usePlaceSearch();

  const { reverseGeocodeWithAbort, abortReverseGeocode } = useReverseGeocode();
  const { geoLoading, useMyLocation } = useGeolocation();

  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [displayName, setDisplayName] = useState("");

  const street = watch("street");
  const city = watch("city");
  const region = watch("region");
  const postcode = watch("postcode");
  const country = watch("country");
  const latitude = watch("latitude") as number;
  const longitude = watch("longitude") as number;

  const selectPlace = useCallback(
    (place: PlaceResult) => {
      skipNextSearchRef.current = true;
      setMarkerPosition({ lat: place.lat, lng: place.lng });
      setDisplayName(place.displayName);

      const next = structuredToEditableLines(place.structured);
      setValue("street", next.street, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("city", next.city, { shouldDirty: true, shouldValidate: true });
      setValue("region", next.region, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("postcode", next.postcode, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("country", next.country, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("latitude", place.lat, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("longitude", place.lng, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setSearchQuery(place.displayName.split(",").slice(0, 2).join(",").trim());
      setSuggestions([]);
      setSuggestOpen(false);
    },
    [
      setValue,
      skipNextSearchRef,
      setSearchQuery,
      setSuggestions,
      setSuggestOpen,
    ],
  );

  const clearLocation = useCallback(() => {
    abortReverseGeocode();
    setMarkerPosition(null);
    setDisplayName("");
    setSearchQuery("");
    setSuggestions([]);
    setSuggestOpen(false);
    reset();
  }, [
    reset,
    abortReverseGeocode,
    setSearchQuery,
    setSuggestions,
    setSuggestOpen,
  ]);

  const onMarkerPositionChange = useCallback(
    (position: LatLng) => {
      setMarkerPosition(position);
      setValue("latitude", position.lat, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("longitude", position.lng, {
        shouldDirty: true,
        shouldValidate: true,
      });

      reverseGeocodeWithAbort(position.lat, position.lng)
        .then((place) => {
          if (!place) return;
          setDisplayName(place.displayName);
          const next = structuredToEditableLines(place.structured);
          setValue("street", next.street, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue("city", next.city, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue("region", next.region, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue("postcode", next.postcode, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue("country", next.country, {
            shouldDirty: true,
            shouldValidate: true,
          });
        })
        .catch(() => {});
    },
    [setValue, reverseGeocodeWithAbort],
  );

  const handleUseMyLocation = useCallback(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMyLocation((lat, lng, place) => {
      setMarkerPosition({ lat, lng });
      setValue("latitude", lat, { shouldDirty: true, shouldValidate: true });
      setValue("longitude", lng, { shouldDirty: true, shouldValidate: true });
      if (place) {
        setDisplayName(place.displayName);
        const next = structuredToEditableLines(place.structured);
        setValue("street", next.street, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("city", next.city, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("region", next.region, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("postcode", next.postcode, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("country", next.country, {
          shouldDirty: true,
          shouldValidate: true,
        });
        skipNextSearchRef.current = true;
        setSearchQuery(
          place.displayName.split(",").slice(0, 2).join(",").trim(),
        );
      } else {
        setDisplayName(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
    });
  }, [useMyLocation, setValue, skipNextSearchRef, setSearchQuery]);

  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  const mapCenter = markerPosition ?? MAP_CONFIG.defaultCenter;
  const mapZoom = markerPosition ? MAP_CONFIG.zoomPin : MAP_CONFIG.zoomWorld;

  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">
        Where&apos;s your property located?
      </h1>
      <p className="mb-8 text-muted-foreground">
        Search like you would on an envelope, then fine-tune the pin on the map.
        Guests only see the full address after a reservation.
      </p>

      <form
        id="location-property-form"
        onSubmit={handleSubmit((data) => submit(data, { method: "put" }))}
      >
        <input
          type="hidden"
          {...register("latitude", { valueAsNumber: true })}
        />
        <input
          type="hidden"
          {...register("longitude", { valueAsNumber: true })}
        />

        <FieldGroup className="gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field className="min-w-0 flex-1">
              <FieldLabel htmlFor="place-search">
                Search address or place
              </FieldLabel>
              <FieldDescription>
                Include street, neighborhood, city, and country for best
                results.
              </FieldDescription>
              <FieldError
                errors={[
                  (errors.latitude || errors.longitude) && {
                    message:
                      "Please pick a location on the map or use your current location",
                  },
                ]}
              />

              <LocationSearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                suggestions={suggestions}
                searchLoading={searchLoading}
                suggestOpen={suggestOpen}
                setSuggestOpen={setSuggestOpen}
                markerPosition={markerPosition}
                onClearLocation={clearLocation}
                onSelectPlace={selectPlace}
              />
            </Field>

            <UseCurrentLocationButton
              geoLoading={geoLoading}
              onClick={handleUseMyLocation}
            />
          </div>

          {markerPosition ? (
            <>
              <LocationChips
                city={city}
                region={region}
                postcode={postcode}
                country={country}
              />
              <AddressFields register={register} errors={errors} />
            </>
          ) : null}
        </FieldGroup>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          markerPosition={markerPosition}
          onMarkerPositionChange={onMarkerPositionChange}
          markerDraggable
          popupLabel={
            displayName ||
            [street, city, country].filter(Boolean).join(", ") ||
            "Property location"
          }
        />

        <p className="text-xs text-muted-foreground">
          Map © OpenStreetMap contributors. Search and reverse geocoding via{" "}
          <a
            href="https://nominatim.org/"
            className="underline underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            Nominatim
          </a>
          . For production, call Nominatim from your backend with caching and
          respect{" "}
          <a
            href="https://operations.osmfoundation.org/policies/nominatim/"
            className="underline underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            usage policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
