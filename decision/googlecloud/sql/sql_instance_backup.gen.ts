import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_HIGH,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure Cloud SQL instances use automatic backups
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_backup } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/sql/sql_instance_backup.gen.ts";
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
 *   return [instance_backup({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       auto_backup_enabled: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_backup" */
export const instance_backup = (
  decision: InstanceBackupDecisionArgs,
  params?: InstanceBackupDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_backup_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.7",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(instance_backup_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type InstanceBackupDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    auto_backup_enabled: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceBackupDefaultParams = { resource_exceptions?: string[] };

const instance_backup_kind = "googlecloud_sql_instance_backup";

const instance_backup_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
