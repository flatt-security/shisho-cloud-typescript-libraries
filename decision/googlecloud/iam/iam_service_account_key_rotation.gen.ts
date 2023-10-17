import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_MEDIUM } from "../../mod.ts"

/** Ensure user-managed/external keys for service accounts are rotated every 90 days or fewer
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { service_account_key_rotation } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/iam/iam_service_account_key_rotation.gen.ts"
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
  *   return [service_account_key_rotation({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       keys: [{name: "example", valid_after_at: "example"}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_iam_service_account_key_rotation" */
export const service_account_key_rotation = (
  decision: ServiceAccountKeyRotationDecisionArgs,
  params?: ServiceAccountKeyRotationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": service_account_key_rotation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.7",
      "decision.api.shisho.dev:googlecloud/scc-premium/latest": "IAM_SCANNER.SERVICE_ACCOUNT_KEY_NOT_ROTATED",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(service_account_key_rotation_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type ServiceAccountKeyRotationDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    keys: { name: string, valid_after_at: string }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type ServiceAccountKeyRotationDefaultParams = { resource_exceptions?: string[] }

const service_account_key_rotation_kind = "googlecloud_iam_service_account_key_rotation"

const service_account_key_rotation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed