import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_HIGH,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure RDP access to Google Cloud resources is restricted from the Internet
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { rdp_access } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/networking/networking_rdp_access.gen.ts";
 * import { Decision, DecisionPolicy, decision_policy_adapter } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/mod.ts";
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
 *   return [rdp_access({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       exposed_surfaces: [{network_self_link: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_networking_rdp_access" */
export const rdp_access = (
  decision: RdpAccessDecisionArgs,
  params?: RdpAccessDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": rdp_access_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.7",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(rdp_access_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RdpAccessDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    exposed_surfaces: { network_self_link: string }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RdpAccessDefaultParams = { resource_exceptions?: string[] };

const rdp_access_kind = "googlecloud_networking_rdp_access";

const rdp_access_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
