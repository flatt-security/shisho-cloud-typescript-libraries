import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure AWS Config is enabled in all regions
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { recorder_status } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/config/config_recorder_status.gen.ts";
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
 *   return [recorder_status({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       missing_regions: ["example"],
 *       recorders: [{name: "example", region: "example", recording_group: {all_supported: false, resource_types: ["example"], include_global_resource_types: false}}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_config_recorder_status" */
export const recorder_status = (
  decision: RecorderStatusDecisionArgs,
  params?: RecorderStatusDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": recorder_status_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "3.5",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(recorder_status_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RecorderStatusDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    missing_regions: string[];
    recorders: {
      name: string;
      region: string;
      recording_group: {
        all_supported: boolean;
        resource_types: string[];
        include_global_resource_types: boolean;
      };
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RecorderStatusDefaultParams = { resource_exceptions?: string[] };

const recorder_status_kind = "aws_config_recorder_status";

const recorder_status_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
