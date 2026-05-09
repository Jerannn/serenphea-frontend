import { useLoaderData, useSubmit } from "react-router-dom";
import type { Amenity, AmenityInput } from "../../../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { usePropertyStore } from "../../../../store/PropertyStore";
import { Button } from "@/components/ui/button";
import AmenityCategorySection from "./AmenityCategorySection";
import AmenityItem from "./AmenityItem";
import { amenitySchema } from "@/shared/schema/properties-schema";
import { useEffect } from "react";
import { groupAmenitiesByCategory } from "@/features/host/properties/lib/utils";
import { CATEGORY_ORDER } from "@/features/host/properties/lib/constants";

export default function AmenitiesStep() {
  const amenitiesList = useLoaderData<Amenity[]>();
  const submit = useSubmit();
  const amenities = usePropertyStore((state) => state.property.amenities);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<AmenityInput>({
    resolver: zodResolver(amenitySchema),
    defaultValues: {
      amenityIds: amenities.map((amenity) => amenity.id),
    },
  });

  const selectedAmenityIds = watch("amenityIds");
  const amenitiesGrouped = groupAmenitiesByCategory(amenitiesList);

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    // Add
    if (checked) {
      setValue("amenityIds", [...selectedAmenityIds, amenityId]);
      if (selectedAmenityIds.length === 1) clearErrors("amenityIds");
      return;
    }

    // Remove
    setValue(
      "amenityIds",
      selectedAmenityIds.filter((id) => id !== amenityId),
    );
  };

  const onSubmit = (data: AmenityInput) => {
    submit(data, { method: "put", encType: "application/json" });
  };

  useEffect(() => {
    if (errors.amenityIds) {
      toast.error(errors.amenityIds.message);
    }
  }, [errors.amenityIds]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="font-serif text-3xl font-semibold tracking-tight lg:text-4xl">
          What amenities do you offer?
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
          Select all amenities available at your property to help guests know
          what to expect during their stay.
        </p>
      </div>

      <div className="flex">
        <Button
          type="button"
          variant="link"
          className="mb-2 ml-auto"
          onClick={() => setValue("amenityIds", [])}
        >
          Clear all amenities
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} id="amenities-property-form">
        <div className="space-y-6">
          {CATEGORY_ORDER.map((category) => {
            const amenitiesInCategory = amenitiesGrouped[category];
            return (
              <AmenityCategorySection key={category} category={category}>
                {amenitiesInCategory.map((amenity) => (
                  <AmenityItem
                    key={amenity.id}
                    amenity={amenity}
                    selectedAmenityIds={selectedAmenityIds}
                    onChange={handleAmenityChange}
                  />
                ))}
              </AmenityCategorySection>
            );
          })}
        </div>
      </form>
    </div>
  );
}
