import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure Compute Engine instances have only necessary public IP addresses
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_public_ip } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/compute/compute_instance_public_ip.gen.ts";
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
 *   return [instance_public_ip({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       public_ipv4_addresses: ["example"],
 *       public_ipv6_addresses: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_public_ip" */
export const instance_public_ip = (
  decision: InstancePublicIpDecisionArgs,
  params?: InstancePublicIpDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_public_ip_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.9",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_public_ip_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type InstancePublicIpDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    public_ipv4_addresses: string[];
    public_ipv6_addresses: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstancePublicIpDefaultParams = { resource_exceptions?: string[] };

const instance_public_ip_kind = "googlecloud_compute_instance_public_ip";

const instance_public_ip_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
