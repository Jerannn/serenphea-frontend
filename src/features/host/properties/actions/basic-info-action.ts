import { api } from "@/lib/api";
import type { ErrorResponse } from "@/shared/types/response-types";
import type { ActionFunctionArgs } from "react-router-dom";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await api("/properties", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(response);
  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  return;
}
