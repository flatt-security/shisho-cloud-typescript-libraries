import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure the default network does not exist in Google Cloud projects
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { default_network } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/networking/networking_default_network.gen.ts";
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
 *   return [default_network({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       default_network_exists: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_networking_default_network" */
export const default_network = (
  decision: DefaultNetworkDecisionArgs,
  params?: DefaultNetworkDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": default_network_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.1",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(default_network_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DefaultNetworkDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    default_network_exists: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DefaultNetworkDefaultParams = { resource_exceptions?: string[] };

const default_network_kind = "googlecloud_networking_default_network";

const default_network_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
