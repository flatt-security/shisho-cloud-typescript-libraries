import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure critical Compute Engine disks use Customer-Supplied Encryption Keys (CSEK)
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { disk_encryption_key, ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_UNKNOWN } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/compute/compute_disk_encryption_key.gen.ts"
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
  *   return [disk_encryption_key({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       keys: [{target_disk: "example", key_name: "example", encryption_key_type: ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_UNKNOWN}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_disk_encryption_key" */
export const disk_encryption_key = (
  decision: DiskEncryptionKeyDecisionArgs,
  params?: DiskEncryptionKeyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": disk_encryption_key_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.7",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(disk_encryption_key_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type DiskEncryptionKeyDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    keys: { target_disk: string, key_name: string, encryption_key_type: EncryptionKeyType }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type DiskEncryptionKeyDefaultParams = { resource_exceptions?: string[] }

const disk_encryption_key_kind = "googlecloud_compute_disk_encryption_key"

const disk_encryption_key_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed

type EncryptionKeyType = 
  | typeof ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_UNKNOWN
  | typeof ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_NONE
  | typeof ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_GOOGLE_MANAGED
  | typeof ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_CUSTOMER_MANAGED
  | typeof ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_CUSTOMER_SUPPLIED

export const ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_UNKNOWN = 0
export const ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_NONE = 1
export const ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_GOOGLE_MANAGED = 2
export const ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_CUSTOMER_MANAGED = 3
export const ENCRYPTION_KEY_TYPE_ENCRYPTION_KEY_TYPE_CUSTOMER_SUPPLIED = 4
