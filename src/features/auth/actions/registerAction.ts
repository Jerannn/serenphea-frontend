import type { ErrorResponse } from "@/shared/types/response.types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import useAuthStore from "../auth.store";
import { api } from "@/lib/api";
import type { UserSuccessResponse } from "@/shared/types/auth.types";

export default async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  const result = response as UserSuccessResponse;
  const setUser = useAuthStore.getState().setUser;
  setUser(result.data.user);

  return redirect("/auth/verify-email");
}
