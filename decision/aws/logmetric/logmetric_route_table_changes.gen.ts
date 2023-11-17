import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure a log metric filter and alarm exist for route table changes
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { route_table_changes } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/logmetric/logmetric_route_table_changes.gen.ts";
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
 *   return [route_table_changes({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       cis_notification_implementations: [{trail_name: "example", metric_name: "example", alarm_name: "example", sns_topic_arn: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_logmetric_route_table_changes" */
export const route_table_changes = (
  decision: RouteTableChangesDecisionArgs,
  params?: RouteTableChangesDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": route_table_changes_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "4.13",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(route_table_changes_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RouteTableChangesDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    cis_notification_implementations: {
      trail_name: string;
      metric_name: string;
      alarm_name: string | null;
      sns_topic_arn: string;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RouteTableChangesDefaultParams = { resource_exceptions?: string[] };

const route_table_changes_kind = "aws_logmetric_route_table_changes";

const route_table_changes_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
