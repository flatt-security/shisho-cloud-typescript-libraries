import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure S3 buckets enabled block public access feature
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { bucket_public_access_block } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/s3/s3_bucket_public_access_block.gen.ts";
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
 *   return [bucket_public_access_block({
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

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_s3_bucket_public_access_block" */
export const bucket_public_access_block = (
  decision: BucketPublicAccessBlockDecisionArgs,
  params?: BucketPublicAccessBlockDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_public_access_block_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "2.1.5",
      "decision.api.shisho.dev:aws/fsbp/latest": "S3.8",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      bucket_public_access_block_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type BucketPublicAccessBlockDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type BucketPublicAccessBlockDefaultParams = {
  resource_exceptions?: string[];
};

const bucket_public_access_block_kind = "aws_s3_bucket_public_access_block";

const bucket_public_access_block_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
