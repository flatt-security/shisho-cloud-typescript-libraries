import type { ResourceID } from "../../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_CRITICAL,
  SEVERITY_INFO,
  SEVERITY_LOW,
  SEVERITY_MEDIUM,
} from "../../mod.ts";

/** Ensure dependencies of GitHub Actions workflows are pinned to verified versions
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { dependency_pinning } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/actions/actions.gen.ts";
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
 *   return [dependency_pinning({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       unpinned_dependencies: [{path: "./.github/workflows/test.yaml", line: 1, column: 1, dependency: "example"}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_actions_dependency_pinning" */
export const dependency_pinning = (
  decision: DependencyPinningDecisionArgs,
  params?: DependencyPinningDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": dependency_pinning_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "dependency",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "2.4.2",
    },
    "type": as_decision_type(dependency_pinning_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type DependencyPinningDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    unpinned_dependencies: {
      path: string;
      line: number;
      column: number;
      dependency: string;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DependencyPinningDefaultParams = { resource_exceptions?: string[] };

const dependency_pinning_kind = "github_actions_dependency_pinning";

const dependency_pinning_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure script evaluation by GitHub Actions workflows is validated
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { insecure_script_evaluation } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/actions/actions.gen.ts";
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
 *   return [insecure_script_evaluation({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       evaluated_scripts: [{path: "./.github/workflows/test.yaml", source_command: curl -s http://example.com, line: 1, column: 1}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_actions_insecure_script_evaluation" */
export const insecure_script_evaluation = (
  decision: InsecureScriptEvaluationDecisionArgs,
  params?: InsecureScriptEvaluationDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": insecure_script_evaluation_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "2.4.3",
    },
    "type": as_decision_type(
      insecure_script_evaluation_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type InsecureScriptEvaluationDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    evaluated_scripts: {
      path: string;
      source_command: string;
      line: number;
      column: number;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type InsecureScriptEvaluationDefaultParams = {
  resource_exceptions?: string[];
};

const insecure_script_evaluation_kind =
  "github_actions_insecure_script_evaluation";

const insecure_script_evaluation_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure explicit permissions for GitHub Actions workflows follow organization policies
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { workflow_explicit_permissions } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/actions/actions.gen.ts";
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
 *   return [workflow_explicit_permissions({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       workflows_with_excessive_permissions: [{path: "./.github/workflows/test.yaml", excessive_permissions: ["example"]}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_actions_workflow_explicit_permissions" */
export const workflow_explicit_permissions = (
  decision: WorkflowExplicitPermissionsDecisionArgs,
  params?: WorkflowExplicitPermissionsDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": workflow_explicit_permissions_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "2.2.3",
    },
    "type": as_decision_type(
      workflow_explicit_permissions_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type WorkflowExplicitPermissionsDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    workflows_with_excessive_permissions: {
      path: string;
      excessive_permissions: string[];
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type WorkflowExplicitPermissionsDefaultParams = {
  resource_exceptions?: string[];
};

const workflow_explicit_permissions_kind =
  "github_actions_workflow_explicit_permissions";

const workflow_explicit_permissions_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure GitHub Actions workflows do not permit any script injections
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { workflow_script_injection_possibility } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/actions/actions.gen.ts";
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
 *   return [workflow_script_injection_possibility({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       injectable_sinks: [{path: "./.github/workflows/test.yaml", line: 1, column: 1, abusable_fields: ["example"]}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_actions_workflow_script_injection_possibility" */
export const workflow_script_injection_possibility = (
  decision: WorkflowScriptInjectionPossibilityDecisionArgs,
  params?: WorkflowScriptInjectionPossibilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": workflow_script_injection_possibility_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.3.8",
    },
    "type": as_decision_type(
      workflow_script_injection_possibility_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type WorkflowScriptInjectionPossibilityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    injectable_sinks: {
      path: string;
      line: number;
      column: number;
      abusable_fields: string[];
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type WorkflowScriptInjectionPossibilityDefaultParams = {
  resource_exceptions?: string[];
};

const workflow_script_injection_possibility_kind =
  "github_actions_workflow_script_injection_possibility";

const workflow_script_injection_possibility_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure secrets do not appear in GitHub Actions Workflows directly
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { workflow_secret_handling } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/actions/actions.gen.ts";
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
 *   return [workflow_secret_handling({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       hardcoded_secrets: [{path: "./.github/workflows/test.yaml", line: 1, column: 1, location_hint: "example"}],
 *     },
 *   })];
 * }
 *
 * export default wrap_decision_policy(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_actions_workflow_secret_handling" */
export const workflow_secret_handling = (
  decision: WorkflowSecretHandlingDecisionArgs,
  params?: WorkflowSecretHandlingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": workflow_secret_handling_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_CRITICAL),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.5.1",
    },
    "type": as_decision_type(
      workflow_secret_handling_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type WorkflowSecretHandlingDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    hardcoded_secrets: {
      path: string;
      line: number;
      column: number;
      location_hint: string;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type WorkflowSecretHandlingDefaultParams = {
  resource_exceptions?: string[];
};

const workflow_secret_handling_kind = "github_actions_workflow_secret_handling";

const workflow_secret_handling_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
