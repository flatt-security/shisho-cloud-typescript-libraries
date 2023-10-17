import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure Cloud DNS Logging is enabled for all VPC networks
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { dns_log } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/networking/networking_dns_log.gen.ts"
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
  *   return [dns_log({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       log_enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_networking_dns_log" */
export const dns_log = (
  decision: DnsLogDecisionArgs,
  params?: DnsLogDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": dns_log_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "2.12",
      "decision.api.shisho.dev:googlecloud/scc-premium/latest": "FIREWALL_SCANNER.EGRESS_DENY_RULE_NOT_SET",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(dns_log_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type DnsLogDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    log_enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type DnsLogDefaultParams = { resource_exceptions?: string[] }

const dns_log_kind = "googlecloud_networking_dns_log"

const dns_log_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
