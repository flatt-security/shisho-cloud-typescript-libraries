import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure that the log_min_messages database flag for Cloud SQL for PostgreSQL instance is set to at least warning
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_postgresql_log_min_messages } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/sql/sql_instance_postgresql_log_min_messages.gen.ts"
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
  *   return [instance_postgresql_log_min_messages({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       log_min_messages_state: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_postgresql_log_min_messages" */
export const instance_postgresql_log_min_messages = (
  decision: InstancePostgresqlLogMinMessagesDecisionArgs,
  params?: InstancePostgresqlLogMinMessagesDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_postgresql_log_min_messages_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.2.6",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_postgresql_log_min_messages_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstancePostgresqlLogMinMessagesDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    log_min_messages_state: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstancePostgresqlLogMinMessagesDefaultParams = { resource_exceptions?: string[] }

const instance_postgresql_log_min_messages_kind = "googlecloud_sql_instance_postgresql_log_min_messages"

const instance_postgresql_log_min_messages_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed