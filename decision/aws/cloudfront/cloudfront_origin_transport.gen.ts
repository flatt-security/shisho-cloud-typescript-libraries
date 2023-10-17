import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure that connections to CloudFront distribution origins are forced to use HTTPS
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { origin_transport } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/cloudfront/cloudfront_origin_transport.gen.ts"
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
  *   return [origin_transport({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       origins: [{id: "example", domain_name: "example", protocol_policy: "example", ssl_protocols: ["example"]}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_cloudfront_origin_transport" */
export const origin_transport = (
  decision: OriginTransportDecisionArgs,
  params?: OriginTransportDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": origin_transport_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "CloudFront.9",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(origin_transport_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type OriginTransportDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    origins: { id: string, domain_name: string, protocol_policy: string, ssl_protocols: string[] }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type OriginTransportDefaultParams = { resource_exceptions?: string[] }

const origin_transport_kind = "aws_cloudfront_origin_transport"

const origin_transport_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
