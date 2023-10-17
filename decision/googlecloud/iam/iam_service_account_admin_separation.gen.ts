import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO } from "../../mod.ts"

/** Ensure that separation of duties is enforced for administration and usage of service accounts
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { service_account_admin_separation } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/iam/iam_service_account_admin_separation.gen.ts"
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
  *   return [service_account_admin_separation({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       admin_principals: ["example"],
  *       users: [{principal: "example", role: "example"}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_iam_service_account_admin_separation" */
export const service_account_admin_separation = (
  decision: ServiceAccountAdminSeparationDecisionArgs,
  params?: ServiceAccountAdminSeparationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": service_account_admin_separation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.8",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(service_account_admin_separation_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type ServiceAccountAdminSeparationDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    admin_principals: string[]
    users: { principal: string, role: string }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type ServiceAccountAdminSeparationDefaultParams = { resource_exceptions?: string[] }

const service_account_admin_separation_kind = "googlecloud_iam_service_account_admin_separation"

const service_account_admin_separation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
