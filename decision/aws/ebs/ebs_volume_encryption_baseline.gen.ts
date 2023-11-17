import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure EBS volume encryption is enabled in all regions
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { volume_encryption_baseline } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/ebs/ebs_volume_encryption_baseline.gen.ts";
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
 *   return [volume_encryption_baseline({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       disabled_regions: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_ebs_volume_encryption_baseline" */
export const volume_encryption_baseline = (
  decision: VolumeEncryptionBaselineDecisionArgs,
  params?: VolumeEncryptionBaselineDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": volume_encryption_baseline_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.2.1",
      "decision.api.shisho.dev:aws/fsbp/latest": "EC2.7",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      volume_encryption_baseline_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type VolumeEncryptionBaselineDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    disabled_regions: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type VolumeEncryptionBaselineDefaultParams = {
  resource_exceptions?: string[];
};

const volume_encryption_baseline_kind = "aws_ebs_volume_encryption_baseline";

const volume_encryption_baseline_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
