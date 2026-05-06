import { api } from "@/lib/api";
import type { ErrorResponse } from "@/shared/types/response-types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await api("/properties", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setProperty = usePropertyStore.getState().setBaseProperty;
  setProperty(response.data.property);

  window.scrollTo({ top: 0 });

  return redirect(`/host/properties/${response.data.property.id}/location`);
}
