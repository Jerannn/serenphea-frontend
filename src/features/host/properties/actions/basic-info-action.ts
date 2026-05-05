import { api } from "@/lib/api";
import type { ErrorResponse } from "@/shared/types/response-types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

export default async function action({ request }: ActionFunctionArgs) {
  // const formData = await request.formData();
  // const data = Object.fromEntries(formData);

  // const response = await api("/properties", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });

  // if (response.status === "fail") {
  //   return response as ErrorResponse;
  // }

  return redirect("/host/properties/new/location");
}
