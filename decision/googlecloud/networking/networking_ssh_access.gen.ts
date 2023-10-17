import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_HIGH } from "../../mod.ts"

/** Ensure SSH access to Google Cloud resources is restricted from the Internet
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { ssh_access } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/networking/networking_ssh_access.gen.ts"
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
  *   return [ssh_access({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       exposed_surfaces: [{network_self_link: "example"}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_networking_ssh_access" */
export const ssh_access = (
  decision: SshAccessDecisionArgs,
  params?: SshAccessDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": ssh_access_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.6",
      "decision.api.shisho.dev:googlecloud/scc-premium/latest": "FIREWALL_SCANNER.OPEN_SSH_PORT",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(ssh_access_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type SshAccessDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    exposed_surfaces: { network_self_link: string }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type SshAccessDefaultParams = { resource_exceptions?: string[] }

const ssh_access_kind = "googlecloud_networking_ssh_access"

const ssh_access_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
