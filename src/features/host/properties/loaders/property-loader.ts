import { api } from "@/lib/api";
import type { LoaderFunctionArgs } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";

export default async function loader({ params }: LoaderFunctionArgs) {
  const propertyId = params.id;
  const response = await api(`/properties/${propertyId}`);

  if (response.status === "fail") {
    throw new Error(response.message);
  }

  const setProperty = usePropertyStore.getState().setProperty;
  setProperty(response.data.property);
}
