import type { Amenity } from "../types";
import { queryClient } from "@/lib/queryClient";
import { getAmenities } from "@/services/api/properties";

export const amenitiesQuery = () => ({
  queryKey: ["amenities"],
  queryFn: getAmenities,
  staleTime: 1000 * 60 * 60 * 24,
});

export default async function loader(): Promise<Amenity[]> {
  return await queryClient.ensureQueryData(amenitiesQuery());
}
