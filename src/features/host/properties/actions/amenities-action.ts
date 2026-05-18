import { api } from "@/lib/api";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";
import type {
  ErrorResponse,
  SuccessResponse,
} from "@/shared/types/response-types";
import type { Amenity } from "../types";

export default async function action({ request, params }: ActionFunctionArgs) {
  const data = await request.json();
  const propertyId = params.id;
  console.log(data);

  const response = (await api(`/properties/${propertyId}/amenities`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as SuccessResponse<{ amenities: Amenity[] }> | ErrorResponse;

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setAmenities = usePropertyStore.getState().setAmenities;
  setAmenities(response.data.amenities);

  // move to next step
  usePropertyStore.getState().nextStep();

  return redirect(`/host/properties/${propertyId}/photos`);
}
