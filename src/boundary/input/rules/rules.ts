import type { Scope } from "../../../scopes/scopes.js";
import type RuleEntry from "./entry/entry.js";
import type RuleObject from "./entry/object/object.js";

type Rules = Record<Scope, readonly RuleEntry[]>;

export type {
  Rules as default,
  RuleEntry,
  RuleObject,
};
