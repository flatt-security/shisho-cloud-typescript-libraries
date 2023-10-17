import { ResourceID } from "../scalars.ts";

/**
 * Query: generated from the GraphQL query
 * Params: reflects the `with` field in the manifest
 */
export type DecisionPolicy<Query, Params = undefined> = (
  input: Query,
  params: Params,
) => Decision[];

export type Decision = {
  header: {
    api_version: string;
    kind: string;
    subject: ResourceID;
    type: DecisionType;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    locator: string;
    severity: Severity;
  };
  payload: unknown;
};

export type Severity = "info" | "low" | "medium" | "high" | "critical";

export const SEVERITY_INFO = "info";
export const SEVERITY_LOW = "low";
export const SEVERITY_MEDIUM = "medium";
export const SEVERITY_HIGH = "high";
export const SEVERITY_CRITICAL = "critical";

export type DecisionType = "undetermined" | "allow" | "deny";

export const TYPE_UNDETERMINED = "undetermined";
export const TYPE_ALLOW = "allow";
export const TYPE_DENY = "deny";

export const as_decision_type = (allow: boolean): DecisionType =>
  allow ? TYPE_ALLOW : TYPE_DENY;

export const is_excepted = (
  h: { subject: ResourceID },
  params?: { resource_exceptions?: string[] },
): boolean => {
  if (!params?.resource_exceptions) return false;

  if (params.resource_exceptions.some((x) => typeof x !== "string")) {
    throw new Error("resource_exceptions must be string[]");
  }

  return params?.resource_exceptions?.some((excepted) =>
    excepted === "*" || excepted === h.subject
  ) || false;
};
