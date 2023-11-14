import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure log_error_verbosity database flag for Cloud SQL for PostgreSQL instance is set to DEFAULT or stricter
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { instance_postgresql_log_error_verbosity } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/sql/sql_instance_postgresql_log_error_verbosity.gen.ts";
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
 *   return [instance_postgresql_log_error_verbosity({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       log_error_verbosity_state: "example",
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_sql_instance_postgresql_log_error_verbosity" */
export const instance_postgresql_log_error_verbosity = (
  decision: InstancePostgresqlLogErrorVerbosityDecisionArgs,
  params?: InstancePostgresqlLogErrorVerbosityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": instance_postgresql_log_error_verbosity_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "6.2.1",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      instance_postgresql_log_error_verbosity_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type InstancePostgresqlLogErrorVerbosityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    log_error_verbosity_state: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InstancePostgresqlLogErrorVerbosityDefaultParams = {
  resource_exceptions?: string[];
};

const instance_postgresql_log_error_verbosity_kind =
  "googlecloud_sql_instance_postgresql_log_error_verbosity";

const instance_postgresql_log_error_verbosity_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
