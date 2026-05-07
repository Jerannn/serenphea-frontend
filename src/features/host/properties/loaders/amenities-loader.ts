import { api } from "@/lib/api";
import type { Amenity } from "../types";

export default async function loader(): Promise<Amenity[]> {
  const response = await api(`/properties/amenities`);

  if (response.status === "fail") {
    return [];
  }

  return response.data.amenities;
}
