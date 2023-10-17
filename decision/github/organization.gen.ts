import { ResourceID } from "../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../mod.ts"

/** Enforce two-factor authentication on GitHub organization(s)
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { org_2fa_status } from "https://deno.land/x/shisho-cloud-sdk/decision/github/organization.gen.ts"
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
  *   return [org_2fa_status({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       enabled: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_org_2fa_status" */
export const org_2fa_status = (
  decision: Org2FaStatusDecisionArgs,
  params?: Org2FaStatusDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": org_2fa_status_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.3.5",
    },
    "type": as_decision_type(org_2fa_status_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type Org2FaStatusDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    enabled: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type Org2FaStatusDefaultParams = { resource_exceptions?: string[] }

const org_2fa_status_kind = "github_org_2fa_status"

const org_2fa_status_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed


/** Ensure strict base permissions are set for repositories
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { org_default_repository_permission } from "https://deno.land/x/shisho-cloud-sdk/decision/github/organization.gen.ts"
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
  *   return [org_default_repository_permission({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       current: "example",
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_org_default_repository_permission" */
export const org_default_repository_permission = (
  decision: OrgDefaultRepositoryPermissionDecisionArgs,
  params?: OrgDefaultRepositoryPermissionDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": org_default_repository_permission_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.3.8",
    },
    "type": as_decision_type(org_default_repository_permission_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type OrgDefaultRepositoryPermissionDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    current: string
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type OrgDefaultRepositoryPermissionDefaultParams = { resource_exceptions?: string[] }

const org_default_repository_permission_kind = "github_org_default_repository_permission"

const org_default_repository_permission_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed


/** Ensure creation of GitHub public pages is restricted
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { org_members_permission_on_creating_public_pages } from "https://deno.land/x/shisho-cloud-sdk/decision/github/organization.gen.ts"
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
  *   return [org_members_permission_on_creating_public_pages({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       allowed: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_org_members_permission_on_creating_public_pages" */
export const org_members_permission_on_creating_public_pages = (
  decision: OrgMembersPermissionOnCreatingPublicPagesDecisionArgs,
  params?: OrgMembersPermissionOnCreatingPublicPagesDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": org_members_permission_on_creating_public_pages_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
    },
    "type": as_decision_type(org_members_permission_on_creating_public_pages_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type OrgMembersPermissionOnCreatingPublicPagesDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    allowed: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type OrgMembersPermissionOnCreatingPublicPagesDefaultParams = { resource_exceptions?: string[] }

const org_members_permission_on_creating_public_pages_kind = "github_org_members_permission_on_creating_public_pages"

const org_members_permission_on_creating_public_pages_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed


/** Ensure public repository creation is limited to specific members
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { org_members_permission_on_creating_public_repos } from "https://deno.land/x/shisho-cloud-sdk/decision/github/organization.gen.ts"
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
  *   return [org_members_permission_on_creating_public_repos({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       allowed: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_org_members_permission_on_creating_public_repos" */
export const org_members_permission_on_creating_public_repos = (
  decision: OrgMembersPermissionOnCreatingPublicReposDecisionArgs,
  params?: OrgMembersPermissionOnCreatingPublicReposDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": org_members_permission_on_creating_public_repos_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "source",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.2.2",
    },
    "type": as_decision_type(org_members_permission_on_creating_public_repos_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type OrgMembersPermissionOnCreatingPublicReposDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    allowed: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type OrgMembersPermissionOnCreatingPublicReposDefaultParams = { resource_exceptions?: string[] }

const org_members_permission_on_creating_public_repos_kind = "github_org_members_permission_on_creating_public_repos"

const org_members_permission_on_creating_public_repos_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed


/** Ensure forking of GitHub repositories is restricted
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { org_members_permission_on_private_forking } from "https://deno.land/x/shisho-cloud-sdk/decision/github/organization.gen.ts"
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
  *   return [org_members_permission_on_private_forking({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       allowed: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_org_members_permission_on_private_forking" */
export const org_members_permission_on_private_forking = (
  decision: OrgMembersPermissionOnPrivateForkingDecisionArgs,
  params?: OrgMembersPermissionOnPrivateForkingDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": org_members_permission_on_private_forking_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
    },
    "type": as_decision_type(org_members_permission_on_private_forking_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type OrgMembersPermissionOnPrivateForkingDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    allowed: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type OrgMembersPermissionOnPrivateForkingDefaultParams = { resource_exceptions?: string[] }

const org_members_permission_on_private_forking_kind = "github_org_members_permission_on_private_forking"

const org_members_permission_on_private_forking_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed


/** Ensure minimum number of administrators are set for the organization
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { org_owners } from "https://deno.land/x/shisho-cloud-sdk/decision/github/organization.gen.ts"
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
  *   return [org_owners({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       admins: ["example"],
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:github_org_owners" */
export const org_owners = (
  decision: OrgOwnersDecisionArgs,
  params?: OrgOwnersDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": org_owners_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "common",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "1.3.3",
    },
    "type": as_decision_type(org_owners_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type OrgOwnersDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    admins: string[]
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type OrgOwnersDefaultParams = { resource_exceptions?: string[] }

const org_owners_kind = "github_org_owners"

const org_owners_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
