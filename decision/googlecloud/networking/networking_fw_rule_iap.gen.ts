import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure that VPC networks allow only traffic from Google IP addresses with Identity Aware Proxy (IAP)
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { fw_rule_iap } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/networking/networking_fw_rule_iap.gen.ts";
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
 *   return [fw_rule_iap({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       ingress_rules: [{name: "example", source_ranges: ["example"], allow_rules: [{ip_protocol: "example", port_ranges: [{from: 0, to: 0}]}]}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_networking_fw_rule_iap" */
export const fw_rule_iap = (
  decision: FwRuleIapDecisionArgs,
  params?: FwRuleIapDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": fw_rule_iap_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.10",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(fw_rule_iap_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type FwRuleIapDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    ingress_rules: {
      name: string;
      source_ranges: string[];
      allow_rules: {
        ip_protocol: string;
        port_ranges: { from: number; to: number }[];
      }[];
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type FwRuleIapDefaultParams = { resource_exceptions?: string[] };

const fw_rule_iap_kind = "googlecloud_networking_fw_rule_iap";

const fw_rule_iap_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
