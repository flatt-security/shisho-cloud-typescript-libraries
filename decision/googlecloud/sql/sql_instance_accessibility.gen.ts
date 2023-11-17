import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_HIGH,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure Cloud SQL instances are exposed only to specific IP addresses
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_accessibility } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/sql/sql_instance_accessibility.gen.ts";
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
 *   return [instance_accessibility({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       ip_allowlist: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_accessibility" */
export const instance_accessibility = (
  decision: InstanceAccessibilityDecisionArgs,
  params?: InstanceAccessibilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_accessibility_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.5",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_accessibility_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type InstanceAccessibilityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    ip_allowlist: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceAccessibilityDefaultParams = {
  resource_exceptions?: string[];
};

const instance_accessibility_kind = "googlecloud_sql_instance_accessibility";

const instance_accessibility_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
