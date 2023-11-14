import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure BigQuery tables use Customer-Managed Encryption Keys (CMEK)
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { dataset_encryption_cmek } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/bigquery/bigquery_dataset_encryption_cmek.gen.ts";
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
 *   return [dataset_encryption_cmek({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       key_name: "example",
 *       uses_default_key: false,
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_bigquery_dataset_encryption_cmek" */
export const dataset_encryption_cmek = (
  decision: DatasetEncryptionCmekDecisionArgs,
  params?: DatasetEncryptionCmekDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": dataset_encryption_cmek_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "7.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(dataset_encryption_cmek_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DatasetEncryptionCmekDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    key_name: string;
    uses_default_key: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DatasetEncryptionCmekDefaultParams = {
  resource_exceptions?: string[];
};

const dataset_encryption_cmek_kind =
  "googlecloud_bigquery_dataset_encryption_cmek";

const dataset_encryption_cmek_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
