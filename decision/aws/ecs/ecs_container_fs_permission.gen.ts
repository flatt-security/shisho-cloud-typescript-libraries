import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure root filesystem operation by ECS containers is limited to read-only access
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { container_fs_permission } from "https://deno.land/x/shisho-cloud-sdk/decision/aws/ecs/ecs_container_fs_permission.gen.ts"
  * import { Decision, DecisionPolicy } from "https://deno.land/x/shisho-cloud-sdk/decision/mod.ts"
  * import { wrap_decision_policy } from "https://deno.land/x/shisho-cloud-sdk/decision/raw.ts"
  * import { convert_input, Input } from "./input.ts"
  * 
  * export const decide: DecisionPolicy<Input> = (input: Input): Decision[] => {
  *   // ID of the resource reviewed
  *   // The resource ID can be retrieved from the field "metadata: ResourceMetadata!"
  *   const subject = something.metadata.id
  * 
  *   // Whether this policy allows this resource
  *   const allowed = true
  * 
  *   // Return a list of decisions
  *   return [container_fs_permission({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       containers: [{container_name: "example", is_root_fs_readonly: false}],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:aws_ecs_container_fs_permission" */
export const container_fs_permission = (
  decision: ContainerFsPermissionDecisionArgs,
  params?: ContainerFsPermissionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": container_fs_permission_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:aws/fsbp/latest": "ECS.5",
      "decision.api.shisho.dev:needs-manual-review": "true",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(container_fs_permission_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type ContainerFsPermissionDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    containers: { container_name: string, is_root_fs_readonly: boolean }[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type ContainerFsPermissionDefaultParams = { resource_exceptions?: string[] }

const container_fs_permission_kind = "aws_ecs_container_fs_permission"

const container_fs_permission_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
