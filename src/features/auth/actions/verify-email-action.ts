import type { ErrorResponse } from "@/shared/types/response-types";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import useAuthStore from "../auth.store";
import { api } from "@/lib/api";
import type { UserSuccessResponse } from "@/shared/types/auth-types";
import { toast } from "sonner";

export default async function action({
  request,
}: ActionFunctionArgs): Promise<ErrorResponse | Response | undefined> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const intent = formData.get("intent");

  switch (intent) {
    case "verify": {
      const response = await api("/auth/email/verify", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === "fail") {
        return response as ErrorResponse;
      }

      const result = response as UserSuccessResponse;
      const setUser = useAuthStore.getState().setUser;
      setUser(result.data.user);

      return redirect("/");
    }

    case "resend": {
      const response = await api("/auth/email/resend", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === "fail") {
        toast(response.message, {
          description: "Please try again later.",
        });
        return;
      }

      toast(response.message, {
        description: "Please check your email for the new code.",
      });
      return;
    }

    default:
      throw new Response("Invalid intent", { status: 400 });
  }
}
