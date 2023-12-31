import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure CloudTrail trails are integrated with CloudWatch Logs
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { cloudwatch_logs_integration } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/cloudtrail/cloudtrail_cloudwatch_logs_integration.gen.ts";
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
 *   return [cloudwatch_logs_integration({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       integrated: false,
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_cloudtrail_cloudwatch_logs_integration" */
export const cloudwatch_logs_integration = (
  decision: CloudwatchLogsIntegrationDecisionArgs,
  params?: CloudwatchLogsIntegrationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": cloudwatch_logs_integration_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.4",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(
      cloudwatch_logs_integration_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type CloudwatchLogsIntegrationDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    integrated: boolean;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type CloudwatchLogsIntegrationDefaultParams = {
  resource_exceptions?: string[];
};

const cloudwatch_logs_integration_kind =
  "aws_cloudtrail_cloudwatch_logs_integration";

const cloudwatch_logs_integration_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
