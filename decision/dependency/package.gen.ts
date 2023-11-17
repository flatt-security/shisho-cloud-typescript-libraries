import type { ResourceID } from "../../mod.ts";
import {
  as_decision_type,
  Decision,
  is_excepted,
  Severity,
  SEVERITY_INFO,
} from "../mod.ts";

/** Update packages with known vulnerabilities
 *
 * You can emit this decision as follows:
 *
 * @example
 * ```typescript
 * import { package_known_vulnerability } from "https://deno.land/x/shisho_cloud_policy_helpers/decision/dependency/package.gen.ts";
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
 *   return [package_known_vulnerability({
 *     allowed,
 *     subject,
 *
 *     // Detailed information about the resource
 *     payload: {
 *       vulnerabilities: [{name: "example", version: "example", vuln_constraint: "example", vuln_id: "example", vuln_namespace: "example", advisories: ["example"], description: "example", found_at: "example"}],
 *     },
 *   })];
 * }
 *
 * export default decision_policy_adapter(convert_input)(decide);
 * ```
 *
 * @module
 */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:package_known_vulnerability" */
export const package_known_vulnerability = (
  decision: PackageKnownVulnerabilityDecisionArgs,
  params?: PackageKnownVulnerabilityDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": package_known_vulnerability_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_INFO),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:ssc/category": "dependency",
      "decision.api.shisho.dev:ssc/cis-benchmark/v1.0": "3.2.2",
    },
    "type": as_decision_type(
      package_known_vulnerability_allowed(decision, params),
    ),
  },
  "payload": decision.payload,
});

type PackageKnownVulnerabilityDecisionArgs = {
  allowed: boolean;
  subject: ResourceID;
  locator?: string;
  payload: {
    vulnerabilities: {
      name: string;
      version: string;
      vuln_constraint: string;
      vuln_id: string;
      vuln_namespace: string;
      advisories: string[];
      description: string;
      found_at: string;
    }[];
  };

  /** Override the severity for disallowed decisions */
  severity?: Severity;
};

export type PackageKnownVulnerabilityDefaultParams = {
  resource_exceptions?: string[];
};

const package_known_vulnerability_kind = "package_known_vulnerability";

const package_known_vulnerability_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed;
