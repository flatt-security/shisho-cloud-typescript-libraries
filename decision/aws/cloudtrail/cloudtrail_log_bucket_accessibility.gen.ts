import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure the S3 bucket for CloudTrail logs is not publicly accessible
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { log_bucket_accessibility } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/cloudtrail/cloudtrail_log_bucket_accessibility.gen.ts";
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
 *   return [log_bucket_accessibility({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       acl_rules: [{grantee_url: "example", permission: "example"}],
 *       bucket_name: "example",
 *       bucket_policy_document: "example",
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_cloudtrail_log_bucket_accessibility" */
export const log_bucket_accessibility = (
  decision: LogBucketAccessibilityDecisionArgs,
  params?: LogBucketAccessibilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": log_bucket_accessibility_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      log_bucket_accessibility_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type LogBucketAccessibilityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    acl_rules: { grantee_url: string; permission: string }[];
    bucket_name: string;
    bucket_policy_document: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type LogBucketAccessibilityDefaultParams = {
  resource_exceptions?: string[];
};

const log_bucket_accessibility_kind = "aws_cloudtrail_log_bucket_accessibility";

const log_bucket_accessibility_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
