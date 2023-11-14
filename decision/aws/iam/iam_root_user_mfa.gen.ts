import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_CRITICAL,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure MFA is enabled for the root user account
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { root_user_mfa } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/iam/iam_root_user_mfa.gen.ts";
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
 *   return [root_user_mfa({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       mfa_enabled: false,
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_root_user_mfa" */
export const root_user_mfa = (
  decision: RootUserMfaDecisionArgs,
  params?: RootUserMfaDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": root_user_mfa_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.5",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.9",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(root_user_mfa_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RootUserMfaDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    mfa_enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RootUserMfaDefaultParams = { resource_exceptions?: string[] };

const root_user_mfa_kind = "aws_iam_root_user_mfa";

const root_user_mfa_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
