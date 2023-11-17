import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_CRITICAL,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure the AWS root user is used only for limited usage
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { root_user_usage } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/iam/iam_root_user_usage.gen.ts";
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
 *   return [root_user_usage({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       last_used_at: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_root_user_usage" */
export const root_user_usage = (
  decision: RootUserUsageDecisionArgs,
  params?: RootUserUsageDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": root_user_usage_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.7",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(root_user_usage_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RootUserUsageDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    last_used_at: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RootUserUsageDefaultParams = { resource_exceptions?: string[] };

const root_user_usage_kind = "aws_iam_root_user_usage";

const root_user_usage_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
