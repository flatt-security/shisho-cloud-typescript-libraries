import { ResourceID } from "../mod.ts";
import {
  RAW_SEVERITY_CRITICAL,
  RAW_SEVERITY_HIGH,
  RAW_SEVERITY_INFO,
  RAW_SEVERITY_LOW,
  RAW_SEVERITY_MEDIUM,
  RAW_TYPE_ALLOW,
  RAW_TYPE_DENY,
  RAW_TYPE_UNDETERMINED,
  RawDecision,
  RawDecisionPolicy,
  RawDecisionType,
  RawSeverity,
} from "./raw.ts";

/** Function expressing the logic of the policy.
 *
 * @typeParam Query - generated from the GraphQL query by `shishoctl codegen typescript-input`
 * @typeParam Params - reflects the `with` field in the manifest
 */
export type DecisionPolicy<Query, Params = undefined> = (
  input: Query,
  params: Params,
) => Decision[];

export type Decision = {
  header: {
    /** The namespace and the version of the decision. */
    api_version: string;

    /** The identifier of the decision within the namespace of `api_version`. */
    kind: string;

    /** The resource that the decision is about.
     * ResourceIDs can be retrieved from the GraphQL type `ResourceMetadata`.
     */
    subject: ResourceID;

    /** Whether the resource is allowed or not. */
    type: DecisionType;

    labels?: Record<string, string>;
    annotations?: Record<string, string>;

    /** Additional information to identify the location of the detected issue within `subject`. */
    locator?: string;

    /** The importance of the decision. */
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

// This function is curried so that when the user provides `policy` with
// an incorrect type, the type error would be like "the type of `policy` is incorrect"
// rather than "the type of `inputConverter` is incorrect".
// The former is more natural for users, because it is unlikely that inputConverter,
// which is automatically generated, is incorrect.
// Of course this curry-style function may be unfamiliar to users,
// so it would be nice if we find another way that leads to understandable type diagnoses.
export const decision_policy_adapter = <Query>(
  input_converter: InputConverter<Query>,
) =>
<Params>(
  policy: DecisionPolicy<Query, Params>,
): RawDecisionPolicy =>
(raw_input, raw_data) => {
  const input = input_converter(raw_input);
  const params = raw_data as Params; // no need for conversion

  const decisions = policy(input, params);

  return { result: to_raw_decisions(decisions) };
};

/** converts custom scalars in a JSON-deserialized object
 *
 * You can use the instance generated from the GraphQL query.
 */
type InputConverter<Query> = (raw_input: unknown) => Query;

const to_raw_decisions = (decisions: Decision[]): RawDecision[] =>
  decisions.map((decision) => ({
    ...decision,
    header: {
      ...decision.header,
      type: to_raw_decision_type(decision.header.type),
      labels: decision.header.labels ?? {},
      annotations: decision.header.annotations ?? {},
      locator: decision.header.locator ?? "",
      severity: to_raw_decision_severity(decision.header.severity),
    },
    // JSON.stringify may return undefined (e.g. when the input is undefined)
    payload: JSON.stringify(decision.payload, json_replacer) ?? "null",
  }));

/** Produces more informative JSON for builtin classes */
const json_replacer = (_key: string, value: unknown): unknown => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (typeof value === "symbol") {
    return value.toString();
  }

  if (value instanceof Set) {
    return [...value.values()];
  }
  if (value instanceof Map) {
    return [...value.entries()];
  }
  if (value instanceof RegExp) {
    return value.toString();
  }
  if (value instanceof Object && Symbol.iterator in value) {
    return [...(value as Iterable<unknown>)];
  }

  return value;
};

// We comment out this test to avoid devdependencies from being bundled.
// import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
// Deno.test("jsonReplacer", () => {
//   assertEquals(
//     JSON.stringify({
//       a: new Set([[1], 2, 3]),
//     }, json_replacer),
//     JSON.stringify({
//       a: [[1], 2, 3],
//     }),
//   );
// });

const to_raw_decision_type = (type: DecisionType): RawDecisionType => {
  switch (type) {
    case TYPE_UNDETERMINED:
      return RAW_TYPE_UNDETERMINED;
    case TYPE_ALLOW:
      return RAW_TYPE_ALLOW;
    case TYPE_DENY:
      return RAW_TYPE_DENY;
    default: {
      const _exhaustive_check: never = type;
      throw new Error(`unknown decision type: ${type}`);
    }
  }
};

const to_raw_decision_severity = (severity: Severity): RawSeverity => {
  switch (severity) {
    case SEVERITY_INFO:
      return RAW_SEVERITY_INFO;
    case SEVERITY_LOW:
      return RAW_SEVERITY_LOW;
    case SEVERITY_MEDIUM:
      return RAW_SEVERITY_MEDIUM;
    case SEVERITY_HIGH:
      return RAW_SEVERITY_HIGH;
    case SEVERITY_CRITICAL:
      return RAW_SEVERITY_CRITICAL;
    default: {
      const _exhaustive_check: never = severity;
      throw new Error(`unknown decision severity: ${severity}`);
    }
  }
};
