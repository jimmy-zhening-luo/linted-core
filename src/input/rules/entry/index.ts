import type { RuleRecord } from "./record";

export type RuleEntry = readonly [string, RuleRecord];
export namespace RuleEntry {
  export type Id = string;
  export type Record = RuleRecord;
}
