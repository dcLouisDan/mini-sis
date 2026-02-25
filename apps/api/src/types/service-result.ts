export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export type ServiceError = {
  type: "unknown" | "not-found" | "database" | "input" | "unauthorized";
  raw: Error;
};
