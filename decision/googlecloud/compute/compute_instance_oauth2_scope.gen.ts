import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure that Compute Engine instances use appropriate OAuth2 scopes for Google APIs
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_oauth2_scope } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/compute/compute_instance_oauth2_scope.gen.ts";
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
 *   return [instance_oauth2_scope({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       assigned_scopes: ["example"],
 *       service_account_email: "example",
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_compute_instance_oauth2_scope" */
export const instance_oauth2_scope = (
  decision: InstanceOauth2ScopeDecisionArgs,
  params?: InstanceOauth2ScopeDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_oauth2_scope_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "4.2",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_oauth2_scope_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type InstanceOauth2ScopeDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    assigned_scopes: string[];
    service_account_email: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceOauth2ScopeDefaultParams = {
  resource_exceptions?: string[];
};

const instance_oauth2_scope_kind = "googlecloud_compute_instance_oauth2_scope";

const instance_oauth2_scope_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
