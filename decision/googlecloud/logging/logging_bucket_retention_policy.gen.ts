import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure that Cloud Storage buckets for storing logs are configured using bucket lock
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { bucket_retention_policy } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/logging/logging_bucket_retention_policy.gen.ts"
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
  *   return [bucket_retention_policy({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       locked: false,
  *       retention_period: 0,
  *       storage_bucket_name: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_logging_bucket_retention_policy" */
export const bucket_retention_policy = (
  decision: BucketRetentionPolicyDecisionArgs,
  params?: BucketRetentionPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_retention_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "2.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_retention_policy_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type BucketRetentionPolicyDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    locked: boolean
    retention_period: number
    storage_bucket_name: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type BucketRetentionPolicyDefaultParams = { resource_exceptions?: string[] }

const bucket_retention_policy_kind = "googlecloud_logging_bucket_retention_policy"

const bucket_retention_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
