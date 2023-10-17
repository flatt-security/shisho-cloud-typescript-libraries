import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure connections to serial ports are disabled for Compute Engine instances
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_serial_port } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/compute/compute_instance_serial_port.gen.ts"
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
  *   return [instance_serial_port({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       serial_port_enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_serial_port" */
export const instance_serial_port = (
  decision: InstanceSerialPortDecisionArgs,
  params?: InstanceSerialPortDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_serial_port_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.5",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_serial_port_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstanceSerialPortDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    serial_port_enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstanceSerialPortDefaultParams = { resource_exceptions?: string[] }

const instance_serial_port_kind = "googlecloud_compute_instance_serial_port"

const instance_serial_port_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed