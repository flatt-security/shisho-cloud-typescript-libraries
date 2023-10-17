import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure Access Transparency is enabled
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { access_transparency } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/support/support_access_transparency.gen.ts"
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
  *   return [access_transparency({
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

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_support_access_transparency" */
export const access_transparency = (
  decision: AccessTransparencyDecisionArgs,
  params?: AccessTransparencyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": access_transparency_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "2.14",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(access_transparency_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type AccessTransparencyDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type AccessTransparencyDefaultParams = { resource_exceptions?: string[] }

const access_transparency_kind = "googlecloud_support_access_transparency"

const access_transparency_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
