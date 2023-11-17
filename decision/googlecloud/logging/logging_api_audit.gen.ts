import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure Cloud Audit Logging is configured to record API operations
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { api_audit, AUDIT_LOG_CONFIG_LOG_TYPE_LOG_TYPE_UNSPECIFIED } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/logging/logging_api_audit.gen.ts";
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
 *   return [api_audit({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       audit_configs: [{service: "example", audit_log_configs: [{audit_log_config_log_type: AUDIT_LOG_CONFIG_LOG_TYPE_LOG_TYPE_UNSPECIFIED, exempted_members: ["example"]}]}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_logging_api_audit" */
export const api_audit = (
  decision: ApiAuditDecisionArgs,
  params?: ApiAuditDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": api_audit_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "2.1",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(api_audit_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type ApiAuditDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    audit_configs: {
      service: string;
      audit_log_configs: {
        audit_log_config_log_type: AuditLogConfigLogType;
        exempted_members: string[];
      }[];
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ApiAuditDefaultParams = { resource_exceptions?: string[] };

const api_audit_kind = "googlecloud_logging_api_audit";

const api_audit_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

type AuditLogConfigLogType =
  | typeof AUDIT_LOG_CONFIG_LOG_TYPE_LOG_TYPE_UNSPECIFIED
  | typeof AUDIT_LOG_CONFIG_LOG_TYPE_ADMIN_READ
  | typeof AUDIT_LOG_CONFIG_LOG_TYPE_DATA_READ
  | typeof AUDIT_LOG_CONFIG_LOG_TYPE_DATA_WRITE;

export const AUDIT_LOG_CONFIG_LOG_TYPE_LOG_TYPE_UNSPECIFIED = 0;
export const AUDIT_LOG_CONFIG_LOG_TYPE_ADMIN_READ = 1;
export const AUDIT_LOG_CONFIG_LOG_TYPE_DATA_READ = 2;
export const AUDIT_LOG_CONFIG_LOG_TYPE_DATA_WRITE = 3;
