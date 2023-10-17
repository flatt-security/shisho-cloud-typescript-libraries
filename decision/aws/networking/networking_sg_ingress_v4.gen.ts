import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_HIGH } from "../../mod.ts"

/** Ensure no security groups allow ingress from 0.0.0.0/0 to remote server administration ports
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { sg_ingress_v4 } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/networking/networking_sg_ingress_v4.gen.ts"
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
  *   return [sg_ingress_v4({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {},
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_networking_sg_ingress_v4" */
export const sg_ingress_v4 = (
  decision: SgIngressV4DecisionArgs,
  params?: SgIngressV4DefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": sg_ingress_v4_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "5.2",
      "decision.api.shisho.dev:aws/fsbp/latest": "EC2.14",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(sg_ingress_v4_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type SgIngressV4DecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: Record<string, never>

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type SgIngressV4DefaultParams = { resource_exceptions?: string[] }

const sg_ingress_v4_kind = "aws_networking_sg_ingress_v4"

const sg_ingress_v4_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
