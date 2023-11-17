import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure Application Load Balancer deletion protection is enabled
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { delete_protection } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/alb/alb_delete_protection.gen.ts";
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
 *   return [delete_protection({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       deletion_protection_enabled: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_alb_delete_protection" */
export const delete_protection = (
  decision: DeleteProtectionDecisionArgs,
  params?: DeleteProtectionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": delete_protection_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "ELB.6",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(delete_protection_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DeleteProtectionDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    deletion_protection_enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DeleteProtectionDefaultParams = { resource_exceptions?: string[] };

const delete_protection_kind = "aws_alb_delete_protection";

const delete_protection_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
