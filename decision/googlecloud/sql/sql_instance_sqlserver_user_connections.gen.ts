import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
} from "../../mod.ts";

/** Ensure maximum_user_connections database flag for a Cloud SQL for SQL Server instance is set to a non-limiting value
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_sqlserver_user_connections } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/sql/sql_instance_sqlserver_user_connections.gen.ts";
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
 *   return [instance_sqlserver_user_connections({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       maximum_user_connections: 0,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_sqlserver_user_connections" */
export const instance_sqlserver_user_connections = (
  decision: InstanceSqlserverUserConnectionsDecisionArgs,
  params?: InstanceSqlserverUserConnectionsDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_sqlserver_user_connections_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.3.3",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      instance_sqlserver_user_connections_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type InstanceSqlserverUserConnectionsDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    maximum_user_connections: number;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstanceSqlserverUserConnectionsDefaultParams = {
  resource_exceptions?: string[];
};

const instance_sqlserver_user_connections_kind =
  "googlecloud_sql_instance_sqlserver_user_connections";

const instance_sqlserver_user_connections_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
