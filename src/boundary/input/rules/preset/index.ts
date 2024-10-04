import type { Scope } from "../../../../scopes/index.js";
import type * as RuleBase from "./entry/index.js";

type RuleBase = Readonly<Record<Scope, readonly RuleBase.RuleEntry[]>>;

export type {
  RuleBase,
  RuleBase as Base,
  RuleBase as default,
};
