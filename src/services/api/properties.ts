import type {
  Amenity,
  NextCursor,
  PropertyType,
  PropertyWithRelations,
} from "@/features/host/properties/types";
import { api } from "@/lib/api";

export const getPropertyTypes = async (): Promise<PropertyType[]> => {
  const response = await api(`/properties/types`);

  if (response.status === "fail") {
    return [];
  }

  return response.data.types;
};

export const getAmenities = async (): Promise<Amenity[]> => {
  const response = await api(`/properties/amenities`);

  if (response.status === "fail") {
    return [];
  }

  return response.data.amenities;
};

export const getProperties = async ({
  pageParam,
}: {
  pageParam: NextCursor;
}): Promise<{
  meta: { nextCursor: NextCursor };
  properties: PropertyWithRelations[];
}> => {
  const response = await api(`/properties`);

  const { meta, properties } = response.data;

  return { meta, properties };
};
