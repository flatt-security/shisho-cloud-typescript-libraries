import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure CloudTrail trails are logging S3 bucket read events
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { bucket_read_trail } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/s3/s3_bucket_read_trail.gen.ts"
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
  *   return [bucket_read_trail({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_s3_bucket_read_trail" */
export const bucket_read_trail = (
  decision: BucketReadTrailDecisionArgs,
  params?: BucketReadTrailDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_read_trail_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.11",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_read_trail_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type BucketReadTrailDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type BucketReadTrailDefaultParams = { resource_exceptions?: string[] }

const bucket_read_trail_kind = "aws_s3_bucket_read_trail"

const bucket_read_trail_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed