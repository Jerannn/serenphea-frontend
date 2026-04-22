import type { ErrorResponse } from "@/shared/types/response.types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

export default async function registerAction({
  request,
}: ActionFunctionArgs): Promise<ErrorResponse | Response> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await fetch("http://localhost:3000/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (!response.ok) {
    return result as ErrorResponse;
  }

  return redirect(`/auth/verify-email?email=${data.email}`);
}
