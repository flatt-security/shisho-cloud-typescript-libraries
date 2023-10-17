import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure EFS file systems are encrypted
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { volume_encryption } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/efs/efs_volume_encryption.gen.ts"
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
  *   return [volume_encryption({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       encrypted: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_efs_volume_encryption" */
export const volume_encryption = (
  decision: VolumeEncryptionDecisionArgs,
  params?: VolumeEncryptionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": volume_encryption_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.4.1",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(volume_encryption_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type VolumeEncryptionDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    encrypted: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type VolumeEncryptionDefaultParams = { resource_exceptions?: string[] }

const volume_encryption_kind = "aws_efs_volume_encryption"

const volume_encryption_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed