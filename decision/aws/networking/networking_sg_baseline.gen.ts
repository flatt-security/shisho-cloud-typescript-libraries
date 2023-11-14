import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure the default security group restricts all traffic
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { sg_baseline } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/networking/networking_sg_baseline.gen.ts";
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
 *   return [sg_baseline({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       ip_permissions_egress: [{ip_protocol: "example", from_port: 0, to_port: 0}],
 *       ip_permissions_ingress: [{ip_protocol: "example", from_port: 0, to_port: 0}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_networking_sg_baseline" */
export const sg_baseline = (
  decision: SgBaselineDecisionArgs,
  params?: SgBaselineDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": sg_baseline_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "5.4",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(sg_baseline_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type SgBaselineDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    ip_permissions_egress: {
      ip_protocol: string;
      from_port: number;
      to_port: number;
    }[];
    ip_permissions_ingress: {
      ip_protocol: string;
      from_port: number;
      to_port: number;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type SgBaselineDefaultParams = { resource_exceptions?: string[] };

const sg_baseline_kind = "aws_networking_sg_baseline";

const sg_baseline_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
