/** Definition of the low-level interface of decision policy and
 * converters between the high/low-level interface
 * @module
 */

import { ResourceID } from "../scalars.ts";
import { RawPolicy } from "../raw.ts";
import {
  Decision,
  DecisionPolicy,
  DecisionType,
  Severity,
  SEVERITY_CRITICAL,
  SEVERITY_HIGH,
  SEVERITY_INFO,
  SEVERITY_LOW,
  SEVERITY_MEDIUM,
  TYPE_ALLOW,
  TYPE_DENY,
  TYPE_UNDETERMINED,
} from "./mod.ts";

export type RawDecisionPolicy = RawPolicy<
  RawDecisionPolicyInput,
  RawDecisionPolicyData,
  RawDecision[]
>;
type RawDecisionPolicyInput = unknown;
type RawDecisionPolicyData = unknown;
export type RawDecision = {
  header: {
    api_version: string;
    kind: string;
    subject: ResourceID;
    type: RawDecisionType;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    locator: string;
    severity: RawSeverity;
  };
  payload: string;
};

export type RawDecisionType = 0 | 1 | 2;

export const RAW_TYPE_UNDETERMINED = 0;
export const RAW_TYPE_ALLOW = 1;
export const RAW_TYPE_DENY = 2;

export type RawSeverity = 0 | 1 | 2 | 3 | 4;

export const RAW_SEVERITY_INFO = 0;
export const RAW_SEVERITY_LOW = 1;
export const RAW_SEVERITY_MEDIUM = 2;
export const RAW_SEVERITY_HIGH = 3;
export const RAW_SEVERITY_CRITICAL = 4;

// This function is curried so that when the user provides `policy` with
// an incorrect type, the type error would be like "the type of `policy` is incorrect"
// rather than "the type of `inputConverter` is incorrect".
// The former is more natural for users, because it is unlikely that inputConverter,
// which is automatically generated, is incorrect.
// Of course this curry-style function may be unfamiliar to users,
// so it would be nice if we find another way that leads to understandable type diagnoses.
export const wrap_decision_policy = <Query>(
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

const to_raw_decisions = (decisions: Decision[]): RawDecision[] => {
  // Note: type-safe immutable version
  // return decisions.map((decision) => ({
  //   ...decision,
  //   header: {
  //     ...decision.header,
  //     type: to_raw_decision_type(decision.header.type),
  //     severity: to_raw_decision_severity(decision.header.severity),
  //   },
  //   payload: JSON.stringify(decision.payload),
  // }));

  decisions.forEach((decision) => {
    // @ts-expect-error - in-place type conversion
    decision.header.type = to_raw_decision_type(decision.header.type);

    // @ts-expect-error - in-place type conversion
    decision.header.severity = to_raw_decision_severity(
      decision.header.severity,
    );

    decision.payload = JSON.stringify(decision.payload, json_replacer);
  });

  // @ts-expect-error - in-place type conversion
  return decisions;
};

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
