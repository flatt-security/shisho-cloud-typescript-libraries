import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure Cloud SQL instances require TLS for all incoming connections
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_connection } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/sql/sql_instance_connection.gen.ts"
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
  *   return [instance_connection({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       tls_required: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_connection" */
export const instance_connection = (
  decision: InstanceConnectionDecisionArgs,
  params?: InstanceConnectionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_connection_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.4",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_connection_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstanceConnectionDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    tls_required: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstanceConnectionDefaultParams = { resource_exceptions?: string[] }

const instance_connection_kind = "googlecloud_sql_instance_connection"

const instance_connection_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
