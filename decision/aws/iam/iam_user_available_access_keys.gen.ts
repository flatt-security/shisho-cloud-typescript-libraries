import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure there is only one active access key available for any single IAM user
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { user_available_access_keys } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/iam/iam_user_available_access_keys.gen.ts"
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
  *   return [user_available_access_keys({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       access_key_ids: ["example"],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_user_available_access_keys" */
export const user_available_access_keys = (
  decision: UserAvailableAccessKeysDecisionArgs,
  params?: UserAvailableAccessKeysDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": user_available_access_keys_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.13",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(user_available_access_keys_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type UserAvailableAccessKeysDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    access_key_ids: string[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type UserAvailableAccessKeysDefaultParams = { resource_exceptions?: string[] }

const user_available_access_keys_kind = "aws_iam_user_available_access_keys"

const user_available_access_keys_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
