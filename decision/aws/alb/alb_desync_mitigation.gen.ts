import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure Application Load Balancers mitigate HTTP desync attacks
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { desync_mitigation } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/alb/alb_desync_mitigation.gen.ts"
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
  *   return [desync_mitigation({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       desync_mitigation_mode: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_alb_desync_mitigation" */
export const desync_mitigation = (
  decision: DesyncMitigationDecisionArgs,
  params?: DesyncMitigationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": desync_mitigation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "ELB.12",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(desync_mitigation_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type DesyncMitigationDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    desync_mitigation_mode: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type DesyncMitigationDefaultParams = { resource_exceptions?: string[] }

const desync_mitigation_kind = "aws_alb_desync_mitigation"

const desync_mitigation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
