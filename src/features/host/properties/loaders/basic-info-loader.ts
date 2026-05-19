import type { PropertyType } from "../types";
import { getPropertyTypes } from "@/services/api/properties";
import { queryClient } from "@/lib/queryClient";

export const propertyTypesQuery = () => ({
  queryKey: ["propertyTypes"],
  queryFn: getPropertyTypes,
  staleTime: 1000 * 60 * 60 * 24,
});

export default async function loader(): Promise<PropertyType[]> {
  return await queryClient.ensureQueryData(propertyTypesQuery());
}
