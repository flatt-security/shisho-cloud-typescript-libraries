import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure that Dataproc cluster is encrypted using customer-managed encryption key
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { encryption_key } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/dataproc/dataproc_encryption_key.gen.ts"
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
  *   return [encryption_key({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       has_customer_managed_key: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_dataproc_encryption_key" */
export const encryption_key = (
  decision: EncryptionKeyDecisionArgs,
  params?: EncryptionKeyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": encryption_key_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.17",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(encryption_key_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type EncryptionKeyDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    has_customer_managed_key: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type EncryptionKeyDefaultParams = { resource_exceptions?: string[] }

const encryption_key_kind = "googlecloud_dataproc_encryption_key"

const encryption_key_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
