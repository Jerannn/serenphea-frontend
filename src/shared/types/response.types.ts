export type SuccessResponse<T> = {
  status: string;
  data: T;
};

export type ErrorResponse = {
  status: string;
  message: string;
  details: Record<string, string>;
};
