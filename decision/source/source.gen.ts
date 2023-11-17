import type { ResourceID } from "../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../mod.ts";

/** Manage sources with a version control system
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { version_control } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/source/source.gen.ts";
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
 *   return [version_control({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       type: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:version_control" */
export const version_control = (
  decision: VersionControlDecisionArgs,
  params?: VersionControlDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": version_control_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.1",
    },
    "type": as_decision_type(version_control_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type VersionControlDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    type: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type VersionControlDefaultParams = { resource_exceptions?: string[] };

const version_control_kind = "version_control";

const version_control_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
