import { api } from "@/lib/api";
import type { ErrorResponse } from "@/shared/types/response-types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";

export default async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const propertyId = params.id;

  const response = await api(`/properties/${propertyId}/images`, {
    method: "PUT",
    body: formData,
  });

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setImages = usePropertyStore.getState().setImages;
  setImages(response.data.images);

  // move to next step
  usePropertyStore.getState().nextStep();

  return redirect(`/host/properties/${propertyId}/pricing`);
}
