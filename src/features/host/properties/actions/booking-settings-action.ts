import { api } from "@/lib/api";
import {
  redirect,
  type ActionFunctionArgs,
  type ErrorResponse,
} from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";

export default async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const propertyId = params.id;

  const response = await api(`/properties/${propertyId}/booking-settings`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const setBookingSettings = usePropertyStore.getState().setBookingSettings;
  setBookingSettings(response.data.bookingSettings);

  // move to next step
  usePropertyStore.getState().nextStep();

  return redirect(`/host/properties/${propertyId}/review-listing`);
}
