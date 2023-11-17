import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_CRITICAL,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure Cloud Storage buckets are public only if intended
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { bucket_accessibility } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/storage/storage_bucket_accessibility.gen.ts";
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
 *   return [bucket_accessibility({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       public_acl_rules: [{role: "example", entity: "example"}],
 *       public_policy_bindings: [{role: "example", principal: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_storage_bucket_accessibility" */
export const bucket_accessibility = (
  decision: BucketAccessibilityDecisionArgs,
  params?: BucketAccessibilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": bucket_accessibility_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "5.1",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(bucket_accessibility_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type BucketAccessibilityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    public_acl_rules: { role: string; entity: string }[];
    public_policy_bindings: { role: string; principal: string }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type BucketAccessibilityDefaultParams = {
  resource_exceptions?: string[];
};

const bucket_accessibility_kind = "googlecloud_storage_bucket_accessibility";

const bucket_accessibility_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
