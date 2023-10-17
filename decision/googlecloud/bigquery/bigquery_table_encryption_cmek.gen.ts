import { ResourceID } from "../../../scalars.ts"
import { as_decision_type, Decision, is_excepted, Severity, SEVERITY_INFO, SEVERITY_LOW } from "../../mod.ts"

/** Ensure BigQuery datasets have default Customer-Managed Encryption Keys (CMEK)
  *
  * You can emit this decision as follows:
  * 
  * @example
  * ```typescript
  * import { table_encryption_cmek } from "https://deno.land/x/shisho-cloud-sdk/decision/googlecloud/bigquery/bigquery_table_encryption_cmek.gen.ts"
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
  *   return [table_encryption_cmek({
  *     allowed,
  *     subject,
  * 
  *     // Detailed information about the resource
  *     payload: {
  *       key_name: "example",
  *       uses_default_key: false,
  *     },
  *   })]
  * }
  * 
  * export default wrap_decision_policy(convert_input)(decide)
  * ```
  * 
  * @module
  */

/** Emit a decision whose type is decision.api.shisho.dev/v1beta:googlecloud_bigquery_table_encryption_cmek" */
export const table_encryption_cmek = (
  decision: TableEncryptionCmekDecisionArgs,
  params?: TableEncryptionCmekDefaultParams,
): Decision => ({
  "header": {
    "api_version": "decision.api.shisho.dev/v1beta",
    "kind": table_encryption_cmek_kind,
    "subject": decision.subject,
    "locator": decision.locator ?? "",
    "severity": decision.allowed
      ? SEVERITY_INFO
      : (decision.severity ?? SEVERITY_LOW),
    "labels": {},
    "annotations": {
      "decision.api.shisho.dev:googlecloud/cis-benchmark/v1.3.0": "7.2",
      "decision.api.shisho.dev:needs-manual-review": "false",
      "decision.api.shisho.dev:ssc/category": "infrastructure",
    },
    "type": as_decision_type(table_encryption_cmek_allowed(decision, params)),
  },
  "payload": decision.payload,
})

type TableEncryptionCmekDecisionArgs = {
  allowed: boolean
  subject: ResourceID
  locator?: string
  payload: {
    key_name: string
    uses_default_key: boolean
  }

  /** Override the severity for disallowed decisions */
  severity?: Severity
}

export type TableEncryptionCmekDefaultParams = { resource_exceptions?: string[] }

const table_encryption_cmek_kind = "googlecloud_bigquery_table_encryption_cmek"

const table_encryption_cmek_allowed = (
  h: { allowed: boolean; subject: ResourceID },
  params?: { resource_exceptions?: string[] },
) => is_excepted(h, params) || h.allowed
