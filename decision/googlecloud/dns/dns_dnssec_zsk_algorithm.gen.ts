import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure the Zone-Signing Key in Cloud DNS uses a secure algorithm
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { dnssec_zsk_algorithm } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/dns/dns_dnssec_zsk_algorithm.gen.ts";
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
 *   return [dnssec_zsk_algorithm({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       algorithm: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_dns_dnssec_zsk_algorithm" */
export const dnssec_zsk_algorithm = (
  decision: DnssecZskAlgorithmDecisionArgs,
  params?: DnssecZskAlgorithmDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": dnssec_zsk_algorithm_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.5",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(dnssec_zsk_algorithm_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DnssecZskAlgorithmDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    algorithm: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DnssecZskAlgorithmDefaultParams = {
  resource_exceptions?: string[];
};

const dnssec_zsk_algorithm_kind = "googlecloud_dns_dnssec_zsk_algorithm";

const dnssec_zsk_algorithm_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
