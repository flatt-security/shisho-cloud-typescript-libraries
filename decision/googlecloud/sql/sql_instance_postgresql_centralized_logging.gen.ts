import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure that cloudsql.enable_pgaudit database flag for each Cloud SQL for PostgreSQL instance is set to on for centralized logging
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_postgresql_centralized_logging } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/sql/sql_instance_postgresql_centralized_logging.gen.ts"
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
  *   return [instance_postgresql_centralized_logging({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       pgaudit_enabled: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_postgresql_centralized_logging" */
export const instance_postgresql_centralized_logging = (
  decision: InstancePostgresqlCentralizedLoggingDecisionArgs,
  params?: InstancePostgresqlCentralizedLoggingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_postgresql_centralized_logging_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.2.9",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_postgresql_centralized_logging_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstancePostgresqlCentralizedLoggingDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    pgaudit_enabled: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstancePostgresqlCentralizedLoggingDefaultParams = { resource_exceptions?: string[] }

const instance_postgresql_centralized_logging_kind = "googlecloud_sql_instance_postgresql_centralized_logging"

const instance_postgresql_centralized_logging_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
