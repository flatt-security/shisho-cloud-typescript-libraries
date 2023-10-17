import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure that the log metric filter and alerts exist for custom role changes
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { custom_role_changes } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/logmetric/logmetric_custom_role_changes.gen.ts"
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
  *   return [custom_role_changes({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       cis_notification_implementations: [{metric_name: "example", alert_policy_name: "example"}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_logmetric_custom_role_changes" */
export const custom_role_changes = (
  decision: CustomRoleChangesDecisionArgs,
  params?: CustomRoleChangesDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": custom_role_changes_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "2.6",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(custom_role_changes_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type CustomRoleChangesDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    cis_notification_implementations: { metric_name: string, alert_policy_name: string }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type CustomRoleChangesDefaultParams = { resource_exceptions?: string[] }

const custom_role_changes_kind = "googlecloud_logmetric_custom_role_changes"

const custom_role_changes_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed