import type { ErrorResponse } from "@/shared/types/response.types";
import { redirect } from "react-router-dom";
import useAuthStore from "../auth.store";
import type { VerifyEmailResponse } from "@/shared/types/auth.types";
import { api } from "@/lib/api";

export default async function verifyEmailLoader(): Promise<
  ErrorResponse | VerifyEmailResponse | Response
> {
  const user = useAuthStore.getState().user;

  if (!user?.email) {
    return redirect("/auth/register");
  }

  const response = await api(
    `/auth/email/verify?email=${user.email}&type=register`,
  );

  if (response.status === "fail") {
    return response as ErrorResponse;
  }

  return response as VerifyEmailResponse;
}
