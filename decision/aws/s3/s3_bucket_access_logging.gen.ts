import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure access logging is enabled for important S3 buckets
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { bucket_access_logging } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/s3/s3_bucket_access_logging.gen.ts"
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
  *   return [bucket_access_logging({
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

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_s3_bucket_access_logging" */
export const bucket_access_logging = (
  decision: BucketAccessLoggingDecisionArgs,
  params?: BucketAccessLoggingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_access_logging_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.6",
      "decision.api.shisho.dev:aws/fsbp/latest": "S3.9",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_access_logging_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type BucketAccessLoggingDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type BucketAccessLoggingDefaultParams = { resource_exceptions?: string[] }

const bucket_access_logging_kind = "aws_s3_bucket_access_logging"

const bucket_access_logging_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
