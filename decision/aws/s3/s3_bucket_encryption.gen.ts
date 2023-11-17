import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure all S3 buckets are encrypted
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { bucket_encryption } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/s3/s3_bucket_encryption.gen.ts";
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
 *   return [bucket_encryption({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       algorithms: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_s3_bucket_encryption" */
export const bucket_encryption = (
  decision: BucketEncryptionDecisionArgs,
  params?: BucketEncryptionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_encryption_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.1.1",
      "decision.api.shisho.dev:aws/fsbp/latest": "S3.4",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_encryption_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type BucketEncryptionDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    algorithms: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type BucketEncryptionDefaultParams = { resource_exceptions?: string[] };

const bucket_encryption_kind = "aws_s3_bucket_encryption";

const bucket_encryption_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
