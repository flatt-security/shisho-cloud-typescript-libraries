import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure that the log metric filter and alerts exist for Cloud Storage IAM permission changes
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { storage_iam_changes } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/logmetric/logmetric_storage_iam_changes.gen.ts";
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
 *   return [storage_iam_changes({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       cis_notification_implementations: [{metric_name: "example", alert_policy_name: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_logmetric_storage_iam_changes" */
export const storage_iam_changes = (
  decision: StorageIamChangesDecisionArgs,
  params?: StorageIamChangesDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": storage_iam_changes_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "2.10",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(storage_iam_changes_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type StorageIamChangesDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    cis_notification_implementations: {
      metric_name: string;
      alert_policy_name: string;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type StorageIamChangesDefaultParams = { resource_exceptions?: string[] };

const storage_iam_changes_kind = "googlecloud_logmetric_storage_iam_changes";

const storage_iam_changes_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
