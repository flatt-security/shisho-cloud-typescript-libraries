import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure a support role has been created to manage incidents with AWS Support
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { role_for_support } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/iam/iam_role_for_support.gen.ts";
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
 *   return [role_for_support({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       attached_roles: ["example"],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_role_for_support" */
export const role_for_support = (
  decision: RoleForSupportDecisionArgs,
  params?: RoleForSupportDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": role_for_support_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.17",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.18",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(role_for_support_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RoleForSupportDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    attached_roles: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RoleForSupportDefaultParams = { resource_exceptions?: string[] };

const role_for_support_kind = "aws_iam_role_for_support";

const role_for_support_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
