export type SuccessResponse = {
  status: string;
  data: {
    expiresAt: string;
    user: {
      id: string;
      full_name: string;
      email: string;
      roles: "guest" | "host" | "admin";
      status: "pending" | "active" | "inactive" | "suspended";
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
  };
};

export type ErrorResponse = {
  status: string;
  message: string;
  details: Record<string, string>;
};
