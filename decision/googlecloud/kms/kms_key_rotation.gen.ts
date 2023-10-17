import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure Cloud KMS encryption keys are rotated within a period of 90 days
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { key_rotation } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/kms/kms_key_rotation.gen.ts"
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
  *   return [key_rotation({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       last_rotated_at: "example",
  *       rotation_period_expectation_seconds: 0,
  *       rotation_period_seconds: 0,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_kms_key_rotation" */
export const key_rotation = (
  decision: KeyRotationDecisionArgs,
  params?: KeyRotationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": key_rotation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.10",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(key_rotation_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type KeyRotationDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    last_rotated_at: string
    rotation_period_expectation_seconds: number
    rotation_period_seconds: number
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type KeyRotationDefaultParams = { resource_exceptions?: string[] }

const key_rotation_kind = "googlecloud_kms_key_rotation"

const key_rotation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
