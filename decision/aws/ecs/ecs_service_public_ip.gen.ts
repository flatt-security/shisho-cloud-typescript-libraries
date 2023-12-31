import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_HIGH,
  SEVERITY_INFO,
} from "../../mod.ts";

/** Ensure public IP addresses are not assigned to ECS services automatically
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { service_public_ip } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/aws/ecs/ecs_service_public_ip.gen.ts";
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
 *   return [service_public_ip({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       public_ip_assigned: "example",
 *       security_groups: ["example"],
 *       subnets: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_ecs_service_public_ip" */
export const service_public_ip = (
  decision: ServicePublicIpDecisionArgs,
  params?: ServicePublicIpDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": service_public_ip_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_HIGH),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "ECS.2",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(service_public_ip_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type ServicePublicIpDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    public_ip_assigned: string;
    security_groups: string[];
    subnets: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ServicePublicIpDefaultParams = { resource_exceptions?: string[] };

const service_public_ip_kind = "aws_ecs_service_public_ip";

const service_public_ip_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
