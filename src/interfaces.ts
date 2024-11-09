export const TEXTFULLY_ERROR_CODES_BY_KEY = {
  missing_required_field: 422,
  invalid_access: 422,
  invalid_parameter: 422,
  invalid_region: 422,
  rate_limit_exceeded: 429,
  missing_api_key: 401,
  invalid_api_Key: 403,
  invalid_from_address: 403,
  validation_error: 403,
  not_found: 404,
  method_not_allowed: 405,
  application_error: 500,
  internal_server_error: 500,
} as const;

export type TEXTFULLY_ERROR_CODE_KEY =
  keyof typeof TEXTFULLY_ERROR_CODES_BY_KEY;

export interface ErrorResponse {
  name: TEXTFULLY_ERROR_CODE_KEY;
  message: string;
}

export type Tag = { name: string; value: string };

export interface TextfullyConfig {
  apiKey: string;
  baseUrl?: string;
  userAgent?: string;
}

export interface SendMessageOptions {
  to: string;
  message: string;
  mediaUrl?: string;
}

export interface SendMessageResponse {
  id: string;
  status: string;
  sentAt: string;
}

export interface PostOptions {
  query?: { [key: string]: unknown };
}

export interface GetOptions {
  query?: { [key: string]: unknown };
}

export interface PutOptions {
  query?: { [key: string]: unknown };
}

export interface PatchOptions {
  query?: { [key: string]: unknown };
}
