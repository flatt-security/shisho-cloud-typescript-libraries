import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure a Cloud IAM principal can impersonate or attach only a limited set of service accounts
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { service_account_project_impersonation_role } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/iam/iam_service_account_project_impersonation_role.gen.ts";
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
 *   return [service_account_project_impersonation_role({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       permissive_principals: ["example"],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_iam_service_account_project_impersonation_role" */
export const service_account_project_impersonation_role = (
  decision: ServiceAccountProjectImpersonationRoleDecisionArgs,
  params?: ServiceAccountProjectImpersonationRoleDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": service_account_project_impersonation_role_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.6",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      service_account_project_impersonation_role_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type ServiceAccountProjectImpersonationRoleDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    permissive_principals: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ServiceAccountProjectImpersonationRoleDefaultParams = {
  resource_exceptions?: string[];
};

const service_account_project_impersonation_role_kind =
  "googlecloud_iam_service_account_project_impersonation_role";

const service_account_project_impersonation_role_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
