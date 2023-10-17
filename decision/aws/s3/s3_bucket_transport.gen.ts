import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure S3 buckets deny HTTP requests
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { bucket_transport } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/s3/s3_bucket_transport.gen.ts"
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
  *   return [bucket_transport({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       is_http_denied: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_s3_bucket_transport" */
export const bucket_transport = (
  decision: BucketTransportDecisionArgs,
  params?: BucketTransportDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_transport_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.1.2",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_transport_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type BucketTransportDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    is_http_denied: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type BucketTransportDefaultParams = { resource_exceptions?: string[] }

const bucket_transport_kind = "aws_s3_bucket_transport"

const bucket_transport_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
