import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_HIGH,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure that Google Cloud permissions are granted only to principals in trusted identity sources
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { principal_source } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/iam/iam_principal_source.gen.ts";
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
 *   return [principal_source({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       source_domains: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_iam_principal_source" */
export const principal_source = (
  decision: PrincipalSourceDecisionArgs,
  params?: PrincipalSourceDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": principal_source_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.1",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(principal_source_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type PrincipalSourceDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    source_domains: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type PrincipalSourceDefaultParams = { resource_exceptions?: string[] };

const principal_source_kind = "googlecloud_iam_principal_source";

const principal_source_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
