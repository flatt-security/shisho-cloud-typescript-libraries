import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure that connections to CloudFront distributions are forced to use HTTPS
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { transport } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/cloudfront/cloudfront_transport.gen.ts"
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
  *   return [transport({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       cache_behaviors: [{path_pattern: "example", target_origin_id: "example", viewer_protocol_policy: "example"}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_cloudfront_transport" */
export const transport = (
  decision: TransportDecisionArgs,
  params?: TransportDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": transport_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "CloudFront.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(transport_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type TransportDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    cache_behaviors: { path_pattern: string, target_origin_id: string, viewer_protocol_policy: string }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type TransportDefaultParams = { resource_exceptions?: string[] }

const transport_kind = "aws_cloudfront_transport"

const transport_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
