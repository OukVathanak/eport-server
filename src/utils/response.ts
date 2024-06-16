export const HTTPCode = {
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  CONFLICT: { code: 409, message: "Conflict" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  UNAUTHORIZE: { code: 401, message: "Unauthorized" },
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  SUCCESS: { code: 200, message: "Success" },
};

type HTTPCodeType = (typeof HTTPCode)[keyof typeof HTTPCode];

export interface APIResponse {
  status: "success" | "error";
  statusCode: number;
  data?: any;
  error?: string;
}

export function createSuccessResponse(
  status: HTTPCodeType,
  data?: any
): APIResponse {
  return {
    status: "success",
    statusCode: status.code,
    data,
  };
}

export function createErrorResponse(status: HTTPCodeType): APIResponse {
  return {
    status: "error",
    statusCode: status.code,
    error: status.message,
  };
}
