import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure AWS VPC flow logging is enabled
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { vpc_flow_logging } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/networking/networking_vpc_flow_logging.gen.ts"
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
  *   return [vpc_flow_logging({
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

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_networking_vpc_flow_logging" */
export const vpc_flow_logging = (
  decision: VpcFlowLoggingDecisionArgs,
  params?: VpcFlowLoggingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": vpc_flow_logging_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.9",
      "decision.api.shisho.dev:aws/fsbp/latest": "EC2.6",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(vpc_flow_logging_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type VpcFlowLoggingDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type VpcFlowLoggingDefaultParams = { resource_exceptions?: string[] }

const vpc_flow_logging_kind = "aws_networking_vpc_flow_logging"

const vpc_flow_logging_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
