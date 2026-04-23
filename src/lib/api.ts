import env from "@/config/env";
import type {
  ErrorResponse,
  SuccessResponse,
} from "@/shared/types/response.types";

export async function api(
  path: string,
  options?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ErrorResponse | SuccessResponse<any>> {
  try {
    const res = await fetch(`${env.API_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
