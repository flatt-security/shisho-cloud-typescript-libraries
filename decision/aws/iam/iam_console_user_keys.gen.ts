import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure access keys during initial user setup for all IAM users with a console password
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { console_user_keys } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/iam/iam_console_user_keys.gen.ts"
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
  *   return [console_user_keys({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       has_access_key: false,
  *       has_console_password: false,
  *       has_unused_access_key: false,
  *       has_unused_console_password: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_console_user_keys" */
export const console_user_keys = (
  decision: ConsoleUserKeysDecisionArgs,
  params?: ConsoleUserKeysDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": console_user_keys_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.11",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(console_user_keys_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type ConsoleUserKeysDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    has_access_key: boolean
    has_console_password: boolean
    has_unused_access_key: boolean
    has_unused_console_password: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type ConsoleUserKeysDefaultParams = { resource_exceptions?: string[] }

const console_user_keys_kind = "aws_iam_console_user_keys"

const console_user_keys_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
