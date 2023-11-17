import type { ResourceID } from "../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
  SEVERITY_LOW,
  SEVERITY_MEDIUM,
} from "../mod.ts";

/** Ensure the deletion of protected branches is limited
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { branch_deletion_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [branch_deletion_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       allowed: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_branch_deletion_policy" */
export const branch_deletion_policy = (
  decision: BranchDeletionPolicyDecisionArgs,
  params?: BranchDeletionPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": branch_deletion_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.17",
    },
    "type": as_decision_type(branch_deletion_policy_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type BranchDeletionPolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    allowed: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type BranchDeletionPolicyDefaultParams = {
  resource_exceptions?: string[];
};

const branch_deletion_policy_kind = "github_branch_deletion_policy";

const branch_deletion_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure code owner’s review is required when a change affects owned code
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { code_owners_review_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [code_owners_review_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       required: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_code_owners_review_policy" */
export const code_owners_review_policy = (
  decision: CodeOwnersReviewPolicyDecisionArgs,
  params?: CodeOwnersReviewPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": code_owners_review_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.7",
    },
    "type": as_decision_type(
      code_owners_review_policy_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type CodeOwnersReviewPolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    required: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type CodeOwnersReviewPolicyDefaultParams = {
  resource_exceptions?: string[];
};

const code_owners_review_policy_kind = "github_code_owners_review_policy";

const code_owners_review_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure verification of signed commits for new changes before merging
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { commit_signature_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [commit_signature_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       required: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_commit_signature_policy" */
export const commit_signature_policy = (
  decision: CommitSignaturePolicyDecisionArgs,
  params?: CommitSignaturePolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": commit_signature_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.12",
    },
    "type": as_decision_type(commit_signature_policy_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type CommitSignaturePolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    required: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type CommitSignaturePolicyDefaultParams = {
  resource_exceptions?: string[];
};

const commit_signature_policy_kind = "github_commit_signature_policy";

const commit_signature_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Keep a default branch protected by branch protection rule(s)
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { default_branch_protection } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [default_branch_protection({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       default_branch_name: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_default_branch_protection" */
export const default_branch_protection = (
  decision: DefaultBranchProtectionDecisionArgs,
  params?: DefaultBranchProtectionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": default_branch_protection_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.14",
    },
    "type": as_decision_type(
      default_branch_protection_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type DefaultBranchProtectionDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    default_branch_name: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type DefaultBranchProtectionDefaultParams = {
  resource_exceptions?: string[];
};

const default_branch_protection_kind = "github_default_branch_protection";

const default_branch_protection_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure force push code to branches is denied
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { force_push_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [force_push_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       allowed: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_force_push_policy" */
export const force_push_policy = (
  decision: ForcePushPolicyDecisionArgs,
  params?: ForcePushPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": force_push_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.16",
    },
    "type": as_decision_type(force_push_policy_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type ForcePushPolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    allowed: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ForcePushPolicyDefaultParams = { resource_exceptions?: string[] };

const force_push_policy_kind = "github_force_push_policy";

const force_push_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure linear history is required
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { linear_history_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [linear_history_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       required: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_linear_history_policy" */
export const linear_history_policy = (
  decision: LinearHistoryPolicyDecisionArgs,
  params?: LinearHistoryPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": linear_history_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.13",
    },
    "type": as_decision_type(linear_history_policy_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type LinearHistoryPolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    required: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type LinearHistoryPolicyDefaultParams = {
  resource_exceptions?: string[];
};

const linear_history_policy_kind = "github_linear_history_policy";

const linear_history_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure any change to code receives the enough number of approvals by authenticated users
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { minimum_approval_number_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [minimum_approval_number_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       required_approval_count: 0,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_minimum_approval_number_policy" */
export const minimum_approval_number_policy = (
  decision: MinimumApprovalNumberPolicyDecisionArgs,
  params?: MinimumApprovalNumberPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": minimum_approval_number_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_MEDIUM),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.3",
    },
    "type": as_decision_type(
      minimum_approval_number_policy_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type MinimumApprovalNumberPolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    required_approval_count: number;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type MinimumApprovalNumberPolicyDefaultParams = {
  resource_exceptions?: string[];
};

const minimum_approval_number_policy_kind =
  "github_minimum_approval_number_policy";

const minimum_approval_number_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure branch protection rules are enforced for administrators
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { protection_enforcement_for_admins } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [protection_enforcement_for_admins({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       allowed: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_protection_enforcement_for_admins" */
export const protection_enforcement_for_admins = (
  decision: ProtectionEnforcementForAdminsDecisionArgs,
  params?: ProtectionEnforcementForAdminsDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": protection_enforcement_for_admins_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.14",
    },
    "type": as_decision_type(
      protection_enforcement_for_admins_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type ProtectionEnforcementForAdminsDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    allowed: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type ProtectionEnforcementForAdminsDefaultParams = {
  resource_exceptions?: string[];
};

const protection_enforcement_for_admins_kind =
  "github_protection_enforcement_for_admins";

const protection_enforcement_for_admins_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure minimum number of administrators are set for the GitHub repository
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { repo_admins } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [repo_admins({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       admins: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_repo_admins" */
export const repo_admins = (
  decision: RepoAdminsDecisionArgs,
  params?: RepoAdminsDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": repo_admins_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.3.7",
    },
    "type": as_decision_type(repo_admins_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type RepoAdminsDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    admins: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RepoAdminsDefaultParams = { resource_exceptions?: string[] };

const repo_admins_kind = "github_repo_admins";

const repo_admins_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure deletion of GitHub repositories is restricted
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { repo_members_permission_on_deleting_repository } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [repo_members_permission_on_deleting_repository({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       allowed_users: ["example"],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_repo_members_permission_on_deleting_repository" */
export const repo_members_permission_on_deleting_repository = (
  decision: RepoMembersPermissionOnDeletingRepositoryDecisionArgs,
  params?: RepoMembersPermissionOnDeletingRepositoryDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": repo_members_permission_on_deleting_repository_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.2.3",
    },
    "type": as_decision_type(
      repo_members_permission_on_deleting_repository_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type RepoMembersPermissionOnDeletingRepositoryDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    allowed_users: string[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type RepoMembersPermissionOnDeletingRepositoryDefaultParams = {
  resource_exceptions?: string[];
};

const repo_members_permission_on_deleting_repository_kind =
  "github_repo_members_permission_on_deleting_repository";

const repo_members_permission_on_deleting_repository_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;

/** Ensure previous approvals are dismissed when updates are introduced to a code change proposal
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { stale_review_policy } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/github/repository.gen.ts";
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
 *   return [stale_review_policy({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       enforced: false,
 *       subject_branch: "example",
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_stale_review_policy" */
export const stale_review_policy = (
  decision: StaleReviewPolicyDecisionArgs,
  params?: StaleReviewPolicyDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": stale_review_policy_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.1.4",
    },
    "type": as_decision_type(stale_review_policy_allowed(decision, params)),
  },
  "payload": decision.payload,
});

type StaleReviewPolicyDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    enforced: boolean;
    subject_branch: string;
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type StaleReviewPolicyDefaultParams = { resource_exceptions?: string[] };

const stale_review_policy_kind = "github_stale_review_policy";

const stale_review_policy_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
