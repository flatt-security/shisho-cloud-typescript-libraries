import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure Cloud SQL instances have public IPs only if they need
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_public_ip } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/sql/sql_instance_public_ip.gen.ts"
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
  *   return [instance_public_ip({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       has_public_ip: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_public_ip" */
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
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.6",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_public_ip_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstancePublicIpDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    has_public_ip: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstancePublicIpDefaultParams = { resource_exceptions?: string[] }

const instance_public_ip_kind = "googlecloud_sql_instance_public_ip"

const instance_public_ip_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
