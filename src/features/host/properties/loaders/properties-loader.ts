import { api } from "@/lib/api";
import type { NextCursor, PropertyWithRelations } from "../types";

export default async function loader(): Promise<{
  meta: NextCursor;
  properties: PropertyWithRelations[];
}> {
  const response = await api(`/properties`);

  const { meta, properties } = response.data;
  return { meta, properties };
}
