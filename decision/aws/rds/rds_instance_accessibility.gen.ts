import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_HIGH } from "../../mod.ts"

/** Ensure that public access is not given to RDS instances
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { instance_accessibility } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/rds/rds_instance_accessibility.gen.ts"
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
  *   return [instance_accessibility({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       is_publicly_accessible: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_rds_instance_accessibility" */
export const instance_accessibility = (
  decision: InstanceAccessibilityDecisionArgs,
  params?: InstanceAccessibilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_accessibility_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.3.3",
      "decision.api.shisho.dev:aws/fsbp/latest": "RDS.2",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_accessibility_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type InstanceAccessibilityDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    is_publicly_accessible: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type InstanceAccessibilityDefaultParams = { resource_exceptions?: string[] }

const instance_accessibility_kind = "aws_rds_instance_accessibility"

const instance_accessibility_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
