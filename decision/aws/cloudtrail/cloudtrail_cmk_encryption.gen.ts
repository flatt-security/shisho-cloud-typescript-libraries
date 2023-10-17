import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure CloudTrail logs are encrypted at rest using KMS CMKs
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { cmk_encryption } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/cloudtrail/cloudtrail_cmk_encryption.gen.ts"
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
  *   return [cmk_encryption({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       kms_key_id: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_cloudtrail_cmk_encryption" */
export const cmk_encryption = (
  decision: CmkEncryptionDecisionArgs,
  params?: CmkEncryptionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": cmk_encryption_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.7",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(cmk_encryption_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type CmkEncryptionDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    kms_key_id: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type CmkEncryptionDefaultParams = { resource_exceptions?: string[] }

const cmk_encryption_kind = "aws_cloudtrail_cmk_encryption"

const cmk_encryption_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
