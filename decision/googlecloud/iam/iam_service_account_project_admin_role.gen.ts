import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure Google Cloud service accounts have admin privileges only when truly required
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { service_account_project_admin_role } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/iam/iam_service_account_project_admin_role.gen.ts";
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
 *   return [service_account_project_admin_role({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       suspicious_bindings: [{service_account_email: "example", role: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_iam_service_account_project_admin_role" */
export const service_account_project_admin_role = (
  decision: ServiceAccountProjectAdminRoleDecisionArgs,
  params?: ServiceAccountProjectAdminRoleDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": service_account_project_admin_role_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.5",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      service_account_project_admin_role_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type ServiceAccountProjectAdminRoleDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    suspicious_bindings: { service_account_email: string; role: string }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ServiceAccountProjectAdminRoleDefaultParams = {
  resource_exceptions?: string[];
};

const service_account_project_admin_role_kind =
  "googlecloud_iam_service_account_project_admin_role";

const service_account_project_admin_role_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
