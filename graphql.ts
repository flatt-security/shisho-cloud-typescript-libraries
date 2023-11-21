/**
 * Definitions used for the types of GraphQL queries
 * @module
 */

/** */

// Scalars
export type Int = number;
export type Float = number;
export type JSON = string;
export type AWSRegion = string;
export type { ResourceID } from "./mod.ts";

// Utilities
export type Nullable<T> = T | null;
