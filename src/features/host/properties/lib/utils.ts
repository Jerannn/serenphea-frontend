import type { Amenity } from "../types";

export const groupAmenitiesByCategory = (amenities: Amenity[]) => {
  return amenities.reduce(
    (acc, amenity) => {
      if (!amenity.category) return acc;

      if (!acc[amenity.category]) {
        acc[amenity.category] = [];
      }

      acc[amenity.category].push(amenity);

      return acc;
    },
    {} as Record<string, Amenity[]>,
  );
};
