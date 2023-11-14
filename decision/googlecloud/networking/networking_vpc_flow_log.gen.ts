import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure VPC Flow Logs feature is enabled for critical VPC networks and subnets
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { vpc_flow_log } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/networking/networking_vpc_flow_log.gen.ts";
 * import type { Decision, DecisionPolicy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/mod.ts";
 * import { wrap_decision_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/raw.ts";
 * import { convert_input, Input } from "./input.gen.ts";
 * // You can generate input.gen.ts by `$ shishoctl codegen typescript-input`
 *
 * export const decide: DecisionPolicy<Input> = (input: Input): Decision[] => {
 *   // ID of the resource reviewed
 *   // The resource ID can be retrieved from the field "metadata: ResourceMetadata!"
 *   const subject = something.metadata.id;
 *
 *   // Whether this policy allows this resource
 *   const allowed = true;
 *
 *   // Return a list of decisions
 *   return [vpc_flow_log({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       flow_log_enabled: false,
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_networking_vpc_flow_log" */
export const vpc_flow_log = (
  decision: VpcFlowLogDecisionArgs,
  params?: VpcFlowLogDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": vpc_flow_log_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.8",
      "decision.api.shisho.dev:googlecloud/scc-premium/latest":
        "SUBNETWORK_SCANNER.FLOW_LOGS_DISABLED",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(vpc_flow_log_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type VpcFlowLogDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    flow_log_enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type VpcFlowLogDefaultParams = { resource_exceptions?: string[] };

const vpc_flow_log_kind = "googlecloud_networking_vpc_flow_log";

const vpc_flow_log_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
