import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_CRITICAL } from "../../mod.ts"

/** Ensure IAM policies that allow full administrative privileges are not attached
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { administrative_policy_limitation } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/iam/iam_administrative_policy_limitation.gen.ts"
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
  *   return [administrative_policy_limitation({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {},
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_administrative_policy_limitation" */
export const administrative_policy_limitation = (
  decision: AdministrativePolicyLimitationDecisionArgs,
  params?: AdministrativePolicyLimitationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": administrative_policy_limitation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.16",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.1",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(administrative_policy_limitation_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type AdministrativePolicyLimitationDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: Record<string, never>

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type AdministrativePolicyLimitationDefaultParams = { resource_exceptions?: string[] }

const administrative_policy_limitation_kind = "aws_iam_administrative_policy_limitation"

const administrative_policy_limitation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed