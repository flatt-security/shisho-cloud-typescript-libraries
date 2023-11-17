import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure encryption is enabled for RDS instances
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_encryption } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/rds/rds_instance_encryption.gen.ts";
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
 *   return [instance_encryption({
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

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_rds_instance_encryption" */
export const instance_encryption = (
  decision: InstanceEncryptionDecisionArgs,
  params?: InstanceEncryptionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_encryption_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.3.1",
      "decision.api.shisho.dev:aws/fsbp/latest": "RDS.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_encryption_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type InstanceEncryptionDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceEncryptionDefaultParams = {
  resource_exceptions?: string[];
};

const instance_encryption_kind = "aws_rds_instance_encryption";

const instance_encryption_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
