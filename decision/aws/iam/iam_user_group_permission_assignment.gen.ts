import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure IAM users receive permissions only through groups
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { user_group_permission_assignment } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/iam/iam_user_group_permission_assignment.gen.ts";
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
 *   return [user_group_permission_assignment({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       attached_policy_names: ["example"],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_user_group_permission_assignment" */
export const user_group_permission_assignment = (
  decision: UserGroupPermissionAssignmentDecisionArgs,
  params?: UserGroupPermissionAssignmentDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": user_group_permission_assignment_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.15",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.2",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      user_group_permission_assignment_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type UserGroupPermissionAssignmentDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    attached_policy_names: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type UserGroupPermissionAssignmentDefaultParams = {
  resource_exceptions?: string[];
};

const user_group_permission_assignment_kind =
  "aws_iam_user_group_permission_assignment";

const user_group_permission_assignment_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
