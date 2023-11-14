import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_HIGH,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure credentials unused for specific days are disabled
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { credentials_inventory } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/iam/iam_credentials_inventory.gen.ts";
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
 *   return [credentials_inventory({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       last_used_at: "example",
 *       recommended_grace_period_days: 0,
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_iam_credentials_inventory" */
export const credentials_inventory = (
  decision: CredentialsInventoryDecisionArgs,
  params?: CredentialsInventoryDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": credentials_inventory_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/cis-benchmark/v1.5.0": "1.12",
      "decision.api.shisho.dev:aws/fsbp/latest": "IAM.22",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(credentials_inventory_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type CredentialsInventoryDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    last_used_at: string;
    recommended_grace_period_days: number;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type CredentialsInventoryDefaultParams = {
  resource_exceptions?: string[];
};

const credentials_inventory_kind = "aws_iam_credentials_inventory";

const credentials_inventory_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
