import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure that Confidential VM for Compute Engine instances is enabled
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_confidential_computing, CONFIDENTIAL_COMPUTING_STATUS_UNSUPPORTED } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/compute/compute_instance_confidential_computing.gen.ts";
 * import type { Decision, DecisionPolicy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/mod.ts";
 * import { wrap_decision_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/raw.ts";
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
 *   return [instance_confidential_computing({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       confidential_computing_status: CONFIDENTIAL_COMPUTING_STATUS_UNSUPPORTED,
 *       machine_type: "example",
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_confidential_computing" */
export const instance_confidential_computing = (
  decision: InstanceConfidentialComputingDecisionArgs,
  params?: InstanceConfidentialComputingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_confidential_computing_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.11",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      instance_confidential_computing_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type InstanceConfidentialComputingDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    confidential_computing_status: ConfidentialComputingStatus;
    machine_type: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceConfidentialComputingDefaultParams = {
  resource_exceptions?: string[];
};

const instance_confidential_computing_kind =
  "googlecloud_compute_instance_confidential_computing";

const instance_confidential_computing_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

type ConfidentialComputingStatus =
  | typeof CONFIDENTIAL_COMPUTING_STATUS_UNSUPPORTED
  | typeof CONFIDENTIAL_COMPUTING_STATUS_ENABLED
  | typeof CONFIDENTIAL_COMPUTING_STATUS_DISABLED;

export const CONFIDENTIAL_COMPUTING_STATUS_UNSUPPORTED = 0;
export const CONFIDENTIAL_COMPUTING_STATUS_ENABLED = 1;
export const CONFIDENTIAL_COMPUTING_STATUS_DISABLED = 2;
