import { api } from "@/lib/api";
import type { PropertyType } from "../types";

export default async function basicInfoLoader(): Promise<PropertyType[]> {
  const response = await api(`/properties/types`);

  if (response.status === "fail") {
    return [];
  }

  return response.data.types;
}
