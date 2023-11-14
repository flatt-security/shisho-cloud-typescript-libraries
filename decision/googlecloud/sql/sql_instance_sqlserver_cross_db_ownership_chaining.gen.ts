import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure that the cross_db_ownership_chaining_state  database flag for a Cloud SQL for SQL Server instance is set to off
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_sqlserver_cross_db_ownership_chaining } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/sql/sql_instance_sqlserver_cross_db_ownership_chaining.gen.ts";
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
 *   return [instance_sqlserver_cross_db_ownership_chaining({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       cross_db_ownership_chaining_state: "example",
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_sqlserver_cross_db_ownership_chaining" */
export const instance_sqlserver_cross_db_ownership_chaining = (
  decision: InstanceSqlserverCrossDbOwnershipChainingDecisionArgs,
  params?: InstanceSqlserverCrossDbOwnershipChainingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_sqlserver_cross_db_ownership_chaining_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.3.2",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      instance_sqlserver_cross_db_ownership_chaining_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type InstanceSqlserverCrossDbOwnershipChainingDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    cross_db_ownership_chaining_state: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceSqlserverCrossDbOwnershipChainingDefaultParams = {
  resource_exceptions?: string[];
};

const instance_sqlserver_cross_db_ownership_chaining_kind =
  "googlecloud_sql_instance_sqlserver_cross_db_ownership_chaining";

const instance_sqlserver_cross_db_ownership_chaining_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
