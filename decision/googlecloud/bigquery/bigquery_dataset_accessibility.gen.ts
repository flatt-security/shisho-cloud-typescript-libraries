import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_CRITICAL,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure BigQuery dataset accessibility is restricted to a minimum level
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { dataset_accessibility } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/bigquery/bigquery_dataset_accessibility.gen.ts";
 * import { Decision, DecisionPolicy, decision_policy_adapter } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/mod.ts";
 * import { convert_input, Input } from "./input.gen.ts";
 * // You can generate input.gen.ts by `$ shishoctl codegen typescript-input`
 *
 * export const decide: DecisionPolicy<Input> = (input: Input): Decision[] => {
 *   // ID of the resource reviewed
 *   // The resource ID can be retrieved from the field "metadata: ResourceMetadata!"
 *   const subject = something.metadata.id;
 *
 *   // Whether this policy allows this resource
 *   const allowed = true;
 *
 *   // Return a list of decisions
 *   return [dataset_accessibility({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       all_authenticated_users_roles: [{id: "example"}],
 *       all_users_roles: [{id: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_bigquery_dataset_accessibility" */
export const dataset_accessibility = (
  decision: DatasetAccessibilityDecisionArgs,
  params?: DatasetAccessibilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": dataset_accessibility_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "7.1",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(dataset_accessibility_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DatasetAccessibilityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    all_authenticated_users_roles: { id: string }[];
    all_users_roles: { id: string }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DatasetAccessibilityDefaultParams = {
  resource_exceptions?: string[];
};

const dataset_accessibility_kind = "googlecloud_bigquery_dataset_accessibility";

const dataset_accessibility_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
