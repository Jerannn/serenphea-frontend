import env from "@/config/env";

export async function api(path: string, options?: RequestInit) {
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
