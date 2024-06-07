export type Meta = {
  code: number;
  status: string;
  message: string;
};

export type SchemaError = {
  rule: string;
  field: string;
  message: string;
};

export type ErrorResponse = {
  meta: Meta;
};

export type SchemaErrorResponse = {
  errors: SchemaError[];
};

export type SuccessResponseWithoutData = {
  meta: Meta;
};

export type SuccessResponse<T> = {
  meta: Meta;
  data: T;
};

export type Response<T> =
  | SuccessResponse<T>
  | ErrorResponse
  | ErrorSchemaResponse;

export type LoginResponse = {
  type: string;
  token: string;
  refreshToken: string;
};

export type UpdateTokenResponse = {
  type: string;
  token: string;
};
