import { api } from "@/lib/api";
import type { ErrorResponse } from "@/shared/types/response-types";
import type { ActionFunctionArgs } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";

export default async function action({ request, params }: ActionFunctionArgs) {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  const propertyId = params.id;

  const response = await api(`/properties/${propertyId}/pricing`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setPricing = usePropertyStore.getState().setPricing;
  setPricing(response.data.pricing);

  // move to next step
  usePropertyStore.getState().nextStep();

  return;
}
