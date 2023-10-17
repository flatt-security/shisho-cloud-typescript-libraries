import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure Application Load Balancers drop invalid HTTP headers
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { invalid_header_handling } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/alb/alb_invalid_header_handling.gen.ts"
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
  *   return [invalid_header_handling({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       invalid_header_mitigation_enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_alb_invalid_header_handling" */
export const invalid_header_handling = (
  decision: InvalidHeaderHandlingDecisionArgs,
  params?: InvalidHeaderHandlingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": invalid_header_handling_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "ELB.4",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(invalid_header_handling_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InvalidHeaderHandlingDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    invalid_header_mitigation_enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InvalidHeaderHandlingDefaultParams = { resource_exceptions?: string[] }

const invalid_header_handling_kind = "aws_alb_invalid_header_handling"

const invalid_header_handling_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
