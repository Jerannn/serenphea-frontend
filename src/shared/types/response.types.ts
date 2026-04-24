export type BaseResponse = {
  status: "success" | "fail";
  message: string;
};

export type ErrorResponse = BaseResponse & {
  status: "fail";
  details?: Record<string, string>;
};

export type SuccessResponse<T> = BaseResponse & {
  status: "success";
  data: T;
};
