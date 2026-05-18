import { useLoaderData, useSubmit } from "react-router-dom";
import type { Amenity, AmenityInput } from "../../../../types";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { usePropertyStore } from "../../../../store/PropertyStore";
import { Button } from "@/components/ui/button";
import AmenityCategorySection from "./AmenityCategorySection";
import AmenityItem from "./AmenityItem";
import { amenitySchema } from "@/shared/schema/properties-schema";
import { useEffect, useState } from "react";
import { groupAmenitiesByCategory } from "@/features/host/properties/lib/utils";
import { CATEGORY_ORDER } from "@/features/host/properties/lib/constants";
import PropertyStepLayout from "../../PropertyStepLayout";

export default function AmenitiesStep() {
  const amenitiesList = useLoaderData<Amenity[]>();
  const submit = useSubmit();
  const amenities = usePropertyStore((state) => state.property.amenities);

  const [removeAmenityIds, setRemoveAmenityIds] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AmenityInput>({
    resolver: zodResolver(amenitySchema),
    defaultValues: {
      amenityIds: amenities.map((amenity) => amenity.id),
    },
  });

  const selectedAmenityIds = useWatch({ control, name: "amenityIds" });
  const amenitiesGrouped = groupAmenitiesByCategory(amenitiesList);

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    // Add
    if (checked) {
      setValue("amenityIds", [...selectedAmenityIds, amenityId]);
      setRemoveAmenityIds((prev) => {
        return prev.filter((id) => id !== amenityId);
      });
      if (selectedAmenityIds.length === 1) clearErrors("amenityIds");
      return;
    }

    // Remove
    const updatedAmenityIds = selectedAmenityIds.filter(
      (id) => id !== amenityId,
    );
    setValue("amenityIds", updatedAmenityIds);
    setRemoveAmenityIds((prev) => [...prev, amenityId]);
  };

  const onSubmit = (data: AmenityInput) => {
    const amenityData = {
      amenityIds: data.amenityIds,
      removeAmenityIds,
    };
    submit(amenityData, { method: "put", encType: "application/json" });
  };

  useEffect(() => {
    if (errors.amenityIds) {
      toast.error(errors.amenityIds.message);
    }
  }, [errors.amenityIds]);

  return (
    <PropertyStepLayout
      title="What amenities do you offer?"
      description="Select all amenities available at your property to help guests know
          what to expect during their stay."
    >
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
    </PropertyStepLayout>
  );
}
