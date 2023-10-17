import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure a log metric filter and alarm exist for usage of the root user
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { console_root_user_usage } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/logmetric/logmetric_console_root_user_usage.gen.ts"
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
  *   return [console_root_user_usage({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       cis_notification_implementations: [{trail_name: "example", metric_name: "example", alarm_name: "example", sns_topic_arn: "example"}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_logmetric_console_root_user_usage" */
export const console_root_user_usage = (
  decision: ConsoleRootUserUsageDecisionArgs,
  params?: ConsoleRootUserUsageDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": console_root_user_usage_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "4.3",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(console_root_user_usage_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type ConsoleRootUserUsageDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    cis_notification_implementations: { trail_name: string, metric_name: string, alarm_name: string | null, sns_topic_arn: string }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type ConsoleRootUserUsageDefaultParams = { resource_exceptions?: string[] }

const console_root_user_usage_kind = "aws_logmetric_console_root_user_usage"

const console_root_user_usage_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
