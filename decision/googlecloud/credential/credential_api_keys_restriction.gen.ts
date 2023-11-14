import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure API Keys are restricted to usage by only specified hosts and apps
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { api_keys_restriction, RESTRICTION_TYPE_NO_RESTRICTION } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/googlecloud/credential/credential_api_keys_restriction.gen.ts";
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
 *   return [api_keys_restriction({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       permissive_values: ["example"],
 *       restriction_type: RESTRICTION_TYPE_NO_RESTRICTION,
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_credential_api_keys_restriction" */
export const api_keys_restriction = (
  decision: ApiKeysRestrictionDecisionArgs,
  params?: ApiKeysRestrictionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": api_keys_restriction_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "1.13",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(api_keys_restriction_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type ApiKeysRestrictionDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    permissive_values: string[];
    restriction_type: RestrictionType;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ApiKeysRestrictionDefaultParams = {
  resource_exceptions?: string[];
};

const api_keys_restriction_kind = "googlecloud_credential_api_keys_restriction";

const api_keys_restriction_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

type RestrictionType =
  | typeof RESTRICTION_TYPE_NO_RESTRICTION
  | typeof RESTRICTION_TYPE_IP_ADDRESS_RESTRICTION
  | typeof RESTRICTION_TYPE_REFERRER_RESTRICTION
  | typeof RESTRICTION_TYPE_ANDROID_APP_RESTRICTION
  | typeof RESTRICTION_TYPE_IOS_APP_RESTRICTION;

export const RESTRICTION_TYPE_NO_RESTRICTION = 0;
export const RESTRICTION_TYPE_IP_ADDRESS_RESTRICTION = 1;
export const RESTRICTION_TYPE_REFERRER_RESTRICTION = 2;
export const RESTRICTION_TYPE_ANDROID_APP_RESTRICTION = 3;
export const RESTRICTION_TYPE_IOS_APP_RESTRICTION = 4;
