import type { Scope } from "..";
import type { RuleEntry } from "./entry";

export interface RulesInput {
  rules: Record<Scope, RuleEntry[]>;
  overrides: Partial<Record<Scope, RuleEntry.Record>>;
}
export namespace RulesInput {
  export type Entry = RuleEntry;
  export namespace Entry {
    export type Id = RuleEntry.Id;
    export type Record = RuleEntry.Record;
  }
}
