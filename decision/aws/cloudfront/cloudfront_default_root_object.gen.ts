import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_CRITICAL } from "../../mod.ts"

/** Ensure CloudFront distributions have a default root object
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { default_root_object } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/cloudfront/cloudfront_default_root_object.gen.ts"
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
  *   return [default_root_object({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       default_root_object: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_cloudfront_default_root_object" */
export const default_root_object = (
  decision: DefaultRootObjectDecisionArgs,
  params?: DefaultRootObjectDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": default_root_object_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "CloudFront.1",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(default_root_object_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type DefaultRootObjectDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    default_root_object: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type DefaultRootObjectDefaultParams = { resource_exceptions?: string[] }

const default_root_object_kind = "aws_cloudfront_default_root_object"

const default_root_object_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
