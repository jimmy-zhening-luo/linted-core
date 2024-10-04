import type * as RuleEntry from "./object/index.js";

type RuleEntry = readonly [string, RuleEntry.RuleObject];

export type {
  RuleEntry,
  RuleEntry as Entry,
  RuleEntry as default,
};
