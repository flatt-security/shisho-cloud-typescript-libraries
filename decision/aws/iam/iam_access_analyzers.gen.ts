import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure that IAM Access analyzer is enabled for all regions
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { access_analyzers } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/iam/iam_access_analyzers.gen.ts"
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
  *   return [access_analyzers({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       analyzers: [{region: "example", analyzer_name: "example"}],
  *       missing_regions: ["example"],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_access_analyzers" */
export const access_analyzers = (
  decision: AccessAnalyzersDecisionArgs,
  params?: AccessAnalyzersDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": access_analyzers_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.20",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(access_analyzers_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type AccessAnalyzersDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    analyzers: { region: string, analyzer_name: string }[]
    missing_regions: string[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type AccessAnalyzersDefaultParams = { resource_exceptions?: string[] }

const access_analyzers_kind = "aws_iam_access_analyzers"

const access_analyzers_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
