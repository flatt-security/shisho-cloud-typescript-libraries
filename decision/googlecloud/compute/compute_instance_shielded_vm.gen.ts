import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure Compute Engine instances enable Shielded VM features
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_shielded_vm } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/compute/compute_instance_shielded_vm.gen.ts";
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
 *   return [instance_shielded_vm({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       integrity_monitoring_enabled: false,
 *       secure_boot_enabled: false,
 *       vtpm_enabled: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_shielded_vm" */
export const instance_shielded_vm = (
  decision: InstanceShieldedVmDecisionArgs,
  params?: InstanceShieldedVmDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_shielded_vm_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.8",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_shielded_vm_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type InstanceShieldedVmDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    integrity_monitoring_enabled: boolean;
    secure_boot_enabled: boolean;
    vtpm_enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceShieldedVmDefaultParams = {
  resource_exceptions?: string[];
};

const instance_shielded_vm_kind = "googlecloud_compute_instance_shielded_vm";

const instance_shielded_vm_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
