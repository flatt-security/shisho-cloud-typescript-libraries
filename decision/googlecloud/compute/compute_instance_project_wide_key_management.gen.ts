import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure Compute Engine instances block project-wide SSH keys
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_project_wide_key_management } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/compute/compute_instance_project_wide_key_management.gen.ts";
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
 *   return [instance_project_wide_key_management({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       blocked: false,
 *       project_wide_key_available: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_project_wide_key_management" */
export const instance_project_wide_key_management = (
  decision: InstanceProjectWideKeyManagementDecisionArgs,
  params?: InstanceProjectWideKeyManagementDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_project_wide_key_management_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      instance_project_wide_key_management_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type InstanceProjectWideKeyManagementDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    blocked: boolean;
    project_wide_key_available: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceProjectWideKeyManagementDefaultParams = {
  resource_exceptions?: string[];
};

const instance_project_wide_key_management_kind =
  "googlecloud_compute_instance_project_wide_key_management";

const instance_project_wide_key_management_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
