import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_HIGH } from "../../mod.ts"

/** Ensure IAM password policy prevents password reuse
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { password_reuse } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/iam/iam_password_reuse.gen.ts"
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
  *   return [password_reuse({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       current_reuse_prevention: 0,
  *       reuse_prevention_policy_recommendation: 0,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_password_reuse" */
export const password_reuse = (
  decision: PasswordReuseDecisionArgs,
  params?: PasswordReuseDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": password_reuse_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.9",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.16",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(password_reuse_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type PasswordReuseDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    current_reuse_prevention: number
    reuse_prevention_policy_recommendation: number
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type PasswordReuseDefaultParams = { resource_exceptions?: string[] }

const password_reuse_kind = "aws_iam_password_reuse"

const password_reuse_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
