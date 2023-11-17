/** Definition of the low-level interface of decision policy and
 * converters between the high/low-level interface
 * @module
 */

import type { ResourceID } from "../mod.ts";
import type { RawPolicy } from "../raw.ts";

export type RawDecisionPolicy = RawPolicy<
  RawDecisionPolicyInput,
  RawDecisionPolicyData,
  RawDecision[]
>;
type RawDecisionPolicyInput = unknown;
type RawDecisionPolicyData = unknown;
export type RawDecision = {
  header: {
    api_version: string;
    kind: string;
    subject: ResourceID;
    type: RawDecisionType;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    locator: string;
    severity: RawSeverity;
  };
  payload: string;
};

export type RawDecisionType = 0 | 1 | 2;

export const RAW_TYPE_UNDETERMINED = 0;
export const RAW_TYPE_ALLOW = 1;
export const RAW_TYPE_DENY = 2;

export type RawSeverity = 0 | 1 | 2 | 3 | 4;

export const RAW_SEVERITY_INFO = 0;
export const RAW_SEVERITY_LOW = 1;
export const RAW_SEVERITY_MEDIUM = 2;
export const RAW_SEVERITY_HIGH = 3;
export const RAW_SEVERITY_CRITICAL = 4;
