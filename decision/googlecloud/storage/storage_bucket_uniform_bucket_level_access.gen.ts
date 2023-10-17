import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure Cloud Storage buckets enable uniform bucket level access
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { bucket_uniform_bucket_level_access } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/storage/storage_bucket_uniform_bucket_level_access.gen.ts"
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
  *   return [bucket_uniform_bucket_level_access({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       uniform_access_enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_storage_bucket_uniform_bucket_level_access" */
export const bucket_uniform_bucket_level_access = (
  decision: BucketUniformBucketLevelAccessDecisionArgs,
  params?: BucketUniformBucketLevelAccessDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_uniform_bucket_level_access_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "5.2",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_uniform_bucket_level_access_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type BucketUniformBucketLevelAccessDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    uniform_access_enabled: boolean | null
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type BucketUniformBucketLevelAccessDefaultParams = { resource_exceptions?: string[] }

const bucket_uniform_bucket_level_access_kind = "googlecloud_storage_bucket_uniform_bucket_level_access"

const bucket_uniform_bucket_level_access_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
