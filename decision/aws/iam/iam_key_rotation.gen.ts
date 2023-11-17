import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure AWS IAM access keys are rotated per pre-defined time window
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { key_rotation } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/iam/iam_key_rotation.gen.ts";
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
 *   return [key_rotation({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       keys_requiring_rotation: [{id: "example", created_at: "example"}],
 *       recommended_rotation_window_days: 0,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_key_rotation" */
export const key_rotation = (
  decision: KeyRotationDecisionArgs,
  params?: KeyRotationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": key_rotation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.14",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(key_rotation_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type KeyRotationDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    keys_requiring_rotation: { id: string; created_at: string }[];
    recommended_rotation_window_days: number;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type KeyRotationDefaultParams = { resource_exceptions?: string[] };

const key_rotation_kind = "aws_iam_key_rotation";

const key_rotation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
