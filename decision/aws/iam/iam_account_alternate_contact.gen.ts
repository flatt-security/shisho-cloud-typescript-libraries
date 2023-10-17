import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure that security contact information is registered to AWS accounts
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { account_alternate_contact } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/iam/iam_account_alternate_contact.gen.ts"
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
  *   return [account_alternate_contact({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       contact_for_billing_registered: false,
  *       contact_for_operations_registered: false,
  *       contact_for_security_registered: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_account_alternate_contact" */
export const account_alternate_contact = (
  decision: AccountAlternateContactDecisionArgs,
  params?: AccountAlternateContactDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": account_alternate_contact_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.2",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(account_alternate_contact_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type AccountAlternateContactDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    contact_for_billing_registered: boolean
    contact_for_operations_registered: boolean
    contact_for_security_registered: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type AccountAlternateContactDefaultParams = { resource_exceptions?: string[] }

const account_alternate_contact_kind = "aws_iam_account_alternate_contact"

const account_alternate_contact_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
