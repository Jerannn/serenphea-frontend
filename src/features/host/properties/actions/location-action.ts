import { api } from "@/lib/api";
import { type ActionFunctionArgs } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";
import type { ErrorResponse } from "@/shared/types/response-types";

export default async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const propertyId = params.id;

  const response = await api(`/properties/${propertyId}/location`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setLocation = usePropertyStore.getState().setLocation;
  setLocation(response.data.location);
  window.scrollTo({ top: 0 });
  return;
}
