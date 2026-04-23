import type { z } from "zod";
import type { registerSchema, verifyCodeSchema } from "../schema/auth.schema";
import type { SuccessResponse } from "./response.types";

export type RegisterPayload = z.infer<typeof registerSchema>;

export type User = {
  readonly id: string;
  full_name: string;
  email: string;
  roles: "guest" | "host" | "admin";
  status: "pending" | "active" | "inactive" | "suspended";
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type VerifyEmailResponse = SuccessResponse<{
  email: string;
  expiresAt: string;
}>;

export type UserSuccessResponse = SuccessResponse<{ user: User }>;

export type VerifyCodePayload = z.infer<typeof verifyCodeSchema>;
