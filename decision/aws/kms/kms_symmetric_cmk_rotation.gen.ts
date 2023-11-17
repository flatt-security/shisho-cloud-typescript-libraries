import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure rotation for customer created symmetric CMKs is enabled
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { symmetric_cmk_rotation } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/kms/kms_symmetric_cmk_rotation.gen.ts";
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
 *   return [symmetric_cmk_rotation({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       enabled: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_kms_symmetric_cmk_rotation" */
export const symmetric_cmk_rotation = (
  decision: SymmetricCmkRotationDecisionArgs,
  params?: SymmetricCmkRotationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": symmetric_cmk_rotation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.8",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(symmetric_cmk_rotation_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type SymmetricCmkRotationDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type SymmetricCmkRotationDefaultParams = {
  resource_exceptions?: string[];
};

const symmetric_cmk_rotation_kind = "aws_kms_symmetric_cmk_rotation";

const symmetric_cmk_rotation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
