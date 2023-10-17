import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure IP forwarding is disabled for Compute Engine instances
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_ip_forwarding } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/compute/compute_instance_ip_forwarding.gen.ts"
  * import { Decision, DecisionPolicy } from "https://deno.land/x/shisho-cloud-sdk/decision/mod.ts"
  * import { wrap_decision_policy } from "https://deno.land/x/shisho-cloud-sdk/decision/raw.ts"
  * import { convert_input, Input } from "./input.ts"
  * 
  * export const decide: DecisionPolicy<Input> = (input: Input): Decision[] => {
  *   // ID of the resource reviewed
  *   // The resource ID can be retrieved from the field "metadata: ResourceMetadata!"
  *   const subject = something.metadata.id
  * 
  *   // Whether this policy allows this resource
  *   const allowed = true
  * 
  *   // Return a list of decisions
  *   return [instance_ip_forwarding({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       forwarding_enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_ip_forwarding" */
export const instance_ip_forwarding = (
  decision: InstanceIpForwardingDecisionArgs,
  params?: InstanceIpForwardingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_ip_forwarding_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.6",
      "decision.api.shisho.dev:googlecloud/scc-premium/latest": "COMPUTE_INSTANCE_SCANNER.IP_FORWARDING_ENABLED",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_ip_forwarding_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstanceIpForwardingDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    forwarding_enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstanceIpForwardingDefaultParams = { resource_exceptions?: string[] }

const instance_ip_forwarding_kind = "googlecloud_compute_instance_ip_forwarding"

const instance_ip_forwarding_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
