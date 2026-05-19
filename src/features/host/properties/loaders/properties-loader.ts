import type { NextCursor, PropertyWithRelations } from "../types";
import { queryClient } from "@/lib/queryClient";
import { getProperties } from "@/services/api/properties";

const initialCursor: NextCursor = {
  createdAt: null,
  id: null,
};

export const propertiesQuery = () => ({
  queryKey: ["properties"],

  queryFn: getProperties,

  initialPageParam: initialCursor,

  getNextPageParam: (lastPage: {
    meta: { nextCursor: NextCursor };
    properties: PropertyWithRelations[];
  }) => lastPage.meta?.nextCursor,
});

export default async function loader() {
  await queryClient.ensureInfiniteQueryData(propertiesQuery());

  return null;
}
