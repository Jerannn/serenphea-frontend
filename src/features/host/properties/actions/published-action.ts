import type {
  ErrorResponse,
  SuccessResponse,
} from "@/shared/types/response-types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import type { PropertyWithRelations } from "../types";
import { api } from "@/lib/api";
import { usePropertyStore } from "../store/PropertyStore";

export default async function action({ params }: ActionFunctionArgs) {
  const propertyId = params.id;

  const response = (await api(`/properties/${propertyId}/publish`, {
    method: "POST",
  })) as SuccessResponse<{ property: PropertyWithRelations }> | ErrorResponse;

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setProperty = usePropertyStore.getState().setBaseProperty;
  const clearStoreStorage = usePropertyStore.getState().clearStoreStorage;
  setProperty(response.data.property);
  clearStoreStorage();
  return redirect(`/host/properties`);
}
