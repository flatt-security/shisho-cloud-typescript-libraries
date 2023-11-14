import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure the Key-Signing Key in Cloud DNS uses a secure algorithm
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { dnssec_ksk_algorithm } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/dns/dns_dnssec_ksk_algorithm.gen.ts";
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
 *   return [dnssec_ksk_algorithm({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       algorithms: ["example"],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_dns_dnssec_ksk_algorithm" */
export const dnssec_ksk_algorithm = (
  decision: DnssecKskAlgorithmDecisionArgs,
  params?: DnssecKskAlgorithmDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": dnssec_ksk_algorithm_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "3.4",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(dnssec_ksk_algorithm_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DnssecKskAlgorithmDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    algorithms: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DnssecKskAlgorithmDefaultParams = {
  resource_exceptions?: string[];
};

const dnssec_ksk_algorithm_kind = "googlecloud_dns_dnssec_ksk_algorithm";

const dnssec_ksk_algorithm_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
