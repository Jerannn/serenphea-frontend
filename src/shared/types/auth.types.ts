import type { z } from "zod";
import type { registerSchema } from "../schema/auth.schema";

export type RegisterPayload = z.infer<typeof registerSchema>;
